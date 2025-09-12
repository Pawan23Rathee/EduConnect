const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const uploadDiv = document.getElementById('uploadDiv');
const videoInput = document.getElementById('videoInput');
const uploadBtn = document.getElementById('uploadBtn');
const uploadStatus = document.getElementById('uploadStatus');
const userInfoDiv = document.getElementById('userInfo');

// Check if user is logged in
async function checkUser() {
  const res = await fetch('http://localhost:4000/');
  const data = await res.json().catch(() => null);

  if (data && data.isAuthenticated) {
    loginBtn.style.display = 'none';
    logoutBtn.style.display = 'inline';
    uploadDiv.style.display = 'block';
    userInfoDiv.innerHTML = `<pre>${JSON.stringify(data.userInfo, null, 2)}</pre>`;
  } else {
    loginBtn.style.display = 'inline';
    logoutBtn.style.display = 'none';
    uploadDiv.style.display = 'none';
    userInfoDiv.innerHTML = '';
  }
}

// Login button
loginBtn.addEventListener('click', () => {
  window.location.href = 'http://localhost:4000/login';
});

// Logout button
logoutBtn.addEventListener('click', async () => {
  await fetch('http://localhost:4000/logout');
  checkUser();
});

// Upload video
uploadBtn.addEventListener('click', async () => {
  const file = videoInput.files[0];
  if (!file) return alert('Select a video first!');

  const formData = new FormData();
  formData.append('video', file);

  const res = await fetch('http://localhost:4000/upload', {
    method: 'POST',
    body: formData
  });

  const data = await res.json();
  uploadStatus.innerHTML = `Uploaded: <a href="${data.url}" target="_blank">${data.url}</a>`;
});

checkUser();
