const util = require('./fsUtil');

const saveFiles = (form, req, uploadDir) => {
    return new Promise(async (resolve, reject) => {
        // specify that we want to allow the user to upload multiple files in a single request
        form.multiples = true;

        var uploadSessionFolder = util.joinPaths(uploadDir, process.hrtime.bigint().toString());

        await util.ensureExists(uploadSessionFolder);

        // store all uploads in the /uploads directory
        form.uploadDir = uploadSessionFolder;

        // every time a file has been uploaded successfully,
        // rename it to it's orignal name
        form.on('file', (field, file) => {
            util
                .rename(file.path, util.joinPaths(form.uploadDir, file.name))
                .then(() => {
                    console.log(`${file.name} saved!`)
                }, reject)
        });

        // log any errors that occur
        form.on('error', reject);

        // once all the files have been uploaded, send a response to the client
        form.on('end', resolve);

        // parse the incoming request containing the form data
        form.parse(req);
    })
}

module.exports = { saveFiles }