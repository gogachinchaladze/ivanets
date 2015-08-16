///<reference path="../src/AnimationsManager.ts"/>
///<reference path="../src/DeltaTime.ts" />
///<reference path="../src/GameClassThreeJS.ts"/>
///<reference path="../src/ThreeJSHelpers.ts"/>
///<reference path="../src/LiquidFunHelpers.ts" />
/// <reference path="../src/AjaxHelpers.ts" />


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
//var world:b2World
	
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
			
			for
			(
				var subStepFunctionIndex = 0; 
				subStepFunctionIndex < this.subStepFunctions.length;
				subStepFunctionIndex++
			)
			{
				this.subStepFunctions[subStepFunctionIndex]()
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
	
	subStepFunctions:Function[] = new Array<Function>()
	
	lfWorld:b2World
	
	
	
	private test_liquidfun()
	{		
		const GRAVITY = new b2Vec2(0,-21)
		
		var physlogDiv = <HTMLDivElement>document.getElementById("physlog")
		var connectedBodiesDiv = <HTMLDivElement>document.getElementById("connectedbodies")
		
		this.lfWorld = Ivane.LiquidFunHelpers.createWorldAndRegisterItAsGlobalVariable(GRAVITY)
		
		console.log(this.lfWorld)
		

		
		// var dynamicCircle = Ivane.LiquidFunHelpers.createDynamicBody(
		// 	this.lfWorld,
		// 	circleShape,
		// 	1, 1, new b2Vec2(0,2),
		// 	2, 1, false, false,
		// 	1, null)
			
		//Testing kinematic body creation
		var boxShape = new b2PolygonShape()
		boxShape.SetAsBoxXY(500,1)
		
		var kinematicBody = Ivane.LiquidFunHelpers.createKinematicBody(
			this.lfWorld,
			boxShape,
			1,
			new b2Vec2(-5,-2),
			1, 1, true, false,
			0, null)
			
		//Testing static body creation function
		boxShape.SetAsBoxXY(5,1)
		var staticBody = Ivane.LiquidFunHelpers.createStaticBody(
			this.lfWorld,
			boxShape,
			1,
			new b2Vec2(0,-1.85),
			0, null)	
		
		//Testing disntace joint	
		boxShape.SetAsBoxXY(.5,.5)
		
		var CONNECTED_BODY = 1
			
		
		
		var timeStep = 1.0 / 60.0;
		var velocityIterations = 6
		var positionIterations = 2
		
		

		var animatePhysics = ()=>{
			this.lfWorld.Step(timeStep, velocityIterations, positionIterations);
			

			
			//requestAnimationFrame(animatePhysics)
		}	
		
		this.subStepFunctions.push(animatePhysics)
	}
	
	test_threejsHelpers()
	{
		var rectangleMesh = Ivane.ThreeJSHelpers.createRectangleMesh(1,2,null)
		
		this.scene.add(rectangleMesh)
				
		rectangleMesh.position.set(-5,0,0)
	}
	
	test_distance_and_revolute_joint_suspension()
	{
		var carBodyMesh = Ivane.ThreeJSHelpers.createRectangleMesh(6,2,null)
		var carLeftWheelMesh = Ivane.ThreeJSHelpers.createRectangleMesh(1,1,null)
		var carRightWheelMesh = Ivane.ThreeJSHelpers.createRectangleMesh(1,1,null)
		
		const CAR_BODY_COLLISION_CATEGORY = 0x0002
		const CAR_BODY_COLLISION_MASK = ~0x0002
		
		var carBodyCollisionFilter = new b2Filter()
		carBodyCollisionFilter.categoryBits = CAR_BODY_COLLISION_CATEGORY
		carBodyCollisionFilter.maskBits = CAR_BODY_COLLISION_MASK
		
		const CAR_BODY_INDEX = 10
		const CAR_LEFT_WHEEL_INDEX = 11
		const CAR_RIGHT_WHEEL_INDEX = 12
		
		const DISTANCE_JOINT_DAMPING = 1
		const DISTANCE_JOINT_HERZ = 21
		
		const X_OFFSET = 1
		
		var physicsBodyMeshes:THREE.Mesh[] = new Array<THREE.Mesh>()	
		
		physicsBodyMeshes[CAR_BODY_INDEX] = carBodyMesh
		physicsBodyMeshes[CAR_LEFT_WHEEL_INDEX] = carLeftWheelMesh
		physicsBodyMeshes[CAR_RIGHT_WHEEL_INDEX] = carRightWheelMesh
		
		for
		(
			var physicsBodyMeshIndex = 0;
			physicsBodyMeshIndex < physicsBodyMeshes.length;
			physicsBodyMeshIndex++
		)
		{
			this.scene.add( physicsBodyMeshes[physicsBodyMeshIndex] )	
		}
		
		//Creating car body and wheel carriers
		var carBodyShape = new b2PolygonShape()
		carBodyShape.SetAsBoxXY(3,1)
		
		const CAR_BODY_Y_OFFSET = 0.2
		
		var carBodyBody = Ivane.LiquidFunHelpers.createDynamicBody
		(
			this.lfWorld, carBodyShape, 1,0.1,new b2Vec2(0 + X_OFFSET,2 + CAR_BODY_Y_OFFSET),
			0.1,0.1,false, false,0,CAR_BODY_INDEX,carBodyCollisionFilter
		)
		
		var carWheelShape = new b2CircleShape()
		carWheelShape.radius = 0.1
		
		
		var carLeftWheelCarrierBody = Ivane.LiquidFunHelpers.createDynamicBody
		(
			this.lfWorld, carWheelShape, 1,0.1,new b2Vec2(-1.5 + X_OFFSET,1),
			0.1,0.1,false, false,0,0,null
		)
		
		var carRightWheelCarrierBody = Ivane.LiquidFunHelpers.createDynamicBody
		(
			this.lfWorld, carWheelShape, 1,0.1,new b2Vec2(1.5 + X_OFFSET,1),
			0.1,0.1,false, false,0,0,null
		)	
		
		//left wheel carrier joints creation
		Ivane.LiquidFunHelpers.createDistanceJoint
		(
			this.lfWorld, carBodyBody, carLeftWheelCarrierBody,
			new b2Vec2(-2,-1 - CAR_BODY_Y_OFFSET), 
			new b2Vec2(0,0), DISTANCE_JOINT_DAMPING,DISTANCE_JOINT_HERZ
		)
		
		Ivane.LiquidFunHelpers.createDistanceJoint
		(
			this.lfWorld, carBodyBody, carLeftWheelCarrierBody,
			new b2Vec2(-1,-1 - CAR_BODY_Y_OFFSET), 
			new b2Vec2(0,0), DISTANCE_JOINT_DAMPING,DISTANCE_JOINT_HERZ
		)		
		
		//righ wheel carrier joints creation 	
		Ivane.LiquidFunHelpers.createDistanceJoint
		(
			this.lfWorld, carBodyBody, carRightWheelCarrierBody,
			new b2Vec2(1,-1 - CAR_BODY_Y_OFFSET), 
			new b2Vec2(0,0), DISTANCE_JOINT_DAMPING,DISTANCE_JOINT_HERZ
		)
		
		Ivane.LiquidFunHelpers.createDistanceJoint
		(
			this.lfWorld, carBodyBody, carRightWheelCarrierBody,
			new b2Vec2(2,-1 - CAR_BODY_Y_OFFSET), 
			new b2Vec2(0,0), DISTANCE_JOINT_DAMPING,DISTANCE_JOINT_HERZ
		)	
		
		//Creating left and right wheel and attaching them to wheel carriers
		carWheelShape.radius = 0.5
		
		var carLeftWheelBody = Ivane.LiquidFunHelpers.createDynamicBody
		(
			this.lfWorld, carWheelShape, 1,1,new b2Vec2(-1.5 + X_OFFSET,1),
			0.1,0.1,false, false,0,CAR_LEFT_WHEEL_INDEX,carBodyCollisionFilter
		)			
		
		Ivane.LiquidFunHelpers.createRevoluteJoint
		(
			this.lfWorld,
			carLeftWheelCarrierBody, 
			carLeftWheelBody, 
			carLeftWheelBody.GetWorldCenter()
		)	
		
		var carRightWheelBody = Ivane.LiquidFunHelpers.createDynamicBody
		(
			this.lfWorld, carWheelShape, 1,1,new b2Vec2(1.5 + X_OFFSET,1),
			0.1,0.1,false, false,0,CAR_RIGHT_WHEEL_INDEX,carBodyCollisionFilter
		)	
		
		var revoluteJoint = Ivane.LiquidFunHelpers.createRevoluteJoint
		(
			this.lfWorld,
			carRightWheelCarrierBody, 
			carRightWheelBody, 
			carRightWheelBody.GetWorldCenter()
		)		
		
		var localCenter = new b2Vec2(0,0)
		

		
		console.log(carBodyBody)
		
		var getLocalPointDiv = <HTMLDivElement>document.getElementById("GetLocalPoint")
		
		var worldPoint:b2Vec2 = new b2Vec2(0,0)
		var localPoint:b2Vec2 = new b2Vec2(0,0)
		
		var renderDistanceJointSuspension = ()=>{
			
			for
			(
				var bodyIndex = 0; 
				bodyIndex < this.lfWorld.bodies.length;
				bodyIndex++
			)
			{
				var physicsBody = this.lfWorld.bodies[bodyIndex]
				var meshIndex = physicsBody.GetUserData()
				
				if
				(
					meshIndex >= CAR_BODY_INDEX
					&& meshIndex <= CAR_RIGHT_WHEEL_INDEX
				)
				{
					var bodyMesh = physicsBodyMeshes[meshIndex]
					
					var physicsBodyPosition = physicsBody.GetPosition()
					var physicsBodyRotation = physicsBody.GetAngle()
					
					bodyMesh.position.set
					(
						physicsBodyPosition.x,
						physicsBodyPosition.y,
						0
					)
					
					bodyMesh.rotation.z = physicsBodyRotation
					
					const TORQUE_AMMOUNT = 8
					
					if(this.inputsManager.keyIsDown(Ivane.Inputs.KeyCodes.left_arrow))
					{
						carLeftWheelBody.ApplyTorque(TORQUE_AMMOUNT,true)
						carRightWheelBody.ApplyTorque(TORQUE_AMMOUNT,true)		
					}
					
					if(this.inputsManager.keyIsDown(Ivane.Inputs.KeyCodes.right_arrow))
					{
						carLeftWheelBody.ApplyTorque(-TORQUE_AMMOUNT,true)
						carRightWheelBody.ApplyTorque(-TORQUE_AMMOUNT,true)	
					}
					
					
				}
			}
			
			worldPoint.x = this.mouseXYMainOrthoCameraWorld.x
			worldPoint.y = this.mouseXYMainOrthoCameraWorld.y
			
			localPoint = carBodyBody.GetLocalPoint(worldPoint)
			
			var testPoint = carBodyBody.fixtures[0].TestPoint(worldPoint)
			
			getLocalPointDiv.innerHTML = "<pre>"
			+ "carBodyBody::GetLocalPoint for"
			+ "\n x: " + worldPoint.x
			+ "\n y: " + worldPoint.y
			+ "\n is \n x: " + localPoint.x
			+ "\n y: " + localPoint.y
			+ "\n testPoint: " + testPoint
			+ "</pre>"
			
			this.mainOrthoCamera.position.x = carBodyBody.GetPosition().x
		}
		
		this.subStepFunctions.push(renderDistanceJointSuspension)
	}
	
	test_ajax_request()
	{
		var AJAX = Ivane.Network.Ajax
		
		AJAX.createAJAXRequest
		(
			"/test/download_test.txt",
			AJAX.REQUEST_TYPES.GET,
			null,
			(result)=>{
				console.log("ajax onResult")
				console.log(result)
			},
			()=>{
				console.log("ajax onFail")
			}
		)
	}
	
	runtTests()
	{
		this.test_mergeGeometry()
		this.test_liquidfun()
		//this.test_threejsHelpers()
		this.test_distance_and_revolute_joint_suspension()
		this.test_ajax_request()
	}
}

function test_GameClassThreeJS()
{
	var gc = new GClass()
	
	gc.addGrid()
	gc.run()
	gc.runtTests()
	
	
}
