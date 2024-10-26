import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";
import gsap from "gsap";

const gui = new dat.GUI();
const parameter = {
  color: 0xff0000,
  spin: () => {
    const startX = cube.position.x;
    const startZ = cube.position.z;

    const durated = 4;
    const spinTimeline = gsap.timeline({
      onComplete: () => {
        cube.position.x = startX;
        cube.position.z = startZ;
      },
    });

    spinTimeline.to(cube.position, {
      duration: durated,
      x: Math.cos(Math.PI * 2) * radius,
      z: Math.sin(Math.PI * 2) * radius,
      onUpdate: () => {
        const elapsed = spinTimeline.time();
        cube.position.x = Math.cos((elapsed / durated) * Math.PI * 2) * radius;
        cube.position.z = Math.sin((elapsed / durated) * Math.PI * 2) * radius;
      },
    });
  },
};


const cubeTextureLoader = new THREE.CubeTextureLoader();
const scene = new THREE.Scene();
const canvas = document.querySelector(".webgl");

const enviromentMap = cubeTextureLoader.load([
  "textures/360_Degree_Images/px.png/",
  "textures/360_Degree_Images/nx.png/",
  "textures/360_Degree_Images/py.png/",
  "textures/360_Degree_Images/ny.png/",
  "textures/360_Degree_Images/pz.png/",
  "textures/360_Degree_Images/nz.png/",
]);

scene.environment = enviromentMap;
scene.background = enviromentMap;

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const client = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", (e) => {
  client.x = e.clientX / sizes.width - 0.5;
  client.y = e.clientY / sizes.height - 0.5;
});

const cube = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 32),
  new THREE.MeshBasicMaterial({ color: parameter.color })
);

const orbitPath = new THREE.Mesh(
  new THREE.TorusGeometry(4, 0.05, 16, 100, Math.PI * 1.8),
  new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true })
);
orbitPath.rotation.x = Math.PI / 2;
scene.add(orbitPath);

const Ring = new THREE.Mesh(
  new THREE.RingGeometry(1.2, 1.6, 100),
  new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide })
);

Ring.rotation.x = Math.PI / 2;
scene.add(Ring);
cube.position.x = 4;
scene.add(cube);

gui.add(cube.position, "z").min(-2).max(2).step(0.2).name("size");
gui.add(cube, "visible");
gui.add(cube.material, "wireframe");
gui.addColor(parameter, "color").onChange(() => {
  cube.material.color.set(parameter.color);
});
gui.add(parameter, "spin");

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 10;
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

const clock = new THREE.Clock();

const radius = 4;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // cube.rotation.x = elapsedTime * (radius / 2);
  // cube.position.x = Math.cos(elapsedTime) * radius;
  // cube.position.z = Math.sin(elapsedTime) * radius;

  Ring.rotation.y = elapsedTime * (radius / 2);
  Ring.position.x = Math.cos(elapsedTime) * radius;
  Ring.position.z = Math.sin(elapsedTime) * radius;

  camera.position.x = Math.sin(client.x * Math.PI * 2) * 10;
  camera.position.z = Math.cos(client.x * Math.PI * 2) * 10;
  camera.position.y = client.y * 10;
  camera.lookAt(scene.position);

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
