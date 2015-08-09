///<reference path="../definitions/threejs/three.d.ts"/>
///<reference path="Exceptions.ts"/>

module Ivane.Inputs
{
	export class MouseXY
	{
		x:number = 0
		y:number = 0
	}
	
	export enum MOUSE_BUTTONS
	{
		LEFT = 1,
		RIGHT = 2,
		MIDDLE = 4
	}
			
	export class CanvasInputsManager 
	{
		private canvas:HTMLCanvasElement	
		
		mouseXY:MouseXY
		mouseDeltaXY:MouseXY
		mouseUp:boolean = false
		mouseIsDown:boolean = false
		mouseDown:boolean = false
		mouseButonsBitMap:number = 0
				
		private realTimeMouseXY:MouseXY
		private mouseDeltaXYAccumulator:MouseXY
		
		private realTimeMouseIsDown:boolean = false
		private realTimeMouseClicked:boolean = false
		private realTimeMouseIsUp:boolean = true
		private mouseDownRegisteredOnce:boolean = false
		
		private keysWhichAreDown:boolean[]
				
		constructor()
		{
			this.realTimeMouseXY = new MouseXY()
			this.mouseXY = new MouseXY()
			this.mouseDeltaXY = new MouseXY() 
			this.mouseDeltaXYAccumulator = new MouseXY()
			
			this.initKeyProcessingBuffers()
		}
		
		private initKeyProcessingBuffers()
		{
			this.keysWhichAreDown = new Array<boolean>(KeyCodes.single_quote)
			
			for(let keyIndex = 0; keyIndex < this.keysWhichAreDown.length; keyIndex++)
			{
				this.keysWhichAreDown[keyIndex] = false
			}
		}
		
		keyIsDown(keyCode:KeyCodes):boolean
		{
			return this.keysWhichAreDown[keyCode]
		}
		
		private mousePreviousScreenXY:MouseXY = new MouseXY()
		private mouseCurrentScreenXY:MouseXY = new MouseXY()
						
		startProcessingInputFor(canvas:HTMLCanvasElement)
		{
			this.canvas = canvas
			
			this.canvas.addEventListener("mousemove", (ev:MouseEvent)=>{
				this.realTimeMouseXY.x = ev.offsetX
				this.realTimeMouseXY.y = ev.offsetY
								

				this.mouseCurrentScreenXY.x = ev.screenX
				this.mouseCurrentScreenXY.y = ev.screenY
				
				if(this.mousePreviousScreenXY.x == 0)
				{
					this.mousePreviousScreenXY.x = this.mouseCurrentScreenXY.x
					this.mousePreviousScreenXY.y = this.mouseCurrentScreenXY.y
				}
				
				this.mouseDeltaXYAccumulator.x += this.mouseCurrentScreenXY.x - this.mousePreviousScreenXY.x
				this.mouseDeltaXYAccumulator.y += this.mouseCurrentScreenXY.y - this.mousePreviousScreenXY.y
				
				this.mousePreviousScreenXY.x = this.mouseCurrentScreenXY.x
				this.mousePreviousScreenXY.y = this.mouseCurrentScreenXY.y
		
			})
			
			this.canvas.addEventListener("mousedown", (ev:MouseEvent)=>{
				this.realTimeMouseIsDown = true
				this.realTimeMouseIsUp = false
				this.mouseDownRegisteredOnce = false
				
				this.mouseButonsBitMap = ev.buttons
			})
			
			this.canvas.addEventListener("mouseup", (ev:MouseEvent)=>{
				
				/* 
				Checking weather mouse was down, bacause it could be downed
				outside canvas boundries and upped on the canvas, this shell
				not register as click.
				*/
				if(this.realTimeMouseIsDown && this.realTimeMouseClicked == false)
				{
					this.realTimeMouseClicked = true
				}
				
				/*
				Taking note that mouse is up, not falsing 
				realTimeMouseIsDown until processInput
				*/
				this.realTimeMouseIsUp = true
			})
			
			document.body.addEventListener("keydown",(ev:KeyboardEvent)=>{
				this.keysWhichAreDown[ev.keyCode] = true
			})
			
			document.body.addEventListener("keyup",(ev:KeyboardEvent)=>{
				this.keysWhichAreDown[ev.keyCode] = false
			})
			
		}	
		
		//shell be called after openTimeFrame and before game logic and rendering
		processInput()
		{

			this.mouseXY.x = this.realTimeMouseXY.x
			this.mouseXY.y = this.realTimeMouseXY.y
			
			this.mouseDeltaXY.x = this.mouseDeltaXYAccumulator.x
			this.mouseDeltaXY.y = this.mouseDeltaXYAccumulator.y	
			
			this.mouseUp = this.realTimeMouseClicked
			this.mouseIsDown = this.realTimeMouseIsDown
			
			//Make mouseDown == true only for one frame
			if(this.mouseDownRegisteredOnce == false
				&& this.realTimeMouseIsDown == true)
			{
				this.mouseDown = this.realTimeMouseIsDown	
				this.mouseDownRegisteredOnce = true
			}
			else
			{
				this.mouseDown = false
			}
			
			
			
			this.realTimeMouseClicked = false
			
			if(this.realTimeMouseIsUp)
			{
				this.realTimeMouseIsDown = false	
			}
			
			this.mouseDeltaXYAccumulator.x = 0.0
			this.mouseDeltaXYAccumulator.y = 0.0
		}
		
		
	}
	
	export enum KeyCodes
	{
		backspace = 8,
		tab = 9,
		enter = 13,
		shift = 16,
		ctrl = 17,
		alt = 18,
		pause_or_break = 19,
		caps_lock = 20,
		escape = 27,
		page_up = 33,
		page_down = 34,
		end = 35,
		home = 36,
		left_arrow = 37,
		up_arrow = 38,
		right_arrow = 39,
		down_arrow = 40,
		insert = 45,
		delete = 46,
		_0 = 48,
		_1 = 49,
		_2 = 50,
		_3 = 51,
		_4 = 52,
		_5 = 53,
		_6 = 54,
		_7 = 55,
		_8 = 56,
		_9 = 57,
		a = 65,
		b = 66,
		c = 67,
		d = 68,
		e = 69,
		f = 70,
		g = 71,
		h = 72,
		i = 73,
		j = 74,
		k = 75,
		l = 76,
		m = 77,
		n = 78,
		o = 79,
		p = 80,
		q = 81,
		r = 82,
		s = 83,
		t = 84,
		u = 85,
		v = 86,
		w = 87,
		x = 88,
		y = 89,
		z = 90,
		left_window_key = 91,
		right_window_key = 92,
		select_key = 93,
		numpad_0 = 96,
		numpad_1 = 97,
		numpad_2 = 98,
		numpad_3 = 99,
		numpad_4 = 100,
		numpad_5 = 101,
		numpad_6 = 102,
		numpad_7 = 103,
		numpad_8 = 104,
		numpad_9 = 105,
		multiply = 106,
		add = 107,
		subtract = 109,
		decimal_point = 110,
		divide = 111,
		f1 = 112,
		f2 = 113,
		f3 = 114,
		f4 = 115,
		f5 = 116,
		f6 = 117,
		f7 = 118,
		f8 = 119,
		f9 = 120,
		f10 = 121,
		f11 = 122,
		f12 = 123,
		num_lock = 144,
		scroll_lock = 145,
		semi_colon = 186,
		equal_sign = 187,
		comma = 188,
		dash = 189,
		period = 190,
		forward_slash = 191,
		grave_accent = 192,
		open_bracket = 219,
		back_slash = 220,
		close_braket = 221,
		single_quote = 222
	}
	
}