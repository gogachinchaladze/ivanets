/*!
 *
 *  (c) 2015, Ivane Gegia
 *  http://ivane.info
 *
 *  MIT License
 */

module Ivane.Time {
    export class DeltaTimeComputer {

        private date: any = window.performance ? window.performance.now() : new Date().getDate
        private now: number = 0
        private time: number = 0
        private dt: number = 0

        public getDeltaTimeInSeconds = function(): number {
            if (window.performance) {
                this.now = window.performance.now()
            }
            else {
                this.now = new Date().getTime()
            }

            this.dt = this.now - (this.time || this.now)
            this.time = this.now

            return this.dt / 1000.0
        }
    }
}