/**
 * Visitor Form Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('visitor-form');
  const submitBtn = document.getElementById('submit-btn');
  const ratingError = document.getElementById('rating-error');
  const commentInput = document.getElementById('comment');
  const charCount = document.getElementById('char-count');
  
  // Star rating logic
  let selectedRating = 0;
  const stars = document.querySelectorAll('.star-rating__star');
  
  stars.forEach(star => {
    star.addEventListener('click', () => {
      selectedRating = parseInt(star.dataset.value, 10);
      updateStars(selectedRating);
      ratingError.classList.remove('form-error--visible');
    });

    star.addEventListener('mouseenter', () => {
      const hoverValue = parseInt(star.dataset.value, 10);
      highlightStars(hoverValue, 'star-rating__star--hover');
    });

    star.addEventListener('mouseleave', () => {
      removeHighlight('star-rating__star--hover');
      updateStars(selectedRating);
    });
  });

  function updateStars(value) {
    stars.forEach(s => {
      if (parseInt(s.dataset.value, 10) <= value) {
        s.classList.add('star-rating__star--active');
      } else {
        s.classList.remove('star-rating__star--active');
      }
    });
  }

  function highlightStars(value, className) {
    stars.forEach(s => {
      if (parseInt(s.dataset.value, 10) <= value) {
        s.classList.add(className);
      } else {
        s.classList.remove(className);
      }
    });
  }

  function removeHighlight(className) {
    stars.forEach(s => s.classList.remove(className));
  }

  // Checkbox logic
  const checkboxes = document.querySelectorAll('.checkbox-item input[type="checkbox"]');
  checkboxes.forEach(cb => {
    cb.addEventListener('change', (e) => {
      const parent = e.target.closest('.checkbox-item');
      if (e.target.checked) {
        parent.classList.add('checkbox-item--checked');
      } else {
        parent.classList.remove('checkbox-item--checked');
      }
    });
  });

  // Character count logic
  const MAX_CHARS = 2000;
  const WARN_THRESHOLD = 50;

  commentInput.addEventListener('input', () => {
    const count = commentInput.value.length;
    charCount.textContent = `${count.toLocaleString()} / ${MAX_CHARS.toLocaleString()}`;
    
    charCount.className = 'char-count';
    if (count > MAX_CHARS) {
      charCount.classList.add('char-count--limit');
      commentInput.value = commentInput.value.substring(0, MAX_CHARS);
      charCount.textContent = `${MAX_CHARS.toLocaleString()} / ${MAX_CHARS.toLocaleString()}`;
    } else if (MAX_CHARS - count <= WARN_THRESHOLD) {
      charCount.classList.add('char-count--warn');
    }
  });

  // Form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (selectedRating === 0) {
      ratingError.classList.add('form-error--visible');
      // Scroll to rating if needed
      document.getElementById('star-rating').scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // Set loading state
    submitBtn.classList.add('btn--loading');
    submitBtn.disabled = true;

    // Gather data
    const formData = new FormData(form);
    
    // Get exhibits
    const exhibits = [];
    checkboxes.forEach(cb => {
      if (cb.checked) exhibits.push(cb.value);
    });

    const data = {
      visitor_name: formData.get('visitor_name'),
      rating: selectedRating,
      exhibits_visited: exhibits,
      comment: formData.get('comment')
    };

    try {
      const response = await fetch('/api/submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit feedback');
      }

      // Success
      window.location.href = '/confirmation';
      
    } catch (error) {
      console.error('Error submitting form:', error);
      showToast(error.message, 'error');
      submitBtn.classList.remove('btn--loading');
      submitBtn.disabled = false;
    }
  });

  // Toast notification
  function showToast(message, type = 'error') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast toast--visible toast--${type}`;
    
    setTimeout(() => {
      toast.classList.remove('toast--visible');
    }, 4000);
  }
});
