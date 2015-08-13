/*
 * Author Ivane Gegia http://ivane.info
 */

///<reference path="../definitions/threejs/three.d.ts" />
///<reference path="DeltaTime.ts"/>
///<reference path="CanvasInputsManager.ts"/>
///<reference path="ThreeJSHelpers.ts"/>

module Ivane.ThreeJSHelpers
{
	
	
	export interface OrthoCameraSettings
	{
		heigh:number
		near:number //1 default
		far:number //1000 default
	}
	
	export interface WebGLRendererSettings
	{
		viewWidth:number
		viewHeight:number
		clearColor:number
	}
	
	export class GameClassThreeJS
	{
		scene:THREE.Scene
		renderer:THREE.WebGLRenderer
		mainOrthoCamera:THREE.OrthographicCamera
		deltaTime:number
		inputsManager:Ivane.Inputs.CanvasInputsManager	
		mouseXYMainOrthoCameraView:THREE.Vector2 = new THREE.Vector2(0.0,0.0)
		mouseXYMainOrthoCameraWorld:THREE.Vector3 = new THREE.Vector3(0.0,0.0,0.0)
		
		private deltaTimeComputer:Ivane.Time.DeltaTimeComputer
		private enableMiddleMouseCameraDrag:boolean = false
		private initWithOrthoCameraCalled:boolean = false
		private disableDefaultRenderer:boolean = false
		
		setEnableMiddleMouseCameraDrag(enable:boolean):void
		{
			this.enableMiddleMouseCameraDrag = enable
		}
		
		setDisableDefaultRenderer(disable:boolean):void
		{
			this.disableDefaultRenderer = disable
		}
								
		initWithOrthoCamera(cameraSettings:OrthoCameraSettings,
			rendererSettings:WebGLRendererSettings,
			rendererContainer:HTMLElement):void
		{
			this.scene = new THREE.Scene()
			
			var viewRatio = rendererSettings.viewWidth / rendererSettings.viewHeight
			
			this.mainOrthoCamera = new THREE.OrthographicCamera(-cameraSettings.heigh * viewRatio,
				cameraSettings.heigh * viewRatio,
				cameraSettings.heigh,
				-cameraSettings.heigh,
				cameraSettings.near,
				cameraSettings.far)
			this.scene.add(this.mainOrthoCamera)
			this.mainOrthoCamera.position.set(0,0,10)
			
			this.renderer = new THREE.WebGLRenderer()
			this.renderer.setClearColor(rendererSettings.clearColor)
			this.renderer.setSize(rendererSettings.viewWidth,
				rendererSettings.viewHeight)
					
			rendererContainer.appendChild(this.renderer.domElement)
			
			this.deltaTimeComputer = new Ivane.Time.DeltaTimeComputer()
			this.deltaTime = this.deltaTimeComputer.getDeltaTimeInSeconds()
			
			this.inputsManager = new Ivane.Inputs.CanvasInputsManager()
			this.inputsManager.startProcessingInputFor(this.renderer.domElement)
			
			this.initWithOrthoCameraCalled = true
		}
		
		getMouseCameraCoordinatesInOrthoCamera(mouseXY_out:THREE.Vector2)
		{
			Ivane.ThreeJSHelpers.getOrtho2DCoordinatesFromPixelCoordinates(
				this.renderer.domElement.width,
				this.renderer.domElement.height,
				this.inputsManager.mouseXY.x,
				this.inputsManager.mouseXY.y,
				this.mainOrthoCamera,
				mouseXY_out
			)
			
			
		}
		
		run():void
		{
			if(this.initWithOrthoCameraCalled == false)
			{
				console.error("GameClassThreeJS.initWithOrthoCamera was not called!")	
			}
			
			this.animationFrameFunction()
		}

		private defaultRender()
		{
			if(this.mainOrthoCamera)
			{
				this.renderer.render(this.scene,this.mainOrthoCamera)
			}
		}
		
		
		private animationFrameFunction()
		{
			this.deltaTime = this.deltaTimeComputer.getDeltaTimeInSeconds()
			
			this.inputsManager.processInput()
			this.getMouseCameraCoordinatesInOrthoCamera(this.mouseXYMainOrthoCameraView)
			
			this.mouseXYMainOrthoCameraWorld.set(
				this.mouseXYMainOrthoCameraView.x + this.mainOrthoCamera.position.x,
				this.mouseXYMainOrthoCameraView.y + this.mainOrthoCamera.position.y,
				this.mainOrthoCamera.position.z)
				
			this.dragOrthoCameraWithMouseMIddleButtonIfDragEnabled()

			this.gameStep()
			
			if(this.disableDefaultRenderer == false)
			{
				this.defaultRender()	
			}			
			
			requestAnimationFrame(()=>{
				this.animationFrameFunction()
			})
		}
			
		private dragOrthoCameraWithMouseMIddleButtonIfDragEnabled():void
		{
			if( this.enableMiddleMouseCameraDrag
				&& this.inputsManager.mouseIsDown
				&& this.inputsManager.mouseButonsBitMap & Ivane.Inputs.MOUSE_BUTTONS.MIDDLE)
			{
				var pixelToUnitsRatio = this.mainOrthoCamera.top * 2 / this.renderer.domElement.height 
				this.mainOrthoCamera.position.x -= this.inputsManager.mouseDeltaXY.x * pixelToUnitsRatio
				this.mainOrthoCamera.position.y += this.inputsManager.mouseDeltaXY.y * pixelToUnitsRatio
			}
		}
			
		gameStep():void
		{
			throw new Ivane.Exceptions.NotImplemetedException()
		}
	}
}

class mc extends Ivane.ThreeJSHelpers.GameClassThreeJS
{
	gameStep()
	{
		
	}
}
