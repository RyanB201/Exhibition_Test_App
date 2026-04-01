/**
 * Admin Individual Response Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  const contentDiv = document.getElementById('response-content');
  const notFoundDiv = document.getElementById('not-found');
  const logoutBtn = document.getElementById('logout-btn');

  // Modal elements
  const deleteModal = document.getElementById('delete-modal');
  const deleteCancel = document.getElementById('delete-cancel');
  const deleteConfirm = document.getElementById('delete-confirm');

  // Get ID from URL path (e.g. /admin/response/123)
  const pathParts = window.location.pathname.split('/');
  const responseId = pathParts[pathParts.length - 1];

  checkSessionAndLoadData();

  // --- Auth & Data Loading ---

  async function checkSessionAndLoadData() {
    try {
      const authRes = await fetch('/api/admin/check');
      const authData = await authRes.json();
      
      if (!authData.authenticated) {
        window.location.href = '/admin/login';
        return;
      }

      const res = await fetch(`/api/submissions/${responseId}`);
      if (res.status === 404) {
        notFoundDiv.style.display = 'block';
        return;
      }
      
      if (res.status === 401) {
        window.location.href = '/admin/login';
        return;
      }

      const data = await res.json();
      renderResponse(data);

    } catch (err) {
      console.error('Failed to load response:', err);
      showToast('Error loading response.', 'error');
    }
  }

  // --- Rendering ---

  function renderResponse(sub) {
    const name = sub.visitor_name || '<span style="color: var(--c-text-faint); font-weight: 300;">Anonymous</span>';
    const starsHtml = generateStarsHtml(sub.rating);
    const dateStr = formatDateTime(sub.submitted_at);
    
    // Parse exhibits
    let exhibitsList = 'None selected';
    if (sub.exhibits_visited) {
      try {
        const arr = JSON.parse(sub.exhibits_visited);
        if (arr && arr.length > 0) {
          exhibitsList = arr.map(ex => `<span class="tag">${ex}</span>`).join(' ');
        }
      } catch (e) {
        // Fallback if not JSON
        exhibitsList = sub.exhibits_visited;
      }
    }

    const commentStr = sub.comment 
      ? escapeHTML(sub.comment).replace(/\\n/g, '<br>')
      : '<span style="color: var(--c-text-faint); font-style: italic;">No comment provided.</span>';

    contentDiv.innerHTML = `
      <div class="card response-detail">
        <div class="response-detail__meta" style="margin-bottom: var(--s-xl);">
          <div class="response-detail__meta-item">
            <span class="response-detail__label">Submission ID</span>
            <span class="response-detail__value" style="font-family: monospace; color: var(--c-gold);">${sub.id}</span>
          </div>
          <div class="response-detail__meta-item">
            <span class="response-detail__label">Date & Time</span>
            <span class="response-detail__value">${dateStr}</span>
          </div>
        </div>

        <div class="response-detail__field">
          <div class="response-detail__label">Visitor Name</div>
          <div class="response-detail__value" style="font-size: 1.5rem; font-family: var(--f-display);">${name}</div>
        </div>

        <div class="response-detail__field">
          <div class="response-detail__label">Rating</div>
          <div class="response-detail__value table-stars" style="margin-top: var(--s-xs);">${starsHtml}</div>
        </div>

        <div class="response-detail__field">
          <div class="response-detail__label">Exhibits Visited</div>
          <div class="response-detail__value" style="display: flex; gap: var(--s-xs); flex-wrap: wrap; margin-top: var(--s-xs);">
            ${exhibitsList}
          </div>
        </div>

        <div class="response-detail__field">
          <div class="response-detail__label" style="display: flex; justify-content: space-between;">
            Written Feedback
          </div>
          <div class="response-detail__value" style="background: rgba(0,0,0,0.2); padding: var(--s-md); border-radius: var(--r-md); margin-top: var(--s-sm); border: 1px solid rgba(245,240,235,0.03);">
            ${commentStr}
          </div>
        </div>

        <div style="margin-top: var(--s-2xl); display: flex; justify-content: flex-end;">
          <button class="btn btn--danger" id="delete-btn">
            Delete Response
          </button>
        </div>
      </div>
    `;

    document.getElementById('delete-btn').addEventListener('click', () => {
      deleteModal.classList.add('modal-overlay--visible');
    });
  }

  function generateStarsHtml(rating) {
    let html = '';
    for (let i = 1; i <= 5; i++) {
      const fill = i <= rating ? 'var(--c-gold)' : 'var(--c-charcoal-mid)';
      html += `
        <svg viewBox="0 0 24 24" style="width: 24px; height: 24px;">
          <polygon fill="${fill}" points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      `;
    }
    return html;
  }

  function formatDateTime(isoString) {
    const d = new Date(isoString + 'Z');
    const opts = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit' };
    return d.toLocaleDateString(undefined, opts);
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          "'": '&#39;',
          '"': '&quot;'
        }[tag] || tag)
    );
  }

  // --- Deletion ---

  deleteCancel.addEventListener('click', () => {
    deleteModal.classList.remove('modal-overlay--visible');
  });

  deleteConfirm.addEventListener('click', async () => {
    try {
      const res = await fetch(`/api/submissions/${responseId}`, {
        method: 'DELETE'
      });
      
      if (res.ok) {
        window.location.href = '/admin/dashboard';
      } else {
        const data = await res.json();
        showToast(data.error || 'Failed to delete.', 'error');
        deleteModal.classList.remove('modal-overlay--visible');
      }
    } catch (err) {
      showToast('A network error occurred.', 'error');
      console.error(err);
      deleteModal.classList.remove('modal-overlay--visible');
    }
  });

  // --- Logout ---

  logoutBtn.addEventListener('click', async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      window.location.href = '/admin/login';
    } catch (err) {
      console.error('Logout failed:', err);
    }
  });

  // --- Toast ---

  function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast toast--visible toast--${type}`;
    
    setTimeout(() => {
      toast.classList.remove('toast--visible');
    }, 4000);
  }
});
