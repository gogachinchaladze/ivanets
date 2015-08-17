/// <reference path="../../Ivane_Main.ts" />

class GClass extends Ivane.ThreeJSHelpers.GameClassThreeJS {
	logDiv: HTMLDivElement

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
	}
}