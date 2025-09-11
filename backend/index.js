// backend/index.js
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const http = require('http');

const app = express();
const server = http.createServer(app);
const { Server } = require('socket.io');

const io = new Server(server, {
  cors: { origin: "http://localhost:5173", methods: ["GET","POST"] }
});

app.use(cors());
app.use(express.json());

// DATA paths
const ROOT = path.join(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'data');
const VIDEOS_DIR = path.join(DATA_DIR, 'videos');
const DB_FILE = path.join(DATA_DIR, 'db.json');

fs.mkdirSync(VIDEOS_DIR, { recursive: true });
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify({ videos: [], purchases: [], chats: {} }, null, 2));
}

function readDB(){
  return JSON.parse(fs.readFileSync(DB_FILE,'utf8'));
}
function writeDB(obj){
  fs.writeFileSync(DB_FILE, JSON.stringify(obj, null, 2));
}

// Multer for uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, VIDEOS_DIR),
  filename: (req, file, cb) => {
    const ts = Date.now();
    const safe = file.originalname.replace(/\s+/g,'_');
    cb(null, `${ts}-${safe}`);
  }
});
const upload = multer({ storage });

// ---------- REST endpoints ----------

// List videos metadata
app.get('/api/videos', (req, res) => {
  const db = readDB();
  res.json(db.videos);
});

// Upload endpoint (multipart form: field 'video', field 'title')
app.post('/api/upload', upload.single('video'), (req, res) => {
  if(!req.file) return res.status(400).send('No file');
  const db = readDB();
  const title = req.body.title || req.file.originalname;
  const video = {
    id: Date.now().toString(),
    title,
    filename: req.file.filename,
    originalName: req.file.originalname,
    createdAt: new Date().toISOString()
  };
  db.videos.push(video);
  writeDB(db);
  res.json(video);
});

// Serve raw file stream (supports range for seeking)
app.get('/videos/:filename', (req, res) => {
  const filepath = path.join(VIDEOS_DIR, req.params.filename);
  if(!fs.existsSync(filepath)) return res.status(404).send('Not found');
  const stat = fs.statSync(filepath);
  const fileSize = stat.size;
  const range = req.headers.range;
  if(range){
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize-1;
    const chunkSize = (end - start) + 1;
    const file = fs.createReadStream(filepath, { start, end });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize,
      'Content-Type': 'video/mp4'
    };
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    res.writeHead(200, { 'Content-Length': fileSize, 'Content-Type': 'video/mp4' });
    fs.createReadStream(filepath).pipe(res);
  }
});

// Get chat history for a video
app.get('/api/chats/:videoId', (req, res) => {
  const videoId = req.params.videoId;
  const db = readDB();
  const chats = db.chats[videoId] || [];
  res.json(chats);
});

// ---------- Socket.IO real-time chat ----------

/*
Event format:
- join: { room } where room = `video_<videoId>`
- chat-message: { room, from, message } (server will broadcast to room and persist)
- server emits 'chat-message' to room with payload { from, message, at }
*/

io.on('connection', (socket) => {
  console.log('socket connected', socket.id);

  socket.on('join', (room) => {
    socket.join(room);
    console.log(`${socket.id} joined ${room}`);
  });

  socket.on('chat-message', (payload) => {
    // payload: { room, from, message }
    const { room, from, message } = payload;
    const at = new Date().toISOString();

    // Broadcast to room
    io.to(room).emit('chat-message', { from, message, at });

    // Persist to db.json under db.chats[videoId]
    // room is like "video_<videoId>"
    const parts = room.split('video_');
    const videoId = parts[1] || room;
    const db = readDB();
    db.chats[videoId] = db.chats[videoId] || [];
    db.chats[videoId].push({ from, message, at });
    writeDB(db);
  });

  socket.on('disconnect', () => {
    console.log('socket disconnected', socket.id);
  });
});

// Run server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
