/// <reference path="../../definitions/threejs/three.d.ts" />
/// <reference path="../../definitions/threejs/ivane_three.d.ts" />


function loadOBJ(scene:THREE.Scene):void
{
	var loadManager = new THREE.LoadingManager()
	
	var texture = THREE.ImageUtils.loadTexture( "res/tex.jpg" );
	texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set( 4, 4 );
	
	loadManager.onProgress = (item:any, loaded:number, total:number) => {
		console.log( item, loaded, total )
	}
	
	var objLoader = new THREE.OBJLoader(loadManager)	
	
	objLoader.load( 'res/model.obj', function ( object:THREE.Object3D ) {

		var meshBasicMaterial = new THREE.MeshPhongMaterial({
			color:0xff0000
		})

		object.traverse( function ( child ) {

			if ( child instanceof THREE.Mesh ) {

				child.material = meshBasicMaterial

			}

		} );

		
		scene.add( object )
		
		object.scale.set( 4.0, 4.0, 4.0 )
		
		var pointLight = new THREE.PointLight(0xdcdcdc, 1,10)
		
		scene.add(pointLight)
		
		pointLight.position.set(0,5,5)
		
		function rotateObjectArountY()
		{
			object.rotation.y += 0.01
			
			requestAnimationFrame(rotateObjectArountY)
		}
		
		rotateObjectArountY()

	}, onProgress, onError )
	
	var onProgress = function ( xhr ) {
		if ( xhr.lengthComputable ) {
			var percentComplete = xhr.loaded / xhr.total * 100
			console.log( Math.round(percentComplete) + '% downloaded' )
		}
	};

	var onError = function ( xhr ) {
	};
	
	
}