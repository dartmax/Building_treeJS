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

    (function (utils) {
        /**
         * Main logic here:
         * - check if number of pointers changes (pointer is pressed / released)
         * - if 2 pointers are pressed: activate pinch zoom, otherwise: deactivate
         * - dispatch start, update, end events.
         */
        var PinchZoomGesture = (function () {
            function PinchZoomGesture(pointerDetector) {
                this._active = false;
                this._pointerDetector = pointerDetector;
                this.init();
            }
            PinchZoomGesture.prototype.init = function () {
                this.startSignal = new utils.Signal();
                this.updateSignal = new utils.Signal();
                this.endSignal = new utils.Signal();
                this._moveData = {
                    pointer1: null,
                    pointer2: null,
                    startDistance: 0,
                    distance: 0
                };
            };
            PinchZoomGesture.prototype.listen = function () {
                this._pointerDetector.down.add(this.onPointerUpOrDown, { scope: this });
                this._pointerDetector.up.add(this.onPointerUpOrDown, { scope: this });
            };
            PinchZoomGesture.prototype.complete = function () {
            };
            PinchZoomGesture.prototype.onPointerUpOrDown = function () {
                var pointersLength = this._pointerDetector.pointersLength;
                if (!this._active && pointersLength === 2) {
                    this.activate();
                }
                else if (this._active && pointersLength !== 2) {
                    this.deactivate();
                }
            };
            PinchZoomGesture.prototype.activate = function () {
                this._active = true;
                this._moveData.pointer1 = this._pointerDetector.pointerArray[0];
                this._moveData.pointer2 = this._pointerDetector.pointerArray[1];
                var distance = this.calculateDistance();
                this._moveData.startDistance = distance;
                this._moveData.distance = distance;
                this.startSignal.dispatch(this._moveData);
                this._pointerDetector.move.add(this.onPointerMove, { scope: this });
            };
            PinchZoomGesture.prototype.deactivate = function () {
                this._active = false;
                this.refreshDistance();
                this.endSignal.dispatch(this._moveData);
            };
            PinchZoomGesture.prototype.onPointerMove = function () {
                // this._active should always be true because we only attach the listener in activate
                if (this._active) {
                    this.refreshDistance();
                    this.updateSignal.dispatch(this._moveData);
                }
            };
            PinchZoomGesture.prototype.refreshDistance = function () {
                var distance = this.calculateDistance();
                this._moveData.distance = distance;
            };
            PinchZoomGesture.prototype.calculateDistance = function () {
                var pointer1 = this._moveData.pointer1;
                var pointer2 = this._moveData.pointer2;
                var dx = pointer1.localX - pointer2.localX;
                var dy = pointer1.localY - pointer2.localY;
                return Math.sqrt(dx * dx + dy * dy);
            };
            Object.defineProperty(PinchZoomGesture.prototype, "lastData", {
                get: function () {
                    return this._moveData;
                },
                enumerable: true,
                configurable: true
            });
            return PinchZoomGesture;
        })();
        utils.PinchZoomGesture = PinchZoomGesture;
    })(utils || (utils = {}));
///<reference path='./../PointerDetector.ts'/>
///<reference path='./../Pointer.ts'/>
///<reference path='./../../signal/ISignalP1.ts'/>
///<reference path='./../../signal/ISignalP2.ts'/>
///<reference path='./../../signal/Signal.ts'/>
///<reference path='./PinchZoomGesture.ts'/>
    var utils;
    (function (utils) {
        /**
         * Manages a simple pan and a pinch zoom gesture in a way that each always
         * completes a full event cycle, eg.:
         * - pinch start, [update,] end, pan start, [update,] end
         * So pinch start is always followed by pinch end (or updates in between),
         * but never a pan start, they are not interwoven.
         */
        var PanAndZoomGestures = (function () {
            function PanAndZoomGestures(config) {
                var _this = this;
                this._panStarted = false;
                // ==================================================================================================
                // Pointer events
                this.onPointerDown = function (pointer) {
                    // first pointer down -> start pan
                    _this.tryPanStart();
                };
                this.onPointerMove = function (pointer) {
                    // if 1 pointer down -> update
                    if (_this._pointerDetector.pointersLength === 1 && _this._panStarted) {
                        _this._pan.update.dispatch(pointer);
                    }
                };
                this.onPointerUp = function (pointer) {
                    // this runs whenever a pointer is released:
                    // A. when panning and that single finger is released
                    // B. before pinch zoom completes (before onEndPinchZoom)
                    if (_this._pointerDetector.pointersLength === 0 && _this._panStarted) {
                        _this.finishPan();
                    }
                };
                // ==================================================================================================
                // Pinch zoom events
                this.onStartPinchZoom = function (zoomData) {
                    // stop pan if it's in progress
                    if (_this._panStarted) {
                        _this.finishPan(_this._pinchZoom);
                    }
                };
                this.onEndPinchZoom = function (zoomData) {
                    // check if a pan needs to be started
                    // (when switching from 2 fingers to 1)
                    _this.tryPanStart();
                };
                this._pointerDetector = config.pointerDetector || new utils.PointerDetector({
                    element: config.element,
                    maxPointers: 2
                });
                this.init();
            }
            PanAndZoomGestures.prototype.init = function () {
                this._pan = {
                    start: new utils.Signal(),
                    update: new utils.Signal(),
                    end: new utils.Signal()
                };
                this._pointerDetector.down.add(this.onPointerDown);
                this._pointerDetector.move.add(this.onPointerMove);
                this._pointerDetector.up.add(this.onPointerUp);
                this._pinchZoom = new utils.PinchZoomGesture(this._pointerDetector);
                this._pinchZoom.startSignal.add(this.onStartPinchZoom);
                this._pinchZoom.endSignal.add(this.onEndPinchZoom);
                this._pinchZoom.listen();
            };
            PanAndZoomGestures.prototype.tryPanStart = function () {
                if (this._pointerDetector.pointersLength === 1 && !this._panStarted) {
                    this._panStarted = true;
                    this._panPointer = this._pointerDetector.pointerArray[0];
                    // We need to reset dx, dy, offsetX, offsetY, because this is
                    // considered a new pan start gesture (dispatched here manually).
                    // Otherwise these properties may have big values, if the user
                    // moved his fingers during pinching, which would cause some jumpingsure
                    this._panPointer.dx = 0;
                    this._panPointer.dy = 0;
                    this._panPointer.offsetX = 0;
                    this._panPointer.offsetY = 0;
                    this._panPointer.startX = this._panPointer.localX;
                    this._panPointer.startY = this._panPointer.localY;
                    this._pan.start.dispatch(this._panPointer);
                }
            };
            PanAndZoomGestures.prototype.finishPan = function (breakingGesture) {
                if (breakingGesture === void 0) { breakingGesture = null; }
                this._panStarted = false;
                this._pan.end.dispatch(this._panPointer, breakingGesture);
                this._panPointer = null;
            };
            Object.defineProperty(PanAndZoomGestures.prototype, "pan", {
                // ==================================================================================================
                // Getters
                get: function () {
                    return this._pan;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PanAndZoomGestures.prototype, "pinchZoom", {
                get: function () {
                    return this._pinchZoom;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PanAndZoomGestures.prototype, "pointerDetector", {
                get: function () {
                    return this._pointerDetector;
                },
                enumerable: true,
                configurable: true
            });
            return PanAndZoomGestures;
        })();
        utils.PanAndZoomGestures = PanAndZoomGestures;
    })(utils || (utils = {}));
///<reference path='../libs/three.d.ts'/>
///<reference path='../libs/lib_extended.d.ts'/>
///<reference path='../utils/SimpleSignal.ts'/>
///<reference path='../Main.ts'/>
///<reference path='../utils/interaction/mousewheel/MouseWheelDetector.ts'/>
///<reference path='../utils/interaction/gestures/PanAndZoomGestures.ts'/>
///<reference path='../utils/interaction/Pointer.ts'/>
    var OrbitController = (function () {
        function OrbitController(config) {
            var _this = this;
            this._o = new THREE.Vector3(0, this._offsetFromGround, 0);
            this._x = new THREE.Vector3(1, 0, 0);
            this._y = new THREE.Vector3(0, 1, 0);
            this._z = new THREE.Vector3(0, 0, 1);
            this._firstMove = true;
            this._needsUpdate = false;
            // ======================================================================================================
            // Mousewheel, zoom
            this.onMouseWheel = function (delta) {
                var scale = delta < 0 ? _this._zoomScale.mouseWheel.zoom_in : _this._zoomScale.mouseWheel.zoom_out;
                _this.scaleZoom(scale);
            };
            this._camera = config.camera;
            this._element = config.element;
            this._offsetFromGround = config.offsetFromGround;
            this._o = new THREE.Vector3(0, this._offsetFromGround, 0);
            this._mousewheelDetector = new utils.MouseWheelDetector({
                element: this._element
            });
            var viewConfig = Main.getInstance().config.config.view;
            this._easing = {
                distance: viewConfig.easing.distance,
                rotation: viewConfig.easing.rotation
            };
            this._distance = {
                initial: config.distance.initial,
                current: 0,
                target: 0,
                min: config.distance.min,
                max: config.distance.max
            };
            this._zoomScale = {
                press: {
                    zoom_in: 1 / config.zoom.press,
                    zoom_out: config.zoom.press
                },
                mouseWheel: {
                    zoom_in: config.zoom.mouseWheel,
                    zoom_out: 1 / config.zoom.mouseWheel
                }
            };
            this._switchTransition = config.switchTransition;
            this.cameraPositionSignal = new utils.SimpleSignal();
            this.change = new utils.SimpleSignal();
            this.updateAngles();
            this._needsUpdate = true;
            this.update(0);
        }
        // ======================================================================================================
        // Enable, disable
        OrbitController.prototype.enable = function () {
            this._mousewheelDetector.wheelSignal.add(this.onMouseWheel);
            this.switchToDefault(false);
        };
        OrbitController.prototype.disable = function () {
            this._mousewheelDetector.wheelSignal.remove(this.onMouseWheel);
        };
        // ======================================================================================================
        // Public rotation methods called by BuildingController
        OrbitController.prototype.startRotation = function (pointer) {
            this._phi_down = this._phi;
            this._theta_down = this._theta;
            this._firstMove = true;
        };
        OrbitController.prototype.updateRotation = function (pointer) {
            var PIHalf = Math.PI / 2;
            this._phi = this._phi_down - pointer.offsetX * 0.01;
            // commented out because now we use easing
            //this._phi = this._phi % (Math.PI * 2);
            this._theta = this._theta_down + pointer.offsetY * 0.01;
            this._theta = this._theta < -PIHalf ? -PIHalf : this._theta > PIHalf ? PIHalf : this._theta;
            // clamp to be above ground
            this._theta = Math.max(0.02, this._theta);
            this._needsUpdate = true;
            if (this._firstMove) {
                this._firstMove = false;
                this.change.dispatch();
            }
        };
        OrbitController.prototype.endRotation = function (pointer) {
            // TODO check
        };
        // ======================================================================================================
        // Update
        // called in requestAnimationFrame
        OrbitController.prototype.update = function (dt) {
            if (!this._needsUpdate) {
                return false;
            }
            if (this._phi_current === undefined) {
                this._phi_current = this._phi;
            }
            if (this._theta_current === undefined) {
                this._theta_current = this._theta;
            }
            var eps = 0.0001;
            var d_phi = this._phi - this._phi_current;
            var d_theta = this._theta - this._theta_current;
            var d_dist = this._distance.target - this._distance.current;
            if (Math.abs(d_phi) < eps && Math.abs(d_theta) < eps && Math.abs(d_dist) < eps) {
                this._needsUpdate = false;
            }
            this._phi_current += d_phi * this._easing.rotation;
            this._theta_current += d_theta * this._easing.rotation;
            this._distance.current += d_dist * this._easing.distance;
            var phi = this._phi_current;
            var theta = this._theta_current;
            var m = new THREE.Matrix4().makeRotationAxis(this._y, phi);
            this._right = this._x.clone();
            this._right.applyMatrix4(m);
            var cameraPos = this._z.clone().multiplyScalar(this._distance.current).applyMatrix4(m);
            m.makeRotationAxis(this._right, -theta);
            cameraPos.applyMatrix4(m);
            cameraPos.y += this._offsetFromGround;
            this._camera.position = cameraPos;
            this._camera.lookAt(this._o);
            // up
            var view = new THREE.Vector3().subVectors(this._o, this._camera.position);
            this._camera.up.crossVectors(this._right, view);
            return true;
        };
        OrbitController.prototype.pressZoom = function (zoomIn) {
            var scale = zoomIn ? this._zoomScale.press.zoom_in : this._zoomScale.press.zoom_out;
            this.scaleZoom(scale);
        };
        OrbitController.prototype.scaleZoom = function (scale) {
            this.setDistance(this.getDistance() * scale);
        };
        OrbitController.prototype.getDistance = function () {
            return this._distance.target;
        };
        OrbitController.prototype.setDistance = function (value) {
            this._distance.target = value;
            this._distance.target = MathUtils.clamp(this._distance.target, this._distance.min, this._distance.max);
            this._needsUpdate = true;
            this.change.dispatch();
        };
        // ======================================================================================================
        // Switch camera
        OrbitController.prototype.switchToDefault = function (transition) {
            if (transition === void 0) { transition = undefined; }
            this._camera.up = new THREE.Vector3(0, 1, 0);
            this.setCameraPosition(40, 30, this._distance.initial);
            this._camera.lookAt(this._o);
            if (transition === undefined) {
                transition = this._switchTransition;
            }
            this.updateAngles(transition);
        };
        OrbitController.prototype.setCameraPosition = function (x, y, z) {
            var pos = this._camera.position;
            pos.set(x, y, z);
            this.cameraPositionSignal.dispatch(pos);
        };
        OrbitController.prototype.switchTo = function (eye, up) {
            var target = this._o;
            //var view = new THREE.Vector3().subVectors(target, eye).normalize();
            //var right = new THREE.Vector3().crossVectors(view, up);
            this._camera.up = up;
            this._camera.position = eye;
            this._camera.lookAt(target);
            this.updateAngles(this._switchTransition);
        };
        // updates angles from camera position
        // called when a new camera is set
        OrbitController.prototype.updateAngles = function (transition) {
            if (transition === void 0) { transition = false; }
            var cameraPos = this._camera.position;
            var x = cameraPos.x;
            var y = cameraPos.y;
            var z = cameraPos.z;
            this._theta = Math.atan(y / Math.sqrt(x * x + z * z));
            this._phi = Math.atan2(x, z);
            var dist = Math.sqrt(x * x + y * y + z * z);
            this._distance.target = dist;
            if (!transition) {
                this._distance.current = dist;
                this._theta_current = this._theta;
                this._phi_current = this._phi;
            }
            else {
                this._needsUpdate = true;
            }
        };
        return OrbitController;
    })();
///<reference path='../libs/three.d.ts'/>
///<reference path='../view/ViewPreset.ts'/>
///<reference path='../view/accessories/AccessoryView.ts'/>
///<reference path='../view/ContentView.ts'/>
///<reference path='./ZoomController.ts'/>
///<reference path='./OrbitController.ts'/>
///<reference path='./NodePlacer.ts'/>
    /**
     * Manages OrbitController (which rotates, zooms the building) and
     * NodePlacer which manages placing of new nodes on the building (doors, etc).
     *
     * With mouse controls: update on mousemove, placing on mouseclick.
     * With touch: pan to drag position, add on end of drag. TODO consider adding on consequent tap?
     */
    var BuildingController = (function () {
        function BuildingController(contentView, tools) {
            var _this = this;
            this._rotating = false;
            this.onMoveIconClick = function (accessoryIcon) {
                _this.startPlacing(accessoryIcon.accessory, accessoryIcon);
            };
            this.onSceneChange = function (state, node) {
                if (state === 0 /* PLACING */) {
                    // node becomes placing, ie. the user can move the mouse and find a place for it
                    _this.startPlacing(_this._nodePlacer);
                    document.body.addEventListener("mousemove", _this.onMouseHover);
                }
                else if (state === 2 /* CANCELED */ || state === 1 /* PLACED */) {
                    // node is canceled or placed -> remove listeners, cursor style
                    // dont dispatch another PLACED event, that will cause an infinite loop
                    _this.finishPlacing(false);
                    document.body.removeEventListener("mousemove", _this.onMouseHover);
                    window.document.body.style.cursor = "";
                }
                Main.getInstance().render = true;
            };
            // ======================================================================================================
            // pan
            this.onPanStart = function (pointer) {
                if (_this._placing) {
                    _this.updatePlacingNodeByPointer(pointer);
                }
                var startRotating = !_this.placingNodeHasValidPlace();
                if (startRotating) {
                    _this._rotating = true;
                    _this._controller.startRotation(pointer);
                }
                else {
                    _this._rotating = false;
                    _this.updatePlacingNodeByPointer(pointer);
                }
                Main.getInstance().render = true;
            };
            this.onPanUpdate = function (pointer) {
                if (_this._rotating) {
                    _this._controller.updateRotation(pointer);
                }
                else {
                    _this.updatePlacingNodeByPointer(pointer);
                }
                Main.getInstance().render = true;
            };
            this.onPanEnd = function (pointer, breakingGesture) {
                if (_this._rotating) {
                    _this._rotating = false;
                    _this._controller.endRotation(pointer);
                }
                else {
                    // check if node can be added
                    // only if there's no breaking gesture (pinch zoom), if there is
                    // we don't want to place the item
                    if (!breakingGesture) {
                        _this.finishPlacing();
                    }
                }
                Main.getInstance().render = true;
            };
            // this runs when the mouse hovers over the canvas in node placing mode
            this.onMouseHover = function (event) {
                var localCoords = _this._gestures.pointerDetector.getLocalCoords(event);
                _this.updatePlacingNode(localCoords);
            };
            // ======================================================================================================
            // viewpreset change
            this.onUserChange = function () {
                _this._viewPreset.value = "custom";
            };
            this.onViewPresetChange = function (preset) {
                var eye = null;
                var up = new THREE.Vector3(0, 1, 0);
                var dist = _this._viewConfig.distance.initial;
                var edgeHeight = 20;
                var edgeX = 0.25 * dist;
                var edgeZ = 0.8 * dist;
                var frontBackHeight = 20;
                var sideHeight = 10;
                switch (preset) {
                    case "top":
                        eye = new THREE.Vector3(0, dist, 0);
                        up = new THREE.Vector3(0, 0, -1);
                        break;
                    case "front":
                        eye = new THREE.Vector3(0, frontBackHeight, dist);
                        break;
                    case "front-right":
                        eye = new THREE.Vector3(edgeX, edgeHeight, edgeZ);
                        break;
                    case "right":
                        eye = new THREE.Vector3(dist, sideHeight, 0);
                        break;
                    case "back-right":
                        eye = new THREE.Vector3(edgeX, edgeHeight, -edgeZ);
                        break;
                    case "back":
                        eye = new THREE.Vector3(0, frontBackHeight, -dist);
                        break;
                    case "back-left":
                        eye = new THREE.Vector3(-edgeX, edgeHeight, -edgeZ);
                        break;
                    case "left":
                        eye = new THREE.Vector3(-dist, sideHeight, 0);
                        break;
                    case "front-left":
                        eye = new THREE.Vector3(-edgeX, edgeHeight, edgeZ);
                        break;
                    case "inside":
                        eye = new THREE.Vector3(0, _this._offsetFromGround, -15);
                        break;
                    case "default":
                        _this._controller.switchToDefault();
                        return;
                }
                if (eye) {
                    _this._controller.switchTo(eye, up);
                }
            };
            this.onZoomChange = function (zoomIn) {
                _this._controller.pressZoom(zoomIn);
            };
            this._viewConfig = contentView.config.config.view;
            this._camera = contentView.camera;
            this._element = contentView.canvas;
            this._offsetFromGround = 4;
            this._toolsView = tools;
            // gestures
            this._gestures = this.createGestures();
            // nodePlacer
            this._nodePlacer = new NodePlacer(contentView);
            contentView.scene.changeSignal.add(this.onSceneChange, { scope: this });
            // controller
            this._controller = this.createController();
            // viewPreset
            this._viewPreset = new ViewPreset();
            this._viewPreset.changeSignal.add(this.onViewPresetChange);
            // accessoryView
            this.initAccessoryView(contentView);
            // zoomController
            this._zoomController = new ZoomController();
            this._zoomController.changeSignal.add(this.onZoomChange);
            // miscellanious
            this._isAddonPositionValid = false;
        }
        BuildingController.prototype.initAccessoryView = function (contentView) {
            this._accessoryView = new AccessoryView({
                accessoryConfig: contentView.config.config["accessories"],
                accessories: contentView.config.accessories,
                scene: contentView.scene3D
            });
            this._accessoryView.moveIconClickSignal.add(this.onMoveIconClick);
        };
        BuildingController.prototype.startPlacing = function (placer, accessoryIcon) {
            this.stopPlacingAccessoryIcon();
            this._placing = {
                placer: placer,
                accessoryIcon: accessoryIcon
            };
        };
        BuildingController.prototype.stopPlacingAccessoryIcon = function () {
            if (this._placing && this._placing.accessoryIcon) {
                this._placing.accessoryIcon.stopPlacing();
            }
        };
        BuildingController.prototype.createGestures = function () {
            var gestures = new utils.PanAndZoomGestures({
                element: this._element
            });
            gestures.pan.start.add(this.onPanStart, { scope: this });
            gestures.pan.update.add(this.onPanUpdate, { scope: this });
            gestures.pan.end.add(this.onPanEnd, { scope: this });
            gestures.pinchZoom.startSignal.add(this.onPinchZoomStart, { scope: this });
            gestures.pinchZoom.updateSignal.add(this.onPinchZoomUpdate, { scope: this });
            return gestures;
        };
        BuildingController.prototype.createController = function () {
            var viewConfig = this._viewConfig;
            var orbitControllerConfig = {
                camera: this._camera,
                element: this._element,
                easing: {
                    distance: viewConfig.easing.distance,
                    rotation: viewConfig.easing.rotation
                },
                distance: {
                    initial: viewConfig.distance.initial,
                    min: viewConfig.distance.min,
                    max: viewConfig.distance.max
                },
                zoom: {
                    press: 1.2,
                    mouseWheel: 1.1
                },
                switchTransition: true,
                offsetFromGround: this._offsetFromGround
            };
            var controller = new OrbitController(orbitControllerConfig);
            controller.enable();
            controller.change.add(this.onUserChange);
            return controller;
        };
        BuildingController.prototype.placingNodeHasValidPlace = function () {
            if (this._placing) {
                return this._placing.placer.getPlacingNodeHasValidPlace();
            }
            return false;
        };
        BuildingController.prototype.finishPlacing = function (dispatch) {
            if (dispatch === void 0) { dispatch = true; }
            var placeSuccessful = null;
            if (this._isAddonPositionValid === true) {
                placeSuccessful = this._placing.placer.placeNode(dispatch);
            }
            // example for unsuccessful placing: when placing a door but releasing on the ground
            if (placeSuccessful) {
                this.stopPlacingAccessoryIcon();
                this._placing = null;
            }
            Main.getInstance().render = true;
        };
        // updates the position of the currently placing node
        BuildingController.prototype.updatePlacingNode = function (position) {
            // convert from [0, x] to [-1, 1]
            position[0] = (position[0] / this._element.clientWidth) * 2 - 1;
            position[1] = -(position[1] / this._element.clientHeight) * 2 + 1;
            this._isAddonPositionValid = this._placing.placer.updatePosition(position, this._camera);
            Main.getInstance().render = true;
        };
        BuildingController.prototype.updatePlacingNodeByPointer = function (pointer) {
            this.updatePlacingNode([pointer.localX, pointer.localY]);
            Main.getInstance().render = true;
        };
        // ======================================================================================================
        // pinch zoom
        BuildingController.prototype.onPinchZoomStart = function (zoomData) {
            this._startPinchDistance = this._controller.getDistance();
            console.log("pinch zoom start");
        };
        BuildingController.prototype.onPinchZoomUpdate = function (zoomData) {
            var zoomRatio = 1 / (zoomData.distance / zoomData.startDistance);
            var distance = this._startPinchDistance * zoomRatio;
            this._controller.setDistance(distance);
        };
        BuildingController.prototype.update = function (dt) {
            if (this._controller) {
                return this._controller.update(dt);
            }
            return true;
        };
        Object.defineProperty(BuildingController.prototype, "accessoryView", {
            get: function () {
                return this._accessoryView;
            },
            enumerable: true,
            configurable: true
        });
        return BuildingController;
    })();

};
