const archiver = require('archiver');
const { Readable } = require('stream');

function createZip(files) {
    return new Promise((resolve, reject) => {
        const archive = archiver('zip');
        const buffers = [];
        archive.on('data', data => buffers.push(data));
        archive.on('error', err => reject(err));
        archive.on('end', () => resolve(Buffer.concat(buffers)));

        files.forEach(file => {
            archive.append(file.content, { name: file.name });
        });

        archive.finalize();
    });
}

module.exports = { createZip };
