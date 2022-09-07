import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/build/three.module.js';
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/controls/OrbitControls.js';
//import {GUI} from 'https://threejsfundamentals.org/threejs/../3rdparty/dat.gui.module.js';

function main() {
  const canvas = document.querySelector('#Scene');
  const renderer = new THREE.WebGLRenderer({canvas, antialias : true});
  
  const fov = 90;
  const aspect = 2;  // the canvas default
  const near = 0.5;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 100;

  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 0, 0);
  controls.update();

  const scene = new THREE.Scene();

    /*class ColorGUIHelper {
    constructor(object, prop) {
      this.object = object;
      this.prop = prop;
    }
    get value() {
      return `#${this.object[this.prop].getHexString()}`;
    }
    set value(hexString) {
      this.object[this.prop].set(hexString);
    }
  }

  function makeXYZGUI(gui, vector3, name, onChangeFn) {
    const folder = gui.addFolder(name);
    folder.add(vector3, 'x', -10, 10).onChange(onChangeFn);
    folder.add(vector3, 'y', 0, 10).onChange(onChangeFn);
    folder.add(vector3, 'z', -10, 10).onChange(onChangeFn);
    folder.open();
  }*/

  { const color = 0xFFFFFF;
    const intensity = 1;
    const distance = 300;
    const decay = 2;
    const light = new THREE.PointLight(color, intensity, distance, decay);
    light.position.set(0, 0, 0);
    scene.add(light);

    const helper = new THREE.PointLightHelper(light);
    scene.add(helper);

    function updateLight(){
      helper.update();
    }
    
    /*const gui = new GUI();
    gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color');
    gui.add(light, 'intensity', 0, 2, 0.01);
    gui.add(light, 'distance', 0, 40).onChange(updateLight);

    makeXYZGUI(gui, light.position, 'position', updateLight);*/
  }

  function planeet(radius, color, x, y, z,){
    const sphereRadius = radius;
    const sphereWidthDivisions = 32;
    const sphereHeightDivisions = 16;
    const sphereGeo = new THREE.SphereGeometry(sphereRadius, sphereWidthDivisions, sphereHeightDivisions);
    const sphereMat = new THREE.MeshPhongMaterial({color});
    const mesh = new THREE.Mesh(sphereGeo, sphereMat);
    scene.add(mesh);
    
    mesh.position.x = x;
    mesh.position.y = y;
    mesh.position.z = z;

    return mesh;
  }

  const planeten = [
    planeet(3, 0x24ffff, 30, 10, 40),
    planeet(6, 0xff0000, 100, 2, 0),
    planeet(9, 0x52ff52, -100, 0, -20),
  ];

 
  /*const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  function makeInstance(geometry, color, x) {
    const material = new THREE.MeshPhongMaterial({color});

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    cube.position.x = x;

    return cube;
  }
  */

  const geoSphere = new THREE.SphereGeometry( 15, 32, 16);
  
  function Bol(geoSphere, color, x, y, z,) {
    const material = new THREE.MeshPhongMaterial({color, transparent: true, emissive: 0xFFFF00});    
    
    const sphere = new THREE.Mesh(geoSphere, material);
    scene.add(sphere);

    sphere.position.x = x;
    sphere.position.y = y;
    sphere.position.z = z;

  }
  
  const spheres = [
    //Zon
    Bol(geoSphere, 0xffff00, 0, 0, 0),    
  ];

  /*const cubes = [
    makeInstance(geometry, 0x44aa88,  0),
    makeInstance(geometry, 0x8844aa, -2),
    makeInstance(geometry, 0xaa8844,  2),
  ];*/

  {
    const loader = new THREE.TextureLoader();
    const texture = loader.load(
      'skybox/starry.jpeg',
      () => {
        const rt = new THREE.WebGLCubeRenderTarget(texture.image.height);
        rt.fromEquirectangularTexture(renderer, texture);
        scene.background = rt.texture;
      });
  }

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render(time) {
    time *= 0.001;

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    /*planeten.forEach((planeet, ndx) => {
      const speed = 1 + ndx * .1;
      const rot = time * speed;
      planeet.rotation.x = rot;
      planeet.rotation.y = rot;
      planeet.rotation.z = rot;
    })*/

    /*cubes.forEach((cube, ndx) => {
      const speed = 1 + ndx * .1;
      const rot = time * speed;
      cube.rotation.x = rot;
      cube.rotation.y = rot;
    })*/;

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();