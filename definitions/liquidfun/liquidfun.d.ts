declare class b2Vec2
{
    constructor(x:number,y:number);
    Set(newX:number, newY:number);
    Clone();

    x:number
    y:number
}

declare class b2Filter
{
    categoryBits:number
    maskBits:number
    groupIndex:number
}

declare class b2BodyDef
{
    type:any
    position:b2Vec2
    linearDamping:number
    angularDamping:number
    fixedRotation:boolean
    bullet:boolean
    active:boolean
    userData:any
    filter:b2Filter
}

declare class b2Fixture
{
    SetDensity(density:number);
    SetFilterData(filterData:b2Filter);

    GetFriction():number;
    SetFriction(friction:number):void;

    GetRestitution():number;
    SetRestitution(restitution:number):void;

    GetBody():b2Body;
}

declare class b2MassData
{

}

declare class b2Body
{
    CreateFixtureFromShape(shape:b2Shape, density:number):b2Fixture;
    CreateFixtureFromDef(fixtureDefinition:b2FixtureDef):b2Fixture;

    GetPosition():b2Vec2;
    GetAngle():number;
    GetMass():number;
    GetInertia():number;
    GetLocalCenter():b2Vec2;

    SetType(type:any);
    GetType():any;

    SetBullet(flag:boolean);
    IsBullet():boolean;

    SetSleepingAllowed(flag:boolean);
    IsSleepingAllowed():boolean;

    SetAwake(flag:boolean);
    IsAwake():boolean;

    SetActive(flag:boolean);
    IsActive():boolean;

    SetFixedRotation(flag:boolean);
    IsFixedRotation():boolean;

    GetWorldCenter():b2Vec2;
    GetLocalCenter():b2Vec2;
    ResetMassData();

    DestroyFixture(fixture:b2Fixture):void;

    SetLinearVelocity(lVelocity:b2Vec2):void;
    GetLinearVelocity():b2Vec2;

    SetAngularVelocity(omega:number):void;
    GetAngularVelocity():number;

    ApplyForce(force:b2Vec2, point:b2Vec2, wake:boolean):void;
    ApplyForceToCenter(force:b2Vec2,wake:boolean):void;

    ApplyTorque(torque:number, wake:boolean):void;

    ApplyLinearImpulse(impulse:b2Vec2, point:b2Vec2, wake:boolean):void;
    ApplyAngularImpulse(impulse:number, wake:boolean):void;

    GetMass():number;
    GetInertia():number;

    GetWorldPoint(localPoint:b2Vec2):b2Vec2;

    SetGravityScale(gScale:number):void;

    SetSleepingAllowed(flag:boolean):void;
    IsSleepingAllowed():boolean;

    SetAwake(flag:boolean):void;
    IsAwake():boolean;

    SetActive(flag:boolean):void;
    IsActive():boolean;

    GetPositionX():number;
    GetPositionY():number;
    SetTransform(position:b2Vec2,angle:number):void;


    SetLinearVelocity(v:b2Vec2):void;
    GetLinearVelocity():b2Vec2;


    SetAngularVelocity(omega:number):void;
    GetAngularVelocity():number;
}

interface b2QueryCallback
{
    ReportFixture(fixture:b2Fixture):boolean;
}

declare class b2AABB
{
    lowerBound:b2Vec2
    upperBound:b2Vec2
}

interface b2RayCastCallback
{

}

declare class b2World
{
    constructor(gravity:b2Vec2);

    CreateBody(bodyDefinition:b2BodyDef):b2Body;
    CreateJoint(jointDefinition:b2JointDef):b2Joint;

    Step(timeStep:number, velocityIterations:number, positionIterations:number);

    SetContactListener(listener:b2ContactListener):void;

    QueryAABB(callback:b2QueryCallback, aabb:b2AABB):void;
    RayCast(callback:b2RayCastCallback, point1:b2Vec2, point2:b2Vec2):void;

    CreateParticleSystem(particleSystemDef:b2ParticleSystemDef):b2ParticleSystem;
    DestroyParticleSystem(particleSystem:b2ParticleSystem):void;
    
    bodies:b2Body[]
    particleSystems:b2ParticleSystem[]
}

interface b2ContactListener
{
    BeginContact(contact:b2Contact):void;
    EndContact(contect:b2Contact):void;
    PreSolve(contact:b2Contact, manifold:b2Manifold):void;
    PostSolve(contect:b2Contact, manifold:b2Manifold):void;
}

declare class b2Shape
{
    radius:number

    GetPositionX():number;
    GetPositionY():number;
    SetPosition(x:number, y:number);
}

declare class b2EdgeShape extends b2Shape
{
    Set(v1:b2Vec2, v2:b2Vec2);
}

declare class b2ChainShape extends b2Shape
{
    CreateChain(points:Array<b2Vec2>);
}

declare class b2CircleShape extends  b2Shape
{

}

declare class b2Transform
{

}

declare class b2PolygonShape extends b2Shape
{
    SetAsBoxXY(x:number,y:number);
}

declare var b2_dynamicBody:any
declare var b2_kinematicBody:any
declare var b2_staticBody:any

declare class b2FixtureDef
{
    shape:any
    density:number
    friction:number
    restitution:number
}

//Joint definitions
declare class b2JointDef
{
    collideConnected:boolean
    frequencyHz:number
    dampingRatio:number

    bodyA:b2Body
    bodyB:b2Body
}

declare class b2DistanceJointDef extends b2JointDef
{
    localAnchorA:b2Vec2
    localAnchorB:b2Vec2
    length:number

    InitializeAndCreate(bodyA:b2Body, bodyB:b2Body, anchorA:b2Vec2, anchorB:b2Vec2);
}

declare class b2RevoluteJointDef extends b2JointDef
{
    lowerAngle:number
    upperAngle:number
    enableLimit:boolean
    motorSpeed:number
    enableMotor:number
}

declare class b2PrismaticJointDef extends b2JointDef
{
    lowerTranslation:number
    upperTranslation:number
    enableLimit:boolean
    maxMotorForce:number
    motorSpeed:number
    enableMotor:boolean
}

declare class b2PulleyJointDef extends  b2JointDef
{

}

declare class b2GearJointDef extends  b2JointDef
{

}

//Joint classes
declare class b2Joint
{

}

declare class b2RevoluteJoin extends b2Joint
{
    GetJointAngle():number;
    GetJointSpeed():number;
    GetMotorTorque():number;

    SetMotorSpeed(speed:number);
    SetMaxMotorTorque(torque:number);
}

declare class b2PrismaticJoint extends b2Joint
{
    GetJointTranslation():number;
    GetJointSpeed():number;
    GetMotorForce():number;

    SetMotorSpeed(speed:number);
    SetMotorForce(force:number);
}

declare class b2PulleyJoint extends  b2Joint
{
    GetLengthA():number;
    GetLengthB():number;
}

declare class b2Contact
{
    GetManifold():b2Manifold;
    GetFixtureA():b2Fixture;
    GetFixtureB():b2Fixture;
    SetEnabled(enabled:boolean):void;
}

declare class b2Manifold
{

}

//Particles
declare class b2ParticleColor
{

}

declare class b2ParticleDef
{
    flags:any
    position:b2Vec2
    color:b2ParticleColor
}

declare class b2ParticleSystemDef
{

}

declare class b2ParticleGroupDef
{
    flags:any
    position:b2Vec2
    color:b2ParticleColor
    angle:number
    angularVelocity:number
    shape:b2Shape
    strength:number;
}

declare class b2ParticleGroup
{
    SetGroupFlags(flags:any);
    GetGroupFlags():any;
    DestroyParticles(callDestructionListener:boolean):void;
}

declare class b2ParticleSystem
{
    CreateParticle(particleDefinition:b2ParticleDef):number;
    DestroyParticlesInShape(shape:b2Shape, transform:b2Transform):void;

    CreateParticleGroup(particleGroupDefinition:b2ParticleGroupDef);

    SetPaused(paused:boolean):void;

    SetParticleDestructionByAge(deletionByAge:boolean):void;
    SetParticleLifetime(particleIndex:number, lifetime:number):void;
    SetDensity(density:number):void;
    GetStuckCandidateCount():number;
    GetStuckCandidates():Array<number>;
    GetPositionBuffer():Float32Array;
    GetColorBuffer():Uint8Array;

    SetRadius(radious:number):void;
}

declare var b2_waterParticle:any;
declare var b2_zombieParticle:any;
declare var b2_wallParticle:any;
declare var b2_springParticle:any;
declare var b2_elasticParticle:any;
declare var b2_viscousParticle:any;
declare var b2_powderParticle:any;
declare var b2_tensileParticle:any;
declare var b2_colorMixingParticle:any;
declare var b2_destructionListenerParticle:any;
declare var b2_barrierParticle:any;
declare var b2_staticPressureParticle:any;
declare var b2_reactiveParticle:any;
declare var b2_repulsiveParticle:any;
declare var b2_fixtureContactListenerParticle:any;
declare var b2_particleContactListenerParticle:any;
declare var b2_fixtureContactFilterParticle:any;
declare var b2_particleContactFilterParticle:any;




