// © 2023, Ian Quinn

// Toggle Mobile Nav Menu
const navToggle = document.querySelector(".nav-wrapper-toggle");
const nav = document.querySelector(".nav-wrapper");

navToggle.addEventListener("click", function() {
	if (this.innerHTML === "Menu") {
		this.innerHTML = "Exit";
	  } else {
		this.innerHTML = "Menu";
	  }
	nav.classList.toggle("nav-wrapper--hidden");
});

// Update copyright year after fallback
const copyright_year = document.querySelector('#copyright_year');
const copyright_options = { 
	year: 'numeric'
}
copyright_year.textContent = new Date().toLocaleDateString("en-CA", copyright_options);

// Mouse Cusor inspired by https://github.com/ephraimilunga/fylo_challenge/blob/master/js/main.js
// const mouse = document.querySelector('.crosshair--mouse');
const mouse_x_coord = document.querySelector('.mouse-coordinates__x');
const mouse_y_coord = document.querySelector('.mouse-coordinates__y');
const hover = "hover";
function moveMouse(e){
    const x = e.clientX;
    const y = e.clientY;
    // mouse.style.top = (y - 36) + 'px';
    // mouse.style.left = (x - 35) + 'px';
	mouse_x_coord.textContent = x;
	mouse_y_coord.textContent = y;
};
document.addEventListener("mousemove", moveMouse, {passive: true})

// Clock
const clock_num = document.querySelector('.clock__num');
const clock_options = { 
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
setInterval(() => clock_num.textContent = new Date().toLocaleDateString("en-CA", clock_options), 10);