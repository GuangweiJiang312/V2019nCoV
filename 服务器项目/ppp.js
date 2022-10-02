const superagent = require('superagent')
const cheerio = require('cheerio')
const path = require('path')
const fs = require('fs')

const url = 'https://graphics.straitstimes.com/STI/STIMEDIA/Interactives/2018/04/marvel-cinematic-universe-whos-who-interactive/images_doc/marvel/screenshots/tonys.jpg'

superagent.get(url).then(res => {
    console.log(res);

}).catch(err => {
    console.log(err);
})
