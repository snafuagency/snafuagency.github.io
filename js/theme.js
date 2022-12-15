// © 2021, Ian Quinn

// inspired by https://github.com/ephraimilunga/fylo_challenge/blob/master/js/main.js
const mouse = document.querySelector('.crosshair');
const mouse_x_coord = document.querySelector('.mouse-coordinates__x');
const mouse_y_coord = document.querySelector('.mouse-coordinates__y');
const hover = "hover";
function moveMouse(e){
    const x = e.clientX;
    const y = e.clientY;
    mouse.style.top = (y - 36) + 'px';
    mouse.style.left = (x - 36) + 'px';
	mouse_x_coord.textContent = x;
	mouse_y_coord.textContent = y;
};
document.addEventListener("mousemove", moveMouse, {passive: true})