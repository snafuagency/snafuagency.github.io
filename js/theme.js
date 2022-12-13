// © 2021, Ian Quinn

// inspired by https://github.com/ephraimilunga/fylo_challenge/blob/master/js/main.js
const mouse = document.querySelector('.crosshair');
const mouse_x_coord = document.querySelector('.mouse-coordinates__x');
const mouse_y_coord = document.querySelector('.mouse-coordinates__y');
const hover = "hover";
function moveMouse(e){
    const x = e.clientX;
    const y = e.clientY;
    mouse.style.top = (y - 24) + 'px';
    mouse.style.left = (x - 24) + 'px';
	mouse_x_coord.textContent = x;
	mouse_y_coord.textContent = y;
};
document.addEventListener("mousemove", moveMouse, {passive: true})


const clock_num = document.querySelector('.clock__num');
const options = { 
	weekday: 'short', 
	year: 'numeric', 
	month: 'numeric', 
	day: 'numeric',
	hour: '2-digit',
	minute: '2-digit',
	second: '2-digit',	
	
};
options.timeZone = "PST";
options.timeZoneName = "short";
const today  = new Date();
setInterval(() => clock_num.textContent = today.toLocaleDateString("en-CA", options),1000);