module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport":{
      viewportWidth:1536,
      viewportHeight:754,
      unitPrecision:5,
      viewportUnit:'vw',
      minPixelValue:1,
      mediaQuery:false
    }
  }
}
