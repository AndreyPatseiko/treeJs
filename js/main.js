var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;
var container, stats;
var camera, scene, renderer;
var cube, monkeyHead;

init();
animate();

function init() {

  // SCENE
  scene = new THREE.Scene();
  var my_canvas = document.getElementById("canvas");
  var style = window.getComputedStyle(my_canvas);

  // CAMERA
  camera = new THREE.PerspectiveCamera(75, SCREEN_WIDTH / SCREEN_HEIGHT, 0.1, 1000);
  camera.position.z = 8;
  camera.position.y = 3;
  camera.position.x = 3;
  scene.add(camera);

  // CONTROLS
  controls = new THREE.OrbitControls(camera);
  controls.update();

  // LIGHTS
  var ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
  scene.add(ambientLight);
  var pointLight = new THREE.PointLight(0xffffff, 0.8);
  camera.add(pointLight);

  // RENDERER
  renderer = new THREE.WebGLRenderer({ canvas: my_canvas });
  renderer.setClearColor(0x000000);
  renderer.setSize(parseInt(style.width), parseInt(style.height));
  document.body.appendChild(renderer.domElement);

  // MODELS
  // cube
  var geometry = new THREE.BoxGeometry(1, 1, 1);
  var material = new THREE.MeshLambertMaterial({ color: 0x666666, emissive: 0xff0000 })
  cube = new THREE.Mesh(geometry, material);
  cube.position.x = 5;
  scene.add(cube);

  // monkey head
  var loader = new THREE.JSONLoader();
  loader.load('http://localhost:3000/models/test.js', function (geometry, materials) {
    material.morphTargets = true;
    var mesh = new THREE.Mesh(geometry, materials);
    scene.add(mesh);
  });


  // RESIZE WINDOW
  window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  controls.update();
  renderer.render(scene, camera);
};
