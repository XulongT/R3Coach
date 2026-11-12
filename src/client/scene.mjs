import * as THREE from 'three';

export function createScene() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#111923');
  scene.add(new THREE.HemisphereLight(0xffffff, 0x506070, 2));
  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 50);
  camera.position.set(2, 1.8, 2.5);
  const grid = new THREE.GridHelper(4, 16, 0x84a5b7, 0x344958);
  grid.position.z = -1.5;
  scene.add(grid);
  // Simple scene marker, not a reconstructed learner or an exercise demonstration.
  const marker = new THREE.Mesh(
    new THREE.BoxGeometry(0.3, 0.3, 0.3),
    new THREE.MeshStandardMaterial({ color: '#8ac9bd' }),
  );
  marker.position.set(0, 0.15, -1.5);
  scene.add(marker);
  return { scene, camera };
}
