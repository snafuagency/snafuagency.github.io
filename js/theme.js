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


const clock_num = document.querySelector('.clock__num');
const options = { 
	weekday: 'narrow', 
	year: '2-digit', 
	month: 'narrow', 
	day: 'numeric',
	hour12: false,
	hour: 'numeric',
	minute: '2-digit',
	second: '2-digit',
	fractionalSecondDigits: 2,	
	timeZoneName: "short"
}
setInterval(() => clock_num.textContent = new Date().toLocaleDateString("en-CA", options), 100);

// Tilt Effect - https://codepen.io/Coding_Journey/pen/RwGzqgJ

// const tiltEffectSettings = {
// 	max: 8, // max tilt rotation (degrees (deg))
// 	perspective: 4000, // transform perspective, the lower the more extreme the tilt gets (pixels (px))
// 	scale: 1.025, // transform scale - 2 = 200%, 1.5 = 150%, etc..
// 	speed: 1, // speed (transition-duration) of the enter/exit transition (milliseconds (ms))
// 	easing: "cubic-bezier(.03,.98,.52,.99)" // easing (transition-timing-function) of the enter/exit transition
//   };
  
//   const cards = document.querySelectorAll(".tilt");
  
//   cards.forEach(card => {
// 	card.addEventListener("mouseenter", cardMouseEnter);
// 	card.addEventListener("mousemove", cardMouseMove);
// 	card.addEventListener("mouseleave", cardMouseLeave);
//   });
  
//   function cardMouseEnter(event) {
// 	setTransition(event);
//   }
  
//   function cardMouseMove(event) {
// 	const card = event.currentTarget;
// 	const cardWidth = card.offsetWidth;
// 	const cardHeight = card.offsetHeight;
// 	const centerX = card.offsetLeft + cardWidth/2;
// 	const centerY = card.offsetTop + cardHeight/2;
// 	const mouseX = event.clientX - centerX;
// 	const mouseY = event.clientY - centerY;
// 	const rotateXUncapped = (-1)*tiltEffectSettings.max*mouseY/(cardHeight/2);
// 	const rotateYUncapped = (+1)*tiltEffectSettings.max*mouseX/(cardWidth/2);
// 	const rotateX = rotateXUncapped < -tiltEffectSettings.max ? -tiltEffectSettings.max : 
// 					(rotateXUncapped > tiltEffectSettings.max ? tiltEffectSettings.max : rotateXUncapped);
// 	const rotateY = rotateYUncapped < -tiltEffectSettings.max ? -tiltEffectSettings.max : 
// 					(rotateYUncapped > tiltEffectSettings.max ? tiltEffectSettings.max : rotateYUncapped);
  
// 	card.style.transform = `perspective(${tiltEffectSettings.perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) 
// 							scale3d(${tiltEffectSettings.scale}, ${tiltEffectSettings.scale}, ${tiltEffectSettings.scale})`;
//   }
  
//   function cardMouseLeave(event) {
// 	event.currentTarget.style.transform = `perspective(${tiltEffectSettings.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
// 	setTransition(event);
//   }
  
//   function setTransition(event) {
// 	const card = event.currentTarget;
// 	clearTimeout(card.transitionTimeoutId);
// 	card.style.transition = `transform ${tiltEffectSettings.speed}ms ${tiltEffectSettings.easing}`;
// 	card.transitionTimeoutId = setTimeout(() => {
// 	  card.style.transition = "";
// 	}, tiltEffectSettings.speed);
//   }