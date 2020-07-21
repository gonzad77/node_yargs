const argv = require('yargs').argv;
const fs = require('fs');

if(!argv.filename) return console.log("You must write a filename (--filename=yourfilename)");

const filepath = `files/${argv.filename}.txt`

if(fs.existsSync(filepath)) return console.log("Your file already exists, please try with another filename");

fs.writeFile(filepath, 'You are awesome', (err) => {

    if(err) {
        console.log("Error writing file: ", err);
    }
    else {
        try {
            let files = readJson();
            let data = {
                name: argv.filename
            }
            files.push(data);
            fs.writeFile('files/files.json', JSON.stringify(files), (error) => {
                if(err) {
                    console.log("Error writing json: ", error);
                }
                else {
                    console.log(`Succeed creating ${argv.filename} file`)
                }
            })
        } catch {
            fs.unlink(filepath, (e) => {
                if(e) {
                    console.log(`File ${argv.filename}.txt was created but not added to json`);
                }
                else {
                    console.log("Error writing json: ", e);
                }
            })
        }
    }
})

const readJson = () => {
    try {
        let files = require('./files/files.json');
        console.log(files);
        return files;
    } catch {
        return []
    }

}