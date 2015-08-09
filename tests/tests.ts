///<reference path="../src/AnimationsManager.ts"/>
///<reference path="../src/DeltaTime.ts" />
///<reference path="../src/GameClassThreeJS.ts"/>
///<reference path="../src/ThreeJSHelpers.ts"/>

var animationsManager = new Ivane.Animation.AnimationsManager(32)


animationsManager.queueAnimation(1,100,2,
	Ivane.Animation.EASING_TYPES.EASE_IN_EASE_OUT,
	(animation)=>{
		console.log(animation.getProgress())
	},
	(animation)=>{
		console.log(animation.getProgress())
		console.log("animation finished")
	})
	


var dt:number = 0.0	
	
window.onload = (e:Event) => {

	test_GameClassThreeJS()	
}	

class GClass extends Ivane.ThreeJSHelpers.GameClassThreeJS
{
	logDiv:HTMLDivElement
	
	constructor()
	{
		super()
		
		
		this.logDiv = <HTMLDivElement>document.getElementById("log")
		
		this.initWithOrthoCamera(
			{
			heigh:10,
			near:1,
			far:100
		},
		{
			viewWidth:800,
			viewHeight:600,
			clearColor:0xdcdcdc
		},
		document.body
		)
		
		this.setEnableMiddleMouseCameraDrag(true)
	}
	
	
	
	gameStep()
	{
		//console.log(this.deltaTime)
	
			
			this.logDiv.innerHTML = "x: "+this.mouseXYMainOrthoCameraView.x 
			+ "<br/>y: " + this.mouseXYMainOrthoCameraView.y
			
			if(this.inputsManager.mouseIsDown && 
				this.inputsManager.mouseButonsBitMap & Ivane.Inputs.MOUSE_BUTTONS.LEFT)
			{
				this.sphereMesh.position.x = this.mouseXYMainOrthoCameraWorld.x
				this.sphereMesh.position.y = this.mouseXYMainOrthoCameraWorld.y
			}
			
			if(this.inputsManager.mouseDown)
			{
				console.log("mouse down")
		
			}
			
			
			if(this.inputsManager.mouseUp)
			{
				console.log("mouse up")
			}
			
			if(this.inputsManager.keyIsDown(Ivane.Inputs.KeyCodes.d))
			{
				this.sphereMesh.position.x += 0.1
			}
			
			if(this.inputsManager.keyIsDown(Ivane.Inputs.KeyCodes.a))
			{
				this.sphereMesh.position.x -= 0.1
			}
			
			if(this.inputsManager.keyIsDown(Ivane.Inputs.KeyCodes.w))
			{
				this.sphereMesh.position.y += 0.1
			}
			
			if(this.inputsManager.keyIsDown(Ivane.Inputs.KeyCodes.s))
			{
				this.sphereMesh.position.y -= 0.1
			}
		
	}
	
	sphereMesh:THREE.Mesh
	addGrid()
	{
		var sphereGeom = new THREE.SphereGeometry(1)
		var basicMaterial =new THREE.MeshBasicMaterial({
			color:0xff0000
		})
		
		this.sphereMesh  = new THREE.Mesh(sphereGeom, basicMaterial)
		
		this.scene.add(this.sphereMesh)
		
		Ivane.ThreeJSHelpers.addGrid(this.scene)	
	}
	
	private test_mergeGeometry()
	{
		var geom1 = new THREE.BoxGeometry(1,1,1)
		var basicMaterial = new THREE.MeshBasicMaterial({
			color: 0x00ff00
		})
		
		var geom2 = new THREE.SphereGeometry(3)
		
		var translateVertex = new THREE.Vector3(-3,-3,0)
		
		for(var vertexIndex = 0; vertexIndex < geom2.vertices.length; vertexIndex++)
		{
			geom2.vertices[vertexIndex].add(translateVertex)
		}
		
		THREE.GeometryUtils.merge(geom1, geom2)
		
		var mesh = new THREE.Mesh(geom1,basicMaterial)
		
		this.scene.add(mesh)
		
		mesh.position.x = -2
		
		mesh.position.set(-2,-2,0)
	}
	
	runtTests()
	{
		this.test_mergeGeometry()
	}
}

function test_GameClassThreeJS()
{
	var gc = new GClass()
	
	gc.addGrid()
	gc.run()
	gc.runtTests()
	
	
}
