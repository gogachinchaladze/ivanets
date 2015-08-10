/// <reference path="../../definitions/threejs/three.d.ts" />

function addBufferGeometry(scene:THREE.Scene):void
{
	var bufferGeometry = new THREE.BufferGeometry()

	var vertexPositions = [
		[-1.0, -1.0, 0.0],
		[ 1.0, -1.0, 0.0],
		[ 1.0,  1.0, 0.0],

		[ 1.0,  1.0, 0.0],
		[-1.0,  1.0, 0.0],
		[-1.0, -1.0, 0.0]
	]

	var vertexFloat32Array = new Float32Array(vertexPositions.length * 3)

	for(var vertexIndex = 0; vertexIndex < vertexPositions.length; vertexIndex++)
	{
		vertexFloat32Array[ vertexIndex * 3 + 0 ] = vertexPositions[vertexIndex][0]
		vertexFloat32Array[ vertexIndex * 3 + 1 ] = vertexPositions[vertexIndex][1]
		vertexFloat32Array[ vertexIndex * 3 + 2 ] = vertexPositions[vertexIndex][2]
	}

	vertexFloat32Array[100] = 43.9

	var vertexPositionBufferAttribute = new THREE.BufferAttribute(vertexFloat32Array, 3)

	bufferGeometry.addAttribute("position", vertexPositionBufferAttribute)
	
	var vertexColors = [
		[1, 0, 0],
		[0, 1, 0],
		[0, 0, 1],
		
		[0, 0, 1],
		[0, 1, 0],
		[1, 0, 0]
	]
	
	var vertexColorFloat32Array = new Float32Array(vertexColors.length * 3)
	
	for(var vertexIndex = 0; vertexIndex < vertexColors.length; vertexIndex++)
	{
		vertexColorFloat32Array[ vertexIndex * 3 + 0 ] = vertexColors[vertexIndex][0]
		vertexColorFloat32Array[ vertexIndex * 3 + 1 ] = vertexColors[vertexIndex][1]
		vertexColorFloat32Array[ vertexIndex * 3 + 2 ] = vertexColors[vertexIndex][2]
	}
	
	var vertexColorBufferAttribute = new THREE.BufferAttribute(vertexColorFloat32Array, 3)
	
	bufferGeometry.addAttribute("color", vertexColorBufferAttribute)
	
	var material = new THREE.MeshBasicMaterial({
		vertexColors: THREE.VertexColors
	})
	
	var bufferGeometryMesh = new THREE.Mesh(bufferGeometry, material)

	scene.add(bufferGeometryMesh)
	
	console.log(bufferGeometry.attributes)
	
	var y = -1;
	
	function animateBufferMesh()
	{
		//y -= 0.01
		vertexPositionBufferAttribute.setY(1,y)
		vertexPositionBufferAttribute.needsUpdate = true
		
		requestAnimationFrame(animateBufferMesh)
	}
	
	animateBufferMesh()
}