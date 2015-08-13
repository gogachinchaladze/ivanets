/*
 * Author Ivane Gegia http://ivane.info
 */

module Ivane.Utils {

    export class FireOnce {
        private callbackCalled = false
        private callback: () => void = null

        constructor(callback: () => void) {
            this.callback = callback
        }

        fire() {
            if (this.callbackCalled === false && this.callback != null) {
                this.callback()
                this.callbackCalled = true
            }
        }

        reset() {
            this.callbackCalled = false
        }
    }

}