// Update copyright year after fallback
const copyright_year = document.querySelector('#copyright_year');
const copyright_options = { 
	year: 'numeric'
}
copyright_year.textContent = new Date().toLocaleDateString("en-CA", copyright_options);

// Toggle Mobile Nav Menu
const navToggle = document.querySelector(".nav-wrapper-toggle");
const navToggleIcon = document.querySelector(".nav-wrapper-toggle__icon");
const nav = document.querySelector(".nav-wrapper");

navToggle.addEventListener("click", function() {
	navToggleIcon.classList.toggle("open");
	nav.classList.toggle("nav-wrapper--hidden");
});

// Toggle Nav Dropdowns
(function() {
	// console.log('function loaded');
	const dropdownMenuToggles = document.querySelectorAll(".nav-link__item--dropdown");

	function closeOpenMenus() {
		// console.log('closeOpenMenus');
		const openMenus = document.querySelectorAll('.nav-link__dropdown');
		openMenus.forEach(function(menus) {
			menus.classList.remove('open');
		});  
	}	 

	dropdownMenuToggles.forEach(function(item) {

		item.addEventListener('click', function(event) {
			// console.log('dropdownMenuToggles');
			event.preventDefault();
			const dropContent = item.nextElementSibling;
			var shouldOpen = !dropContent.classList.contains('open');
			
			// First close all open items.
			closeOpenMenus();
			
			// Check if the clicked item should be opened. It is already closed at this point so no further action is required if it should be closed.
			if (shouldOpen) {
			  // Open the clicked item.
			 dropContent.classList.add('open');      
			}
			event.stopPropagation();
		});
	});

	//   close menus when clicking outside of them
	window.addEventListener('click', function(event) {
		if (event.target != dropdownMenuToggles) {
		  // Moved the code here to its own function.
		  closeOpenMenus();
		}
	});

})();

// Logo Interactivity
const logo = document.querySelector(".logo");
let logo_elements = [] // Create array
logo_elements = document.querySelectorAll('.logo__element'); // Fill array

let logo_element_hover = null;
document.addEventListener('mouseover', function (e) {
	logo_element_hover = e.target;
});

let interval = null;
logo.onmouseover = function(e) {
  clearInterval(interval);
  interval = setInterval(random_logo_element_loop, 125); 
}
logo.onmouseout = function(e) {
	clearInterval(interval);
	logo_elements.forEach(function (el) {
    el.classList.remove('selected');
	});
};

function random_logo_element_loop() {
	// console.log(logo_element_hover)
  const random_1 = Math.floor(Math.random() * logo_elements.length);
	const random_2 = Math.floor(Math.random() * logo_elements.length);
  const selected_element_1 = logo_elements[random_1]
	const selected_element_2 = logo_elements[random_2]
	if(logo_element_hover != selected_element_1){
		selected_element_1.classList.add('selected');
	};
	selected_element_2.classList.remove('selected');
}

/////////////////////////////////////////////////////////////////////////////////////
// WEB AUDIO API
/////////////////////////////////////////////////////////////////////////////////////

class Sound {
  
	constructor(context) {
		this.context = context;
	}
	
	setup() {
		this.oscillator = this.context.createOscillator();
		this.delayNode = this.context.createDelay();
		this.gainNode = this.context.createGain();
		this.analyser = this.context.createAnalyser();

		// Original Oscillator
		this.oscillator.connect(this.gainNode);
		this.gainNode.connect(this.analyser);
		this.analyser.connect(this.context.destination);

		// Delay Effect
		this.oscillator2 = this.context.createOscillator();
		this.gainNode2 = this.context.createGain();

		this.delayNode = this.context.createDelay();
		this.feedback = context.createGain();

		this.oscillator2.connect(this.delayNode);
		this.delayNode.connect(this.feedback);
		this.feedback.connect(this.delayNode);
		this.delayNode.connect(this.gainNode2);
		this.gainNode2.connect(this.analyser);
		this.analyser.connect(this.context.destination);
		
		// Parameters

		this.oscillator.type = 'sine';
		// this.oscillator.type = 'square';
		// this.oscillator.type = 'triangle';
		// this.oscillator.type = 'sawtooth';

		this.delayNode.delayTime.value = 0.25; // seconds
		
		this.analyser.smoothingTimeConstant = 0.8;
		this.analyser.fftSize = 2048;

		const bufferLength = this.analyser.frequencyBinCount;
		const dataArray = new Uint8Array(bufferLength);


		// Draw Oscilloscope
		// const draw = () => {
		// 	requestAnimationFrame(draw);
		// 	this.analyser.getByteTimeDomainData(dataArray);
		// 	let pixelRatio, sizeOnScreen, sliceWidth;
		// 	const canvas = document.getElementById("oscilloscope"),
		// 	c = canvas.getContext("2d");
		// 	pixelRatio = window.devicePixelRatio;
		// 	sizeOnScreen = canvas.getBoundingClientRect();
		// 	canvas.width = sizeOnScreen.width * pixelRatio;
		// 	canvas.height = sizeOnScreen.height * pixelRatio;
		// 	canvas.style.width = canvas.width / pixelRatio + "px";
		// 	canvas.style.height = canvas.height / pixelRatio + "px";
		// 	c.strokeStyle = "greenyellow";
		// 	c.lineWidth = 2;
		// 	sliceWidth = (canvas.width * 1.0) / bufferLength;
		// 	for (let i = 1; i < bufferLength; i += 1) {
		// 			let x = i * sliceWidth;
		// 			let v = dataArray[i] / 128.0;
		// 			let y = (v * canvas.height) / 2;
		// 			c.lineTo(x, y);
		// 	} 
		// 	c.stroke();
		// };
		// draw();


	}

	play(value) {
		this.setup();

		// Original Oscillator
		this.oscillator.frequency.value = value;
		this.gainNode.gain.setValueAtTime(0, this.context.currentTime);
		this.gainNode.gain.linearRampToValueAtTime(0.075, this.context.currentTime + 0.01); // starting volume

		// Delay Effect
		this.oscillator2.frequency.value = value;
		this.gainNode2.gain.setValueAtTime(0, this.context.currentTime);
		this.gainNode2.gain.linearRampToValueAtTime(0.025, this.context.currentTime + 0.01); // starting volume
		this.feedback.gain.value = 1; // amount of signal 1 = 100%

		// Play Control
		this.oscillator.start(this.context.currentTime);
		this.oscillator2.start(this.context.currentTime);
		this.stop(this.context.currentTime);

	}
	
	stop() {
		this.gainNode.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + 4);
		this.oscillator.stop(this.context.currentTime + 4);

		this.gainNode2.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + 4);
		this.oscillator2.stop(this.context.currentTime + 4);
		this.feedback.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + 8);
		
	}
 
}

let context = new (window.AudioContext || window.webkitAudioContext)();

var notes = document.querySelectorAll('.note');

notes.forEach((note) => {

	note.onmouseover = (e) => { 
		playSound(note);
	}

	note.addEventListener('click', () => {
		playSound(note); 
	})
	
	note.addEventListener('tap', () => {
		playSound(note);
	})

})

function playSound(note) {
	let sound = new Sound(context);
	let value = note.dataset.frequency;
	sound.play(value);
	sound.stop(); 
}

/////////////////////////////////////////////////////////////////////////////////////
// Background Effect
/////////////////////////////////////////////////////////////////////////////////////


// const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#&*§∑øπåß∂ƒ©∆æ?";

// const randomChar = () => chars[Math.floor(Math.random() * (chars.length - 1))],
//       randomString = length => Array.from(Array(length)).map(randomChar).join("");

// const asset = document.querySelector(".asset"),
// 			code = asset.querySelector(".code");

// const handleOnMove = e => {
//   const rect = asset.getBoundingClientRect(),
//         x = e.clientX - rect.left,
//         y = e.clientY - rect.top;

// 				code.style.setProperty("--x", `${x}px`);
// 				code.style.setProperty("--y", `${y}px`);

// 				code.innerText = randomString(3000);    
// }

// asset.onmousemove = e => handleOnMove(e);

// asset.ontouchmove = e => handleOnMove(e.touches[0]);


/////////////////////////////////////////////////////////////////////////////////////
// 3D - NOT IN PRODUCTION
/////////////////////////////////////////////////////////////////////////////////////

// 3D Elements

// const threeD = document.querySelector("REPLACE_WITH_ELEMENT");

// document.addEventListener("mousemove", (e) => {
//   rotateElement(e, threeD);
// });

// function rotateElement(event, element) {
//   // get mouse position
//   const x = event.clientX;
//   const y = event.clientY;
//   // console.log(x, y)

//   // find the middle
//   const middleX = window.innerWidth / 2;
//   const middleY = window.innerHeight / 2;
//   // console.log(middleX, middleY)

//   // get offset from middle as a percentage
//   // and tone it down a little
//   const offsetX = ((x - middleX) / middleX) * 64;
//   const offsetY = ((y - middleY) / middleY) * 64;
//   // console.log(offsetX, offsetY);

//   // set rotation
//   element.style.setProperty("--rotateX", offsetX + "deg");
//   element.style.setProperty("--rotateY", -1 * offsetY + "deg");
// }



//THREE.JS

//// import all functions
// import * as THREE from 'three';

// import { AsciiEffect } from 'three/addons/effects/AsciiEffect.js';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

//// setup scene
// const scene = new THREE.Scene();

// let effect;

//// get dimensions of wrapper
// const canvas_wrapper = document.querySelector('.threejs-wrapper');
// const viewport = {
//   width: canvas_wrapper.offsetWidth,
//   height: canvas_wrapper.offsetHeight
// }

//// choose canvas element to render to
// const canvas = document.querySelector('.threejs-wrapper__canvas');

//// set up camera
// const camera = new THREE.PerspectiveCamera( 35, viewport.width / viewport.height, 0.1, 1000 );

//// set up renderer
// const renderer = new THREE.WebGLRenderer( { canvas, alpha: true } );
// renderer.setPixelRatio(2);
// renderer.setSize( viewport.width , viewport.height );

//// Lights
// const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x8d8d8d, 3 );
// hemiLight.position.set( 0, 20, 0 );
// scene.add( hemiLight );

// const dirLight = new THREE.DirectionalLight( 0xffffff, 3 );
// dirLight.position.set( 3, 10, 10 );
// dirLight.castShadow = true;
// dirLight.shadow.camera.top = 2;
// dirLight.shadow.camera.bottom = - 2;
// dirLight.shadow.camera.left = - 2;
// dirLight.shadow.camera.right = 2;
// dirLight.shadow.camera.near = 0.1;
// dirLight.shadow.camera.far = 40;
// scene.add( dirLight );



//// GLTF Loader
// const loader = new GLTFLoader();

// loader.load( '../assets/matilda/scene.gltf', function ( gltf ) {
// 	const model = gltf.scene;
// 	scene.add( model );
	
// }, undefined, function ( error ) {
// 	console.error( error );
// } );

//// Effects
// effect = new AsciiEffect( renderer, ' .:-+*=%@#', { invert: true } );
// renderer.setSize( viewport.width , viewport.height );
// effect.domElement.style.color = 'white';
// document.body.appendChild( effect.domElement );

//// set up geometry
//const geometry = new THREE.BoxGeometry( 1, 1, 1 );

//// create wireframe of cube
//const wireframe = new THREE.WireframeGeometry( geometry );

//// draw lines
// const line = new THREE.LineSegments( wireframe );
// line.material.depthTest = false;
// line.material.opacity = 0.24;
// line.material.transparent = true;
// line.material.color.setHex(0x808080);

//// add cube to scene
// scene.add( line );

//// Camera X Y Z
// camera.position.z = 12;
// camera.position.y = 0;
// camera.position.x = 0;
// camera.position.set( -256, 256, 256);


//// Controls
// const controls = new OrbitControls( camera, renderer.domElement );
// controls.enablePan = true;
// controls.enableZoom = true;
// controls.target.set( 0, 100, 0 );
// controls.update();

//// Update viewport, camera and renderer sizes on window resize
// window.addEventListener('resize', () =>{
//     viewport.width = canvas_wrapper.offsetWidth;
//     viewport.height = canvas_wrapper.offsetHeight;
//     camera.updateProjectionMatrix();
//     camera.aspect = viewport.width / viewport.height;
//     renderer.setSize( viewport.width , viewport.height );
// })

//// Animate loop
// function animate() {
	// requestAnimationFrame( animate );

//// animate cube
  
// line.rotation.x += 0.0025;
// line.rotation.y += 0.0025;

// model.rotation.x += 0.0025;
// model.rotation.y += 0.0025;

// controls.update();

//// render scene
// renderer.render( scene, camera );
  
// }

// function render() {

//   effect.render( scene, camera );

// }

//animate();
