/**
 * Admin Dashboard Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  checkSessionAndLoadData();

  const sortSelect = document.getElementById('sort-select');
  const logoutBtn = document.getElementById('logout-btn');
  const tbody = document.getElementById('submissions-body');
  const emptyState = document.getElementById('empty-state');
  const totalCountEl = document.getElementById('total-count');
  const adminUsernameEl = document.getElementById('admin-username');
  const tableEl = document.getElementById('submissions-table');

  // Modal elements
  const deleteModal = document.getElementById('delete-modal');
  const deleteCancel = document.getElementById('delete-cancel');
  const deleteConfirm = document.getElementById('delete-confirm');
  let itemToDelete = null;

  // --- Auth & Data Loading ---

  async function checkSessionAndLoadData() {
    try {
      const res = await fetch('/api/admin/check');
      const data = await res.json();
      if (!data.authenticated) {
        window.location.href = '/admin/login';
        return;
      }
      adminUsernameEl.textContent = data.username;
      loadSubmissions(sortSelect.value);
    } catch (err) {
      console.error('Auth check failed:', err);
    }
  }

  async function loadSubmissions(sortMethod) {
    try {
      const res = await fetch(`/api/submissions?sort=${sortMethod}`);
      if (res.status === 401) {
        window.location.href = '/admin/login';
        return;
      }
      const data = await res.json();
      renderTable(data.submissions, data.total);
    } catch (err) {
      showToast('Failed to load submissions.', 'error');
      console.error(err);
    }
  }

  // --- Rendering ---

  function renderTable(submissions, total) {
    totalCountEl.textContent = total;
    tbody.innerHTML = '';

    if (submissions.length === 0) {
      tableEl.style.display = 'none';
      emptyState.style.display = 'block';
      return;
    }

    tableEl.style.display = 'table';
    emptyState.style.display = 'none';

    submissions.forEach(sub => {
      const tr = document.createElement('tr');
      const name = sub.visitor_name || '<span style="color: var(--c-text-faint); font-weight: 300;">Anonymous</span>';
      
      const starsHtml = generateStarsHtml(sub.rating);
      const dateStr = formatDateTime(sub.submitted_at);

      tr.innerHTML = `
        <td data-label="Visitor">${name}</td>
        <td data-label="Rating"><div class="table-stars">${starsHtml}</div></td>
        <td data-label="Date" style="font-size: 0.85rem; color: var(--c-text-faint);">${dateStr}</td>
        <td data-label="Actions">
          <div class="table-actions">
            <a href="/admin/response/${sub.id}" class="btn btn--secondary btn--sm">View</a>
            <button class="btn btn--danger btn--sm delete-btn" data-id="${sub.id}">Delete</button>
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });

    // Attach delete handlers to newly created buttons
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        itemToDelete = e.target.dataset.id;
        showModal();
      });
    });
  }

  function generateStarsHtml(rating) {
    let html = '';
    for (let i = 1; i <= 5; i++) {
      const fill = i <= rating ? 'var(--c-gold)' : 'var(--c-charcoal-mid)';
      html += `
        <svg viewBox="0 0 24 24">
          <polygon fill="${fill}" points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      `;
    }
    return html;
  }

  function formatDateTime(isoString) {
    const d = new Date(isoString + 'Z'); // sqlite stores UTC without Z
    const opts = { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' };
    return d.toLocaleDateString(undefined, opts);
  }

  // --- Sorting ---

  sortSelect.addEventListener('change', (e) => {
    loadSubmissions(e.target.value);
  });

  // --- Delete Modal ---

  function showModal() {
    deleteModal.classList.add('modal-overlay--visible');
  }

  function hideModal() {
    deleteModal.classList.remove('modal-overlay--visible');
    itemToDelete = null;
  }

  deleteCancel.addEventListener('click', hideModal);

  deleteConfirm.addEventListener('click', async () => {
    if (!itemToDelete) return;
    
    try {
      const res = await fetch(`/api/submissions/${itemToDelete}`, {
        method: 'DELETE'
      });
      
      if (res.ok) {
        hideModal();
        showToast('Response deleted successfully.', 'success');
        loadSubmissions(sortSelect.value); // reload table
      } else {
        const data = await res.json();
        showToast(data.error || 'Failed to delete.', 'error');
        hideModal();
      }
    } catch (err) {
      showToast('A network error occurred.', 'error');
      console.error(err);
      hideModal();
    }
  });

  // Close modal on outside click
  deleteModal.addEventListener('click', (e) => {
    if (e.target === deleteModal) hideModal();
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
