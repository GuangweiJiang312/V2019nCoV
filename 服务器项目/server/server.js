const express = require('express')
const fs = require('fs')
const path = require('path')
const runSchedule = require('../schedule');
const spider = require('../spider')

const app = express()

app.all('*',function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (req.method == 'OPTIONS') {
        res.send(200);
    }
    else {
        next();
    }
});


let day2 = new Date();
day2.setTime(day2.getTime());
let s2 = day2.getFullYear()+"-" + (day2.getMonth()+1) + "-" + day2.getDate();

app.get('/',(request,response) => {
    response.send({
        test:'hellow'
    })
})

app.get('/api/worldData',(request,response) => {
    fs.readFile(path.join(__dirname,'../Data/'+s2+'/worldData.json'),'utf8',(err,data) => {
        if(err) throw err
        console.log(data);
        response.send(data)
    })
})

app.get('/api/chinaData',(request,response) => {
    fs.readFile(path.join(__dirname,'../Data/'+s2+'/chinaData.json'),'utf8',(err,data) => {
        if(err) throw err
        console.log(data);
        response.send(data)
    })
})

app.get('/api/staticData',(request,response) => {
    fs.readFile(path.join(__dirname,'../Data/'+s2+'/staticData.json'),'utf8',(err,data) => {
        if(err) throw err
        console.log(data);
        response.send(data)
    })
})

app.listen(8089,() => {
    console.log('服务器启动成功');
    runSchedule(function() {
        spider.spider();
    })
})