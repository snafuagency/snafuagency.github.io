// © 2021, Ian Quinn

// Mouse Cusor inspired by https://github.com/ephraimilunga/fylo_challenge/blob/master/js/main.js
const mouse = document.querySelector('.crosshair');
const mouse_x_coord = document.querySelector('.mouse-coordinates__x');
const mouse_y_coord = document.querySelector('.mouse-coordinates__y');
const hover = "hover";
function moveMouse(e){
    const x = e.clientX;
    const y = e.clientY;
    mouse.style.top = (y - 28) + 'px';
    mouse.style.left = (x - 26) + 'px';
	mouse_x_coord.textContent = x;
	mouse_y_coord.textContent = y;
};
document.addEventListener("mousemove", moveMouse, {passive: true})



// Clock
const clock_num = document.querySelector('.clock__num');
const options = { 
	weekday: 'narrow', 
	month: 'narrow', 
	day: '2-digit',
	year: '2-digit',
	hour12: false,
	hour: '2-digit',
	minute: '2-digit',
	second: '2-digit',
	fractionalSecondDigits: 2,	
	timeZoneName: "shortOffset"
}
setInterval(() => clock_num.textContent = new Date().toLocaleDateString("en-CA", options), 10);