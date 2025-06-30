import * as THREE from 'https://cdn.skypack.dev/three@0.152.2';
import { FontLoader } from 'https://cdn.skypack.dev/three@0.152.2/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'https://cdn.skypack.dev/three@0.152.2/examples/jsm/geometries/TextGeometry.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 8;

const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("bg"), alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Lights
const pointLight = new THREE.PointLight(0xffffff, 1.2);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambientLight);

// Load font and create 3D text
const loader = new FontLoader();
loader.load('font.json', function (font) {
  const textGeo = new TextGeometry('Aryan Sharma', {
    font: font,
    size: 1,
    height: 0.3
  });
  textGeo.center();

  const textMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const textMesh = new THREE.Mesh(textGeo, textMaterial);
  scene.add(textMesh);

  function animate() {
    requestAnimationFrame(animate);
    textMesh.rotation.y += 0.01;
    renderer.render(scene, camera);
  }

  animate();
});

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
