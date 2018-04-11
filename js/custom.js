window.onload = function() {

	var static_w = [
		'roof_angele_0004',
		'roof_angele_0002',
		'roof_angele_0003',
		'roof_angele_0001',
		'profile01002',
		'profile1021', 
		'profile1020',
		'roof_profile004',
		'roof_profile00401',
		'profile01010', 
		'profile01011',
		'profile01008',
		'profile01009',
		'temp00',
		'temp01',
		'temp02',
		'temp03',
		'temp04',
		'temp05',
		'temp06',
		'temp07',
		'temp08',
		'temp09',
		'temp10',
		'temp11',
		'temp12',
		'temp13',
		'temp14',
		'temp015',
		'temp16',
		'temp17',
		'temp18',
		'temp19',
		'temp20',
		'temp21',
		'temp22',
		'temp23',
		'temp24',
		'temp25',
		'temp26',
		'temp27',
		'temp28',
		'temp111',
		'temp112',
		'temp0110',
		
		'wall_back_roof',
		'wall_front_roof'
	];
	
	var static_h = [
		'temp00',
		'temp01',
		'temp02',
		'temp03',
		'temp04',
		'temp05',
		'temp06',
		'temp07',
		'temp08',
		'temp09',
		'temp10',
		'temp11',
		'temp12',
		'temp13',
		'temp14',
		'temp015',
		'temp16',
		'temp17',
		'temp18',
		'temp19',
		'temp20',
		'temp21',
		'temp22',
		'temp23',
		'temp24',
		'temp25',
		'temp26',
		'temp27',
		'temp28',
		'temp111',
		'temp112',
		
		'wall_back_roof',
		'wall_front_roof'
	];

	var static_l = [
		'temp00',
		'temp01',
		'temp02',
		'temp03',
		'temp04',
		'temp05',
		'temp06',
		'temp07',
		'temp08',
		'temp09',
		'temp010',
		'temp011',
		'temp012',
		'temp013',
		'temp014',
		'temp015',
		'temp016',
		'temp017',
		'temp018',
		'temp019',
		'temp020',
		'temp021',
		'temp022',
		'temp023',
		'temp024',
		'temp025',
		'temp026',
		'temp027',
		'temp028',
		'temp111',
		'temp112',
	
		'wall_back_roof',
		'wall_front_roof'
	];

	var main_settings = {
	//	main
		canvas: document.getElementById('app'),
		width: window.innerWidth,
		height: window.innerHeight,
	//	camera
		camera: {
			position: {
				x: 2000,
				y: 2000,
				z: 2000
			},
			fov: 45,
			maxDistance: 40000,
			minDistance: 1
		},
	//	orbit control
		control: {
			maxDistance: 5000,
			maxPolarAngle: Math.PI / 2 - 0.01,
			target: {
				x: 0,
				y: 100,
				z: 0
			}
		},
	//	texture
		texture: {
			default: {
				ground: {
					texture: 'texture/ground/green.jpg',
					quality: 30
				},
				skybox: {
					texture: 'texture/skybox/sky.jpg'
				}
			},
			east_texas: {
				ground: {
					texture: 'texture/ground/green.jpg',
					quality: 30
				},
				skybox: {
					texture: 'texture/skybox/sky.jpg'
				},
				tree: {
					path: 'obj/tree/',
					obj: 'palmtree.obj',
					mtl: 'palmtree.mtl'
				}
			},
			mountains: {
				ground: {
					texture: 'texture/ground/mountains.jpg',
					quality: 30
				},
				skybox: {
					texture: 'texture/skybox/mount.jpg'
				}
			},
			west_texas: {
				ground: {
					texture: 'texture/ground/desert.jpg',
					quality: 30
				},
				skybox: {
					texture: 'texture/skybox/sky.jpg'
				},
				tree: {
					path: 'obj/tree/',
					obj: 'palmtree.obj',
					mtl: 'palmtree.mtl'
				}
			},
		},
	//	man
		man: {
			path: 'obj/boy/',
			obj: 'boyStanding.obj',
			mtl: 'boyStanding.mtl'
		},
	//	auto
		auto: {
			path: 'obj/auto/',
			obj: 'renault-scenic.obj',
			mtl: 'renault-scenic.mtl'
		},
	//	main obj
		main: {
			path: 'obj/main/',
			obj: 'building01.obj',
			mtl: 'build01end.mtl'
		},
	//	navigation
		nav: {
			arrow_moving_src: 'img/arrow_right.svg',
			move_src: 'img/move.svg'
		},
		camera_variation: [
			{x: 3000,y: 2000,z: 3000,}, //default
			{x: 3000,y: 3000,z: 3000}, //custom
			{x: -0.1,y: 3500,z: 0}, //top
			{x: -2500,y: 500,z: 0}, //front
			{x: -1500,y: 400,z: 700}, //front-right
			{x: 0,y: 500,z: 1500}, //right
			{x: 1500,y: 500,z: 700}, //back-right
			{x: 2500,y: 500,z: 0}, //back
			{x: 1500,y: 500,z: -700}, //back-left
			{x: 0,y: 500,z: -1500}, //left
			{x: -1500,y: 500,z: -700}, //front-left
			{x: 100,y: 100,z: 100}  //inside
		]
	};

	var renderer  = new THREE.WebGLRenderer({canvas: main_settings.canvas, antialias: true}),
			scene     = new THREE.Scene(),
			camera    = new THREE.PerspectiveCamera(
				main_settings.camera.fov,
				main_settings.width / main_settings.height,
				main_settings.camera.minDistance,
				main_settings.camera.maxDistance
			),
			autoObj = [], manObj = [], mainObj = [], treeObj = [], controls, mouse,
			backgroundGeometry, backgroundMaterial, backgroundMesh, groundTexture, groundGeometry, groundMaterial, groundCircle;

	renderer.setSize( main_settings.width, main_settings.height );
	renderer.setClearColor(0xffffff);
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFShadowMap;
	renderer.shadowMapEnabled = true;
	renderer.shadowMapSoft = true;

	main_settings.canvas.setAttribute('width' , main_settings.width);
	main_settings.canvas.setAttribute('height', main_settings.height);

	//init
	(function init() {

		//OrbitControls, camera
		camera.position.set(
			main_settings.camera.position.x,
			main_settings.camera.position.y,
			main_settings.camera.position.z
		);  // position camera
		controls  = new THREE.OrbitControls( camera, renderer.domElement ); // class orbit control
		controls.maxDistance = main_settings.control.maxDistance;
		controls.minDistance = 10;
		controls.panningMode = THREE.HorizontalPanning;
		controls.enableDamping = true;
		controls.dampingFactor = 0.1;

		controls.rotateSpeed = 0.15;
		controls.enableZoom = true;
		controls.smoothZoom = true;
		controls.smoothZoomSpeed = 0.1;
		controls.zoomDampingFactor = 0.1;
		controls.momentumDampingFactor = 1;
		controls.momentumScalingFactor = 0.1;
		controls.smoothZoomSpeed = 5.0;

		controls.enablePan = false;
		controls.enableZoom = true;
		controls.rotateSpeed = 0.07;

		controls.target.set(
			main_settings.control.target.x,
			main_settings.control.target.y,
			main_settings.control.target.z
		);

		controls.enablePan = false;
		controls.enableKeys = false;
		controls.maxPolarAngle = main_settings.control.maxPolarAngle;

		controls.update();


		// lights
		var lightDirectional = new THREE.DirectionalLight( 0xffffff );
		lightDirectional.castShadow = true;
		lightDirectional.position.set( 5000, 5000, -5000 );
		lightDirectional.shadowDarkness = 1;

		lightDirectional.shadowCameraVisible = true;
		scene.add( lightDirectional );

		var lightAmbient = new THREE.AmbientLight( 0xffffff );
		scene.add( lightAmbient );

		// background
		backgroundGeometry = new THREE.SphereBufferGeometry( 20000, 32, 32 );
		backgroundMaterial = new THREE.MeshBasicMaterial({
			map: new THREE.TextureLoader().load(main_settings.texture.default.skybox.texture),
			side: THREE.BackSide
		});
		backgroundMesh = new THREE.Mesh( backgroundGeometry, backgroundMaterial );
		scene.add( backgroundMesh );

		// add ground
		groundTexture   = new THREE.TextureLoader().load( main_settings.texture.default.ground.texture );
		groundGeometry  = new THREE.CircleBufferGeometry( 20000, 128 );

		groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;  //repeat mode texture
		groundTexture.repeat.set(
			main_settings.texture.default.ground.quality,
			main_settings.texture.default.ground.quality
		); // quality ground

		groundMaterial  = new THREE.MeshBasicMaterial( { map: groundTexture } );
		groundCircle    = new THREE.Mesh( groundGeometry, groundMaterial );
		groundCircle.rotation.x = -Math.PI / 2;

		groundCircle.receiveShadow = true;
		scene.add( groundCircle );

	})();

	function onWindowResize() {
		main_settings.width  = window.innerWidth;
		main_settings.height = window.innerHeight;

		camera.aspect = main_settings.width / main_settings.height;
		camera.updateProjectionMatrix();
		renderer.setSize( main_settings.width, main_settings.height );
	}
	window.addEventListener( 'resize', onWindowResize, false );
	
	function objSetPositionOnMouseHover(context, x, y, z) {
		context.position.x = x;
		context.position.y = y;
		context.position.z = z;
	}

	(function loadDefaultObj() {
		console.log(mainObj);
		
		// load
		//loadObj( main_settings.auto.path, main_settings.auto.obj, main_settings.auto.mtl, true, {x: -500, y:0, z:-1500}, 1, {x: 0,y:0,z:0}, 'auto', autoObj );
		//loadObj( main_settings.man.path, main_settings.man.obj, main_settings.man.mtl, true, {x: -700, y:0, z:-1500}, 1, {x: 0,y:0,z:0}, 'person', manObj );
		loadObj( main_settings.main.path, main_settings.main.obj, main_settings.main.mtl, true, {x: 0, y:5, z:0}, 5, {x: -Math.PI / 2,y:0,z:0}, 'main', mainObj );


	})();

	// Function loadObj - load obj + mtl file
	// variable:
	// path - path file
	// objName - name obj file (without format .obj)
	// mtlName - name mtl file (without format .mtl)
	// vis - start visibility object
	// pos - { x:, y:, z: } - start position object
	// scale - { x:, y:, z: } - start scale object
	// rot - { x:, y:, z: } - start rotation object
	// name - object name
	// variable - must be array
	function loadObj( path, objName, mtlName, vis, pos, scale, rot, name, variable ) {
		var mtlLoader = new THREE.MTLLoader();
		mtlLoader.setPath( path );
		console.log(mtlLoader);
		mtlLoader.load( mtlName, function( materials ) {
			materials.preload();
			var objLoader = new THREE.OBJLoader();
			objLoader.setMaterials( materials );
			objLoader.setPath( path );
			objLoader.load( objName, function ( object ) {
				object.castShadow = true;
				object.name = name;
				object.position.set( pos.x, pos.y, pos.z );
				object.rotation.set( rot.x, rot.y, rot.z );
				object.scale.set(scale, scale, scale);
				object.visible = vis;
				variable.push(object);
				scene.add(object);
			});
		});
	}

	function stepFrame() {
		window.requestAnimationFrame(stepFrame);

		//mainObj[0].top.x += 1;

		renderer.render(scene, camera);

		controls.update();

	}
	stepFrame();

// listener
	function checkCanvasNavigationShow( context ) {
		var parent = context.parentNode;
		if ( parent.classList.contains('show_access') ) {
			parent.classList.remove('show_access');
			return false;
		} else {
			parent.classList.add('show_access');
			return true;
		}
	}

	function hiddenObj(obj) {
		obj.forEach(function(item, i, arr) {
			item.visible = false;
		});
	}

	function showObj(obj) {
		obj.forEach(function(item, i, arr) {
			item.visible = true;
		});
	}
	
	function pointXZ(angle, x, y) {
		return {
			x: x / 2,
			z: Math.tan(angle) * x / 2,
			y: y
		}
	}

	// Function equationPlane - return equation plane from three point
	// A1, A2, A3 - {x:,y:,z:} - point
	// return A, B, C - equation plane A*x+B*y+C*z=0
	function equationPlane( A1, A2, A3 ) {
		
	}

	// Function pointOfIntersectionOfTheStraightLineAndThePlane
	// - return point of intersection of the straight line and the plane
	// var:
	// x - position x camera
	// y - position y camera
	// z - position z camera
	// angleX - rotate x camera
	// angleY - rotate y camera
	// angleZ - rotate z camera
	// upY - position y object
	function pointOfIntersectionOfTheStraightLineAndThePlane( x, y, z, angleX, angleY, upY ) {



		pointX = x - m * y / n;
		pointZ = z - p * y / n;
	}

	document.querySelector('#add_auto .toggle_auto').addEventListener( 'click', function () {
		if ( checkCanvasNavigationShow(this) ) {
			showObj(autoObj);
		} else {
			hiddenObj(autoObj);
		}
	}, false );

	document.querySelector('#add_person .toggle_person').addEventListener( 'click', function () {
		if ( checkCanvasNavigationShow(this) ) {
			showObj(manObj);
		} else {
			hiddenObj(manObj);
		}
	}, false );

	function checkCanvasNavigationMoving( context ) {
		if ( context.classList.contains('moving') ) {
			context.src = main_settings.nav.move_src;
			context.classList.remove('moving');
			return false;
		} else {
			context.src = main_settings.nav.arrow_moving_src;
			context.classList.add('moving');
			return true;
		}
	}

	function siblings_content(className, ctx) {
		return Array.prototype.filter.call(ctx.parentNode.children, function(child){
			return child.classList.contains(className);
		});
	}

	function listener_field_input( classInputIn, classInputOut ) {
		var inputIn = document.getElementsByClassName(classInputIn);

		
		for (var i = 0; i < inputIn.length; i++) {
			inputIn[i].addEventListener( 'mousemove', function () {
				siblings_content(classInputOut, this)[0].value = this.value;

				console.log(mainObj);

				switch (classInputIn) {
					case 'default-input-range':
						
						for (var el = 0; el <= mainObj[0].children.length; el++) {
							if (static_w.indexOf(mainObj[0].children[el].name) != -1) {
								mainObj[0].children[el].scale.y = 1;
								mainObj[0].children[el].position.y = (this.value - 4) * -1;
								
							} else {
								mainObj[0].children[el].scale.y = (this.value - 4);
							}
						}
						
						break;
					case 'default-input-range2':
						for (var el = 0; el <= mainObj[0].children.length; el++) {
							if (static_l.indexOf(mainObj[0].children[el].name) != -1) {
								mainObj[0].children[el].scale.x = 1;
							} else {
								mainObj[0].children[el].scale.x = (this.value - 4);
							}
						}
						break;	
					case 'default-input-range3':
						for (var el = 0; el <= mainObj[0].children.length; el++) {
							if (static_h.indexOf(mainObj[0].children[el].name) != -1) {
								mainObj[0].children[el].scale.z = 1;
							} else {
								mainObj[0].children[el].scale.z = (this.value - 4);
							}
						}
						break;	
				}

				
			});
		}
	}
	
	function changeTextureScene( path ) {
		backgroundMaterial.map = new THREE.TextureLoader().load(path.skybox.texture);
		groundTexture = new THREE.TextureLoader().load( path.ground.texture );
		groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
		groundTexture.repeat.set(
			path.ground.quality,
			path.ground.quality
		);
		groundMaterial.map = groundTexture;
		if ( typeof path.tree != "undefined" ) {
			loadObj( path.tree.path, path.tree.obj, path.tree.mtl, false, {x: 0, y:5, z:0}, 10, {x: 0,y:0,z:0}, 'tree', treeObj );
		}
	}

	function animateChangeCameraPosition(x, y, z) {
		var start_point = {
			x: camera.position.x,
			y: camera.position.y,
			z: camera.position.z
		};
		var step = {
			x: (camera.position.x - x) / 60,
			y: (camera.position.y - y) / 60,
			z: (camera.position.z - z) / 60
		};
		var i = 0;

		(function step_animation() {
			var anim = window.requestAnimationFrame(step_animation);
			i++;
			camera.position.set(
				start_point.x - step.x * i,
				start_point.y - step.y * i,
				start_point.z - step.z * i
			);
			if ( i >= 60 ) {
				window.cancelAnimationFrame(anim);
			}
		})();
	}

	function changePositionCamera(path) {
		animateChangeCameraPosition(path.x, path.y, path.z);
	}

	document.querySelector('#add_auto .moving_auto').addEventListener( 'click', function () {
		if ( checkCanvasNavigationMoving(this) ) {

		}
	}, false );

	document.querySelector('#add_person .moving_person').addEventListener( 'click', function () {
		if ( checkCanvasNavigationMoving(this) ) {

		}
	}, false );

	document.getElementById('zoom_in').addEventListener( 'click', function () {

	}, false );

	document.getElementById('zoom_out').addEventListener( 'click', function () {

	}, false );

	document.getElementById('select_scene').addEventListener( 'change', function () {
		switch(this.value) {
			case '0':
				changeTextureScene(main_settings.texture.default);
				break;
			case '1':
				changeTextureScene(main_settings.texture.east_texas);
				break;
			case '2':
				changeTextureScene(main_settings.texture.mountains);
				break;
			case '3':
				changeTextureScene(main_settings.texture.west_texas);
				break;
		}
	}, false );

	document.getElementById('select_view').addEventListener( 'change', function () {
		changePositionCamera(main_settings.camera_variation[this.value]);
	}, false );

	var item_content = document.getElementsByClassName('item-title');
	for (var i = 0; i < item_content.length; i++) {
		item_content[i].addEventListener( 'click', function () {

			// var siblings_content = Array.prototype.filter.call(this.parentNode.children, function(child){
			// 	return child.classList.contains('item-content');
			// });

			if ( this.parentNode.classList.contains('open') ) {
				this.parentNode.classList.remove('open');
				// siblings_content[0].style.display = 'none';
			} else {
				this.parentNode.classList.add('open');
				// siblings_content[0].style.display = 'block';
			}

		}, false );

		listener_field_input('default-input-range', 'default-input-number');
		listener_field_input('default-input-number', 'default-input-range');
		
		listener_field_input('default-input-range2', 'default-input-number2');
		listener_field_input('default-input-number2', 'default-input-range2');

		listener_field_input('default-input-range3', 'default-input-number3');
		listener_field_input('default-input-number3', 'default-input-range3');

		var bulding_size_width = document.getElementsByClassName('bulding_size_width'),
				bulding_size_lenght = document.getElementsByClassName('bulding_size_length'),
				bulding_size_heigth = document.getElementsByClassName('bulding_size_heigth');

		var bulding_size_width = document.getElementsByClassName('bulding_size_width');
		(function () {
			for ( var i = 0; i < bulding_size_width.length; i++ ) {
				bulding_size_width[i].addEventListener('change', function () {
					scale_obj( bulding_size_lenght[0].value,   );
				});
			}
		})();

	}
    var ZoomController = (function () {
        function ZoomController() {
            var _this = this;
            this.onZoomIn = function (event) {
                _this.changeSignal.dispatch(true);
            };
            this.onZoomOut = function (event) {
                _this.changeSignal.dispatch(false);
            };
            this.changeSignal = new utils.SimpleSignal();
            this._zoomIn = document.getElementById("zoom_in");
            this._zoomOut = document.getElementById("zoom_out");
            this._zoomIn.addEventListener("click", this.onZoomIn);
            this._zoomOut.addEventListener("click", this.onZoomOut);
        }
        return ZoomController;
    })();

};
