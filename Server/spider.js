const superagent = require('superagent')
const cheerio = require('cheerio')
const path = require('path')
const fs = require('fs')

const url = 'https://ncov.dxy.cn/ncovh5/view/pneumonia'

function spider (){
    superagent.get(url).then(res => {
        // console.log(res.text);
        const $ = cheerio.load(res.text)
        let $worldData = $('#getListByCountryTypeService2true').html()
        let $chinaData = $('#getAreaStat').html()
        let $staticData = $('#getStatisticsService').html()
        let worldDataObj = {}
        let chinaDataObj = {}
        let staticDataObj = {}
        eval($worldData.replace(/window/g,'worldDataObj'))
        eval($chinaData.replace(/window/g,'chinaDataObj'))
        eval($staticData.replace(/window/g,'staticDataObj'))

        let day2 = new Date();
        day2.setTime(day2.getTime());
        let s2 = day2.getFullYear()+"-" + (day2.getMonth()+1) + "-" + day2.getDate();

        try{
            let stat = fs.statSync(path.join(__dirname,'./Data/'+s2));
        }catch (e) {
            fs.mkdirSync(path.join(__dirname,'./Data/'+s2));
        }

        fs.writeFile(path.join(__dirname,'./Data/'+s2+'/worldData.json'),JSON.stringify(worldDataObj),err => {
            if(err) throw err
            console.log('world数据写入成功');
        })
        fs.writeFile(path.join(__dirname,'./Data/'+s2+'/chinaData.json'),JSON.stringify(chinaDataObj),err => {
            if(err) throw err
            console.log('china数据写入成功');
        })
        fs.writeFile(path.join(__dirname,'./Data/'+s2+'/staticData.json'),JSON.stringify(staticDataObj),err => {
            if(err) throw err
            console.log('static数据写入成功');
        })

    }).catch(err => {
        console.log(err);
    })
}

module.exports = {spider}
