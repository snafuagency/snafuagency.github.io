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
document.addEventListener("mousemove", moveMouse) 


// // Three.js Functions
// import * as THREE from '../node_modules/three/build/three.module.js';
// import { OBJLoader } from '../node_modules/three/examples/jsm/loaders/OBJLoader.js';

// // Create scene
// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera( 75, 1 / 1, 0.1, 1000 );
// const renderer = new THREE.WebGLRenderer({ alpha: true } );
// renderer.setSize( 400, 400 );
// renderer.setClearColor( 0x000000, 0 );
// document.body.appendChild( renderer.domElement );


// // instantiate a loader
// const loader = new OBJLoader();

// // load a resource
// loader.load(
// 	// resource URL
// 	'../models/ian.vox.obj',
// 	// called when resource is loaded
// 	function ( object ) {

// 		scene.add( object );

// 	},
// 	// called when loading is in progresses
// 	function ( xhr ) {

// 		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

// 	},
// 	// called when loading has errors
// 	function ( error ) {

// 		console.log( 'An error happened' );

// 	}
// );


// // Load geometry
// const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// const material = new THREE.MeshBasicMaterial( { color: 0x7B1FA2 } );
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );






// camera.position.z = 2;

// // Render Scene
// function animate() {
// 	requestAnimationFrame( animate );
// 	cube.rotation.y += 0.01;
// 	renderer.render( scene, camera );
// }
// animate();