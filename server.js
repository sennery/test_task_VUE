const express = require('express')
const fs = require('fs')
const fse = require('fs-extra')
const cors = require('cors')
const path = require('path')
const remove = require('remove');
const bodyParser = require('body-parser')
const app = express()
const port = 3000

let disksList = []
let fileTypes = [
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

app.use(express.static(path.join(__dirname, 'dist')))

app.use(bodyParser.json())

app.use(bodyParser.text())

app.use(cors())

app.get('/', (req, res) => res.sendFile('index.html'))

app.post('/open', (req,res) =>{
    res.json(directoryContent(path.normalize(req.body)))
})

app.post('/move', (req,res) =>{
    fse.move(JSON.parse(req.body).obj, JSON.parse(req.body).pathTo, err => {
        if (err) return console.error(err)
        res.json(responseForActions(req,res))
    })
})

app.post('/copy', (req,res) =>{
    fse.copy(JSON.parse(req.body).obj, JSON.parse(req.body).pathTo, err => {
        if (err) return console.error(err)
        res.json(responseForActions(req,res))
    })
})

app.post('/remove', (req,res) =>{
    try {
        remove.removeSync(path.normalize(JSON.parse(req.body).obj))
    } catch(err) {
        console.log(err)
    }
    res.json(responseForActions(req,res))
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

function directoryContent(dirPath){
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

function responseForActions(req,res){
    return {
        dir1: directoryContent(path.normalize(path.parse(JSON.parse(req.body).obj).dir)),
        dir2: directoryContent(path.normalize(path.parse(JSON.parse(req.body).pathTo).dir))
    }
}

function typeOfFile(name) {
    return (fileTypes.find( file => file.fileExt === path.extname(name))) ? fileTypes.find( file => file.fileExt === path.extname(name)).fileType : 'file'
}

function readableSize(size) {
    var i = 0, type = ['б','Кб','Мб','Гб','Тб','Пб'];
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