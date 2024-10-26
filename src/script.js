import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import {GUI} from 'dat.gui'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { gsap } from "gsap/gsap-core";
const gui = new GUI();
const ringsFolder = gui.addFolder('Add Rings');
ringsFolder.open();

const axesHelper = new THREE.AxesHelper(100);
const scene = new THREE.Scene();
const canvas = document.querySelector("canvas.webgl");
const solarSystem = new THREE.Object3D();

const mercuryGeometryRing = new THREE.RingGeometry(40 * Math.sqrt(2), 40.4 * Math.sqrt(2), 200, 200, 0, 2 * Math.PI);
const materialMercuryRing = new THREE.MeshBasicMaterial( { color: 0xffffff, side: THREE.DoubleSide } );
const mercuryRing = new THREE.Mesh(mercuryGeometryRing, materialMercuryRing);
mercuryRing.rotation.set(- Math.PI / 2, 0, 0);

const venusGeometryRing = new THREE.RingGeometry(60 * Math.sqrt(2), 60.4 * Math.sqrt(2), 200, 200, 0, 2 * Math.PI);
const materialVenusRing = new THREE.MeshBasicMaterial( { color: 0xffffff, side: THREE.DoubleSide } );
const venusRing = new THREE.Mesh(venusGeometryRing, materialVenusRing);
venusRing.rotation.set(- Math.PI / 2, 0, 0);

const earthGeometryRing = new THREE.RingGeometry(80 * Math.sqrt(2), 80.4 * Math.sqrt(2), 200, 200, 0, 2 * Math.PI);
const materialEarthRing = new THREE.MeshBasicMaterial( { color: 0xffffff, side: THREE.DoubleSide } );
const earthRing = new THREE.Mesh(earthGeometryRing, materialEarthRing);
earthRing.rotation.set(- Math.PI / 2, 0, 0);

const marsGeometryRing = new THREE.RingGeometry(100 * Math.sqrt(2), 100.4 * Math.sqrt(2), 200, 200, 0, 2 * Math.PI);
const materialMarsRing = new THREE.MeshBasicMaterial( { color: 0xffffff, side: THREE.DoubleSide } );
const marsRing = new THREE.Mesh(marsGeometryRing, materialMarsRing);
marsRing.rotation.set(- Math.PI / 2, 0, 0);

const jupiterGeometryRing = new THREE.RingGeometry(150 * Math.sqrt(2), 150.4 * Math.sqrt(2), 200, 200, 0, 2 * Math.PI);
const materialJupiterRing = new THREE.MeshBasicMaterial( { color: 0xffffff, side: THREE.DoubleSide } );
const jupiterRing = new THREE.Mesh(jupiterGeometryRing, materialJupiterRing);
jupiterRing.rotation.set(- Math.PI / 2, 0, 0);

const saturnGeometryRing = new THREE.RingGeometry(200 * Math.sqrt(2), 200.4 * Math.sqrt(2), 200, 200, 0, 2 * Math.PI);
const materialSaturnRing = new THREE.MeshBasicMaterial( { color: 0xffffff, side: THREE.DoubleSide } );
const saturnRing = new THREE.Mesh(saturnGeometryRing, materialSaturnRing);
saturnRing.rotation.set(- Math.PI / 2, 0, 0);

const uranusGeometryRing = new THREE.RingGeometry(250 * Math.sqrt(2), 250.4 * Math.sqrt(2), 200, 200, 0, 2 * Math.PI);
const materialUranusRing = new THREE.MeshBasicMaterial( { color: 0xffffff, side: THREE.DoubleSide } );
const uranusRing = new THREE.Mesh(uranusGeometryRing, materialUranusRing);
uranusRing.rotation.set(- Math.PI / 2, 0, 0);

const neptuneGeometryRing = new THREE.RingGeometry(300 * Math.sqrt(2), 300.4 * Math.sqrt(2), 200, 200, 0, 2 * Math.PI);
const materialNeptuneRing = new THREE.MeshBasicMaterial( { color: 0xffffff, side: THREE.DoubleSide } );
const neptuneRing = new THREE.Mesh(neptuneGeometryRing, materialNeptuneRing);
neptuneRing.rotation.set(- Math.PI / 2, 0, 0);

const addRings = ringsFolder.add(mercuryRing, 'visible').name('Mercury');
ringsFolder.add(venusRing, 'visible').name('Venus');
ringsFolder.add(earthRing, 'visible').name('Earth');
ringsFolder.add(marsRing, 'visible').name('Mars');
ringsFolder.add(jupiterRing, 'visible').name('Jupiter');
ringsFolder.add(saturnRing, 'visible').name('Saturn');
ringsFolder.add(uranusRing, 'visible').name('Uranus');
ringsFolder.add(neptuneRing, 'visible').name('Neptune');

solarSystem.add(mercuryRing);
solarSystem.add(venusRing);
solarSystem.add(earthRing);
solarSystem.add(marsRing);
solarSystem.add(jupiterRing);
solarSystem.add(saturnRing);
solarSystem.add(uranusRing);
solarSystem.add(neptuneRing);

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

import px from '../Resources/360_Degree_Images/px.png'
import nx from '../Resources/360_Degree_Images/nx.png'
import py from '../Resources/360_Degree_Images/py.png'
import ny from '../Resources/360_Degree_Images/ny.png'
import pz from '../Resources/360_Degree_Images/pz.png'
import nz from '../Resources/360_Degree_Images/nz.png'
const cubeTextureLoader = new THREE.CubeTextureLoader();
const environmentMap = cubeTextureLoader.load(
  [
    px,
    nx,
    py,
    ny,
    pz,
    nz,
  ]
);

scene.background = environmentMap;
scene.environment = environmentMap;

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  10000
);
camera.position.y = 100;

const spaceshipLoader = new GLTFLoader().setPath('../3D_Models/SpaceShip/');
let spaceship;
spaceshipLoader.load('scene.gltf', function(gltf){
  spaceship = gltf.scene;
  if(spaceship){
    spaceship.position.set(0, 30, 0)
    scene.add(spaceship);
  }
}, undefined, function(error){
  console.log(error);
})

const sunLoader = new GLTFLoader().setPath('../3D_Models/Sun/');
let sun;
sunLoader.load('scene.gltf', function(gltf){
  sun = gltf.scene;
  if(sun){
    solarSystem.add(sun);
  }
}, undefined, function(error){
  console.log(error);
})

const earthLoader = new GLTFLoader().setPath('../3D_Models/Earth/');
let earth;
earthLoader.load('scene.gltf', function(gltf){
  earth = gltf.scene;
  if(earth){
    earth.scale.set(20, 20, 20);
    solarSystem.add(earth);
  }
}, undefined, function(error){
  console.log(error);
})

const mercuryLoader = new GLTFLoader().setPath('../3D_Models/Mercury/');
let mercury;
mercuryLoader.load('scene.gltf', function(gltf){
  mercury = gltf.scene;
  if(mercury){
    mercury.scale.set(0.02, 0.02, 0.02);
    solarSystem.add(mercury);
  }
}, undefined, function(error){
  console.log(error);
})

const venusLoader = new GLTFLoader().setPath('../3D_Models/Venus/');
let venus;
venusLoader.load('scene.gltf', function(gltf){
  venus = gltf.scene;
  if(venus){
    venus.scale.set(3, 3, 3);
    solarSystem.add(venus);
  }
}, undefined, function(error){
  console.log(error);
})

const marsLoader = new GLTFLoader().setPath('../3D_Models/Mars/');
let mars;
marsLoader.load('scene.gltf', function(gltf){
  mars = gltf.scene;
  if(mars){
    mars.scale.set(0.5, 0.5, 0.5);
    solarSystem.add(mars);
  }
}, undefined, function(error){
  console.log(error);
})

const jupiterLoader = new GLTFLoader().setPath('../3D_Models/Jupiter/');
let Jupiter;
jupiterLoader.load('scene.gltf', function(gltf){
  Jupiter = gltf.scene;
  if(Jupiter){
    Jupiter.scale.set(7, 7, 7);
    solarSystem.add(Jupiter);
  }
}, undefined, function(error){
  console.log(error);
})

const saturnLoader = new GLTFLoader().setPath('../3D_Models/Saturn/');
let saturn;
saturnLoader.load('scene.gltf', function(gltf){
  saturn = gltf.scene;
  if(saturn){
    saturn.scale.set(30, 30, 30);
    solarSystem.add(saturn);
  }
}, undefined, function(error){
  console.log(error);
})

const uranusLoader = new GLTFLoader().setPath('../3D_Models/Uranus/');
let uranus;
uranusLoader.load('scene.gltf', function(gltf){
  uranus = gltf.scene;
  if(uranus){
    uranus.scale.set(0.01, 0.01, 0.01);
    solarSystem.add(uranus);
  }
}, undefined, function(error){
  console.log(error);
})

const neptuneLoader = new GLTFLoader().setPath('../3D_Models/Neptune/');
let neptune;
neptuneLoader.load('scene.gltf', function(gltf){
  neptune = gltf.scene;
  if(neptune){
    neptune.scale.set(0.1, 0.1, 0.1);
    solarSystem.add(neptune);
  }
}, undefined, function(error){
  console.log(error);
})
scene.add(solarSystem);

// The start of light
const lightPoint = new THREE.PointLight(0xffffff, 0.7, 800);
lightPoint.position.set(30, 0, 30);
scene.add(lightPoint);
const lightPoint1 = new THREE.PointLight(0xffffff, 0.7, 800);
lightPoint1.position.set(-30, 0, -30);
scene.add(lightPoint1);
const lightPoint2 = new THREE.PointLight(0xffffff, 0.7, 800);
lightPoint2.position.set(30, 0, -30);
scene.add(lightPoint2);
const lightPoint3 = new THREE.PointLight(0xffffff, 0.7, 800);
lightPoint3.position.set(-30, 0, 30);
scene.add(lightPoint3);
// The end of light


const controls = new OrbitControls(camera, canvas);

const renderer = new THREE.WebGLRenderer({
  canvas,
});

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

const clock = new THREE.Clock();

if(spaceship){
  camera.lookAt(spaceship);
}
const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();

document.addEventListener('keydown', onDocumentKeyDown, false);
// if(sun){
//   sun.addEventListener('mouseover', onHovering, false)
//   sun.addEventListener('mouseout', onMouseOut, false)
// }
function onHovering(event){
  sun.scale.set(2, 2, 2)
}
function onMouseOut(event){
  sun.scale.set(1, 1, 1)
}
function onDocumentKeyDown(event) {
  switch (event.key) {
      case 'ArrowDown':
        zPlus();
        break;
      case 'ArrowUp':
        zMinus();
        break;
      case 'ArrowLeft':
        xMinus()  
        break;
      case 'ArrowRight':
        xPlus();
        break;
  }
}

const animate = () => {
  renderer.render(scene, camera);
  let x = 0;
  const elapsedTime = new Date().getTime();
  if(sun && earth && mars && mercury && venus && Jupiter && saturn && uranus && neptune){
    solarSystem.rotation.set(0, elapsedTime / 7000, 0);
    mercury.rotation.set(0, elapsedTime / 1000, 0);
    mercury.position.set(Math.sqrt(2) * 40 * Math.cos(-elapsedTime / 1200.0), 0, Math.sqrt(2) * 40 * Math.sin(-elapsedTime / 1200.0));
    venus.rotation.set(0, elapsedTime / 1000, 0);
    venus.position.set(Math.sqrt(2) * 60 * Math.cos(-elapsedTime / 1270.0), -2, Math.sqrt(2) * 60 * Math.sin(-elapsedTime / 1270.0));
    earth.rotation.set(elapsedTime / 1000, elapsedTime / 1000, elapsedTime / 1000);
    earth.position.set(Math.sqrt(2) * 80 * Math.cos(-elapsedTime / 1320.0), 0, Math.sqrt(2) * 80 * Math.sin(-elapsedTime / 1320.0));
    mars.rotation.set(0, elapsedTime / 1000, 0);
    mars.position.set(Math.sqrt(2) * 100 * Math.cos(-elapsedTime / 1400), 0, Math.sqrt(2) * 100 * Math.sin(-elapsedTime / 1400.0));
    Jupiter.rotation.set(0, elapsedTime / 1000, 0);
    Jupiter.position.set(Math.sqrt(2) * 150 * Math.cos(-elapsedTime / 1700), 0, Math.sqrt(2) * 150 * Math.sin(-elapsedTime / 1700.0));
    saturn.rotation.set(0, elapsedTime / 1000, 0);
    saturn.position.set(Math.sqrt(2) * 200 * Math.cos(-elapsedTime / 2000), 0, Math.sqrt(2) * 200 * Math.sin(-elapsedTime / 2000.0));
    uranus.rotation.set(0, elapsedTime / 1000, 0);
    uranus.position.set(Math.sqrt(2) * 250 * Math.cos(-elapsedTime / 2400), 0, Math.sqrt(2) * 250 * Math.sin(-elapsedTime / 2400.0));
    neptune.rotation.set(0, elapsedTime / 1000, 0);
    neptune.position.set(Math.sqrt(2) * 300 * Math.cos(-elapsedTime / 2800), 0, Math.sqrt(2) * 300 * Math.sin(-elapsedTime / 2800.0));
    
    // camera.position.set(spaceship.position.x, spaceship.position.y + 3, spaceship.position.z + 12);
    // spaceship.rotation.set(0, 0, 0);
    // camera.lookAt(spaceship.position);
    // Camera option one
    
     camera.position.x = (earth.position.x + 40);
     camera.position.y = (earth.position.y + 40);
     camera.position.z = (earth.position.z + 40);
     camera.lookAt(solarSystem.position);
  }
  window.requestAnimationFrame(animate);
}
let xPlus = () => {gsap.to(spaceship.position, {
  x: spaceship.position.x + 6,
  // y: 10,
  // z: 10,
  duration: 0.5, // Duration in seconds
  ease: "power1.inOut" // Easing function
})}
let xMinus = () => {gsap.to(spaceship.position, {
  x: spaceship.position.x - 6,
  // y: 10,
  // z: 10,
  duration: 0.5, // Duration in seconds
  ease: "power1.inOut" // Easing function
})}
let zPlus = () => {gsap.to(spaceship.position, {
  z: spaceship.position.z + 6,
  // y: 10,
  // z: 10,
  duration: 0.5, // Duration in seconds
  ease: "power1.inOut" // Easing function
})}
let zMinus = () => {gsap.to(spaceship.position, {
  z: spaceship.position.z - 6,
  // y: 10,
  // z: 10,
  duration: 0.5, // Duration in seconds
  ease: "power1.inOut" // Easing function
})}
animate();