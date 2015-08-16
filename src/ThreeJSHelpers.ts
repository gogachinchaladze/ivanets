/*
 * Author Ivane Gegia http://ivane.info
 */

///<reference path="../definitions/threejs/three.d.ts"/>
///<reference path="../definitions/threejs/ivane_three.d.ts"/>

module Ivane.ThreeJSHelpers {

	export function getOrtho2DCoordinatesFromPixelCoordinates
	(
		viewWidthInPixels: number,
		viewHeightInPixels: number,
		pointerTopLeftXInPixels: number,
		pointerTopLeftYInPixels: number,

		orthoCamera: THREE.OrthographicCamera,

		ortho2DCoordiantes__out: THREE.Vector2
	) 
	{
		var orthoRangeOfX = -orthoCamera.left + orthoCamera.right
		var orthoRangeOfY = -orthoCamera.bottom + orthoCamera.top

		var x = orthoRangeOfX * (pointerTopLeftXInPixels / viewWidthInPixels) + orthoCamera.left
		var y = orthoRangeOfY * (1 - pointerTopLeftYInPixels / viewHeightInPixels) + orthoCamera.bottom

		ortho2DCoordiantes__out.set(x, y)
	}

	export function orthoViewCoordinateToWorld
	( 
		viewCoodinate: THREE.Vector2, 
		orthoCamera: THREE.OrthographicCamera, 
		worldCoordinate_out: THREE.Vector3 
	) 
	{
		worldCoordinate_out.x = orthoCamera.position.x + viewCoodinate.x
		worldCoordinate_out.y = orthoCamera.position.y + viewCoodinate.y
		worldCoordinate_out.z = orthoCamera.position.z
	}

	export function addGrid(scene: THREE.Scene) {
		var verticalGridLineGeometry = new THREE.CubeGeometry(.025, 20, 0.001)
		var horizontalGridLineGeometry = new THREE.CubeGeometry(20, .025, 0.001)

		var gridLineMaterial = new THREE.MeshBasicMaterial({
			color: 0xbcbcbc
		})

		var greenLineMaterial = new THREE.MeshBasicMaterial({
			color: 0x00ff00
		})

		var redLineMaterial = new THREE.MeshBasicMaterial({
			color: 0xff0000
		})

		for (var x = 0; x < 20; x++) {
			var verticalGridLineMesh = new THREE.Mesh(verticalGridLineGeometry, gridLineMaterial)

			scene.add(verticalGridLineMesh)

			if (x == 10) {
				verticalGridLineMesh.scale.set(2, 10, 0.001)
				verticalGridLineMesh.material = greenLineMaterial
			}
			
			verticalGridLineMesh.scale.set(2, 10, 0.001)

			verticalGridLineMesh.position.set(-10 + x, 0, 0)
		}

		for (var y = 0; y < 20; y++) {
			var horizontalGridLineMesh = new THREE.Mesh(horizontalGridLineGeometry, gridLineMaterial)

			scene.add(horizontalGridLineMesh)

			if (y == 10) {
				horizontalGridLineMesh.scale.set(1, 2, 0.001)
				horizontalGridLineMesh.material = redLineMaterial
			}
			
			horizontalGridLineMesh.scale.set(1, 2, 0.001)

			horizontalGridLineMesh.position.set(0, -10 + y, -0.1)
		}
	}
 
	export function createRectangleGeometry(width:number, height:number): THREE.Geometry {
		
		var geometry = new THREE.Geometry()
		var halfWidth = width / 2
		var halfHeight = height / 2
		
		//geometry.vertices.push(new )
		geometry.vertices.push
		(
			new THREE.Vector3( -halfWidth, halfHeight, 0 )
		)
		
		geometry.vertices.push
		(
			new THREE.Vector3( halfWidth, halfHeight, 0 )
		)
		
		geometry.vertices.push
		(
			new THREE.Vector3( halfWidth, -halfHeight, 0 )
		)
		
		geometry.vertices.push
		(
			new THREE.Vector3( -halfWidth, -halfHeight, 0 )
		)
		
		geometry.faces.push
		(
			new THREE.Face3(2, 1, 0)
		)
		
		geometry.faces.push
		(
			new THREE.Face3(2, 0, 3)
		)
		
		geometry.faceVertexUvs[0].push([
			new THREE.Vector2(1, 0),
			new THREE.Vector2(1, 1),
			new THREE.Vector2(0, 1)
		], [
				new THREE.Vector2(1, 0),
				new THREE.Vector2(0, 1),
				new THREE.Vector2(0, 0)
		]);
		
		geometry.uvsNeedUpdate = true
		geometry.computeFaceNormals()
		geometry.computeVertexNormals()
		
		return geometry
	}
	
	export function createRectangleMesh(width:number, height:number, material_nullable:THREE.Material):THREE.Mesh
	{
		var geom = createRectangleGeometry(width,height)
		
		var rectangleMeshMaterial = material_nullable
		
		if(rectangleMeshMaterial == null)
		{
			rectangleMeshMaterial = new THREE.MeshBasicMaterial({
				color:0xff0000
			})	
		}
		
		var rectangleMesh = new THREE.Mesh(geom,rectangleMeshMaterial)
		
		return rectangleMesh
	}
	

	export function loadOBJFromWeb
	(
		url:string, 
		onComplete:(object3D:THREE.Object3D)=>void,
		onProgress?:(xhr:ProgressEvent)=>void,
		onFail?:()=>void		
	)
	{
		var loadManager = new THREE.LoadingManager()

		var objLoader = new THREE.OBJLoader(loadManager)
				
		objLoader.load
		(
			url, 
			_onComplete, 
			_onProgress, 
			_onFail
		)
		
		function _onComplete(object: THREE.Object3D)
		{
			onComplete(object)
		}
		
		function _onProgress(xhr:ProgressEvent)
		{
			
			if 
			(
				xhr.lengthComputable 
				&& (onProgress !== undefined && onProgress != null)
			) 
			{
				onProgress(xhr)
			}
			
		}

		function _onFail(xhr)
		{
			
			if(onFail !== undefined)
			{
				onFail()
			}
			
		}
		
			
	}

}