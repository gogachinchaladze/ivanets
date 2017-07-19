/// <reference path="DeltaTime.ts" />


module Ivane.DOMHelpers {
	
	export enum POSITION_MODES
	{
		RELATIVE,
		ABSOLUTE,
		FIXED
	}
	
	function convertPositionModeToString(positionMode:POSITION_MODES):string
	{
		var positionModeString = ""
		
		switch(positionMode)
		{
			case POSITION_MODES.ABSOLUTE:
			positionModeString = "absolute"
			break
			
			case POSITION_MODES.FIXED:
			positionModeString = "fixed"
			break
			
			case POSITION_MODES.RELATIVE:
			positionModeString = "relative"
			break
			
		}
		
		return positionModeString
	}
	
	export enum DISPLAY_MODES
	{
		BLOCK,
		INLINE,
		NONE
	}
	
	function covertDisplayModeToString(displayMode:DISPLAY_MODES):string
	{
		var displayModeString = ""
		
		switch(displayMode)
		{
			case DISPLAY_MODES.BLOCK:
			displayModeString = "block"
			break
			
			case DISPLAY_MODES.INLINE:
			displayModeString = "inline"
			break
			
			case DISPLAY_MODES.NONE:
			displayModeString = "none"
			break
		}
		
		return displayModeString		
	}
	
	export class EXTHTMLElement
	{
		static createEXTDiv():EXTHTMLElement
		{
			var div = document.createElement("div")
			
			var extHTMLElement = new EXTHTMLElement()
			
			extHTMLElement.domElement = div
						
			return extHTMLElement
		}
		
		private domElement:HTMLElement
		
		getDOMElement():HTMLElement
		{
			return this.domElement
		}
		
		setDisplayMode(displayMode:DISPLAY_MODES):EXTHTMLElement
		{
			this.domElement.style.display = covertDisplayModeToString(displayMode)
			
			return this
		}
		
		setPositionMode(positionMode:POSITION_MODES):EXTHTMLElement
		{
			this.domElement.style.position = convertPositionModeToString(positionMode)
			
			return this
		}
		
		setLeftInPixels(pixels:number):EXTHTMLElement
		{
			this.domElement.style.left = pixels + "px"
			
			return this
		}	
		
		setTopInPixels(pixels:number):EXTHTMLElement
		{
			this.domElement.style.top = pixels + "px"
			
			return this
		}	
		
		setRightInPixels(pixels:number):EXTHTMLElement
		{
			this.domElement.style.right = pixels + "px"
			
			return this
		}	
		
		setBottomInPixels(pixels:number):EXTHTMLElement
		{
			this.domElement.style.bottom = pixels + "px"
			
			return this
		}
		
		setBackgroundColor(color:number):EXTHTMLElement
		{
			this.domElement.style.backgroundColor = "#"+color.toString(16)
			
			return this
		}	
		
		getBackgroundColor():number
		{
			return parseInt(this.domElement.style.backgroundColor.replace("#",""),16)
		}	
		
		setWidthInPixels(width:number):EXTHTMLElement
		{
			this.domElement.style.width = width + "px"
			
			return this
		}
	
		getWidth():number
		{
			return parseInt(this.domElement.style.width)
		}
		
		setHeightInPixels(height:number):EXTHTMLElement
		{
			this.domElement.style.height = height + "px"
			
			return this
		}
		
		getHeight():number
		{
			return parseInt(this.domElement.style.height)
		}
		
		setZRotaion(rotationDegrees:number):EXTHTMLElement
		{
			this.domElement.style.transform = "rotate("+rotationDegrees+"deg)"
			
			return this
		}
		
		setZIndex(zIndex:number):EXTHTMLElement
		{
			this.domElement.style.zIndex = zIndex.toString()
			
			return this
		}		
	}
	
}