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


// Three.js Functions

// Create scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, 1 / 1, 0.1, 1000 );



const renderer = new THREE.WebGLRenderer();
renderer.setSize( 360, 360 );
document.body.appendChild( renderer.domElement );

// Load geometry
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x7B1FA2 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

const light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );

camera.position.z = 2;

// Render Scene
function animate() {
	requestAnimationFrame( animate );
	cube.rotation.y += 0.01;
	renderer.render( scene, camera );
}
animate();