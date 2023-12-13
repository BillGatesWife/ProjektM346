document.querySelector('.upload-btn-wrapper input[type=file]').addEventListener('change', function() {
    if (this.files && this.files.length > 0) {
      // Update button text or perform other actions
      document.querySelector('.btn').textContent = this.files[0].name;
    }
  });



document.getElementById('uploadForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Verhindert das Standardverhalten des Formulars (Seiten-Refresh)

  var fileInput = document.querySelector('input[type="file"]');
  var file = fileInput.files[0];

  if (file) {
      var formData = new FormData();
      formData.append('myfile', file);

      fetch('/your-upload-endpoint', { // Ersetze '/your-upload-endpoint' durch den tatsächlichen Endpunkt zum Hochladen
          method: 'POST',
          body: formData
      })
      .then(function(response) {
          return response.json();
      })
      .then(function(data) {
          console.log('Upload successful:', data);
          // Hier kannst du weitere Aktionen nach dem erfolgreichen Upload durchführen
      })
      .catch(function(error) {
          console.error('Error uploading:', error);
      });
  } else {
      console.log('No file selected.');
  }
});
