/// <reference path="../Ivane_Main.ts" />

class GameClass extends Ivane.ThreeJSHelpers.GameClassThreeJS {

	constructor() {
		super()

		this.initWithOrthoCamera
		(
			{
				heigh: 10,
				near: 1,
				far: 100
			},
			{
				viewWidth: 800,
				viewHeight: 600,
				clearColor: 0xdcdcdc
			},
			document.body
		)

		this.setEnableMiddleMouseCameraDrag(true)
	}


	gameStep() {
		console.log(this.deltaTime)
	}
}


window.onload = () => {
	var gClass = new GameClass()
	
	gClass.run()
}