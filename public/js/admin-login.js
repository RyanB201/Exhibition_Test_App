/**
 * Admin Login Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const loginBtn = document.getElementById('login-btn');
  const errorMsg = document.getElementById('login-error');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');

  // Check if already logged in
  checkSession();

  async function checkSession() {
    try {
      const res = await fetch('/api/admin/check');
      const data = await res.json();
      if (data.authenticated) {
        window.location.href = '/admin/dashboard';
      }
    } catch (err) {
      console.error('Auth check failed:', err);
    }
  }

  // Clear error on typing
  usernameInput.addEventListener('input', () => {
    errorMsg.style.display = 'none';
  });
  
  passwordInput.addEventListener('input', () => {
    errorMsg.style.display = 'none';
  });

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    
    if (!username || !password) return;

    loginBtn.classList.add('btn--loading');
    loginBtn.disabled = true;
    errorMsg.style.display = 'none';

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        // Success
        window.location.href = '/admin/dashboard';
      } else {
        // Failure
        errorMsg.style.display = 'block';
        passwordInput.value = ''; // clear password on error
        passwordInput.focus();
        loginBtn.classList.remove('btn--loading');
        loginBtn.disabled = false;
      }
    } catch (error) {
      console.error('Login error:', error);
      errorMsg.textContent = 'A network error occurred.';
      errorMsg.style.display = 'block';
      loginBtn.classList.remove('btn--loading');
      loginBtn.disabled = false;
    }
  });
});
