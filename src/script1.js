// import * as THREE from "three";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// const solarSystem = new THREE.Object3D();

// // Scene Setup
// const scene = new THREE.Scene();
// const canvas = document.querySelector(".webgl");
// const sizes = {
//   width: window.innerWidth,
//   height: window.innerHeight,
// };

// // Camera
// const camera = new THREE.PerspectiveCamera(
//   75,
//   sizes.width / sizes.height,
//   0.1,
//   1000
// );
// camera.position.set(0, 5, 10); // Move camera further back
// scene.add(camera);

// // Renderer
// const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
// renderer.setSize(sizes.width, sizes.height);
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// // Load Texture

// const spaceshipLoader = new GLTFLoader().setPath('../textures/earthdunya/source/');
// let spaceship;
// spaceshipLoader.load('result.gltf', function(gltf) {
//   spaceship = gltf.scene;
//   if (spaceship) {
//     scene.add(spaceship);
//   }
// }, undefined, function(error) {
//   console.error('Error loading model:', error);
// });

// const ambientLight = new THREE.AmbientLight(0xffffff, 7);
// scene.add(ambientLight);

// const directionalLight = new THREE.DirectionalLight(0xffffff, 5); // Increase intensity
// directionalLight.position.set(5, 5, 5);
// scene.add(directionalLight);

// scene.add(solarSystem);

// // Animation Loop
// const animate = () => {
//   requestAnimationFrame(animate);
//   renderer.render(scene, camera);
// };
// animate();

// // Handle Window Resize
// window.addEventListener("resize", () => {
//   sizes.width = window.innerWidth;
//   sizes.height = window.innerHeight;
//   camera.aspect = sizes.width / sizes.height;
//   camera.updateProjectionMatrix();
//   renderer.setSize(sizes.width, sizes.height);
//   renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// });

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const solarSystem = new THREE.Object3D();
const scene = new THREE.Scene();
const canvas = document.querySelector(".webgl");

import px from "../Resources/360_Degree_Images/px.png";
import nx from "../Resources/360_Degree_Images/nx.png";
import py from "../Resources/360_Degree_Images/py.png";
import ny from "../Resources/360_Degree_Images/ny.png";
import pz from "../Resources/360_Degree_Images/pz.png";
import nz from "../Resources/360_Degree_Images/nz.png";

const cubeTextureLoader = new THREE.CubeTextureLoader();
const environmentMap = cubeTextureLoader.load([px, nx, py, ny, pz, nz]);
scene.environment = environmentMap;
scene.background = environmentMap;

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  1000
);
camera.position.set(3, 7, 20);
scene.add(camera);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const textureLoader = new THREE.TextureLoader();
const earthTexture = textureLoader.load(
  "textures/earthdunya/textures/Image_3.png"
);

const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sphereMaterial = new THREE.MeshStandardMaterial({ map: earthTexture });
const earthSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(earthSphere);

// const sunTexture = textureLoader.load(
//   "model/PS1_Low Poly Sun/Textures/Texture_Sun_512x256.jpg"
// );

// const sunSphereGeometry = new THREE.SphereGeometry(3, 32, 32);
// const sunSphereMaterial = new THREE.MeshStandardMaterial({ map: sunTexture });
// const sunSphere = new THREE.Mesh(sunSphereGeometry, sunSphereMaterial);
// scene.add(sunSphere);

const sunLoader = new GLTFLoader().setPath("../textures/Sun/");
let sun;
sunLoader.load(
  "scene.gltf",
  function (gltf) {
    sun = gltf.scene;
    if (sun) {
      sun.position.set(0, 0, 0);
      sun.scale.set(0.1, 0.1, 0.1);
      solarSystem.add(sun);
    }
  },
  undefined,
  function (error) {
    console.log(error);
  }
);
scene.add(solarSystem);

const marsTexture = textureLoader.load("textures/mars/textures/8k_mars.jpg");

const marsSphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const marsSphereMaterial = new THREE.MeshStandardMaterial({ map: marsTexture });
const marsSphere = new THREE.Mesh(marsSphereGeometry, marsSphereMaterial);
scene.add(marsSphere);

function OrbitPath(radius) {
  const orbitPath = new THREE.Mesh(
    new THREE.TorusGeometry(radius, 0.05, 16, 100, Math.PI * 2),
    new THREE.MeshBasicMaterial({ color: 0xffffff })
  );
  orbitPath.rotation.x = Math.PI / 2;
  scene.add(orbitPath);
}
OrbitPath(6);
OrbitPath(10);
OrbitPath(14);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 2, 1000);
pointLight.position.set(0, 0, 0);
scene.add(pointLight);

const pointLightHelper = new THREE.PointLightHelper(pointLight, 10);
// scene.add(pointLightHelper);

function createRectAreaLight(x, y, z) {
  const rectLight = new THREE.RectAreaLight(0xffcc66, 2, 4, 6); // Color, Intensity, Width, Height
  rectLight.position.set(x, y, z);
  rectLight.lookAt(0, 0, 0);
  scene.add(rectLight);
  const rectLightHelper = new RectAreaLightHelper(rectLight);
  // scene.add(rectLightHelper);
}

createRectAreaLight(4.5, 0, 0);
createRectAreaLight(-4.5, 0, 0);
createRectAreaLight(0, 4.5, 0);
createRectAreaLight(0, -4.5, 0);
createRectAreaLight(0, 0, 4.5);
createRectAreaLight(0, 0, -4.5);

// const clock = new THREE.Clock();
const radius = 14;

const animate = () => {
  // const elapsedTime = clock.getElapsedTime();
  const elapsedTime = new Date().getTime();

  earthSphere.rotation.y = elapsedTime * 0.0005;
  earthSphere.position.x = Math.cos(elapsedTime / 1000) * radius;
  earthSphere.position.z = Math.sin(elapsedTime / 1000) * radius;

  marsSphere.rotation.y = elapsedTime * 0.0005;
  marsSphere.position.x = Math.cos(elapsedTime / 1000) * 6;
  marsSphere.position.z = Math.sin(elapsedTime / 1000) * 6;

  if (sun) {
    sun.rotation.y = elapsedTime * -0.001;
  }
  camera.position.x = Math.sin(elapsedTime / 1000) * 6;
  camera.position.z = Math.cos(elapsedTime / 1000) * 20;

  camera.lookAt(scene.position);

  controls.update();
  renderer.render(scene, camera);

  requestAnimationFrame(animate);
};
animate();

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
