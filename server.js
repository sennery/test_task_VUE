const express = require('express')
const fs = require('fs')
const fse = require('fs-extra')
const cors = require('cors')
const path = require('path')
const remove = require('remove');
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const fileTypes = [
    { fileType: 'video' , fileExt: '.wmv'},
    { fileType: 'video' , fileExt: '.mp4'},
    { fileType: 'video' , fileExt: '.avi'},
    { fileType: 'audio' , fileExt: '.mp3'},
    { fileType: 'picture' , fileExt: '.png'},
    { fileType: 'picture' , fileExt: '.jpeg'},
    { fileType: 'document' , fileExt: '.txt'},
    { fileType: 'document' , fileExt: '.doc'},
    { fileType: 'document' , fileExt: '.docx'},
    { fileType: 'document' , fileExt: '.xls'},
    { fileType: 'document' , fileExt: '.xlsx'},
    { fileType: 'program' , fileExt: '.exe'}
]
let disksList = []

app.use(express.static(path.join(__dirname, 'dist')))

app.use(bodyParser.json())

app.use(cors())

app.get('/', (req, res) => res.sendFile('index.html'))

app.post('/open', (req,res) => {
    try {
        res.json(directoryContent(path.normalize(req.body.path)))
    }
    catch(err) {
        throw new Error('Не удалось открыть директорию (' + err.message + ')')
    }
})

app.post('/move', (req,res) => {
    try {
        fse.moveSync(req.body.obj, req.body.pathTo)
        res.json({});
    }
    catch(err) {
        throw new Error('Не удалось переместить файл (' + err.message + ')')
    }
})

app.post('/copy', (req,res) => {
    try {
        fse.copySync(req.body.obj, req.body.pathTo)
        res.json({});
    }
    catch(err) {
        throw new Error('Не удалось скопировать файл (' + err.message + ')')
    }
})

app.post('/remove', (req,res) => {
    try {
        remove.removeSync(path.normalize(req.body.obj))
        res.json({});
    }
    catch(err) {
        throw new Error('Не удалось удалить файл (' + err.message + ')')
    }
})

app.use((error, req, res, next) => {
    res.status(500)
    res.json({ message: error.message })
  })

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

function directoryContent(dirPath) {
    let fileList = []
    fs.readdirSync(dirPath).forEach((arg) => {
        try {
            let stat = fs.statSync(path.join(dirPath,arg))
            fileList.push({
                fileName: arg,
                type: (stat.isDirectory()) ? 'directory' : typeOfFile(arg),
                size: (stat.isDirectory()) ? ' ' : readableSize(stat.size),
                changeTime: stat.mtimeMs
            })
        }
        catch(err) {
            console.log(err)
        }
    })

    fileList.sort((a ,b) => {
        if(a.type == 'directory')
            if(b.type == 'directory')
                return 0
            else 
                return -1
        else 
            if(b.type == 'directory')
                return 1
            else 
                return 0
    })

    return {
        path: dirPath,
        fileList: fileList,
        disksList: disksList
    }
}

function typeOfFile(name) {
    const type = fileTypes.find( 
        file => file.fileExt === path.extname(name)
    );
    return (type) ? type.fileType : 'file'
}

function readableSize(size) {
    let i = 0;
    const type = ['б','Кб','Мб','Гб','Тб','Пб'];
    while((size / 1000 | 0) && i < type.length - 1) {
	    size /= 1024;
	    i++;
    }
    
	return size.toFixed(2) + ' ' + type[i];
}

let ch = 'a'

while (ch<='z') {
    try {
        fs.accessSync(ch + ':/')
        disksList.push(ch.toUpperCase() + ':/')
    }
    catch(err) {
    }
	ch = String.fromCharCode(ch.charCodeAt(0)+1);		
}