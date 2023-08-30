// © 2023, Ian Quinn


// Toggle Mobile Nav Menu
const navToggle = document.querySelector(".nav-wrapper-toggle");
const navToggleIcon = document.querySelector(".nav-wrapper-toggle__icon");
const nav = document.querySelector(".nav-wrapper");

navToggle.addEventListener("click", function() {
	navToggleIcon.classList.toggle("open");
	nav.classList.toggle("nav-wrapper--hidden");
});

// Update copyright year after fallback
const copyright_year = document.querySelector('#copyright_year');
const copyright_options = { 
	year: 'numeric'
}
copyright_year.textContent = new Date().toLocaleDateString("en-CA", copyright_options);


// Reveal on scroll inspired by Beyond Fireship https://www.youtube.com/watch?v=T33NN_pPeNI

const observer = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting){
			entry.target.classList.add('reveal');
		} //else {
			//entry.target.classList.remove('reveal'); 
		//}
	});
});
const revealOnScroll = document.querySelectorAll('.ros');
revealOnScroll.forEach((el) => observer.observe(el));  


// Hacked text effect inspired by Hyperplexed https://codepen.io/Hyperplexed/pen/rNrJgrd
const hacked_word = document.querySelector('span.hacked');
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890*';
const words = [
        'create.',
        'design.',
        'code.',
        'drum.',
        'arrange.',
        'compose.',
        'mix.',
        'master.',
        'game.',
        'dream.',
        'listen.',
        'source.',
        'write.',
        'draw.',
        'build.',
        'read.',
        'eat.',
        'run.',
        'rebuild.',
        'wake.',
        'rest.',
        'walk.',
        'observe.'
      ]
let interval = null;

function hacked_text_loop() {
  const random = Math.floor(Math.random() * words.length);
  const new_word = words[random]
  hacked_word.setAttribute("data-value", new_word); 
  hacked_word.innerText = new_word;
  
  let iteration = -4; // changed from 0 to allow for effect om first letter to be more prominet
  
  clearInterval(interval);
  
  interval = setInterval(() => {
    hacked_word.classList.add('hacking');
    hacked_word.innerText = hacked_word.innerText
      .split('')
      .map((character, index) => {
        if(index < iteration) {
          return hacked_word.dataset.value[index];
        }
        return characters[Math.floor(Math.random() * 37)]
      })
      .join("");
    
    if(iteration >= hacked_word.dataset.value.length){ 
      hacked_word.classList.remove('hacking');
      clearInterval(interval);
    }
    
    iteration += 1 / 4;
    
  }, 24);
}
setInterval(hacked_text_loop, 4000);

// Mouse Cusor inspired by https://github.com/ephraimilunga/fylo_challenge/blob/master/js/main.js
const mouse = document.querySelector('.crosshair--mouse');
const mouse_x_coord = document.querySelector('.mouse-coordinates__x');
const mouse_y_coord = document.querySelector('.mouse-coordinates__y');
const hover = "hover";
function moveMouse(e){
    const x = e.clientX;
    const y = e.clientY;
    //mouse.style.top = (y - 36) + 'px';
    //mouse.style.left = (x - 35) + 'px';
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


//THREE.JS

// import all functions
import * as THREE from 'three';

// setup scene
const scene = new THREE.Scene();


// get dimensions of wrapper
const canvas_wrapper = document.querySelector('.threejs-wrapper');
const viewport = {
  width: canvas_wrapper.offsetWidth,
  height: canvas_wrapper.offsetHeight
}

// choose canvas element to render to
const canvas = document.querySelector('.threejs-wrapper__canvas');

// set up camera
const camera = new THREE.PerspectiveCamera( 35, viewport.width / viewport.height, 0.1, 1000 );

// set up renderer
const renderer = new THREE.WebGLRenderer( { canvas, alpha: true } );
renderer.setPixelRatio(1);
renderer.setSize( viewport.width , viewport.height );

// set up geometry
const geometry = new THREE.BoxGeometry( 1, 1, 1 );

// create wireframe of cube
const wireframe = new THREE.WireframeGeometry( geometry );

// draw lines
const line = new THREE.LineSegments( wireframe );
line.material.depthTest = false;
line.material.opacity = 0.24;
line.material.transparent = true;
line.material.color.setHex(0x808080);

// add cube to scene
scene.add( line );

camera.position.z = 1;

// Update viewport, camera and renderer sizes on window resize
window.addEventListener('resize', () =>{
    viewport.width = canvas_wrapper.offsetWidth;
    viewport.height = canvas_wrapper.offsetHeight;
    camera.updateProjectionMatrix();
    camera.aspect = viewport.width / viewport.height;
    renderer.setSize( viewport.width , viewport.height );
})

//Animate loop
function animate() {
	requestAnimationFrame( animate );

  // animate cube
  
  line.rotation.x += 0.00025;
  line.rotation.y += 0.00025;

	
  // render scene
  renderer.render( scene, camera );
}
animate();

