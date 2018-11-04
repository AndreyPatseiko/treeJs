var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

var my_canvas = document.getElementById("canvas");
var style = window.getComputedStyle(my_canvas);
var renderer = new THREE.WebGLRenderer({ canvas: my_canvas });
console.log(style.height)
console.log(style.width)
renderer.setSize(parseInt(style.width), parseInt(style.height));
renderer.setClearColor(0x000000);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial({ color: 0xff00ff, side: THREE.DoubleSide });
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;




// LIGHT
// ambient
var ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

// MODEL
var loader = new THREE.JSONLoader();
loader.load('http://localhost:3000/models/test_3p.js', function (geometry, materials) {
  material.morphTargets = true;
  var mesh = new THREE.Mesh(geometry, materials);
  // scene.add(mesh);

});

controls = new THREE.TrackballControls(camera);
controls.rotateSpeed = 1.0;
controls.zoomSpeed = 1.2;
controls.panSpeed = 0.8;
controls.noZoom = false;
controls.noPan = false;
controls.staticMoving = true;
controls.dynamicDampingFactor = 0.3;

// RENDER LOOP
var animate = function () {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
};

animate();
