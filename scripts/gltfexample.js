var camera;
var renderer;
var particlevertices;
var particlecount;
var clock;
var mixer;


var gunbone;
var gunboneposition = new THREE.Vector3( 0, 0, 0 );;
var gunboneactive = false;
var guntriggerpressed = false;


var mixers = [];
var scene = init();


function init() {
    var scene = new THREE.Scene(); //A Three Scene is the main container
    var stats = new Stats(); //stats is a js library that easily makes a widget to track your fps
    clock = new THREE.Clock(); //clock is a continues number.. useful

    var pointlight = getPointLight(0.02);
    pointlight.position.x = 0;
    pointlight.position.y = 0;
    pointlight.position.z = 100;
    pointlight.lookAt(0,0,0);

    var pointlight2 = getPointLight(0.02);
    pointlight2.position.x = 25;
    pointlight2.position.y = 25;
    pointlight2.position.z = 100;
    pointlight2.lookAt(0,0,0);

    // var directionalLight = new THREE.DirectionalLight( 0xffffff, 3 );
    // scene.add( directionalLight );
    scene.add(pointlight);
    scene.add(pointlight2);
    document.body.appendChild(stats.dom); //the dom refers to the html commands, check the dom api here: https://www.w3schools.com/js/js_htmldom.asp

    camera = getPerspectiveCamera();
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.setClearColor('rgb(0, 0, 0)');

    //var controls = new THREE.OrbitControls(camera, renderer.domElement);

    document.getElementById('webgl').appendChild(renderer.domElement);



var loader = new THREE.GLTFLoader();
loader.setDRACOLoader( new THREE.DRACOLoader() );
loader.setPath('/assets/models/gltf/batmanmirror/');
loader.load('mirror_beta_1.gltf', function (gltf) {
    console.log(gltf.scene);
    cube1 = gltf.scene.children[0];
    cube1.rotation.z = cube1.rotation.z + 0.2;
    //     children[0].children[0].children[0].children[0].children[0].
    //     children[0].children[0].children[0].children[0];
    console.log(cube1.name)
  gltf.scene.traverse(function (child) {
    var animations = gltf.animations;
    if (animations && animations.length) {
      mixer = new THREE.AnimationMixer(gltf.scene); // mixer is a global variable
      animation = mixer.clipAction(animations[0]);
      animation.play();

    }
  });
  scene.add(gltf.scene);
}, (xhr) => xhr, (e) => console.error(e));







// var particleGeo3 = new THREE.Geometry();
//     var particleMat3 = new THREE.PointsMaterial({
//         color: 'rgb(255, 255, 255)',
//         size: 1,
//         map: new THREE.TextureLoader().load('/assets/textures/particle.jpg'),
//         transparent: true,
//         blending: THREE.AdditiveBlending,
//         depthWrite: false
//     });

//     var particleCount3 = 2000;
//     var particleDistance3 = 100;

//     for (var i=0; i<particleCount3; i++) {
//         var posX = (Math.random() - 0.5) * particleDistance3;
//         var posY = (Math.random() - 0.5) * particleDistance3;
//         var posZ = (Math.random() - 0.5) * particleDistance3;
//         var particle = new THREE.Vector3(posX, posY, posZ);

//         particleGeo3.vertices.push(particle);
//     }

//     var particleSystem3 = new THREE.Points(
//         particleGeo3,
//         particleMat3
//     );
//     particleSystem3.name = 'particleSystem3';

//     scene.add(particleSystem3);




//     var particleGeo2 = new THREE.Geometry();
//     var particleMat2 = new THREE.PointsMaterial({
//         color: 'rgb(255, 0, 0)',
//         size: 3,
//         map: new THREE.TextureLoader().load('/assets/textures/particle.jpg'),
//         transparent: true,
//         blending: THREE.AdditiveBlending,
//         depthWrite: false
//     });

//     var particleCount2 = 1;
//     var particleDistance2 = 1;

//     for (var i=0; i<particleCount2; i++) {

//         var particle = new THREE.Vector3( 0, 5, 0 );

//         particleGeo2.vertices.push(particle);
//     }

//     var particleSystem2 = new THREE.Points(
//         particleGeo2,
//         particleMat2
//     );
//     particleSystem2.name = 'particleSystem2';

//     scene.add(particleSystem2);


var controls = new THREE.OrbitControls( camera, renderer.domElement );


    update(renderer, scene, camera, stats, controls);

    return scene;
}





function update(renderer, scene, camera, stats, controls){
    controls.update();

    renderer.render(scene, camera);

    stats.update();

    // if (mixer) {
    //     mixer.update(clock.getDelta());
    //     gunboneactive = true;
    //     gunbone.lookAt(gunboneposition);
        

    //     // console.log(gunbone.position)
    // }



    // var particleSystem = scene.getObjectByName('particleSystem3');
    // particleSystem.rotation.y += 0.005;
    // particleSystem.geometry.vertices.forEach(function(particle) {
    //     particle.x += (Math.random() - 1) * 0.1;
    //     particle.y += (Math.random() - 0.75) * 0.1;
    //     particle.z += (Math.random()) * 0.1;

    //     if (particle.x < -50) {
    //         particle.x = 50;
    //     }

    //     if (particle.y < -50) {
    //         particle.y = 50;
    //     }

    //     if (particle.z < -50) {
    //         particle.z = 50;
    //     }

    //     if (particle.z > 50) {
    //         particle.z = -50;
    //     }
    // });
    // particleSystem.geometry.verticesNeedUpdate = true;

    // if(guntriggerpressed){
    //     fireGun();
    // }

    requestAnimationFrame(function() {
        update(renderer, scene, camera, stats, controls);
    });
}


function updateGunLookAt(mouse3d){
    // console.log(newx,newy);
    if(gunboneactive){
        gunbone.lookAt(mouse3d);
    }
}

function fireGun(){
    // var particleSystem = scene.getObjectByName('particleSystem2');
    // // particleSystem.rotation.y += 0.005;
    // // particleSystem.geometry.vertices[0].particle.z += 1;
    // particleSystem.geometry.vertices.forEach(function(particle) {
    //     // particle.x += (Math.random() - 1) * 0.1;
    //     particle.z += 5;

    //     // if (particle.x < -50) {
    //     //     particle.x = 50;
    //     // }

    //     // if (particle.y < -50) {
    //     //     particle.y = 50;
    //     // }

    //     // if (particle.z < -50) {
    //     //     particle.z = 50;
    //     // }

    //     if (particle.z > 50) {
    //         particle.z = -50;
    //     }
    // });
    // particleSystem.geometry.verticesNeedUpdate = true;
}



window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}


function getPerspectiveCamera() {
// camera
    camera = new THREE.PerspectiveCamera(
        45, // field of view
        window.innerWidth / window.innerHeight, // aspect ratio
        1, // near clipping plane
        1000 // far clipping plane
    );
    //in/out
    camera.position.z = 20;

    //left/right
    camera.position.x = -10 * (window.innerWidth / window.innerHeight);

    //up/down
    camera.position.y = 5* (window.innerWidth / window.innerHeight)
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    return camera;
}



function getPointLight(intensity) {
    var light = new THREE.PointLight(0xffffff, intensity);
    light.castShadow = true;

    return light;
}

//on mouse move
    window.addEventListener('mousemove', function(e){
        var xpos = -( event.clientX / window.innerWidth ) * 2 + 0.5;
        var ypos = -( event.clientY / window.innerHeight ) * 2 + 1 
        var zpos = -0.5
       // console.log("x",xpos);
       // console.log("y",ypos);
        // console.log(gunbone.position);
        // var mouse3D = new THREE.Vector3(xpos, zpos, ypos);
        // gunboneposition = mouse3D;

        // var particleSystem2 = scene.getObjectByName('particleSystem2');
        // particleSystem2.geometry.vertices.forEach(function(particle) {
        //     particle.x = gunbone.position.x
        //     particle.y = gunbone.position.y
        //     particle.z = gunbone.position.z

        //     // particle.y = gunboneposition.y;
        //     // particle.z = gunboneposition.z;
        //     //particle.x = gunbone.position.x
        // });
        // particleSystem2.geometry.lookAt(mouse3D);
        // particleSystem2.geometry.verticesNeedUpdate = true;
        // updateGunLookAt(mouse3D);
    }, false)


    //on touch starting
    document.body.addEventListener('touchstart', function(e){
        
    }, false)


    //on touch cancel
    document.body.addEventListener('touchend', function(e){
        var touchobj = e.changedTouches[0]
    }, false)


    //on mouse down
    document.addEventListener("mousedown", function(e) 
    {
        guntriggerpressed = true;
        // fireGun();
    })

    //on mouse up
    document.addEventListener("mouseup", function(e) 
    {
        guntriggerpressed = false;
        //e.clientX, e.clientY
    })



