/*
 * Author Ivane Gegia http://ivane.info
 */
 
module Ivane.Animation {
        export enum EASING_TYPES {
                LINEAR,
                EASE_IN_EASE_OUT
        }

        export interface AnimationStepDelegate {
                (animation: Animation): void;
        }

        export class Animation {
                animationStepDelegate: AnimationStepDelegate
                animationFinishedDelegate: AnimationStepDelegate

                easingType: EASING_TYPES

                from: number = 0
                to: number = 0
                active: boolean
                durationInSeconds: number

                normalizedProgress: number = 0
                public getNormalizedProgressEasingApplied(): number {
                        switch (this.easingType) {
                                case EASING_TYPES.LINEAR:
                                        return this.normalizedProgress;

                                case EASING_TYPES.EASE_IN_EASE_OUT:
                                        var easingApplied = (Math.sin(this.normalizedProgress * Math.PI - Math.PI / 2) + 1) / 2;
                                        return easingApplied;

                                default:
                                        return 0.0;
                        }
                }

                public getProgress(): number {
                        return this.from + (this.to - this.from) * this.getNormalizedProgressEasingApplied();
                }

                public stepAnimation(deltaTime: number): void {
                        this.normalizedProgress += deltaTime / this.durationInSeconds;

                        if (this.normalizedProgress > 1.0) {
                                this.normalizedProgress = 1.0;

                                this.animationStepDelegate(this);
                                this.animationFinishedDelegate(this);

                                this.active = false;
                        }
                        else {
                                this.animationStepDelegate(this);
                        }



                }

                public reset
                (
                        from: number, 
                        to: number, 
                        durationInSeconds: number, 
                        easingType: EASING_TYPES, 
                        animationStepDelegate: AnimationStepDelegate, 
                        animationFinishedDelegate: AnimationStepDelegate
                ): void 
                {
                        this.from = from;
                        this.to = to;
                        this.durationInSeconds = durationInSeconds;
                        this.active = true;
                        this.animationStepDelegate = animationStepDelegate;
                        this.animationFinishedDelegate = animationFinishedDelegate;
                        this.normalizedProgress = 0;
                        this.easingType = easingType;
                }
        }

        export class AnimationsManager {
                private animationsPool: Array<Animation>

                private createAnimationsPool(animationsPoolSize: number): void {
                        this.animationsPool = new Array<Animation>(animationsPoolSize);

                        for (var animationIndex = 0; animationIndex < animationsPoolSize; animationIndex++) {
                                this.animationsPool[animationIndex] = new Animation();
                        }
                }

                public queueAnimation
                (
                        from: number, 
                        to: number, 
                        durationInSeconds: number, 
                        easingType: EASING_TYPES, 
                        animationStepHandler: AnimationStepDelegate, 
                        animationFinishedHandler: AnimationStepDelegate
                ): void 
                {
                        var animation = this.tryToGetInactiveAnimation();

                        animation.reset(from, to, durationInSeconds, easingType, animationStepHandler, animationFinishedHandler);
                }

                private tryToGetInactiveAnimation(): Animation {
                        var animation: Animation = null;

                        for (var animationIndex = 0; animationIndex < this.animationsPool.length; animationIndex++) {
                                animation = this.animationsPool[animationIndex];

                                if (animation.active == false) {
                                        break;
                                }
                        }

                        if (animation.active == true) {
                                animation = null;
                        }

                        return animation;
                }

                private stepAnimations(deltaTime: number): void {
                        for (var animationIndex = 0; animationIndex < this.animationsPool.length; animationIndex++) {
                                var animation = this.animationsPool[animationIndex];

                                if (animation.active) {
                                        animation.stepAnimation(deltaTime);
                                }
                        }
                }

                constructor(animationsPoolSize:number) {
                        this.createAnimationsPool(animationsPoolSize);

                }

                public update(deltaTime: number): void {
                        this.stepAnimations(deltaTime);
                }
        }
}