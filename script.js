  document.addEventListener('DOMContentLoaded', function() {
    const fileInfo = document.querySelector('.file-info');
    const uploadForm = document.getElementById('uploadForm');
  
    uploadForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const fileInput = this.querySelector('input[type="file"]');
      const file = fileInput.files[0];
      if (!file) {
        alert('Bitte wählen Sie eine Datei aus.');
        return;
      }
      
      // Display the file name
      fileInfo.textContent = file.name;
  
      // Prepare the form data to send to the server
      const formData = new FormData();
      formData.append('imageFile', file);
  
      // Make an AJAX request to the server
      fetch('/upload', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        document.getElementById('message').textContent = data.message;
      })
      .catch(error => {
        console.error('Error:', error);
        document.getElementById('message').textContent = 'Fehler beim Upload.';
      });
    });
  
    // Handle file selection
    document.querySelector('.upload-btn-wrapper input[type="file"]').addEventListener('change', function() {
      if (this.files && this.files.length > 0) {
        fileInfo.textContent = this.files[0].name;
      }
    });
  });
  