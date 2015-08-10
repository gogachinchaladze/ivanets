/// <reference path="../definitions/liquidfun/liquidfun.d.ts" />
/// <reference path="Exceptions.ts" />


module Ivane.LiquidFunHelpers
{
	export function createWorldAndRegisterItAsGlobalVariable(gravity:b2Vec2):b2World
	{
		var world = new b2World(gravity)
		window["world"] = world
		
		return world;
	}
		
	export function createDynamicBody(
		world_ref:b2World,
		shape:b2Shape, 
		density:number,
		friction:number,
		position:b2Vec2,
		linearDamping:number,
		angularDamping:number,
		fixedRotation:boolean,
		bullet:boolean,
		restitution:number
		):b2Body
	{
		var bodyDefinition = new b2BodyDef()
		bodyDefinition.active = true
		bodyDefinition.position = position
		bodyDefinition.angularDamping = angularDamping
		bodyDefinition.linearDamping = linearDamping
		bodyDefinition.bullet = bullet
		bodyDefinition.type = b2_dynamicBody
		
		var dynamicBody = world_ref.CreateBody(bodyDefinition)		
			
		var bodyFixtureDefinition = new b2FixtureDef()
		bodyFixtureDefinition.density = density
		bodyFixtureDefinition.friction = friction
		bodyFixtureDefinition.shape = shape
		bodyFixtureDefinition.restitution = restitution
		
		dynamicBody.CreateFixtureFromDef(bodyFixtureDefinition)
		
		return dynamicBody
	}
	
	export function createKinematicBody(
		world_ref:b2World,
		shape:b2Shape, 
		friction:number,
		position:b2Vec2,
		linearDamping:number,
		angularDamping:number,
		fixedRotation:boolean,
		bullet:boolean,
		restitution:number		
	):b2Body
	{
		var bodyDefinition = new b2BodyDef()
		bodyDefinition.active = true
		bodyDefinition.position = position
		bodyDefinition.angularDamping = angularDamping
		bodyDefinition.linearDamping
		bodyDefinition.bullet = bullet
		bodyDefinition.type = b2_kinematicBody
		
		var kinematicBody = world_ref.CreateBody(bodyDefinition)		
			
		var bodyFixtureDefinition = new b2FixtureDef()
		bodyFixtureDefinition.friction = friction
		bodyFixtureDefinition.shape = shape
		bodyFixtureDefinition.restitution = restitution
		
		kinematicBody.CreateFixtureFromDef(bodyFixtureDefinition)
		
		return kinematicBody		
	}
	
	export function createStaticBody(
		world_ref:b2World,
		shape:b2Shape, 
		friction:number,
		position:b2Vec2,
		restitution:number	
	):b2Body
	{
		var bodyDefinition = new b2BodyDef()
		bodyDefinition.active = true
		bodyDefinition.position = position
		bodyDefinition.type = b2_staticBody
		
		var staticBody = world_ref.CreateBody(bodyDefinition)		
			
		var bodyFixtureDefinition = new b2FixtureDef()
		bodyFixtureDefinition.friction = friction
		bodyFixtureDefinition.shape = shape
		bodyFixtureDefinition.restitution = restitution
		
		staticBody.CreateFixtureFromDef(bodyFixtureDefinition)
		
		return staticBody		
	}

}