var camera;
var renderer;
var particlevertices;
var particlecount; 
var clock;

function init() {
	var scene = new THREE.Scene();
	// var stats = new Stats();
	clock = new THREE.Clock();
	// document.body.appendChild(stats.dom);

	// camera
	camera = new THREE.PerspectiveCamera(
		45, // field of view
		window.innerWidth / window.innerHeight, // aspect ratio
		1, // near clipping plane
		1000 // far clipping plane
	);
	camera.position.z = 18;
	camera.position.x = 0;
	camera.position.y = 2;
	camera.lookAt(new THREE.Vector3(0, 0, 0));

	var directionalLight = new THREE.DirectionalLight( 0xffffff, 2 );
	scene.add( directionalLight );


	var particleMat = new THREE.PointsMaterial({
		color: 'rgb(255, 0, 0)',
		size: 0.1,
		map: new THREE.TextureLoader().load('/assets/textures/particle.jpg'),
		transparent: true,
		blending: THREE.AdditiveBlending,
		depthWrite: false
	});

	let particleSystem;
	
	var objLoader = new THREE.OBJLoader();
	objLoader.load("/assets/models/fbx/blackskull.obj", function ( object ) {

		object.traverse(function ( child ) {
		    if ( child instanceof THREE.Mesh ) {
		    	var particleGeo = child.geometry;
				// console.log(particleGeo);


				for(var x = 0; x < particleGeo.attributes.position.itemSize; x++){
					particleGeo.attributes.position.array[0] = 0;
				}

				// console.log(particleGeo);
				

				particleSystem = new THREE.Points(
					particleGeo,
					particleMat
				);
				particleSystem.name = 'skullleft';


				particleSystem.scale.x =4;
	            particleSystem.scale.y =4
	            particleSystem.scale.z = 4;
				scene.add(particleSystem);
		    }
		});
	},);




	var particleMat2 = new THREE.PointsMaterial({
		color: 'rgb(0, 255, 255)',
		size: 0.1,
		map: new THREE.TextureLoader().load('/assets/textures/particle.jpg'),
		transparent: true,
		blending: THREE.AdditiveBlending,
		depthWrite: false
	});


	let particleSystem2;
	
	var objLoader2 = new THREE.OBJLoader();
	objLoader2.load("/assets/models/fbx/whiteskull.obj", function ( object ) {
		object.traverse(function ( child ) {
		    if ( child instanceof THREE.Mesh ) {

		    	child.geometry = new THREE.Geometry().fromBufferGeometry( child.geometry );
		    	particlevertices = child.geometry.vertices;
		    	particlecount = child.geometry.vertices.length;

		    	
		    	var particleGeo = child.geometry;


				particleSystem2 = new THREE.Points(
					particleGeo,
					particleMat2
				);
				particleSystem2.name = 'skullleft2';
				particleSystem2.sortParticles = true;

				particleSystem2.scale.x =4;
	            particleSystem2.scale.y = 4;
	            particleSystem2.scale.z = 4;
				scene.add(particleSystem2);
		    }
		});
	},);




	var particleGeo3 = new THREE.Geometry();
	var particleMat3 = new THREE.PointsMaterial({
		color: 'rgb(255, 255, 255)',
		size: 1,
		map: new THREE.TextureLoader().load('/assets/textures/particle.jpg'),
		transparent: true,
		blending: THREE.AdditiveBlending,
		depthWrite: false
	});

	var particleCount3 = 2000;
	var particleDistance3 = 100;

	for (var i=0; i<particleCount3; i++) {
		var posX = (Math.random() - 0.5) * particleDistance3;
		var posY = (Math.random() - 0.5) * particleDistance3;
		var posZ = (Math.random() - 0.5) * particleDistance3;
		var particle = new THREE.Vector3(posX, posY, posZ);

		particleGeo3.vertices.push(particle);
	}

	var particleSystem3 = new THREE.Points(
		particleGeo3,
		particleMat3
	);
	particleSystem3.name = 'particleSystem3';

	scene.add(particleSystem3);



	// renderer
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	//renderer.shadowMap.enabled = true;
	renderer.setClearColor('rgb(20, 20, 20)');

	var controls = new THREE.OrbitControls( camera, renderer.domElement );

	document.getElementById('webgl').appendChild(renderer.domElement);

	// update(renderer, scene, camera, controls, stats);
	update(renderer, scene, camera, controls);

	return scene;
}


function update(renderer, scene, camera, controls) {
	controls.update();
	
	renderer.render(scene, camera);

	// stats.update();

	var timeElapsed = clock.getElapsedTime();

	// var particleSystem = scene.getObjectByName('particleSystem');
	// particleSystem.rotation.y += 0.0005;

	if(scene.getObjectByName('skullleft') != undefined){
		var skullleft = scene.getObjectByName('skullleft');
		skullleft.material.color = new THREE.Color(Math.random() * 0xffffff);
		skullleft.material.size =  0.1,
		skullleft.material.map = new THREE.TextureLoader().load('/assets/textures/particle.jpg'),
		skullleft.material.transparent = true,
		skullleft.material.blending = THREE.AdditiveBlending,
		skullleft.material.depthWrite = false
		skullleft.geometry.verticesNeedUpdate = true;
		skullleft.scale.x = Math.abs((Math.cos(timeElapsed)))*12;
		skullleft.scale.y = Math.abs((Math.cos(timeElapsed)))*12;
		skullleft.scale.z = Math.abs((Math.cos(timeElapsed)))*12;
		skullleft.geometry.colorsNeedUpdate ;
		skullleft.rotation.z -= 0.001;
	}

	if(scene.getObjectByName('skullleft2') != undefined){
		var skullleft2 = scene.getObjectByName('skullleft2');
		skullleft2.verticesNeedUpdate = true;
		skullleft2.scale.x = Math.abs((Math.sin(timeElapsed)))*12;
		skullleft2.scale.y = Math.abs((Math.sin(timeElapsed)))*12;
		skullleft2.scale.z = Math.abs((Math.sin(timeElapsed)))*12;
		skullleft2.rotation.z -= 0.001;
	}


	var particleSystem = scene.getObjectByName('particleSystem3');
	particleSystem.rotation.y += 0.005;
	particleSystem.geometry.vertices.forEach(function(particle) {
		particle.x += (Math.random() - 1) * 0.1;
		particle.y += (Math.random() - 0.75) * 0.1;
		particle.z += (Math.random()) * 0.1;

		if (particle.x < -50) {
			particle.x = 50;
		}

		if (particle.y < -50) {
			particle.y = 50;
		}

		if (particle.z < -50) {
			particle.z = 50;
		}

		if (particle.z > 50) {
			particle.z = -50;
		}
	});
	particleSystem.geometry.verticesNeedUpdate = true;
	
	requestAnimationFrame(function() {
		update(renderer, scene, camera, controls);
	});
}


function getPointLight(intensity) {
	var light = new THREE.PointLight(0xffffff, intensity);
	light.castShadow = true;

	return light;
}


window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

var scene = init();
