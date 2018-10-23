var shades = ["50","100","200","300","400","500","600","700","800","900"];
var colorNames = ["turquoise","green-sea","emerald","nephritis","peter-river","belize-hole","amethyst","wisteria","wet-asphalt","midnight-blue","sunflower","orange","carrot","pumpkin","alizarin","pomegranate","clouds","silver","concrete","asbestos"];
var currentColour = colorNames[0]+'-'+shades[0];
var previousColour = colorNames[0]+'-'+shades[0];
var NumberOfRows = 64;

const container = document.querySelector('#container');

container.addEventListener('wheel', function(e) {

  if (e.deltaY < 0) {
    if (window.NumberOfRows >= 128){
      alert("Let's calm down. Less is More.");
      window.NumberOfRows = 128;}

    window.NumberOfRows += 4;
    drawGrid(window.NumberOfRows);
    console.log(window.NumberOfRows);
  }

  if (e.deltaY > 0) {
    if (window.NumberOfRows <= 32){
      alert("Let's calm down. More is less.");
      window.NumberOfRows = 32;}
    window.NumberOfRows -= 4;
    drawGrid(window.NumberOfRows);
    console.log(window.NumberOfRows);
  }});


function drawGrid(NumRows){
  var NumberOfColumns = Math.floor(NumRows/4);

  while (container.hasChildNodes()) {
  container.removeChild(container.lastChild);}

  for(i = 0; i <= NumRows; i++){
    var vert = document.createElement('div');
    vert.classList.add('Row');
    container.appendChild(vert);

    for(j = 0; j <= NumberOfColumns; j++){
      var hor = document.createElement('div');
      if ((j/2) === Math.floor(j/2)) {
        hor.classList.add('ColumnIndent');
        container.addEventListener("mouseover", drawColour);
      }
      else {
        hor.classList.add('Column');
        container.addEventListener("mouseover", drawColour);

      }
      vert.appendChild(hor);
    }
   }
}

const colorPallete = document.querySelector('#colorPallete');
const palleteMenu = document.querySelector('#palleteMenu');
palleteMenu.addEventListener("mouseleave", resetColorButton);

for(i = 0; i < (shades.length); i++){
  var vert = document.createElement('div');
  vert.classList.add('Row');
  colorPallete.appendChild(vert);
    for(j = 0; j < colorNames.length; j++){
    var hor = document.createElement('div');
    hor.classList.add(currentColour);
    window.currentColour = window.colorNames[j]+'-'+window.shades[i];
    vert.appendChild(hor);
    colorPallete.addEventListener("dblclick", function(e) {changeCanvasColour(e); resetColorButton()});
    colorPallete.addEventListener("click", function(e) {changePaint(e); resetColorButton()});
    colorPallete.addEventListener("mouseover", identifyColour);
    colorPallete.addEventListener("mouseout", removeIdentifyColour);
  }
 }




function drawColour(e) {
  var holder = window.previousColour;

  if (e.target.classList.contains("Column")){
    e.target.className = "Column";
    e.target.classList.add(window.currentColour);
      }
  if (e.target.classList.contains("ColumnIndent")){
    e.target.className = "ColumnIndent";
    e.target.classList.add(window.currentColour);
      }

  console.log(e.target.className);
}

/*function pulseElement(e) {
  if (e.target.className === "ColumnIndent" || e.target.className === "Column") {
    e.target.classList.add('pulse');
  }
  console.log(e.target.className)
}

function removeCss(e) {
  if (e.target.className === "ColumnIndent" || e.target.className === "Column") {
    e.target.classList.remove('pulse');
  }
  console.log(e.target.className)
} */

function changePaint(e) {
  window.previousColour = window.currentColour;
  window.currentColour = e.target.className;
  var text = window.getComputedStyle(e.target, null).getPropertyValue("background-color");
  document.querySelector('#colorButton').style.cssText = "background-color: " + text;

}

function identifyColour(e) {
  e.target.style.cssText = 'z-index: 100; transform: scale(1.8); transition: transform 0.5s;';
}

function removeIdentifyColour(e) {
  e.target.style.cssText = 'transform: scale(1.0); transition: transform 0.5s;';
}

function changeCanvasColour(e) {

  var text = window.getComputedStyle(e.target, null).getPropertyValue("background-color");
  container.style.cssText = "background-color: " + text;
  console.log(text);

}

function changeColourButton(e){
  document.querySelector('#palleteMenu').style.cssText = "visibility: visible;";
}

function resetColorButton(){
  document.querySelector('#palleteMenu').style.cssText = "visibility: hidden;";
}
