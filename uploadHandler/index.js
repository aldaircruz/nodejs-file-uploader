var express = require('express');
var router = express.Router();
var formidable = require('formidable');
const path = require('path');

const uploadService = require('./upload.service');
const uploadDir = path.resolve(process.env.UPLOAD_DIR);

router.post('/upload', async (req, res) => {

    // create an incoming form object
    var form = new formidable.IncomingForm();

    // specify that we want to allow the user to upload multiple files in a single request
    form.multiples = true;

    await uploadService.saveFiles(form, req, uploadDir);

    res.end('success');

})

module.exports = router