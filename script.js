const express = require('express');
const fileUpload = require('express-fileupload');
const { exec } = require('child_process');
const app = express();
const port = 3000;

app.use(fileUpload());

app.post('/upload', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('Keine Dateien wurden hochgeladen.');
  }

  // The name of the input field is 'imageFile' based on the HTML form
  let uploadedImage = req.files.imageFile;

  // Use the mv() method to place the file somewhere on your server
  const uploadPath = __dirname + '/uploads/' + uploadedImage.name;

  uploadedImage.mv(uploadPath, function(err) {
    if (err) return res.status(500).send(err);

    // Call the Python script to resize the image
    const scriptPath = __dirname + '/ResizeFunction.py';
    exec(`python "${scriptPath}" "${uploadPath}"`, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return res.status(500).send(stderr);
      }
      console.log(`Resize output: ${stdout}`);
      res.send({ message: 'Das Bild wurde erfolgreich hochgeladen und verkleinert.' });
    });
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
