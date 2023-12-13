document.querySelector('.upload-btn-wrapper input[type=file]').addEventListener('change', function() {
    if (this.files && this.files.length > 0) {
      // Update button text or perform other actions
      document.querySelector('.file-info').textContent = this.files[0].name;
    }
  });
  