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
	
	export function createDistanceJoint(
		world_ref:b2World,
		bodyA:b2Body,
		bodyB:b2Body,
		anchorA:b2Vec2,
		anchorB:b2Vec2,
		length:number,
		dampingRatio:number,//1 is recomended
		frequencyHz:number//4 is recomended
		):b2DistanceJoint
	{
		var distanceJointDef = new b2DistanceJointDef()
		distanceJointDef.length = length
		distanceJointDef.dampingRatio = dampingRatio
		distanceJointDef.frequencyHz = frequencyHz
		
		distanceJointDef.InitializeAndCreate(bodyA,bodyB,anchorA,anchorB)
		
		distanceJointDef.localAnchorA.Set(anchorA.x,anchorA.y)
		distanceJointDef.localAnchorB.Set(anchorB.x,anchorB.y)
		
		var distanceJoint = <b2DistanceJoint>world_ref.CreateJoint(distanceJointDef)
		
		return distanceJoint
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
		restitution:number,
		userData:number
		):b2Body
	{
		var bodyDefinition = new b2BodyDef()
		bodyDefinition.active = true
		bodyDefinition.position = position
		bodyDefinition.angularDamping = angularDamping
		bodyDefinition.linearDamping = linearDamping
		bodyDefinition.bullet = bullet
		bodyDefinition.type = b2_dynamicBody
		bodyDefinition.userData = userData
		
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
		restitution:number,
		userData:number		
	):b2Body
	{
		var bodyDefinition = new b2BodyDef()
		bodyDefinition.active = true
		bodyDefinition.position = position
		bodyDefinition.angularDamping = angularDamping
		bodyDefinition.linearDamping
		bodyDefinition.bullet = bullet
		bodyDefinition.type = b2_kinematicBody
		bodyDefinition.userData = userData
		
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
		restitution:number,
		userData:number	
	):b2Body
	{
		var bodyDefinition = new b2BodyDef()
		bodyDefinition.active = true
		bodyDefinition.position = position
		bodyDefinition.type = b2_staticBody
		bodyDefinition.userData = userData
		
		var staticBody = world_ref.CreateBody(bodyDefinition)		
			
		var bodyFixtureDefinition = new b2FixtureDef()
		bodyFixtureDefinition.friction = friction
		bodyFixtureDefinition.shape = shape
		bodyFixtureDefinition.restitution = restitution
		
		staticBody.CreateFixtureFromDef(bodyFixtureDefinition)
		
		return staticBody		
	}

}