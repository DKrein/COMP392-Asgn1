/// <reference path="_reference.ts"/>

// MAIN GAME FILE

// THREEJS Aliases
import Scene = THREE.Scene;
import Renderer = THREE.WebGLRenderer;
import PerspectiveCamera = THREE.PerspectiveCamera;
import BoxGeometry = THREE.BoxGeometry;
import CubeGeometry = THREE.CubeGeometry;
import PlaneGeometry = THREE.PlaneGeometry;
import SphereGeometry = THREE.SphereGeometry;
import Geometry = THREE.Geometry;
import AxisHelper = THREE.AxisHelper;
import LambertMaterial = THREE.MeshLambertMaterial;
import MeshBasicMaterial = THREE.MeshBasicMaterial;
import Material = THREE.Material;
import Mesh = THREE.Mesh;
import Object3D = THREE.Object3D;
import SpotLight = THREE.SpotLight;
import PointLight = THREE.PointLight;
import AmbientLight = THREE.AmbientLight;
import Control = objects.Control;
import GUI = dat.GUI;
import Color = THREE.Color;
import Vector3 = THREE.Vector3;
import Face3 = THREE.Face3;
import Point = objects.Point;

//Custom Game Objects
import gameObject = objects.gameObject;

var scene: Scene;
var renderer: Renderer;
var camera: PerspectiveCamera;
var axes: AxisHelper;
var plane: Mesh;
var sphere: Mesh;
var ambientLight: AmbientLight;
var spotLight: SpotLight;
var control: Control;
var gui: GUI;
var guiScale: GUI;
var guiPosition: GUI;
var guiRotation: GUI;
var guiTranslate: GUI;
var stats: Stats;
var step: number = 0;
var cubeMaterial: LambertMaterial;
var cubeGeometry: CubeGeometry;
//BODY PARTS
var head: Mesh;
var torso: Mesh;
var leftArm: Mesh;
var rightArm: Mesh;
var leftLeg: Mesh;
var rightLeg: Mesh;
var leftFoot: Mesh;
var rightFoot: Mesh;

function init() {
    // Instantiate a new Scene object
    scene = new Scene();
    
    // setup the default renderer
    setupRenderer(); 
	
    // setup the camera
    setupCamera(); 
	
    // add an axis helper to the scene
    axes = new AxisHelper(80);
    scene.add(axes);
    console.log("Added Axis Helper to scene...");
    
    //Add a Plane to the Scene
    plane = new gameObject(
        new PlaneGeometry(40, 80, 1, 1),
        new LambertMaterial({ color: 0xffffff }),
        0, 0, 0);

    plane.rotation.x = -0.5 * Math.PI;

    scene.add(plane);
    console.log("Added Plane Primitive to scene...");
     
    // Add an AmbientLight to the scene
    ambientLight = new AmbientLight(0x090909);
    scene.add(ambientLight);
    console.log("Added an Ambient Light to Scene");
	
    // Add a SpotLight to the scene
    spotLight = new SpotLight(0xffffff);
    spotLight.position.set(-40, 60, 20);
    spotLight.castShadow = true;
    scene.add(spotLight);
    console.log("Added a SpotLight Light to Scene");
    
    // Add objects to the scene
    //length, height, width - color - front/back, up/down, left/rigth
    head = new gameObject(new CubeGeometry(4, 3, 4), new LambertMaterial({color: 0xffcc99}), 0, 14, 0);
    head.castShadow = true;
    scene.add(head);
    console.log("Head added to the scene");    
     
    torso = new gameObject(new CubeGeometry(4, 6, 7), new LambertMaterial({color: 0xff6666}), 0, 9, 0);  
    torso.castShadow = true;
    scene.add(torso);
    console.log("Body added to the scene");
     
    rightLeg = new gameObject(new CubeGeometry(2, 6, 1), new LambertMaterial({color: 0x6666ff}), 0, 3, 2);
    rightLeg.castShadow = true;
    scene.add(rightLeg);
    console.log("Right leg added to the scene");    
    
    leftLeg = new gameObject(new CubeGeometry(2, 6, 1), new LambertMaterial({color: 0x6666ff}), 0, 3, -2);
    leftLeg.castShadow = true;
    scene.add(leftLeg);
    console.log("Left leg added to the scene");

    rightFoot = new gameObject(new CubeGeometry(3, 2, 1), new LambertMaterial({color: 0x000000}), -2, 1, 2);    
    rightFoot.castShadow = true;
    scene.add(rightFoot);
    console.log("Right foot added to the scene");
    
    leftFoot = new gameObject(new CubeGeometry(3, 2, 1), new LambertMaterial({color: 0x000000}), -2, 1, -2);    
    leftFoot.castShadow = true;
    scene.add(leftFoot);
    console.log("Left foot added to the scene");   

    rightArm = new gameObject(new CubeGeometry(2, 6, 1), new LambertMaterial({color: 0xffcccc}), 0, 9, 4.4);  
    rightArm.castShadow = true;
    scene.add(rightArm);
    console.log("Right arm added to the scene");    
    
    leftArm = new gameObject(new CubeGeometry(2, 6, 1), new LambertMaterial({color: 0xffcccc}), 0, 9, -4.4);  
    leftArm.castShadow = true;
    scene.add(leftArm);
    console.log("Left arm added to the scene");
    
    // add controls
    gui = new GUI();
    
    
    //control = new Control(cube);
    //addControl(control);
    
    control = new Control(camera);
    addControl(control);

    // Add framerate stats
    addStatsObject();
    console.log("Added Stats to scene...");

    document.body.appendChild(renderer.domElement);
    gameLoop(); // render the scene	
    
    window.addEventListener('resize', onResize, false);
}

// Change the Camera Aspect Ration according to Screen Size changes
function onResize(): void {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function addControl(controlObject: Control): void {
    
    // Add Scale Folder
     /*
    guiScale = gui.addFolder('scale');
    guiScale.add(controlObject, 'scaleX', 0, 5);
    guiScale.add(controlObject, 'scaleY', 0, 5);
    guiScale.add(controlObject, 'scaleZ', 0, 5);

    // Add Position Folder
    guiPosition = gui.addFolder('position');
    var contX = guiPosition.add(controlObject, 'positionX', -10, 10);
    var contY = guiPosition.add(controlObject, 'positionY', -4, 20);
    var contZ = guiPosition.add(controlObject, 'positionZ', -10, 10);
    

    contX.listen();
    contX.onChange((value) => {
        cube.position.x = controlObject.positionX;
    });

    contY.listen();
    contY.onChange((value) => {
        cube.position.y = controlObject.positionY;
    });

    contZ.listen();
    contZ.onChange((value) => {
        cube.position.z = controlObject.positionZ;
    });
    */
    
    // Add Rotation Folder
    guiRotation = gui.addFolder('rotation');
    guiRotation.add(controlObject,'rotationX',-4, 4);
    guiRotation.add(controlObject,'rotationY',-4, 4);
    guiRotation.add(controlObject,'rotationZ',-4, 4);
    
    // Add Translate Folder
    /*guiTranslate = gui.addFolder('translate');
    guiTranslate.add(controlObject,'translateX',-10, 10);
    guiTranslate.add(controlObject,'translateY',-10, 10);
    guiTranslate.add(controlObject,'translateZ',-10, 10);
    guiTranslate.add(controlObject,'translate');
    */
    
}

// Add Stats Object to the Scene
function addStatsObject() {
    stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);
}

// Setup main game loop
function gameLoop(): void {
    stats.update();
    
    head.rotation.set(control.rotationX, control.rotationY, control.rotationZ);
    torso.rotation.set(control.rotationX, control.rotationY, control.rotationZ);
    leftArm.rotation.set(control.rotationX, control.rotationY, control.rotationZ);
    rightArm.rotation.set(control.rotationX, control.rotationY, control.rotationZ);
    leftLeg.rotation.set(control.rotationX, control.rotationY, control.rotationZ);
    rightLeg.rotation.set(control.rotationX, control.rotationY, control.rotationZ);
    leftFoot.rotation.set(control.rotationX, control.rotationY, control.rotationZ);
    rightFoot.rotation.set(control.rotationX, control.rotationY, control.rotationZ);    

    // render using requestAnimationFrame
    requestAnimationFrame(gameLoop);
	
    // render the scene
    renderer.render(scene, camera);
}

// Setup default renderer
function setupRenderer(): void {
    renderer = new Renderer();
    renderer.setClearColor(0xEEEEEE, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    console.log("Finished setting up Renderer...");
}

// Setup main camera for the scene
function setupCamera(): void {
    //camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera = new PerspectiveCamera(85, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = -30;
    camera.position.y = 20;
    camera.position.z = 5;
    camera.lookAt(scene.position);
    console.log("Finished setting up Camera...");
}
