// © 2021, Ian Quinn

// inspired by https://github.com/ephraimilunga/fylo_challenge/blob/master/js/main.js
const mouse = document.querySelector('.crosshair');
const hover = "hover";
function moveMouse(e){
    const x = e.clientX;
    const y = e.clientY;
    mouse.style.top = (y - 24) + 'px';
    mouse.style.left = (x - 24) + 'px';
};
document.addEventListener("mousemove", moveMouse, {passive: true})

// Map Viewer
const model_dimensions = document.querySelector('model-viewer').getDimensions();

console.log(model_dimensions);