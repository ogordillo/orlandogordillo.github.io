var camera;
var renderer;
var particlevertices;
var particlecount;
var clock;
var mixer;


var tileobject;
var tiles = [];
var tilesloaded = false;


var gunbone;
var gunboneposition = new THREE.Vector3(0, 0, 0);;
var gunboneactive = false;
var guntriggerpressed = false;


var mixers = [];
var scene = init();

var mult = 1.0;



function init() {
    var scene = new THREE.Scene(); //A Three Scene is the main container
    // var stats = new Stats(); //stats is a js library that easily makes a widget to track your fps
    clock = new THREE.Clock(); //clock is a continues number.. useful

    var pointlight = getPointLight(1);
    pointlight.position.x = 0;
    pointlight.position.y = 0;
    pointlight.position.z = 700;
    pointlight.lookAt(0, 0, 0);
    scene.add(pointlight);


     var directionalLight = new THREE.DirectionalLight( 0xffffff, 60 );
     scene.add( directionalLight );
    

    // document.body.appendChild(stats.dom); //the dom refers to the html commands, check the dom api here: https://www.w3schools.com/js/js_htmldom.asp

    camera = getPerspectiveCamera();
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.setClearColor('rgb(255, 255, 255)');

    //var controls = new THREE.OrbitControls(camera, renderer.domElement);

    document.getElementById('webgl').appendChild(renderer.domElement);



    var loader = new THREE.GLTFLoader();
    loader.setDRACOLoader(new THREE.DRACOLoader());
    loader.setPath('/assets/models/gltf/labelednames/');
    loader.load('untitled.gltf', function(gltf) {
        //console.log(gltf.scene);
        // cube1 = gltf.scene.children[0].children[0].children[0];

        //     children[0].children[0].children[0].children[0].children[0].
        //     children[0].children[0].children[0].children[0];
        tileobject = gltf.scene.children[0];
        count = 0;
        for (var i = 0; i < 7; i++) {
            for (var j = 0; j < 7; j++) {
                // console.log(count);
                // console.log(gltf.scene.children[0]);
                // console.log(gltf.scene.children[0].children[0]);
                tiles[gltf.scene.children[0].children[count].children[0].name] = gltf.scene.children[0].children[count].children[0];
                //count++;
                 tiles.push({
                    key: gltf.scene.children[0].children[count].children[0].name,
                     value: gltf.scene.children[0].children[count++].children[0]
             });
            }

        }
        console.log(tiles);
        tilesloaded = true;
        //console.log(tiles["00"]);
        // gltf.scene.traverse(function(child) {
        //     var animations = gltf.animations;
        //     if (animations && animations.length) {
        //         mixer = new THREE.AnimationMixer(gltf.scene); // mixer is a global variable
        //         animation = mixer.clipAction(animations[0]);
        //         animation.play();

        //     }
        // });
        scene.add(gltf.scene);
    }, (xhr) => xhr, (e) => console.error(e));





    //     var gaugeData = {'data': 80.0}
  
    // // create a chart and set options
    // // note that we bind the chart to the element with id equal to chart1 via the c3.js API
    // var chart = c3.generate({
    //     bindto: '#chart1',
    //     data: {
    //         json: gaugeData,
    //         type: 'gauge',
    //     },
    //     gauge: {
    //         label:{
    //             //returning the value here and not the ratio
    //             format: function(value, ratio){ return value;}
    //         },
    //         min: 0,
    //         max: 100,
    //         width: 15,
    //         units: 'value' //this is only the text for the label
    //     }
    // });


    //     setInterval(function () {
        
    //     // create a random value between 0 and 100, rounded to 2 digits
    //      var newValue = Math.floor(100 * Math.random());
        
    //     // // create a data array holding the random value
    //      var newData = {'data': newValue };
        
    //     // // tell the chart to load the new data
    //      chart.load({
    //        json: newData
    //      });
    // }, 2000);

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


    // var controls = new THREE.OrbitControls(camera, renderer.domElement);


    // update(renderer, scene, camera, stats, controls);
    // update(renderer, scene, camera, stats);
    update(renderer, scene, camera);
    return scene;
}


document.querySelector('html').onclick = function() {
    mult = mult + mult;
}


function update(renderer, scene, camera) {
    // controls.update();

    renderer.render(scene, camera);

    // stats.update();
    

    // if (mixer) {
    //     mixer.update(clock.getDelta());
    //     gunboneactive = true;
    //     gunbone.lookAt(gunboneposition);


    //     // console.log(gunbone.position)
    // }

    if (tilesloaded) {
        // if (clock.getDelta() % 2 == 0) {
            //tiles["06"].rotation.y = Math.abs(Math.sin(clock.getElapsedTime()))*3;

            // console.log("I am here");

            tiles["06"].rotation.y = tiles["06"].rotation.y + 0.02*mult;
            tiles["15"].rotation.y = tiles["15"].rotation.y + 0.02*mult;
            tiles["24"].rotation.y = tiles["24"].rotation.y + 0.02*mult;
            tiles["33"].rotation.y = tiles["33"].rotation.y + 0.02*mult;
            tiles["42"].rotation.y = tiles["42"].rotation.y + 0.02*mult;
            tiles["51"].rotation.y = tiles["51"].rotation.y + 0.02*mult;
            tiles["60"].rotation.y = tiles["60"].rotation.y + 0.02*mult;


            tiles["05"].rotation.y = tiles["05"].rotation.y + 0.01*mult;
            tiles["14"].rotation.y = tiles["14"].rotation.y + 0.01*mult;
            tiles["23"].rotation.y = tiles["23"].rotation.y + 0.01*mult;
            tiles["32"].rotation.y = tiles["32"].rotation.y + 0.01*mult;
            tiles["41"].rotation.y = tiles["41"].rotation.y + 0.01*mult;
            tiles["50"].rotation.y = tiles["50"].rotation.y + 0.01*mult;

            tiles["16"].rotation.y = tiles["16"].rotation.y + 0.01*mult;
            tiles["25"].rotation.y = tiles["25"].rotation.y + 0.01*mult;
            tiles["34"].rotation.y = tiles["34"].rotation.y + 0.01*mult;
            tiles["43"].rotation.y = tiles["43"].rotation.y + 0.01*mult;
            tiles["52"].rotation.y = tiles["52"].rotation.y + 0.01*mult;
            tiles["61"].rotation.y = tiles["61"].rotation.y + 0.01*mult;

            tiles["04"].rotation.y = tiles["04"].rotation.y + 0.005*mult;
            tiles["13"].rotation.y = tiles["13"].rotation.y + 0.005*mult;
            tiles["22"].rotation.y = tiles["22"].rotation.y + 0.005*mult;
            tiles["31"].rotation.y = tiles["31"].rotation.y + 0.005*mult;
            tiles["40"].rotation.y = tiles["40"].rotation.y + 0.005*mult;

            tiles["26"].rotation.y = tiles["26"].rotation.y + 0.005*mult;
            tiles["35"].rotation.y = tiles["35"].rotation.y + 0.005*mult;
            tiles["44"].rotation.y = tiles["44"].rotation.y + 0.005*mult;
            tiles["53"].rotation.y = tiles["53"].rotation.y + 0.005*mult;
            tiles["62"].rotation.y = tiles["62"].rotation.y + 0.005*mult;

            tiles["03"].rotation.y = tiles["03"].rotation.y + 0.0025*mult;
            tiles["12"].rotation.y = tiles["12"].rotation.y + 0.0025*mult;
            tiles["21"].rotation.y = tiles["21"].rotation.y + 0.0025*mult;
            tiles["30"].rotation.y = tiles["30"].rotation.y + 0.0025*mult;

            tiles["03"].rotation.y = tiles["03"].rotation.y + 0.0025*mult;
            tiles["12"].rotation.y = tiles["12"].rotation.y + 0.0025*mult;
            tiles["21"].rotation.y = tiles["21"].rotation.y + 0.0025*mult;
            tiles["30"].rotation.y = tiles["30"].rotation.y + 0.0025*mult;

            tiles["36"].rotation.y = tiles["36"].rotation.y + 0.0025*mult;
            tiles["45"].rotation.y = tiles["45"].rotation.y + 0.0025*mult;
            tiles["54"].rotation.y = tiles["54"].rotation.y + 0.0025*mult;
            tiles["63"].rotation.y = tiles["63"].rotation.y + 0.0025*mult;

            tiles["02"].rotation.y = tiles["02"].rotation.y + 0.00175*mult;
            tiles["11"].rotation.y = tiles["11"].rotation.y + 0.00175*mult;
            tiles["20"].rotation.y = tiles["20"].rotation.y + 0.00175*mult;

            tiles["46"].rotation.y = tiles["46"].rotation.y + 0.00175*mult;
            tiles["55"].rotation.y = tiles["55"].rotation.y + 0.00175*mult;
            tiles["64"].rotation.y = tiles["64"].rotation.y + 0.00175*mult;

            tiles["01"].rotation.y = tiles["01"].rotation.y + 0.000875*mult;
            tiles["10"].rotation.y = tiles["10"].rotation.y + 0.000875*mult;

            tiles["56"].rotation.y = tiles["56"].rotation.y + 0.000875*mult;
            tiles["65"].rotation.y = tiles["65"].rotation.y + 0.000875*mult;

            tiles["00"].rotation.y = tiles["00"].rotation.y + 0.0004375*mult;

            tiles["66"].rotation.y = tiles["66"].rotation.y + 0.0004375*mult;
            
            tileobject.rotation.y = tileobject.rotation.y + 0.0004375*mult;
            
                 
            
           
            
        // }
    }

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
        update(renderer, scene, camera);
    });
}


function updateGunLookAt(mouse3d) {
    // console.log(newx,newy);
    if (gunboneactive) {
        gunbone.lookAt(mouse3d);
    }
}

function fireGun() {
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



window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

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
    camera.position.x = 20;

    //up/down
    // camera.position.y = 5* (window.innerWidth / window.innerHeight)
    camera.lookAt(new THREE.Vector3(-10, 0, 0));
    return camera;
}



function getPointLight(intensity) {
    var light = new THREE.PointLight(0xffffff, intensity);
    light.castShadow = true;

    return light;
}

//on mouse move
window.addEventListener('mousemove', function(e) {
    var xpos = -(event.clientX / window.innerWidth) * 2 + 0.5;
    var ypos = -(event.clientY / window.innerHeight) * 2 + 1
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
document.body.addEventListener('touchstart', function(e) {

}, false)


//on touch cancel
document.body.addEventListener('touchend', function(e) {
    var touchobj = e.changedTouches[0]
}, false)


//on mouse down
document.addEventListener("mousedown", function(e) {
    guntriggerpressed = true;
    // fireGun();
})

//on mouse up
document.addEventListener("mouseup", function(e) {
    guntriggerpressed = false;
    //e.clientX, e.clientY
})