import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import vShader_1 from './shaders/center_1/vertex.glsl';
import fShader_1 from './shaders/center_1/fragment.glsl';
import vShader_2 from './shaders/center_2/vertex.glsl';
import fShader_2 from './shaders/center_2/fragment.glsl';
import vShader_3 from './shaders/outline_1/vertex.glsl';
import fShader_3 from './shaders/outline_1/fragment.glsl';
import vShader_4 from './shaders/outline_2/vertex.glsl';
import fShader_4 from './shaders/outline_2/fragment.glsl';
import vFirefly from './shaders/firefly/vertex.glsl';
import fFirefly from './shaders/firefly/fragment.glsl';
import gsap from 'gsap';

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x00001C);

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0, 0, 5)
scene.add(camera)

/**
 * Renderer
*/
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Light
const light = new THREE.AmbientLight(0xffffff, 1.0);
scene.add(light);

// Clock
const clock = new THREE.Clock();

/**
 * Main Star
 */
// Center 1 - White Part
const gCenter_1 = new THREE.SphereGeometry(2, 128, 128);
const mCenter_1 = new THREE.ShaderMaterial({
    vertexShader: vShader_1,
    fragmentShader: fShader_1,
    uniforms:
    {
        center_r: { type: 'f', value: 0.05 },
        sphere_r: { type: 'f', value: 1.0 },
        r_scale: { type: 'f', value: 1.0 },
        white_ins: { type: 'f', value: 1.0 },
    },
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
    transparent: true,
})
const center_1 = new THREE.Mesh(gCenter_1, mCenter_1);
scene.add(center_1);

// Center 2 - Blue Part
const gCenter_2 = new THREE.SphereGeometry(2, 128, 128);
const mCenter_2 = new THREE.ShaderMaterial({
    vertexShader: vShader_2,
    fragmentShader: fShader_2,
    uniforms:
    {
        center_r: { type: 'f', value: 0.0 },
        sphere_r: { type: 'f', value: 1.0 },
        r_scale: { type: 'f', value: 1.0 }
    },
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
    transparent: true,
})
const center_2 = new THREE.Mesh(gCenter_2, mCenter_2);
scene.add(center_2);

// Outline 1
const gOut_1 = new THREE.SphereGeometry(2, 128, 128);
const mOut_1 = new THREE.ShaderMaterial({
    vertexShader: vShader_3,
    fragmentShader: fShader_3,
    uniforms:
    {
        "c": { type: "f", value: 1.0 },
        "p": { type: "f", value: 3.0 },
        glowColor: { type: "c", value: new THREE.Color(0x0082ff) },
        viewVector: { type: "v3", value: camera.position }
    },
    side: THREE.FrontSide,
    blending: THREE.AdditiveBlending,
    transparent: true
})
const outline_1 = new THREE.Mesh(gOut_1, mOut_1);
scene.add(outline_1);

// Outline 2
const gOut_2 = new THREE.SphereGeometry(6, 128, 128);
const mOut_2 = new THREE.ShaderMaterial({
    vertexShader: vShader_4,
    fragmentShader: fShader_4,
    uniforms:
    {
        "c": { type: "f", value: 1.0 },
        "p": { type: "f", value: 4.0 },
        glowColor: { type: "c", value: new THREE.Color(0x0082ff) },
        viewVector: { type: "v3", value: camera.position }
    },
    side: THREE.FrontSide,
    blending: THREE.AdditiveBlending,
    transparent: true
})
const outline_2 = new THREE.Mesh(gOut_2, mOut_2);
outline_2.position.z = -10;
scene.add(outline_2);

let flag = false;
setTimeout(() => {
    flag = true;
}, 5500);

// Animation for center 1
gsap.to(mCenter_1.uniforms.sphere_r, {
    value: 10.0,
    duration: 1.5,
    delay: 0,
    repeat: -1,
    yoyo: true,
    ease: "power0.easeNone",
    
    repeatDelay: 0.1,
    onRepeat: function () {
        // check the number of repetitions
        if (flag) {
            this.kill(); // stop the animation
        }
    }
});
gsap.to(mCenter_1.uniforms.center_r, {
    value: 0.0,
    duration: 1.5,
    delay: 0,
    repeat: -1,
    yoyo: true,
    ease: "power0.easeNone",
    repeatDelay: 0.1,
    onRepeat: function () {
        if (flag) {
            this.kill(); // stop the animation
        }
    }
});
gsap.to(mCenter_1.uniforms.r_scale, {
    value: 0.003,
    duration: 1,
    delay: 5.5,
    onComplete: () => { // set bacground totally white
        gsap.to(scene.background, {
            r: 1,
            g: 1,
            b: 1,
            duration: 3,
        });
    }
});

// Animation for center 2
gsap.to(mCenter_2.uniforms.sphere_r, {
    value: 2.0,
    duration: 1.5,
    delay: 0,
    repeat: -1,
    yoyo: true,
    ease: "power0.easeNone",
    
    repeatDelay: 0.1,
    onRepeat: function () {
        if (flag) {
            this.kill(); // stop the animation
        }
    }
});
gsap.to(mCenter_2.uniforms.center_r, {
    value: 0.005,
    duration: 1.5,
    delay: 0,
    repeat: -1,
    yoyo: true,
    ease: "power0.easeNone",
    
    repeatDelay: 0.1,
});
gsap.to(mCenter_2.uniforms.r_scale, {
    value: 0.005,
    duration: 1,
    delay: 5.5,
})

// Animation for outline 1
gsap.to(mOut_1.uniforms["p"], {
    value: 5.0,
    duration: 1.5,
    repeat: -1,
    // yoyo: true
})
gsap.to(outline_1.scale, {
    x: 1.4,
    y: 1.4,
    z: 1.4,
    duration: 1.5,
    repeat: -1,
    yoyo: true
});
setTimeout(() => {
    scene.remove(outline_1);
}, 5500);

// Animation for outline 2
gsap.to(mOut_2.uniforms["p"], {
    value: 8.0,
    duration: 1.5,
    repeat: -1,
    yoyo: true,
    onRepeat: function () {
        // check the number of repetitions
        if (flag) {
            this.kill(); // stop the animation
        }
    }
})
gsap.to(outline_2.scale, {
    x: 0.7,
    y: 0.7,
    z: 0.7,
    duration: 1.5,
    repeat: -1,
    yoyo: true,
    onRepeat: function () {
        // check the number of repetitions
        if (flag) {
            this.kill(); // stop the animation
        }
    }
})
setTimeout(() => {
    scene.remove(outline_2);
}, 5500);


/**
 * Fireflies
 */
const firefliesGeometry = new THREE.BufferGeometry();
const firefliesCount = 10;
const positionArray = new Float32Array(firefliesCount * 3);
const scaleArray = new Float32Array(firefliesCount);
const idArray = new Float32Array(firefliesCount);
const colors = [];
const color = new THREE.Color();

for (let i = 0; i < firefliesCount; i++) {
    positionArray[i * 3 + 0] = (Math.random() - 0.5) * 15;
    positionArray[i * 3 + 1] = (Math.random() - 0.5) * 15;
    positionArray[i * 3 + 2] = -15;

    scaleArray[i] = 10 + Math.random() * 20;

    idArray[i] = i + 1;

    color.setHSL(0.6 + Math.random() * 0.1, 1.0, Math.random() * 0.5);
    colors.push(color.r, color.g, color.b);
}

firefliesGeometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3))
firefliesGeometry.setAttribute('aScale', new THREE.BufferAttribute(scaleArray, 1));
firefliesGeometry.setAttribute('id', new THREE.BufferAttribute(idArray, 1));
firefliesGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

// Material
const firefliesMaterial = new THREE.ShaderMaterial({
    uniforms:
    {
        uTime: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        uSize: { value: 100 },
        resolution: { value: new THREE.Vector2() },
    },
    vertexShader: vFirefly,
    fragmentShader: fFirefly,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    vertexColors: true,
    side: THREE.BackSide
});

// Points
const fireflies = new THREE.Points(firefliesGeometry, firefliesMaterial)
scene.add(fireflies)

/**
 * Explosion
 */
let bx = new THREE.Mesh(new THREE.PlaneGeometry(), new THREE.MeshStandardMaterial({
    side: THREE.DoubleSide,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    emissive: 0x0000aa,
    emissiveIntensity: 3,
    map: new THREE.TextureLoader().load("particle.png"),
}));
bx.geometry.rotateX(-Math.PI * .5)
let ip = new InstancePool(bx);
console.log(ip);
scene.add(ip.instancedMesh);

let scaleN = 0.1;
let sharedUp = new THREE.Vector3();
ip.update((t) => {
    console.log("t", t);
    sphereRand(t.position).multiplyScalar(scaleN);
    t.scale.set(0.005, 0.005, 0.025)
    t.updateMatrix()
    t.up = sharedUp;
}
)
function sphereRand(vec) {
    const theta = 2.0 * Math.PI * Math.random();
    const phi = Math.acos(2.0 * Math.random() - 1.0);
    const x = Math.sin(phi) * Math.cos(theta);
    const y = Math.sin(phi) * Math.sin(theta);
    const z = Math.cos(phi);
    return vec.set(x, y, z);
}

function InstancePool(mesh, count = 300) {
    this.material = mesh.material; //new THREE.Mesh(geometry , new THREE.MeshStandardMaterial({}));
    this.material.color.setHSL(Math.random(), Math.random(), Math.random());
    this.instancedMesh = new THREE.InstancedMesh(mesh.geometry, mesh.material, count);
    let inst = new THREE.Group();
    inst.rotation.copy(mesh.rotation)
    inst.position.copy(mesh.position)
    inst.scale.copy(mesh.scale)
    this.transforms = new Array(count);
    for (let i = 0; i < count; i++) this.transforms[i] = inst.clone();
    this.needsUpdate = false;
    this.update = (updateFn) => {
        for (let i = 0; i < count; i++) {
            if (!updateFn(this.transforms[i], i))
                this.instancedMesh.setMatrixAt(i, this.transforms[i].matrix);
        }
        this.instancedMesh.instanceMatrix.needsUpdate = true;
    }
}

gsap.to(ip.instancedMesh.scale, {
    x: 100,
    y: 100,
    z: 100,
    duration: 5,
    delay: 5.5,
});


/**
 * Sizes
 */
window.addEventListener('resize', () => {
    // Update camera
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

let tv0 = new THREE.Vector3();
/**
 * Animate
 */

const tick = () => {
    sharedUp.set(0, 0, 1).applyQuaternion(camera.quaternion);
    ip.update((t) => {

        t.lookAt(tv0.copy(t.position).add(t.position));
        t.updateMatrix()
    })

    const elapsedTime = clock.getElapsedTime()

    firefliesMaterial.uniforms.uTime.value = elapsedTime;
    firefliesMaterial.uniforms.resolution.value.set(window.innerWidth, window.innerHeight);

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()