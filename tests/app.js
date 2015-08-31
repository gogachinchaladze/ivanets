var Ivane;
(function (Ivane) {
    var Network;
    (function (Network) {
        var Ajax;
        (function (Ajax) {
            (function (REQUEST_TYPES) {
                REQUEST_TYPES[REQUEST_TYPES["GET"] = 0] = "GET";
                REQUEST_TYPES[REQUEST_TYPES["POST"] = 1] = "POST";
            })(Ajax.REQUEST_TYPES || (Ajax.REQUEST_TYPES = {}));
            var REQUEST_TYPES = Ajax.REQUEST_TYPES;
            (function (DATA_TYPES) {
                DATA_TYPES[DATA_TYPES["SCRIPT"] = 0] = "SCRIPT";
                DATA_TYPES[DATA_TYPES["JSON"] = 1] = "JSON";
                DATA_TYPES[DATA_TYPES["XML"] = 2] = "XML";
                DATA_TYPES[DATA_TYPES["HTML"] = 3] = "HTML";
                DATA_TYPES[DATA_TYPES["TEXT"] = 4] = "TEXT";
            })(Ajax.DATA_TYPES || (Ajax.DATA_TYPES = {}));
            var DATA_TYPES = Ajax.DATA_TYPES;
            function getStringForREQUEST_TYPES(requestType) {
                switch (requestType) {
                    case REQUEST_TYPES.GET:
                        return "GET";
                        break;
                    case REQUEST_TYPES.POST:
                        return "POST";
                        break;
                }
            }
            var AJAX_READY_STATES;
            (function (AJAX_READY_STATES) {
                AJAX_READY_STATES[AJAX_READY_STATES["REQUEST_NOT_INITIALIZED"] = 0] = "REQUEST_NOT_INITIALIZED";
                AJAX_READY_STATES[AJAX_READY_STATES["SERVER_CONNECTION_ESTABLISHED"] = 1] = "SERVER_CONNECTION_ESTABLISHED";
                AJAX_READY_STATES[AJAX_READY_STATES["REQUEST_RECEIVED"] = 2] = "REQUEST_RECEIVED";
                AJAX_READY_STATES[AJAX_READY_STATES["PROCESSING_REQUEST"] = 3] = "PROCESSING_REQUEST";
                AJAX_READY_STATES[AJAX_READY_STATES["REQUEST_FINISHED_AND_RESPOSNE_IS_READY"] = 4] = "REQUEST_FINISHED_AND_RESPOSNE_IS_READY";
            })(AJAX_READY_STATES || (AJAX_READY_STATES = {}));
            var AJAX_REQUEST_STATUS_CODES;
            (function (AJAX_REQUEST_STATUS_CODES) {
                AJAX_REQUEST_STATUS_CODES[AJAX_REQUEST_STATUS_CODES["OK"] = 200] = "OK";
                AJAX_REQUEST_STATUS_CODES[AJAX_REQUEST_STATUS_CODES["PAGE_NOT_FOUND"] = 404] = "PAGE_NOT_FOUND";
            })(AJAX_REQUEST_STATUS_CODES || (AJAX_REQUEST_STATUS_CODES = {}));
            function createAJAXRequest(url, requestType, data_nullable, onSuccess, onFail) {
                var ajaxRequest = new XMLHttpRequest();
                var requestTypeString = getStringForREQUEST_TYPES(requestType);
                var queryString = url;
                var urlEncodedParameters = "";
                if (data_nullable != null) {
                    if (data_nullable instanceof Object) {
                        var data_keys = Object.keys(data_nullable);
                        for (var data_key_index = 0; data_key_index < data_keys.length; data_key_index++) {
                            var data_key = data_keys[data_key_index];
                            urlEncodedParameters += data_key
                                + "="
                                + data_nullable[data_key]
                                + "&";
                        }
                    }
                    else if (data_nullable instanceof String) {
                        urlEncodedParameters = data_nullable;
                    }
                    urlEncodedParameters = urlEncodedParameters.substr(0, urlEncodedParameters.length - 2);
                    if (urlEncodedParameters.charAt(0) != "?"
                        && url.charAt(-1) != "?") {
                        urlEncodedParameters = "?" + urlEncodedParameters;
                    }
                }
                if (requestType == REQUEST_TYPES.GET) {
                    ajaxRequest.open(getStringForREQUEST_TYPES(requestType), url + urlEncodedParameters, true);
                    ajaxRequest.send();
                }
                else if (requestType == REQUEST_TYPES.POST) {
                    ajaxRequest.open(getStringForREQUEST_TYPES(requestType), url, true);
                    ajaxRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    ajaxRequest.send(urlEncodedParameters.replace("?", ""));
                }
                ajaxRequest.onreadystatechange = function (ev) {
                    if (ajaxRequest.readyState == AJAX_READY_STATES.REQUEST_FINISHED_AND_RESPOSNE_IS_READY
                        && ajaxRequest.status == 200) {
                        var ajaxReponse = {
                            responseBody: ajaxRequest.responseBody,
                            responseText: ajaxRequest.responseText
                        };
                        onSuccess(ajaxReponse);
                    }
                    else if (ajaxRequest.readyState == AJAX_READY_STATES.REQUEST_FINISHED_AND_RESPOSNE_IS_READY
                        && ajaxRequest.status != 200) {
                        onFail(ev);
                    }
                };
                ajaxRequest.onerror = function (ev) {
                    onFail(ev);
                };
                return ajaxRequest;
            }
            Ajax.createAJAXRequest = createAJAXRequest;
        })(Ajax = Network.Ajax || (Network.Ajax = {}));
    })(Network = Ivane.Network || (Ivane.Network = {}));
})(Ivane || (Ivane = {}));
/*
 * Author Ivane Gegia http://ivane.info
 */
var Ivane;
(function (Ivane) {
    var Animation;
    (function (Animation_1) {
        (function (EASING_TYPES) {
            EASING_TYPES[EASING_TYPES["LINEAR"] = 0] = "LINEAR";
            EASING_TYPES[EASING_TYPES["EASE_IN_EASE_OUT"] = 1] = "EASE_IN_EASE_OUT";
        })(Animation_1.EASING_TYPES || (Animation_1.EASING_TYPES = {}));
        var EASING_TYPES = Animation_1.EASING_TYPES;
        var Animation = (function () {
            function Animation() {
                this.from = 0;
                this.to = 0;
                this.normalizedProgress = 0;
            }
            Animation.prototype.getNormalizedProgressEasingApplied = function () {
                switch (this.easingType) {
                    case EASING_TYPES.LINEAR:
                        return this.normalizedProgress;
                    case EASING_TYPES.EASE_IN_EASE_OUT:
                        var easingApplied = (Math.sin(this.normalizedProgress * Math.PI - Math.PI / 2) + 1) / 2;
                        return easingApplied;
                    default:
                        return 0.0;
                }
            };
            Animation.prototype.getProgress = function () {
                return this.from + (this.to - this.from) * this.getNormalizedProgressEasingApplied();
            };
            Animation.prototype.stepAnimation = function (deltaTime) {
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
            };
            Animation.prototype.reset = function (from, to, durationInSeconds, easingType, animationStepDelegate, animationFinishedDelegate) {
                this.from = from;
                this.to = to;
                this.durationInSeconds = durationInSeconds;
                this.active = true;
                this.animationStepDelegate = animationStepDelegate;
                this.animationFinishedDelegate = animationFinishedDelegate;
                this.normalizedProgress = 0;
                this.easingType = easingType;
            };
            return Animation;
        })();
        Animation_1.Animation = Animation;
        var AnimationsManager = (function () {
            function AnimationsManager(animationsPoolSize) {
                this.createAnimationsPool(animationsPoolSize);
            }
            AnimationsManager.prototype.createAnimationsPool = function (animationsPoolSize) {
                this.animationsPool = new Array(animationsPoolSize);
                for (var animationIndex = 0; animationIndex < animationsPoolSize; animationIndex++) {
                    this.animationsPool[animationIndex] = new Animation();
                }
            };
            AnimationsManager.prototype.queueAnimation = function (from, to, durationInSeconds, easingType, animationStepHandler, animationFinishedHandler) {
                var animation = this.tryToGetInactiveAnimation();
                animation.reset(from, to, durationInSeconds, easingType, animationStepHandler, animationFinishedHandler);
            };
            AnimationsManager.prototype.tryToGetInactiveAnimation = function () {
                var animation = null;
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
            };
            AnimationsManager.prototype.stepAnimations = function (deltaTime) {
                for (var animationIndex = 0; animationIndex < this.animationsPool.length; animationIndex++) {
                    var animation = this.animationsPool[animationIndex];
                    if (animation.active) {
                        animation.stepAnimation(deltaTime);
                    }
                }
            };
            AnimationsManager.prototype.update = function (deltaTime) {
                this.stepAnimations(deltaTime);
            };
            return AnimationsManager;
        })();
        Animation_1.AnimationsManager = AnimationsManager;
    })(Animation = Ivane.Animation || (Ivane.Animation = {}));
})(Ivane || (Ivane = {}));
/*
 * Author Ivane Gegia http://ivane.info
 */
var Ivane;
(function (Ivane) {
    var Exceptions;
    (function (Exceptions) {
        function MethodNotOverriden() { }
        Exceptions.MethodNotOverriden = MethodNotOverriden;
        function NotImplemetedException() { }
        Exceptions.NotImplemetedException = NotImplemetedException;
        function DynamicAssertionError() { }
        Exceptions.DynamicAssertionError = DynamicAssertionError;
    })(Exceptions = Ivane.Exceptions || (Ivane.Exceptions = {}));
})(Ivane || (Ivane = {}));
/*
 * Author Ivane Gegia http://ivane.info
 */
/// <reference path="Exceptions.ts" />
var Ivane;
(function (Ivane) {
    var Assertion;
    (function (Assertion) {
        function DynamicAssert(condition, errorMessage) {
            if (!condition) {
                console.log(errorMessage);
                throw new Ivane.Exceptions.DynamicAssertionError();
            }
        }
        Assertion.DynamicAssert = DynamicAssert;
    })(Assertion = Ivane.Assertion || (Ivane.Assertion = {}));
})(Ivane || (Ivane = {}));
/*
 * Author Ivane Gegia http://ivane.info
 */
///<reference path="../definitions/threejs/three.d.ts"/>
///<reference path="Exceptions.ts"/>
var Ivane;
(function (Ivane) {
    var Inputs;
    (function (Inputs) {
        var MouseXY = (function () {
            function MouseXY() {
                this.x = 0;
                this.y = 0;
            }
            return MouseXY;
        })();
        Inputs.MouseXY = MouseXY;
        (function (MOUSE_BUTTONS) {
            MOUSE_BUTTONS[MOUSE_BUTTONS["LEFT"] = 1] = "LEFT";
            MOUSE_BUTTONS[MOUSE_BUTTONS["RIGHT"] = 2] = "RIGHT";
            MOUSE_BUTTONS[MOUSE_BUTTONS["MIDDLE"] = 4] = "MIDDLE";
        })(Inputs.MOUSE_BUTTONS || (Inputs.MOUSE_BUTTONS = {}));
        var MOUSE_BUTTONS = Inputs.MOUSE_BUTTONS;
        var CanvasInputsManager = (function () {
            function CanvasInputsManager() {
                this.mouseUp = false;
                this.mouseIsDown = false;
                this.mouseDown = false;
                this.mouseButonsBitMap = 0;
                this.realTimeMouseIsDown = false;
                this.realTimeMouseClicked = false;
                this.realTimeMouseIsUp = true;
                this.mouseDownRegisteredOnce = false;
                this.mousePreviousScreenXY = new MouseXY();
                this.mouseCurrentScreenXY = new MouseXY();
                this.realTimeMouseXY = new MouseXY();
                this.mouseXY = new MouseXY();
                this.mouseDeltaXY = new MouseXY();
                this.mouseDeltaXYAccumulator = new MouseXY();
                this.initKeyProcessingBuffers();
            }
            CanvasInputsManager.prototype.initKeyProcessingBuffers = function () {
                this.keysWhichAreDown = new Array(KeyCodes.single_quote);
                for (var keyIndex = 0; keyIndex < this.keysWhichAreDown.length; keyIndex++) {
                    this.keysWhichAreDown[keyIndex] = false;
                }
            };
            CanvasInputsManager.prototype.keyIsDown = function (keyCode) {
                return this.keysWhichAreDown[keyCode];
            };
            CanvasInputsManager.prototype.startProcessingInputFor = function (canvas) {
                var _this = this;
                this.canvas = canvas;
                this.canvas.addEventListener("mousemove", function (ev) {
                    _this.realTimeMouseXY.x = ev.offsetX;
                    _this.realTimeMouseXY.y = ev.offsetY;
                    _this.mouseCurrentScreenXY.x = ev.screenX;
                    _this.mouseCurrentScreenXY.y = ev.screenY;
                    if (_this.mousePreviousScreenXY.x == 0) {
                        _this.mousePreviousScreenXY.x = _this.mouseCurrentScreenXY.x;
                        _this.mousePreviousScreenXY.y = _this.mouseCurrentScreenXY.y;
                    }
                    _this.mouseDeltaXYAccumulator.x += _this.mouseCurrentScreenXY.x - _this.mousePreviousScreenXY.x;
                    _this.mouseDeltaXYAccumulator.y += _this.mouseCurrentScreenXY.y - _this.mousePreviousScreenXY.y;
                    _this.mousePreviousScreenXY.x = _this.mouseCurrentScreenXY.x;
                    _this.mousePreviousScreenXY.y = _this.mouseCurrentScreenXY.y;
                });
                this.canvas.addEventListener("mousedown", function (ev) {
                    _this.realTimeMouseIsDown = true;
                    _this.realTimeMouseIsUp = false;
                    _this.mouseDownRegisteredOnce = false;
                    _this.mouseButonsBitMap = ev.buttons;
                });
                this.canvas.addEventListener("mouseup", function (ev) {
                    /*
                    Checking weather mouse was down, bacause it could be downed
                    outside canvas boundries and upped on the canvas, this shell
                    not register as click.
                    */
                    if (_this.realTimeMouseIsDown && _this.realTimeMouseClicked == false) {
                        _this.realTimeMouseClicked = true;
                    }
                    /*
                    Taking note that mouse is up, not falsing
                    realTimeMouseIsDown until processInput
                    */
                    _this.realTimeMouseIsUp = true;
                });
                document.body.addEventListener("keydown", function (ev) {
                    _this.keysWhichAreDown[ev.keyCode] = true;
                });
                document.body.addEventListener("keyup", function (ev) {
                    _this.keysWhichAreDown[ev.keyCode] = false;
                });
            };
            //shell be called after openTimeFrame and before game logic and rendering
            CanvasInputsManager.prototype.processInput = function () {
                this.mouseXY.x = this.realTimeMouseXY.x;
                this.mouseXY.y = this.realTimeMouseXY.y;
                this.mouseDeltaXY.x = this.mouseDeltaXYAccumulator.x;
                this.mouseDeltaXY.y = this.mouseDeltaXYAccumulator.y;
                this.mouseUp = this.realTimeMouseClicked;
                this.mouseIsDown = this.realTimeMouseIsDown;
                //Make mouseDown == true only for one frame
                if (this.mouseDownRegisteredOnce == false
                    && this.realTimeMouseIsDown == true) {
                    this.mouseDown = this.realTimeMouseIsDown;
                    this.mouseDownRegisteredOnce = true;
                }
                else {
                    this.mouseDown = false;
                }
                this.realTimeMouseClicked = false;
                if (this.realTimeMouseIsUp) {
                    this.realTimeMouseIsDown = false;
                }
                this.mouseDeltaXYAccumulator.x = 0.0;
                this.mouseDeltaXYAccumulator.y = 0.0;
            };
            return CanvasInputsManager;
        })();
        Inputs.CanvasInputsManager = CanvasInputsManager;
        (function (KeyCodes) {
            KeyCodes[KeyCodes["backspace"] = 8] = "backspace";
            KeyCodes[KeyCodes["tab"] = 9] = "tab";
            KeyCodes[KeyCodes["enter"] = 13] = "enter";
            KeyCodes[KeyCodes["shift"] = 16] = "shift";
            KeyCodes[KeyCodes["ctrl"] = 17] = "ctrl";
            KeyCodes[KeyCodes["alt"] = 18] = "alt";
            KeyCodes[KeyCodes["pause_or_break"] = 19] = "pause_or_break";
            KeyCodes[KeyCodes["caps_lock"] = 20] = "caps_lock";
            KeyCodes[KeyCodes["escape"] = 27] = "escape";
            KeyCodes[KeyCodes["page_up"] = 33] = "page_up";
            KeyCodes[KeyCodes["page_down"] = 34] = "page_down";
            KeyCodes[KeyCodes["end"] = 35] = "end";
            KeyCodes[KeyCodes["home"] = 36] = "home";
            KeyCodes[KeyCodes["left_arrow"] = 37] = "left_arrow";
            KeyCodes[KeyCodes["up_arrow"] = 38] = "up_arrow";
            KeyCodes[KeyCodes["right_arrow"] = 39] = "right_arrow";
            KeyCodes[KeyCodes["down_arrow"] = 40] = "down_arrow";
            KeyCodes[KeyCodes["insert"] = 45] = "insert";
            KeyCodes[KeyCodes["delete"] = 46] = "delete";
            KeyCodes[KeyCodes["_0"] = 48] = "_0";
            KeyCodes[KeyCodes["_1"] = 49] = "_1";
            KeyCodes[KeyCodes["_2"] = 50] = "_2";
            KeyCodes[KeyCodes["_3"] = 51] = "_3";
            KeyCodes[KeyCodes["_4"] = 52] = "_4";
            KeyCodes[KeyCodes["_5"] = 53] = "_5";
            KeyCodes[KeyCodes["_6"] = 54] = "_6";
            KeyCodes[KeyCodes["_7"] = 55] = "_7";
            KeyCodes[KeyCodes["_8"] = 56] = "_8";
            KeyCodes[KeyCodes["_9"] = 57] = "_9";
            KeyCodes[KeyCodes["a"] = 65] = "a";
            KeyCodes[KeyCodes["b"] = 66] = "b";
            KeyCodes[KeyCodes["c"] = 67] = "c";
            KeyCodes[KeyCodes["d"] = 68] = "d";
            KeyCodes[KeyCodes["e"] = 69] = "e";
            KeyCodes[KeyCodes["f"] = 70] = "f";
            KeyCodes[KeyCodes["g"] = 71] = "g";
            KeyCodes[KeyCodes["h"] = 72] = "h";
            KeyCodes[KeyCodes["i"] = 73] = "i";
            KeyCodes[KeyCodes["j"] = 74] = "j";
            KeyCodes[KeyCodes["k"] = 75] = "k";
            KeyCodes[KeyCodes["l"] = 76] = "l";
            KeyCodes[KeyCodes["m"] = 77] = "m";
            KeyCodes[KeyCodes["n"] = 78] = "n";
            KeyCodes[KeyCodes["o"] = 79] = "o";
            KeyCodes[KeyCodes["p"] = 80] = "p";
            KeyCodes[KeyCodes["q"] = 81] = "q";
            KeyCodes[KeyCodes["r"] = 82] = "r";
            KeyCodes[KeyCodes["s"] = 83] = "s";
            KeyCodes[KeyCodes["t"] = 84] = "t";
            KeyCodes[KeyCodes["u"] = 85] = "u";
            KeyCodes[KeyCodes["v"] = 86] = "v";
            KeyCodes[KeyCodes["w"] = 87] = "w";
            KeyCodes[KeyCodes["x"] = 88] = "x";
            KeyCodes[KeyCodes["y"] = 89] = "y";
            KeyCodes[KeyCodes["z"] = 90] = "z";
            KeyCodes[KeyCodes["left_window_key"] = 91] = "left_window_key";
            KeyCodes[KeyCodes["right_window_key"] = 92] = "right_window_key";
            KeyCodes[KeyCodes["select_key"] = 93] = "select_key";
            KeyCodes[KeyCodes["numpad_0"] = 96] = "numpad_0";
            KeyCodes[KeyCodes["numpad_1"] = 97] = "numpad_1";
            KeyCodes[KeyCodes["numpad_2"] = 98] = "numpad_2";
            KeyCodes[KeyCodes["numpad_3"] = 99] = "numpad_3";
            KeyCodes[KeyCodes["numpad_4"] = 100] = "numpad_4";
            KeyCodes[KeyCodes["numpad_5"] = 101] = "numpad_5";
            KeyCodes[KeyCodes["numpad_6"] = 102] = "numpad_6";
            KeyCodes[KeyCodes["numpad_7"] = 103] = "numpad_7";
            KeyCodes[KeyCodes["numpad_8"] = 104] = "numpad_8";
            KeyCodes[KeyCodes["numpad_9"] = 105] = "numpad_9";
            KeyCodes[KeyCodes["multiply"] = 106] = "multiply";
            KeyCodes[KeyCodes["add"] = 107] = "add";
            KeyCodes[KeyCodes["subtract"] = 109] = "subtract";
            KeyCodes[KeyCodes["decimal_point"] = 110] = "decimal_point";
            KeyCodes[KeyCodes["divide"] = 111] = "divide";
            KeyCodes[KeyCodes["f1"] = 112] = "f1";
            KeyCodes[KeyCodes["f2"] = 113] = "f2";
            KeyCodes[KeyCodes["f3"] = 114] = "f3";
            KeyCodes[KeyCodes["f4"] = 115] = "f4";
            KeyCodes[KeyCodes["f5"] = 116] = "f5";
            KeyCodes[KeyCodes["f6"] = 117] = "f6";
            KeyCodes[KeyCodes["f7"] = 118] = "f7";
            KeyCodes[KeyCodes["f8"] = 119] = "f8";
            KeyCodes[KeyCodes["f9"] = 120] = "f9";
            KeyCodes[KeyCodes["f10"] = 121] = "f10";
            KeyCodes[KeyCodes["f11"] = 122] = "f11";
            KeyCodes[KeyCodes["f12"] = 123] = "f12";
            KeyCodes[KeyCodes["num_lock"] = 144] = "num_lock";
            KeyCodes[KeyCodes["scroll_lock"] = 145] = "scroll_lock";
            KeyCodes[KeyCodes["semi_colon"] = 186] = "semi_colon";
            KeyCodes[KeyCodes["equal_sign"] = 187] = "equal_sign";
            KeyCodes[KeyCodes["comma"] = 188] = "comma";
            KeyCodes[KeyCodes["dash"] = 189] = "dash";
            KeyCodes[KeyCodes["period"] = 190] = "period";
            KeyCodes[KeyCodes["forward_slash"] = 191] = "forward_slash";
            KeyCodes[KeyCodes["grave_accent"] = 192] = "grave_accent";
            KeyCodes[KeyCodes["open_bracket"] = 219] = "open_bracket";
            KeyCodes[KeyCodes["back_slash"] = 220] = "back_slash";
            KeyCodes[KeyCodes["close_braket"] = 221] = "close_braket";
            KeyCodes[KeyCodes["single_quote"] = 222] = "single_quote";
        })(Inputs.KeyCodes || (Inputs.KeyCodes = {}));
        var KeyCodes = Inputs.KeyCodes;
    })(Inputs = Ivane.Inputs || (Ivane.Inputs = {}));
})(Ivane || (Ivane = {}));
/*
 * Author Ivane Gegia http://ivane.info
 */
var Ivane;
(function (Ivane) {
    var Time;
    (function (Time) {
        var DeltaTimeComputer = (function () {
            function DeltaTimeComputer() {
                this.date = window.performance ? window.performance.now() : new Date().getDate;
                this.now = 0;
                this.time = 0;
                this.dt = 0;
                this.getDeltaTimeInSeconds = function () {
                    if (window.performance) {
                        this.now = window.performance.now();
                    }
                    else {
                        this.now = new Date().getTime();
                    }
                    this.dt = this.now - (this.time || this.now);
                    this.time = this.now;
                    return this.dt / 1000.0;
                };
            }
            return DeltaTimeComputer;
        })();
        Time.DeltaTimeComputer = DeltaTimeComputer;
    })(Time = Ivane.Time || (Ivane.Time = {}));
})(Ivane || (Ivane = {}));
/*
 * Author Ivane Gegia http://ivane.info
 */
///<reference path="../definitions/threejs/three.d.ts"/>
///<reference path="../definitions/threejs/ivane_three.d.ts"/>
var Ivane;
(function (Ivane) {
    var ThreeJSHelpers;
    (function (ThreeJSHelpers) {
        function getOrtho2DCoordinatesFromPixelCoordinates(viewWidthInPixels, viewHeightInPixels, pointerTopLeftXInPixels, pointerTopLeftYInPixels, orthoCamera, ortho2DCoordiantes__out) {
            var orthoRangeOfX = -orthoCamera.left + orthoCamera.right;
            var orthoRangeOfY = -orthoCamera.bottom + orthoCamera.top;
            var x = orthoRangeOfX * (pointerTopLeftXInPixels / viewWidthInPixels) + orthoCamera.left;
            var y = orthoRangeOfY * (1 - pointerTopLeftYInPixels / viewHeightInPixels) + orthoCamera.bottom;
            ortho2DCoordiantes__out.set(x, y);
        }
        ThreeJSHelpers.getOrtho2DCoordinatesFromPixelCoordinates = getOrtho2DCoordinatesFromPixelCoordinates;
        function orthoViewCoordinateToWorld(viewCoodinate, orthoCamera, worldCoordinate_out) {
            worldCoordinate_out.x = orthoCamera.position.x + viewCoodinate.x;
            worldCoordinate_out.y = orthoCamera.position.y + viewCoodinate.y;
            worldCoordinate_out.z = orthoCamera.position.z;
        }
        ThreeJSHelpers.orthoViewCoordinateToWorld = orthoViewCoordinateToWorld;
        function addGrid(scene) {
            var verticalGridLineGeometry = new THREE.CubeGeometry(.025, 20, 0.001);
            var horizontalGridLineGeometry = new THREE.CubeGeometry(20, .025, 0.001);
            var gridLineMaterial = new THREE.MeshBasicMaterial({
                color: 0xbcbcbc
            });
            var greenLineMaterial = new THREE.MeshBasicMaterial({
                color: 0x00ff00
            });
            var redLineMaterial = new THREE.MeshBasicMaterial({
                color: 0xff0000
            });
            for (var x = 0; x < 20; x++) {
                var verticalGridLineMesh = new THREE.Mesh(verticalGridLineGeometry, gridLineMaterial);
                scene.add(verticalGridLineMesh);
                if (x == 10) {
                    verticalGridLineMesh.scale.set(2, 10, 0.001);
                    verticalGridLineMesh.material = greenLineMaterial;
                }
                verticalGridLineMesh.scale.set(2, 10, 0.001);
                verticalGridLineMesh.position.set(-10 + x, 0, 0);
            }
            for (var y = 0; y < 20; y++) {
                var horizontalGridLineMesh = new THREE.Mesh(horizontalGridLineGeometry, gridLineMaterial);
                scene.add(horizontalGridLineMesh);
                if (y == 10) {
                    horizontalGridLineMesh.scale.set(1, 2, 0.001);
                    horizontalGridLineMesh.material = redLineMaterial;
                }
                horizontalGridLineMesh.scale.set(1, 2, 0.001);
                horizontalGridLineMesh.position.set(0, -10 + y, -0.1);
            }
        }
        ThreeJSHelpers.addGrid = addGrid;
        function createRectangleGeometry(width, height) {
            var geometry = new THREE.Geometry();
            var halfWidth = width / 2;
            var halfHeight = height / 2;
            //geometry.vertices.push(new )
            geometry.vertices.push(new THREE.Vector3(-halfWidth, halfHeight, 0));
            geometry.vertices.push(new THREE.Vector3(halfWidth, halfHeight, 0));
            geometry.vertices.push(new THREE.Vector3(halfWidth, -halfHeight, 0));
            geometry.vertices.push(new THREE.Vector3(-halfWidth, -halfHeight, 0));
            geometry.faces.push(new THREE.Face3(2, 1, 0));
            geometry.faces.push(new THREE.Face3(2, 0, 3));
            geometry.faceVertexUvs[0].push([
                new THREE.Vector2(1, 0),
                new THREE.Vector2(1, 1),
                new THREE.Vector2(0, 1)
            ], [
                new THREE.Vector2(1, 0),
                new THREE.Vector2(0, 1),
                new THREE.Vector2(0, 0)
            ]);
            geometry.uvsNeedUpdate = true;
            geometry.computeFaceNormals();
            geometry.computeVertexNormals();
            return geometry;
        }
        ThreeJSHelpers.createRectangleGeometry = createRectangleGeometry;
        function createRectangleMesh(width, height, material_nullable) {
            var geom = createRectangleGeometry(width, height);
            var rectangleMeshMaterial = material_nullable;
            if (rectangleMeshMaterial == null) {
                rectangleMeshMaterial = new THREE.MeshBasicMaterial({
                    color: 0xff0000
                });
            }
            var rectangleMesh = new THREE.Mesh(geom, rectangleMeshMaterial);
            return rectangleMesh;
        }
        ThreeJSHelpers.createRectangleMesh = createRectangleMesh;
        function loadOBJFromWeb(url, onComplete, onProgress, onFail) {
            var loadManager = new THREE.LoadingManager();
            var objLoader = new THREE.OBJLoader(loadManager);
            objLoader.load(url, _onComplete, _onProgress, _onFail);
            function _onComplete(object) {
                onComplete(object);
            }
            function _onProgress(xhr) {
                if (xhr.lengthComputable
                    && (onProgress !== undefined && onProgress != null)) {
                    onProgress(xhr);
                }
            }
            function _onFail(xhr) {
                if (onFail !== undefined) {
                    onFail();
                }
            }
        }
        ThreeJSHelpers.loadOBJFromWeb = loadOBJFromWeb;
    })(ThreeJSHelpers = Ivane.ThreeJSHelpers || (Ivane.ThreeJSHelpers = {}));
})(Ivane || (Ivane = {}));
/*
 * Author Ivane Gegia http://ivane.info
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
///<reference path="../definitions/threejs/three.d.ts" />
///<reference path="DeltaTime.ts"/>
///<reference path="CanvasInputsManager.ts"/>
///<reference path="ThreeJSHelpers.ts"/>
var Ivane;
(function (Ivane) {
    var ThreeJSHelpers;
    (function (ThreeJSHelpers) {
        var GameClassThreeJS = (function () {
            function GameClassThreeJS() {
                this.mouseXYMainOrthoCameraView = new THREE.Vector2(0.0, 0.0);
                this.mouseXYMainOrthoCameraWorld = new THREE.Vector3(0.0, 0.0, 0.0);
                this.enableMiddleMouseCameraDrag = false;
                this.initWithOrthoCameraCalled = false;
                this.disableDefaultRenderer = false;
            }
            GameClassThreeJS.prototype.setEnableMiddleMouseCameraDrag = function (enable) {
                this.enableMiddleMouseCameraDrag = enable;
            };
            GameClassThreeJS.prototype.setDisableDefaultRenderer = function (disable) {
                this.disableDefaultRenderer = disable;
            };
            GameClassThreeJS.prototype.initWithOrthoCamera = function (cameraSettings, rendererSettings, rendererContainer) {
                this.scene = new THREE.Scene();
                var viewRatio = rendererSettings.viewWidth / rendererSettings.viewHeight;
                this.mainOrthoCamera = new THREE.OrthographicCamera(-cameraSettings.heigh * viewRatio, cameraSettings.heigh * viewRatio, cameraSettings.heigh, -cameraSettings.heigh, cameraSettings.near, cameraSettings.far);
                this.scene.add(this.mainOrthoCamera);
                this.mainOrthoCamera.position.set(0, 0, 10);
                this.renderer = new THREE.WebGLRenderer();
                this.renderer.setClearColor(rendererSettings.clearColor);
                this.renderer.setSize(rendererSettings.viewWidth, rendererSettings.viewHeight);
                rendererContainer.appendChild(this.renderer.domElement);
                this.deltaTimeComputer = new Ivane.Time.DeltaTimeComputer();
                this.deltaTime = this.deltaTimeComputer.getDeltaTimeInSeconds();
                this.inputsManager = new Ivane.Inputs.CanvasInputsManager();
                this.inputsManager.startProcessingInputFor(this.renderer.domElement);
                this.initWithOrthoCameraCalled = true;
            };
            GameClassThreeJS.prototype.getMouseCameraCoordinatesInOrthoCamera = function (mouseXY_out) {
                Ivane.ThreeJSHelpers.getOrtho2DCoordinatesFromPixelCoordinates(this.renderer.domElement.width, this.renderer.domElement.height, this.inputsManager.mouseXY.x, this.inputsManager.mouseXY.y, this.mainOrthoCamera, mouseXY_out);
            };
            GameClassThreeJS.prototype.run = function () {
                if (this.initWithOrthoCameraCalled == false) {
                    console.error("GameClassThreeJS.initWithOrthoCamera was not called!");
                }
                this.animationFrameFunction();
            };
            GameClassThreeJS.prototype.defaultRender = function () {
                if (this.mainOrthoCamera) {
                    this.renderer.render(this.scene, this.mainOrthoCamera);
                }
            };
            GameClassThreeJS.prototype.animationFrameFunction = function () {
                var _this = this;
                this.deltaTime = this.deltaTimeComputer.getDeltaTimeInSeconds();
                this.inputsManager.processInput();
                this.getMouseCameraCoordinatesInOrthoCamera(this.mouseXYMainOrthoCameraView);
                this.mouseXYMainOrthoCameraWorld.set(this.mouseXYMainOrthoCameraView.x + this.mainOrthoCamera.position.x, this.mouseXYMainOrthoCameraView.y + this.mainOrthoCamera.position.y, this.mainOrthoCamera.position.z);
                this.dragOrthoCameraWithMouseMIddleButtonIfDragEnabled();
                this.gameStep();
                if (this.disableDefaultRenderer == false) {
                    this.defaultRender();
                }
                requestAnimationFrame(function () {
                    _this.animationFrameFunction();
                });
            };
            GameClassThreeJS.prototype.dragOrthoCameraWithMouseMIddleButtonIfDragEnabled = function () {
                if (this.enableMiddleMouseCameraDrag
                    && this.inputsManager.mouseIsDown
                    && this.inputsManager.mouseButonsBitMap & Ivane.Inputs.MOUSE_BUTTONS.MIDDLE) {
                    var pixelToUnitsRatio = this.mainOrthoCamera.top * 2 / this.renderer.domElement.height;
                    this.mainOrthoCamera.position.x -= this.inputsManager.mouseDeltaXY.x * pixelToUnitsRatio;
                    this.mainOrthoCamera.position.y += this.inputsManager.mouseDeltaXY.y * pixelToUnitsRatio;
                }
            };
            GameClassThreeJS.prototype.gameStep = function () {
                throw new Ivane.Exceptions.NotImplemetedException();
            };
            return GameClassThreeJS;
        })();
        ThreeJSHelpers.GameClassThreeJS = GameClassThreeJS;
    })(ThreeJSHelpers = Ivane.ThreeJSHelpers || (Ivane.ThreeJSHelpers = {}));
})(Ivane || (Ivane = {}));
var mc = (function (_super) {
    __extends(mc, _super);
    function mc() {
        _super.apply(this, arguments);
    }
    mc.prototype.gameStep = function () {
    };
    return mc;
})(Ivane.ThreeJSHelpers.GameClassThreeJS);
/*
 * Author Ivane Gegia http://ivane.info
 */
/// <reference path="GameClassThreeJS.ts" />
var Ivane;
(function (Ivane) {
    var ThreeJSHelpers;
    (function (ThreeJSHelpers) {
        var EditorGridGameClassThreeJS = (function (_super) {
            __extends(EditorGridGameClassThreeJS, _super);
            function EditorGridGameClassThreeJS() {
                _super.call(this);
            }
            return EditorGridGameClassThreeJS;
        })(ThreeJSHelpers.GameClassThreeJS);
        ThreeJSHelpers.EditorGridGameClassThreeJS = EditorGridGameClassThreeJS;
    })(ThreeJSHelpers = Ivane.ThreeJSHelpers || (Ivane.ThreeJSHelpers = {}));
})(Ivane || (Ivane = {}));
/*
 * Author Ivane Gegia http://ivane.info
 */
var Ivane;
(function (Ivane) {
    var Utils;
    (function (Utils) {
        var FireOnce = (function () {
            function FireOnce(callback) {
                this.callbackCalled = false;
                this.callback = null;
                this.callback = callback;
            }
            FireOnce.prototype.fire = function () {
                if (this.callbackCalled === false && this.callback != null) {
                    this.callback();
                    this.callbackCalled = true;
                }
            };
            FireOnce.prototype.reset = function () {
                this.callbackCalled = false;
            };
            return FireOnce;
        })();
        Utils.FireOnce = FireOnce;
    })(Utils = Ivane.Utils || (Ivane.Utils = {}));
})(Ivane || (Ivane = {}));
/*
 * Author Ivane Gegia http://ivane.info
 */
/// <reference path="../definitions/liquidfun/liquidfun.d.ts" />
/// <reference path="Exceptions.ts" />
/// <reference path="Assertion.ts" />
var Ivane;
(function (Ivane) {
    var LiquidFunHelpers;
    (function (LiquidFunHelpers) {
        function createWorldAndRegisterItAsGlobalVariable(gravity) {
            var world = new b2World(gravity);
            window["world"] = world;
            return world;
        }
        LiquidFunHelpers.createWorldAndRegisterItAsGlobalVariable = createWorldAndRegisterItAsGlobalVariable;
        function createRevoluteJoint(world_ref, bodyA, bodyB, sharedAnchorInWorldSpace) {
            var revoluteJointDef = new b2RevoluteJointDef();
            revoluteJointDef.InitializeAndCreate(bodyA, bodyB, sharedAnchorInWorldSpace);
            revoluteJointDef.localAnchorA = bodyA.GetLocalPoint(sharedAnchorInWorldSpace);
            revoluteJointDef.localAnchorB = bodyB.GetLocalPoint(sharedAnchorInWorldSpace);
            var revoluteJoint = world_ref.CreateJoint(revoluteJointDef);
            return revoluteJoint;
        }
        LiquidFunHelpers.createRevoluteJoint = createRevoluteJoint;
        function createDistanceJoint(world_ref, bodyA, bodyB, anchorA, anchorB, dampingRatio, //1 is recomended
            frequencyHz //4 is recomended
            ) {
            var distanceJointDef = new b2DistanceJointDef();
            //Calculating b2DistanceJointDef::length
            var anchorAWorldPosition = new b2Vec2(bodyA.GetPosition().x + anchorA.x, bodyA.GetPosition().y + anchorA.y);
            var anchorBWorldPosition = new b2Vec2(bodyB.GetPosition().x + anchorB.x, bodyB.GetPosition().y + anchorB.y);
            var distanceBetweenAnchorAAndAnchorB = Math.sqrt(Math.pow(Math.abs(anchorBWorldPosition.x - anchorAWorldPosition.x), 2)
                + Math.pow(Math.abs(anchorBWorldPosition.y - anchorAWorldPosition.y), 2));
            Ivane.Assertion.DynamicAssert(distanceBetweenAnchorAAndAnchorB > .1, "value: "
                + distanceBetweenAnchorAAndAnchorB.toString() +
                " for b2DitanceJoint::length is too small");
            distanceJointDef.length = distanceBetweenAnchorAAndAnchorB;
            distanceJointDef.dampingRatio = dampingRatio;
            distanceJointDef.frequencyHz = frequencyHz;
            distanceJointDef.InitializeAndCreate(bodyA, bodyB, anchorA, anchorB);
            distanceJointDef.localAnchorA.Set(anchorA.x, anchorA.y);
            distanceJointDef.localAnchorB.Set(anchorB.x, anchorB.y);
            var distanceJoint = world_ref.CreateJoint(distanceJointDef);
            return distanceJoint;
        }
        LiquidFunHelpers.createDistanceJoint = createDistanceJoint;
        function createDynamicBody(world_ref, shape, density, friction, position, linearDamping, angularDamping, fixedRotation, bullet, restitution, userData, filter_nullable) {
            var bodyDefinition = new b2BodyDef();
            bodyDefinition.active = true;
            bodyDefinition.position = position;
            bodyDefinition.angularDamping = angularDamping;
            bodyDefinition.linearDamping = linearDamping;
            bodyDefinition.bullet = bullet;
            bodyDefinition.type = b2_dynamicBody;
            bodyDefinition.userData = userData;
            bodyDefinition.filter = new b2Filter();
            var dynamicBody = world_ref.CreateBody(bodyDefinition);
            var bodyFixtureDefinition = new b2FixtureDef();
            bodyFixtureDefinition.density = density;
            bodyFixtureDefinition.friction = friction;
            bodyFixtureDefinition.shape = shape;
            bodyFixtureDefinition.restitution = restitution;
            if (filter_nullable != null) {
                bodyFixtureDefinition.filter = filter_nullable;
            }
            dynamicBody.CreateFixtureFromDef(bodyFixtureDefinition);
            return dynamicBody;
        }
        LiquidFunHelpers.createDynamicBody = createDynamicBody;
        function createKinematicBody(world_ref, shape, friction, position, linearDamping, angularDamping, fixedRotation, bullet, restitution, userData) {
            var bodyDefinition = new b2BodyDef();
            bodyDefinition.active = true;
            bodyDefinition.position = position;
            bodyDefinition.angularDamping = angularDamping;
            bodyDefinition.linearDamping;
            bodyDefinition.bullet = bullet;
            bodyDefinition.type = b2_kinematicBody;
            bodyDefinition.userData = userData;
            var kinematicBody = world_ref.CreateBody(bodyDefinition);
            var bodyFixtureDefinition = new b2FixtureDef();
            bodyFixtureDefinition.friction = friction;
            bodyFixtureDefinition.shape = shape;
            bodyFixtureDefinition.restitution = restitution;
            kinematicBody.CreateFixtureFromDef(bodyFixtureDefinition);
            return kinematicBody;
        }
        LiquidFunHelpers.createKinematicBody = createKinematicBody;
        function createStaticBody(world_ref, shape, friction, position, restitution, userData) {
            var bodyDefinition = new b2BodyDef();
            bodyDefinition.active = true;
            bodyDefinition.position = position;
            bodyDefinition.type = b2_staticBody;
            bodyDefinition.userData = userData;
            var staticBody = world_ref.CreateBody(bodyDefinition);
            var bodyFixtureDefinition = new b2FixtureDef();
            bodyFixtureDefinition.friction = friction;
            bodyFixtureDefinition.shape = shape;
            bodyFixtureDefinition.restitution = restitution;
            staticBody.CreateFixtureFromDef(bodyFixtureDefinition);
            return staticBody;
        }
        LiquidFunHelpers.createStaticBody = createStaticBody;
    })(LiquidFunHelpers = Ivane.LiquidFunHelpers || (Ivane.LiquidFunHelpers = {}));
})(Ivane || (Ivane = {}));
/// <reference path="DeltaTime.ts" />
var Ivane;
(function (Ivane) {
    var DOMHelpers;
    (function (DOMHelpers) {
        (function (POSITION_MODES) {
            POSITION_MODES[POSITION_MODES["RELATIVE"] = 0] = "RELATIVE";
            POSITION_MODES[POSITION_MODES["ABSOLUTE"] = 1] = "ABSOLUTE";
            POSITION_MODES[POSITION_MODES["FIXED"] = 2] = "FIXED";
        })(DOMHelpers.POSITION_MODES || (DOMHelpers.POSITION_MODES = {}));
        var POSITION_MODES = DOMHelpers.POSITION_MODES;
        function convertPositionModeToString(positionMode) {
            var positionModeString = "";
            switch (positionMode) {
                case POSITION_MODES.ABSOLUTE:
                    positionModeString = "absolute";
                    break;
                case POSITION_MODES.FIXED:
                    positionModeString = "fixed";
                    break;
                case POSITION_MODES.RELATIVE:
                    positionModeString = "relative";
                    break;
            }
            return positionModeString;
        }
        (function (DISPLAY_MODES) {
            DISPLAY_MODES[DISPLAY_MODES["BLOCK"] = 0] = "BLOCK";
            DISPLAY_MODES[DISPLAY_MODES["INLINE"] = 1] = "INLINE";
            DISPLAY_MODES[DISPLAY_MODES["NONE"] = 2] = "NONE";
        })(DOMHelpers.DISPLAY_MODES || (DOMHelpers.DISPLAY_MODES = {}));
        var DISPLAY_MODES = DOMHelpers.DISPLAY_MODES;
        function covertDisplayModeToString(displayMode) {
            var displayModeString = "";
            switch (displayMode) {
                case DISPLAY_MODES.BLOCK:
                    displayModeString = "block";
                    break;
                case DISPLAY_MODES.INLINE:
                    displayModeString = "inline";
                    break;
                case DISPLAY_MODES.NONE:
                    displayModeString = "none";
                    break;
            }
            return displayModeString;
        }
        var EXTHTMLElement = (function () {
            function EXTHTMLElement() {
            }
            EXTHTMLElement.createEXTDiv = function () {
                var div = document.createElement("div");
                var extHTMLElement = new EXTHTMLElement();
                extHTMLElement.domElement = div;
                return extHTMLElement;
            };
            EXTHTMLElement.prototype.getDOMElement = function () {
                return this.domElement;
            };
            EXTHTMLElement.prototype.setDisplayMode = function (displayMode) {
                this.domElement.style.display = covertDisplayModeToString(displayMode);
                return this;
            };
            EXTHTMLElement.prototype.setPositionMode = function (positionMode) {
                this.domElement.style.position = convertPositionModeToString(positionMode);
                return this;
            };
            EXTHTMLElement.prototype.setLeftInPixels = function (pixels) {
                this.domElement.style.left = pixels + "px";
                return this;
            };
            EXTHTMLElement.prototype.setTopInPixels = function (pixels) {
                this.domElement.style.top = pixels + "px";
                return this;
            };
            EXTHTMLElement.prototype.setRightInPixels = function (pixels) {
                this.domElement.style.right = pixels + "px";
                return this;
            };
            EXTHTMLElement.prototype.setBottomInPixels = function (pixels) {
                this.domElement.style.bottom = pixels + "px";
                return this;
            };
            EXTHTMLElement.prototype.setBackgroundColor = function (color) {
                this.domElement.style.backgroundColor = "#" + color.toString(16);
                return this;
            };
            EXTHTMLElement.prototype.getBackgroundColor = function () {
                return parseInt(this.domElement.style.backgroundColor.replace("#", ""), 16);
            };
            EXTHTMLElement.prototype.setWidthInPixels = function (width) {
                this.domElement.style.width = width + "px";
                return this;
            };
            EXTHTMLElement.prototype.getWidth = function () {
                return parseInt(this.domElement.style.width);
            };
            EXTHTMLElement.prototype.setHeightInPixels = function (height) {
                this.domElement.style.height = height + "px";
                return this;
            };
            EXTHTMLElement.prototype.getHeight = function () {
                return parseInt(this.domElement.style.height);
            };
            EXTHTMLElement.prototype.setZRotaion = function (rotationDegrees) {
                this.domElement.style.transform = "rotate(" + rotationDegrees + "deg)";
                return this;
            };
            EXTHTMLElement.prototype.setZIndex = function (zIndex) {
                this.domElement.style.zIndex = zIndex.toString();
                return this;
            };
            return EXTHTMLElement;
        })();
        DOMHelpers.EXTHTMLElement = EXTHTMLElement;
    })(DOMHelpers = Ivane.DOMHelpers || (Ivane.DOMHelpers = {}));
})(Ivane || (Ivane = {}));
/// <dependency path="jslib/liquidfun/liquidfun.js" />
/// <dependency path="jslib/threejs/{thre.js|three.min.js}" />
/// <reference path="src/AjaxHelpers.ts" />
/// <reference path="src/AnimationsManager.ts" />
/// <reference path="src/Assertion.ts" />
/// <reference path="src/CanvasInputsManager.ts" />
/// <reference path="src/DeltaTime.ts" />
/// <reference path="src/EditorGridGameClassThreeJS.ts" />
/// <reference path="src/Exceptions.ts" />
/// <reference path="src/FireOnce.ts" />
/// <reference path="src/GameClassThreeJS.ts" />
/// <reference path="src/LiquidFunHelpers.ts" />
/// <reference path="src/ThreeJSHelpers.ts" />
/// <reference path="src/EXTHTMLElement.ts" />
/// <reference path="../Ivane_Main.ts" />
var animationsManager = new Ivane.Animation.AnimationsManager(32);
animationsManager.queueAnimation(1, 100, 2, Ivane.Animation.EASING_TYPES.EASE_IN_EASE_OUT, function (animation) {
    console.log(animation.getProgress());
}, function (animation) {
    console.log(animation.getProgress());
    console.log("animation finished");
});
var dt = 0.0;
//var world:b2World
window.onload = function (e) {
    test_GameClassThreeJS();
};
var GClass = (function (_super) {
    __extends(GClass, _super);
    function GClass() {
        _super.call(this);
        this.subStepFunctions = new Array();
        this.logDiv = document.getElementById("log");
        this.initWithOrthoCamera({
            heigh: 10,
            near: 1,
            far: 100
        }, {
            viewWidth: 800,
            viewHeight: 600,
            clearColor: 0xdcdcdc
        }, document.body);
        this.setEnableMiddleMouseCameraDrag(true);
    }
    GClass.prototype.gameStep = function () {
        //console.log(this.deltaTime)
        this.logDiv.innerHTML = "x: " + this.mouseXYMainOrthoCameraView.x
            + "<br/>y: " + this.mouseXYMainOrthoCameraView.y;
        if (this.inputsManager.mouseIsDown &&
            this.inputsManager.mouseButonsBitMap & Ivane.Inputs.MOUSE_BUTTONS.LEFT) {
            this.sphereMesh.position.x = this.mouseXYMainOrthoCameraWorld.x;
            this.sphereMesh.position.y = this.mouseXYMainOrthoCameraWorld.y;
        }
        if (this.inputsManager.mouseDown) {
            console.log("mouse down");
        }
        if (this.inputsManager.mouseUp) {
            console.log("mouse up");
        }
        if (this.inputsManager.keyIsDown(Ivane.Inputs.KeyCodes.d)) {
            this.sphereMesh.position.x += 0.1;
        }
        if (this.inputsManager.keyIsDown(Ivane.Inputs.KeyCodes.a)) {
            this.sphereMesh.position.x -= 0.1;
        }
        if (this.inputsManager.keyIsDown(Ivane.Inputs.KeyCodes.w)) {
            this.sphereMesh.position.y += 0.1;
        }
        if (this.inputsManager.keyIsDown(Ivane.Inputs.KeyCodes.s)) {
            this.sphereMesh.position.y -= 0.1;
        }
        for (var subStepFunctionIndex = 0; subStepFunctionIndex < this.subStepFunctions.length; subStepFunctionIndex++) {
            this.subStepFunctions[subStepFunctionIndex]();
        }
    };
    GClass.prototype.addGrid = function () {
        var sphereGeom = new THREE.SphereGeometry(1);
        var basicMaterial = new THREE.MeshBasicMaterial({
            color: 0xff0000
        });
        this.sphereMesh = new THREE.Mesh(sphereGeom, basicMaterial);
        this.scene.add(this.sphereMesh);
        Ivane.ThreeJSHelpers.addGrid(this.scene);
    };
    GClass.prototype.test_mergeGeometry = function () {
        var geom1 = new THREE.BoxGeometry(1, 1, 1);
        var basicMaterial = new THREE.MeshBasicMaterial({
            color: 0x00ff00
        });
        var geom2 = new THREE.SphereGeometry(3);
        var translateVertex = new THREE.Vector3(-3, -3, 0);
        for (var vertexIndex = 0; vertexIndex < geom2.vertices.length; vertexIndex++) {
            geom2.vertices[vertexIndex].add(translateVertex);
        }
        THREE.GeometryUtils.merge(geom1, geom2);
        var mesh = new THREE.Mesh(geom1, basicMaterial);
        this.scene.add(mesh);
        mesh.position.x = -2;
        mesh.position.set(-2, -2, 0);
    };
    GClass.prototype.test_liquidfun = function () {
        var _this = this;
        var GRAVITY = new b2Vec2(0, -21);
        var physlogDiv = document.getElementById("physlog");
        var connectedBodiesDiv = document.getElementById("connectedbodies");
        this.lfWorld = Ivane.LiquidFunHelpers.createWorldAndRegisterItAsGlobalVariable(GRAVITY);
        console.log(this.lfWorld);
        // var dynamicCircle = Ivane.LiquidFunHelpers.createDynamicBody(
        // 	this.lfWorld,
        // 	circleShape,
        // 	1, 1, new b2Vec2(0,2),
        // 	2, 1, false, false,
        // 	1, null)
        //Testing kinematic body creation
        var boxShape = new b2PolygonShape();
        boxShape.SetAsBoxXY(500, 1);
        var kinematicBody = Ivane.LiquidFunHelpers.createKinematicBody(this.lfWorld, boxShape, .4, new b2Vec2(-5, -2), 1, 1, true, false, 0, null);
        //Testing static body creation function
        boxShape.SetAsBoxXY(5, 1);
        var staticBody = Ivane.LiquidFunHelpers.createStaticBody(this.lfWorld, boxShape, 1, new b2Vec2(0, -1.85), 0, null);
        //Testing disntace joint	
        boxShape.SetAsBoxXY(.5, .5);
        var CONNECTED_BODY = 1;
        var timeStep = 1.0 / 60.0;
        var velocityIterations = 6;
        var positionIterations = 2;
        var animatePhysics = function () {
            _this.lfWorld.Step(timeStep, velocityIterations, positionIterations);
            //requestAnimationFrame(animatePhysics)
        };
        this.subStepFunctions.push(animatePhysics);
    };
    GClass.prototype.test_threejsHelpers = function () {
        var rectangleMesh = Ivane.ThreeJSHelpers.createRectangleMesh(1, 2, null);
        this.scene.add(rectangleMesh);
        rectangleMesh.position.set(-5, 0, 0);
    };
    GClass.prototype.test_distance_and_revolute_joint_suspension = function () {
        var _this = this;
        var carBodyMesh = Ivane.ThreeJSHelpers.createRectangleMesh(6, 2, null);
        var carLeftWheelMesh = Ivane.ThreeJSHelpers.createRectangleMesh(1, 1, null);
        var carRightWheelMesh = Ivane.ThreeJSHelpers.createRectangleMesh(1, 1, null);
        var CAR_BODY_COLLISION_CATEGORY = 0x0002;
        var CAR_BODY_COLLISION_MASK = ~0x0002;
        var carBodyCollisionFilter = new b2Filter();
        carBodyCollisionFilter.categoryBits = CAR_BODY_COLLISION_CATEGORY;
        carBodyCollisionFilter.maskBits = CAR_BODY_COLLISION_MASK;
        var CAR_BODY_INDEX = 10;
        var CAR_LEFT_WHEEL_INDEX = 11;
        var CAR_RIGHT_WHEEL_INDEX = 12;
        var DISTANCE_JOINT_DAMPING = 1;
        var DISTANCE_JOINT_HERZ = 21;
        var X_OFFSET = 1;
        var physicsBodyMeshes = new Array();
        physicsBodyMeshes[CAR_BODY_INDEX] = carBodyMesh;
        physicsBodyMeshes[CAR_LEFT_WHEEL_INDEX] = carLeftWheelMesh;
        physicsBodyMeshes[CAR_RIGHT_WHEEL_INDEX] = carRightWheelMesh;
        for (var physicsBodyMeshIndex = 0; physicsBodyMeshIndex < physicsBodyMeshes.length; physicsBodyMeshIndex++) {
            this.scene.add(physicsBodyMeshes[physicsBodyMeshIndex]);
        }
        //Creating car body and wheel carriers
        var carBodyShape = new b2PolygonShape();
        carBodyShape.SetAsBoxXY(3, 1);
        var CAR_BODY_Y_OFFSET = 0.2;
        var carBodyBody = Ivane.LiquidFunHelpers.createDynamicBody(this.lfWorld, carBodyShape, 1, 0.1, new b2Vec2(0 + X_OFFSET, 2 + CAR_BODY_Y_OFFSET), 0.1, 0.1, false, false, 0, CAR_BODY_INDEX, carBodyCollisionFilter);
        var carWheelShape = new b2CircleShape();
        carWheelShape.radius = 0.1;
        var carLeftWheelCarrierBody = Ivane.LiquidFunHelpers.createDynamicBody(this.lfWorld, carWheelShape, 1, 0.1, new b2Vec2(-1.5 + X_OFFSET, 1), 0.1, 0.1, false, false, 0, 0, null);
        var carRightWheelCarrierBody = Ivane.LiquidFunHelpers.createDynamicBody(this.lfWorld, carWheelShape, 1, 0.1, new b2Vec2(1.5 + X_OFFSET, 1), 0.1, 0.1, false, false, 0, 0, null);
        //left wheel carrier joints creation
        Ivane.LiquidFunHelpers.createDistanceJoint(this.lfWorld, carBodyBody, carLeftWheelCarrierBody, new b2Vec2(-2, -1 - CAR_BODY_Y_OFFSET), new b2Vec2(0, 0), DISTANCE_JOINT_DAMPING, DISTANCE_JOINT_HERZ);
        Ivane.LiquidFunHelpers.createDistanceJoint(this.lfWorld, carBodyBody, carLeftWheelCarrierBody, new b2Vec2(-1, -1 - CAR_BODY_Y_OFFSET), new b2Vec2(0, 0), DISTANCE_JOINT_DAMPING, DISTANCE_JOINT_HERZ);
        //righ wheel carrier joints creation 	
        Ivane.LiquidFunHelpers.createDistanceJoint(this.lfWorld, carBodyBody, carRightWheelCarrierBody, new b2Vec2(1, -1 - CAR_BODY_Y_OFFSET), new b2Vec2(0, 0), DISTANCE_JOINT_DAMPING, DISTANCE_JOINT_HERZ);
        Ivane.LiquidFunHelpers.createDistanceJoint(this.lfWorld, carBodyBody, carRightWheelCarrierBody, new b2Vec2(2, -1 - CAR_BODY_Y_OFFSET), new b2Vec2(0, 0), DISTANCE_JOINT_DAMPING, DISTANCE_JOINT_HERZ);
        //Creating left and right wheel and attaching them to wheel carriers
        carWheelShape.radius = 0.5;
        var WHEEL_FRICTION = 0.5;
        var carLeftWheelBody = Ivane.LiquidFunHelpers.createDynamicBody(this.lfWorld, carWheelShape, 1, WHEEL_FRICTION, new b2Vec2(-1.5 + X_OFFSET, 1), 0.1, 0.1, false, false, 0, CAR_LEFT_WHEEL_INDEX, carBodyCollisionFilter);
        Ivane.LiquidFunHelpers.createRevoluteJoint(this.lfWorld, carLeftWheelCarrierBody, carLeftWheelBody, carLeftWheelBody.GetWorldCenter());
        var carRightWheelBody = Ivane.LiquidFunHelpers.createDynamicBody(this.lfWorld, carWheelShape, 1, WHEEL_FRICTION, new b2Vec2(1.5 + X_OFFSET, 1), 0.1, 0.1, false, false, 0, CAR_RIGHT_WHEEL_INDEX, carBodyCollisionFilter);
        var revoluteJoint = Ivane.LiquidFunHelpers.createRevoluteJoint(this.lfWorld, carRightWheelCarrierBody, carRightWheelBody, carRightWheelBody.GetWorldCenter());
        var localCenter = new b2Vec2(0, 0);
        console.log(carBodyBody);
        var getLocalPointDiv = document.getElementById("GetLocalPoint");
        var worldPoint = new b2Vec2(0, 0);
        var localPoint = new b2Vec2(0, 0);
        var renderDistanceJointSuspension = function () {
            for (var bodyIndex = 0; bodyIndex < _this.lfWorld.bodies.length; bodyIndex++) {
                var physicsBody = _this.lfWorld.bodies[bodyIndex];
                var meshIndex = physicsBody.GetUserData();
                if (meshIndex >= CAR_BODY_INDEX
                    && meshIndex <= CAR_RIGHT_WHEEL_INDEX) {
                    var bodyMesh = physicsBodyMeshes[meshIndex];
                    var physicsBodyPosition = physicsBody.GetPosition();
                    var physicsBodyRotation = physicsBody.GetAngle();
                    bodyMesh.position.set(physicsBodyPosition.x, physicsBodyPosition.y, 0);
                    bodyMesh.rotation.z = physicsBodyRotation;
                    var TORQUE_AMMOUNT = 8.1;
                    if (_this.inputsManager.keyIsDown(Ivane.Inputs.KeyCodes.left_arrow)) {
                        carLeftWheelBody.ApplyTorque(TORQUE_AMMOUNT, true);
                        carRightWheelBody.ApplyTorque(TORQUE_AMMOUNT, true);
                    }
                    if (_this.inputsManager.keyIsDown(Ivane.Inputs.KeyCodes.right_arrow)) {
                        carLeftWheelBody.ApplyTorque(-TORQUE_AMMOUNT, true);
                        carRightWheelBody.ApplyTorque(-TORQUE_AMMOUNT, true);
                    }
                }
            }
            worldPoint.x = _this.mouseXYMainOrthoCameraWorld.x;
            worldPoint.y = _this.mouseXYMainOrthoCameraWorld.y;
            localPoint = carBodyBody.GetLocalPoint(worldPoint);
            var testPoint = carBodyBody.fixtures[0].TestPoint(worldPoint);
            getLocalPointDiv.innerHTML = "<pre>"
                + "carBodyBody::GetLocalPoint for"
                + "\n x: " + worldPoint.x
                + "\n y: " + worldPoint.y
                + "\n is \n x: " + localPoint.x
                + "\n y: " + localPoint.y
                + "\n testPoint: " + testPoint
                + "</pre>";
            _this.mainOrthoCamera.position.x = carBodyBody.GetPosition().x;
        };
        this.subStepFunctions.push(renderDistanceJointSuspension);
    };
    GClass.prototype.test_ajax_request = function () {
        var AJAX = Ivane.Network.Ajax;
        AJAX.createAJAXRequest("/tests/download_test.txt", AJAX.REQUEST_TYPES.GET, {
            param1: "value 1",
            param2: "value2"
        }, function (result) {
            console.log("ajax onResult");
            console.log(result);
        }, function () {
            console.log("ajax onFail");
        });
        AJAX.createAJAXRequest("/tests/download_test.txt", AJAX.REQUEST_TYPES.POST, {
            param1: "value 1",
            param2: "value2"
        }, function (result) {
            console.log("ajax onResult");
            console.log(result);
        }, function () {
            console.log("ajax onFail");
        });
    };
    GClass.prototype.test_ajax_helper_and_threejs_obj = function () {
        var _this = this;
        Ivane.ThreeJSHelpers.loadOBJFromWeb("res/model.obj", function (object3d) {
            _this.scene.add(object3d);
        });
    };
    GClass.prototype.test_exthtmlelement = function () {
        var extDiv = Ivane.DOMHelpers.EXTHTMLElement.createEXTDiv();
        document.body.appendChild(extDiv.getDOMElement());
        extDiv.setDisplayMode(Ivane.DOMHelpers.DISPLAY_MODES.BLOCK);
        extDiv.setZIndex(100)
            .setWidthInPixels(100)
            .setHeightInPixels(100)
            .setBackgroundColor(0xff0000)
            .setLeftInPixels(30)
            .setTopInPixels(30)
            .setPositionMode(Ivane.DOMHelpers.POSITION_MODES.ABSOLUTE)
            .setZRotaion(30);
    };
    GClass.prototype.runtTests = function () {
        this.test_mergeGeometry();
        this.test_liquidfun();
        //this.test_threejsHelpers()
        this.test_distance_and_revolute_joint_suspension();
        this.test_ajax_request();
        //this.test_ajax_helper_and_threejs_obj()
        this.test_exthtmlelement();
    };
    return GClass;
})(Ivane.ThreeJSHelpers.GameClassThreeJS);
function test_GameClassThreeJS() {
    var gc = new GClass();
    gc.addGrid();
    gc.run();
    gc.runtTests();
}
