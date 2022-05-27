const appDiv = document.getElementById('app');
const img = document.getElementById('img');
const button = document.getElementById('button');
const boxes = [
  document.getElementById('0'),
  document.getElementById('1'),
  document.getElementById('2'),
  document.getElementById('3'),
  document.getElementById('4'),
];

//getting all the images and colors has to be handled by the server, not on the browser side
//this is because get-image-colors requires nodejs

async function retrieveColors() {
  removeOldColors();
  let images;
  let total;
  const keyword = document.getElementById('keyword').value;
  const colors = fetch(`http://localhost:5000/${keyword}`).then((response) => {
    return response.json();
  }).then((data) => {
    console.log(data);
    data.forEach((color) => {
      const box = document.createElement('div');
      box.classList.add('box');
      box.style.width = 'auto';
      box.style.height = 'auto';
      box.style.display = 'flex';
      box.style.flexDirection = 'column';
      box.style.justifyContent = 'center';
      box.style.alignItems = 'center';
      box.style.margin = '5px';
      box.style.border = '3px solid black';
      appDiv.appendChild(box);
      color.forEach((c) => {
        const palette = document.createElement('div');
        const rgbText = document.createElement('p');
        palette.classList.add('palette');
        palette.style.width = '50px';
        palette.style.height = '50px';
        palette.style.display = 'inline-block';
        palette.style.margin = '5px';
        palette.style.borderRadius = '50%';
        palette.style.backgroundColor = `rgb(${c.red}, ${c.green}, ${c.blue})`;
        rgbText.classList.add('rgbText');
        rgbText.innerHTML = `rgb(${c.red}, ${c.green}, ${c.blue})`;
        rgbText.style.fontSize = '12px';
        rgbText.style.margin = '3px';
        box.appendChild(palette);
        box.appendChild(rgbText);
      })
    })
  })
}

function removeOldColors() {
  let boxes = Array.from(document.getElementsByClassName('box'));
  if (boxes.length > 0) {
    boxes.forEach((element) => {
      element.remove();
    })
  }
  let palettes = Array.from(document.getElementsByClassName('palette'));
  if (palettes.length > 0) {
    palettes.forEach((element) => {
      element.remove();
    })
  }
  let rgbTexts = Array.from(document.getElementsByClassName('rgbText'));
  if (rgbTexts.length > 0) {
    rgbTexts.forEach((element) => {
      element.remove();
    })
  }
}