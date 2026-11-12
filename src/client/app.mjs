import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createScene } from './scene.mjs';
import { setupXR } from './xr/session.mjs';

const canvas = document.querySelector('#scene');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.xr.enabled = true;
renderer.xr.setReferenceSpaceType('local-floor');
const { scene, camera } = createScene();
const controls = new OrbitControls(camera, canvas);
controls.target.set(0, 0.7, -1.5);
controls.update();
const resize = () => {
  if (renderer.xr.isPresenting) return;
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();
};
window.addEventListener('resize', resize);
resize();
const background = scene.background;
renderer.xr.addEventListener('sessionstart', () => {
  controls.enabled = false;
  scene.background = null;
});
renderer.xr.addEventListener('sessionend', () => {
  controls.enabled = true;
  scene.background = background;
  resize();
});
setupXR(renderer, document.querySelector('#enter-xr'), document.querySelector('#status'));
renderer.setAnimationLoop(() => renderer.render(scene, camera));
