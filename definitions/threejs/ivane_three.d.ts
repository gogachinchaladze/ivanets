/// <reference path="three.d.ts" />

declare module THREE
{
	export class OBJLoader
	{
		constructor(loadinmanager:THREE.LoadingManager);
		load(url:string, onComplete:Function, onProgress:Function, onError:Function);
	}
}
