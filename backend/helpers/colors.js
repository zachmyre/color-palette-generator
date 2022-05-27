const getColors = require('get-image-colors');
const fetch = require('cross-fetch');
const API_KEY = 'lol';

function getImages(keyword){
    return new Promise(async (resolve, reject) => {
        const url = `https://pixabay.com/api/?key=${API_KEY}&q=${keyword}&image_type=photo`;
        const renderedImage = fetch(url)
        .then(res => {
          if (res.status >= 400) {
            throw new Error("Bad response from server");
          }
          return res.json();
        })
        .then(images => {
          resolve(images.hits);
        })
        .catch(err => {
          console.error(err);
        });
    })
}

async function setImageAndColors(image){
    let imageRGBvalues = [];
    let getImageColors = await getColors(image);
    getImageColors.forEach(color => {
        imageRGBvalues.push(
          {red: color._rgb[0],
          green: color._rgb[1],
          blue: color._rgb[2]})
    });
    return imageRGBvalues;
      }

  async function getAllRGBValues(keyword){
      return new Promise( async (resolve, reject) =>{
        let finished = false;
        let rgbValues = [];
        let fetchedImages = await getImages(keyword);
        let count = 0;
        for await(const i of fetchedImages){
          count++;
          if(i != undefined){
          let asyncRgb = await setImageAndColors(i.webformatURL);
          rgbValues.push(asyncRgb);
          }
          if(count === fetchedImages.length - 1){
            console.log('COMPLETED');
            finished = true;
            resolve(rgbValues);
          }
        }
    });
  }




    module.exports = {
      getAllRGBValues
    }
