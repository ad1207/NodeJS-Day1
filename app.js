const fs = require("fs")
const os = require("os")
const http = require("http")
const paths = require("path")

const timestamp = Date.now();
const dateObject = new Date(timestamp);
const date = dateObject.getDate();
const month = dateObject.getMonth() + 1;
const year = dateObject.getFullYear();
const hour = dateObject.getHours();
const minutes = dateObject.getMinutes();
const seconds = dateObject.getSeconds();

const filename = `./${year}-${month}-${date}-- ${hour}-${minutes}-${seconds}.txt`
const content = `${year}-${month}-${date}`;
const path = `${__dirname}`;

const server = http.createServer((req, res) => {
    console.log("Server Created")
    if (req.url === '/create') {
        fs.writeFile(filename, content, function (err) {
            if (err) throw err;
        });
        res.write('File is created successfully.');
    }
    else if (req.url === '/read') {
        let string = ''
        fs.readdir(__dirname, (err, files) => {
            files.forEach(file => {
                if (paths.extname(file) === '.txt') {
                    console.log(file)
                }
            });
        });
        res.write("Check console");
    }
    else {
        res.write("Page Not Found")
    }
    res.end()
})

server.listen(3001)
