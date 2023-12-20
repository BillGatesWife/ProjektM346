document.getElementById('uploadForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const files = document.querySelector('[name=image]').files;
  const formData = new FormData();
  formData.append('image', files[0]);

  fetch('/upload', {
      method: 'POST',
      body: formData
  })
  .then(response => response.json())
  .then(data => {
      console.log(data);
      alert('Bild erfolgreich hochgeladen!');
  })
  .catch(error => {
      console.error(error);
      alert('Fehler beim Hochladen des Bildes.');
  });
});

document.getElementById('uploadForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const files = document.querySelector('[name=image]').files;
  const accessKeyId = document.getElementById('accessKeyId').value;
  const secretAccessKey = document.getElementById('secretAccessKey').value;

  if (!accessKeyId || !secretAccessKey) {
      alert('Bitte geben Sie Ihre AWS-Zugangsdaten ein.');
      return;
  }

  const formData = new FormData();
  formData.append('image', files[0]);
  formData.append('accessKeyId', accessKeyId);
  formData.append('secretAccessKey', secretAccessKey);

  fetch('/upload', {
      method: 'POST',
      body: formData
  })
  .then(response => response.json())
  .then(data => {
      console.log(data);
      alert('Bild erfolgreich hochgeladen!');
  })
  .catch(error => {
      console.error(error);
      alert('Fehler beim Hochladen des Bildes.');
  });
});
