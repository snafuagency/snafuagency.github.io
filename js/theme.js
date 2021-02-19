
// credit start https://github.com/ephraimilunga/fylo_challenge/blob/master/js/main.js
const mouse = document.querySelector('.crosshair');
const hover = "hover";
function moveMouse(e){
    const x = e.clientX;
    const y = e.clientY;
    mouse.style.top = 0; // added by Ian Quinn
    mouse.style.left = 0; // added by Ian Quinn
    mouse.style.transform = `translate(${x - 37}px, ${y - 39}px)`; // values modified by Ian Quinn
};
document.addEventListener("mousemove", moveMouse) 
// credit end
