import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { buildStudio } from '../utils/buildStudio.ts';

// These checks catch broken screen orientation/occlusion and runaway geometry
// without needing a GPU or duplicating the Vue presentation implementation.
const texture = new THREE.Texture();
const { room, screens } = buildStudio({ pascal: texture, theta: texture, sign: texture, sky: texture });
room.updateMatrixWorld(true);

test('both projects can be selected from the opening camera angle', () => {
  const camera = new THREE.OrthographicCamera(-4, 4, 4, -4, .1, 50);
  camera.position.set(7.4, 6.2, 9.5);
  camera.lookAt(0, 1.5, 0);
  camera.updateMatrixWorld(true);
  const direction = camera.getWorldDirection(new THREE.Vector3());
  for (const screen of screens) {
    let visible = 0;
    for (const x of [-.3, 0, .3]) for (const y of [-.2, 0, .2]) {
      const target = screen.localToWorld(new THREE.Vector3(x, y, 0));
      const origin = target.clone().addScaledVector(direction, -20);
      const first = new THREE.Raycaster(origin, direction).intersectObject(room, true)[0];
      if (first?.object.userData.project === screen.userData.project) visible++;
    }
    assert.ok(visible >= 3, `${screen.userData.project} must have a selectable visible screen, got ${visible}/9 samples`);
  }
});

test('room has finite geometry and a bounded mobile rendering budget', () => {
  let triangles = 0;
  room.traverse(object => {
    if (!(object instanceof THREE.Mesh)) return;
    const positions = object.geometry.getAttribute('position');
    assert.ok(Array.from(positions.array).every(Number.isFinite), 'Geometry must contain only finite coordinates');
    triangles += (object.geometry.index?.count ?? positions.count) / 3;
  });
  assert.ok(triangles < 150000, `Triangle budget exceeded: ${triangles}`);
  const bounds = new THREE.Box3().setFromObject(room).getSize(new THREE.Vector3());
  assert.ok(bounds.x < 6 && bounds.y < 5 && bounds.z < 5, 'Room must remain within the responsive camera framing');
});

test.after(() => {
  const materials = new Set();
  room.traverse(object => {
    if (object instanceof THREE.Mesh) {
      object.geometry.dispose();
      (Array.isArray(object.material) ? object.material : [object.material]).forEach(material => materials.add(material));
    }
  });
  materials.forEach(material => material.dispose());
  texture.dispose();
});
