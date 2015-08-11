/// <reference path="Exceptions.ts" />


module Ivane.Assertion
{
	export function DynamicAssert(condition:boolean,errorMessage:string):void
	{
		if(!condition)
		{
			console.log(errorMessage)
			throw new Ivane.Exceptions.DynamicAssertionError()
		}
	}
}