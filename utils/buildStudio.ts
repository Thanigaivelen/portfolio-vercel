import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

/** A lightweight handcrafted room; no external model or HDR downloads. */
export function buildStudio(textures: { pascal: THREE.Texture; theta: THREE.Texture; sign: THREE.Texture; sky: THREE.Texture }) {
  const room = new THREE.Group();
  const screens: THREE.Mesh[] = [];
  const palette = {
    wall: new THREE.MeshStandardMaterial({ color: '#536e8a', roughness: .9 }),
    edge: new THREE.MeshStandardMaterial({ color: '#263d59', roughness: .8 }),
    floor: new THREE.MeshStandardMaterial({ color: '#b8bec0', roughness: .95 }),
    wood: new THREE.MeshStandardMaterial({ color: '#d4ac7f', roughness: .65 }),
    pale: new THREE.MeshStandardMaterial({ color: '#eee5d5', roughness: .55 }),
    dark: new THREE.MeshStandardMaterial({ color: '#17283c', roughness: .5 }),
    orange: new THREE.MeshStandardMaterial({ color: '#ce7850', roughness: .8 }),
    gold: new THREE.MeshStandardMaterial({ color: '#ba9565', metalness: .65, roughness: .3 }),
    green: new THREE.MeshStandardMaterial({ color: '#638b66', roughness: .9 }),
    leaf: new THREE.MeshStandardMaterial({ color: '#9cb786', roughness: .9 }),
  };
  function box(w: number, h: number, d: number, material: THREE.Material, x: number, y: number, z: number, radius = .025, parent: THREE.Group = room) {
    const mesh = new THREE.Mesh(new RoundedBoxGeometry(w, h, d, 2, Math.min(radius, w / 3, h / 3, d / 3)), material);
    mesh.position.set(x, y, z); mesh.castShadow = true; mesh.receiveShadow = true; parent.add(mesh); return mesh;
  }
  function cylinder(top: number, bottom: number, height: number, material: THREE.Material, x: number, y: number, z: number, parent: THREE.Group = room) {
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(top, bottom, height, 32), material);
    mesh.position.set(x, y, z); mesh.castShadow = true; mesh.receiveShadow = true; parent.add(mesh); return mesh;
  }
  function sphere(radius: number, material: THREE.Material, x: number, y: number, z: number, parent: THREE.Group = room) {
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(radius, 20, 16), material);
    mesh.position.set(x, y, z); mesh.castShadow = true; parent.add(mesh); return mesh;
  }
  function plant(x: number, y: number, z: number, scale = 1) {
    const group = new THREE.Group(); group.position.set(x, y, z); group.scale.setScalar(scale); room.add(group);
    cylinder(.19, .13, .33, palette.orange, 0, .165, 0, group);
    cylinder(.18, .18, .025, palette.dark, 0, .33, 0, group);
    for (let i = 0; i < 7; i++) {
      const angle = i * 2.4;
      const leaf = sphere(.18, i % 2 ? palette.green : palette.leaf, Math.cos(angle) * .17, .55 + (i % 3) * .11, Math.sin(angle) * .17, group);
      leaf.scale.set(.45, 1.7, .8); leaf.rotation.set(Math.sin(angle) * .5, angle, Math.cos(angle) * -.5);
      const stem = cylinder(.009, .009, .4, palette.green, Math.cos(angle) * .06, .48, Math.sin(angle) * .06, group);
      stem.rotation.z = Math.cos(angle) * -.3;
    }
    return group;
  }

  // Floating architectural base, with a narrow bevel and visible floorboards.
  box(5.3, .32, 4.45, palette.edge, 0, -.17, 0, .09);
  box(5.2, .09, 4.35, palette.floor, 0, .035, 0, .03);
  for (let i = 0; i < 13; i++) box(.012, .004, 4.2, palette.pale, -2.42 + i * .4, .083, 0, .001);
  box(5.2, 3.5, .13, palette.wall, 0, 1.79, -2.13);
  box(.13, 3.5, 4.3, palette.wall, -2.54, 1.79, 0);
  box(5.1, .09, .06, palette.pale, 0, .15, -2.03);
  box(.06, .09, 4.2, palette.pale, -2.44, .15, 0);
  box(5.3, .09, .18, palette.edge, 0, 3.57, -2.13);
  box(.18, .09, 4.4, palette.edge, -2.54, 3.57, 0);

  // Luminous sunset window, inset into the back wall.
  box(1.72, 1.88, .1, palette.pale, -.99, 2.31, -2.02, .03);
  const skyMaterial = new THREE.MeshBasicMaterial({ map: textures.sky, color: '#ffffff' });
  const sky = new THREE.Mesh(new THREE.PlaneGeometry(1.53, 1.67), skyMaterial);
  sky.position.set(-.99, 2.31, -1.957); room.add(sky);
  box(.055, 1.78, .08, palette.pale, -.99, 2.31, -1.92);
  box(1.63, .055, .08, palette.pale, -.99, 2.36, -1.92);
  box(1.92, .09, .32, palette.pale, -.99, 1.36, -1.86);
  const curtain = new THREE.MeshStandardMaterial({ color: '#d9d1c0', roughness: 1 });
  for (let i = 0; i < 4; i++) cylinder(.055, .07, 1.92, curtain, -1.94 + i * .065, 2.31, -1.85);

  // Wall shelving and books.
  box(1.38, .1, .46, palette.wood, 1.31, 2.58, -1.85);
  box(1.38, .1, .46, palette.wood, 1.31, 3.17, -1.85);
  const bookColors = ['#d69a72', '#d6d6bb', '#587482', '#afbac1', '#c5a074', '#384b62'];
  bookColors.forEach((color, i) => {
    const height = .28 + (i % 3) * .07;
    const book = box(.095, height, .23, new THREE.MeshStandardMaterial({ color }), .77 + i * .13, 2.63 + height / 2, -1.82, .009);
    book.rotation.z = i === 5 ? -.13 : 0;
    box(.065, .012, .005, palette.pale, .77 + i * .13, 2.73, -1.702, .001);
  });
  plant(1.72, 2.64, -1.8, .58);
  sphere(.13, palette.orange, .91, 3.35, -1.8);
  const framed = box(.43, .35, .035, palette.pale, 1.53, 3.39, -1.89);
  framed.rotation.z = -.04;
  box(.33, .25, .01, palette.edge, 1.53, 3.39, -1.865);
  const print = new THREE.Mesh(new THREE.CircleGeometry(.075, 24), palette.orange); print.position.set(1.53, 3.39, -1.853); room.add(print);

  // Desk, storage, paired monitors, keyboard and mouse.
  box(3.4, .15, 1.18, palette.wood, .3, 1.31, -.97, .05);
  box(.55, 1.13, .9, palette.pale, 1.58, .67, -.98, .04);
  for (let i = 0; i < 3; i++) {
    box(.49, .31, .03, palette.pale, 1.58, .35 + i * .34, -.51);
    box(.14, .025, .03, palette.gold, 1.58, .42 + i * .34, -.48);
  }
  for (const z of [-1.38, -.56]) box(.09, 1.18, .09, palette.edge, -1.16, .68, z);
  function monitor(x: number, width: number, texture: THREE.Texture, project: string, angle: number) {
    const group = new THREE.Group(); group.position.set(x, 1.4, -1.15); group.rotation.y = angle; room.add(group);
    box(.43, .035, .3, palette.dark, 0, .015, 0, .02, group);
    box(.07, .29, .07, palette.dark, 0, .17, -.03, .01, group);
    box(width, .76, .08, palette.dark, 0, .61, -.03, .035, group);
    const mat = new THREE.MeshBasicMaterial({ map: texture, toneMapped: false });
    const screen = new THREE.Mesh(new THREE.PlaneGeometry(width - .075, .68), mat);
    screen.position.set(0, .62, .016); screen.userData.project = project; group.add(screen); screens.push(screen);
    sphere(.012, new THREE.MeshBasicMaterial({ color: '#acddac' }), 0, .257, .02, group);
  }
  monitor(-.47, 1.13, textures.pascal, 'heypascal', .14);
  monitor(.76, 1.08, textures.theta, 'costheta', -.13);
  box(1.13, .015, .39, palette.edge, .03, 1.4, -.55, .04);
  box(.81, .04, .26, palette.pale, -.1, 1.43, -.56, .02);
  for (let row = 0; row < 4; row++) for (let col = 0; col < 12; col++) box(.047, .012, .037, col % 5 ? palette.floor : palette.orange, -.47 + col * .063, 1.458, -.65 + row * .055, .005);
  const mouse = sphere(.09, palette.pale, .69, 1.42, -.55); mouse.scale.set(.7, .4, 1);
  cylinder(.085, .075, .16, palette.pale, -1.13, 1.47, -.67);
  cylinder(.073, .073, .005, palette.dark, -1.13, 1.554, -.67);
  const mugHandle = new THREE.Mesh(new THREE.TorusGeometry(.06, .015, 8, 20), palette.pale); mugHandle.position.set(-1.225, 1.48, -.67); room.add(mugHandle);

  // Upholstered swivel chair, angled toward the desk.
  const chair = new THREE.Group(); chair.position.set(.2, .1, .66); chair.rotation.y = -.17; room.add(chair);
  cylinder(.055, .06, .53, palette.gold, 0, .32, 0, chair);
  for (let i = 0; i < 5; i++) {
    const angle = i * Math.PI * 2 / 5;
    const leg = box(.49, .045, .045, palette.dark, Math.cos(angle) * .2, .08, Math.sin(angle) * .2, .012, chair); leg.rotation.y = -angle;
    sphere(.055, palette.dark, Math.cos(angle) * .42, .055, Math.sin(angle) * .42, chair);
  }
  box(.81, .17, .73, palette.orange, 0, .66, 0, .075, chair);
  const back = box(.82, .76, .14, palette.orange, 0, 1.07, .3, .07, chair); back.rotation.x = -.1;
  for (const x of [-.43, .43]) {
    box(.035, .3, .035, palette.gold, x, .82, .04, .01, chair);
    box(.085, .065, .43, palette.dark, x, .97, -.03, .03, chair);
  }
  for (let i = 0; i < 5; i++) box(.012, .57, .012, palette.wood, -.27 + i * .135, 1.07, .385, .005, chair);

  // Soft oval rug and concentric woven detailing.
  const rug = cylinder(1, 1, .018, palette.pale, .25, .1, .62); rug.scale.set(1.65, 1, 1.1);
  for (let i = 0; i < 4; i++) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(.84 + i * .04, .009, 5, 80), palette.wood);
    ring.rotation.x = -Math.PI / 2; ring.scale.set(1.65, 1.1, 1); ring.position.set(.25, .115, .62); room.add(ring);
  }

  // Tall floor plant, side cabinet and wall-mounted studio sign.
  plant(-1.94, .09, .92, 1.55);
  box(.75, .75, .75, palette.wood, -1.94, .47, -.35, .045);
  box(.65, .62, .035, palette.edge, -1.94, .47, .042);
  for (let i = 0; i < 7; i++) box(.025, .58, .04, palette.wood, -2.2 + i * .085, .47, .067, .008);
  plant(-1.94, .86, -.35, .7);
  const sign = new THREE.Mesh(new THREE.PlaneGeometry(1.27, .5), new THREE.MeshBasicMaterial({ map: textures.sign, transparent: true, side: THREE.DoubleSide }));
  sign.position.set(-2.455, 2.66, .3); sign.rotation.y = Math.PI / 2; room.add(sign);
  box(.7, .9, .045, palette.pale, -2.45, 1.8, 1.15).rotation.y = Math.PI / 2;
  const art = box(.58, .78, .01, palette.orange, -2.417, 1.8, 1.15); art.rotation.y = Math.PI / 2;

  // Pendant lamp and warm illumination.
  cylinder(.012, .012, .6, palette.dark, .45, 3.3, .2);
  cylinder(.14, .34, .24, palette.gold, .45, 2.89, .2);
  const bulbMaterial = new THREE.MeshStandardMaterial({ color: '#fff5da', emissive: '#ffd09b', emissiveIntensity: 2 });
  const bulb = sphere(.12, bulbMaterial, .45, 2.78, .2); bulb.scale.y = .5;
  const lampLight = new THREE.PointLight('#ffc18d', 9, 6, 2); lampLight.position.set(.45, 2.65, .2); room.add(lampLight);
  const windowLight = new THREE.PointLight('#ffb66d', 14, 7, 2); windowLight.position.set(-.99, 2.4, -1.5); room.add(windowLight);

  return { room, screens, skyMaterial, lampLight, windowLight, bulbMaterial };
}
