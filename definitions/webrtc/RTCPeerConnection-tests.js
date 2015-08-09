/// <reference path="MediaStream.d.ts" />
/// <reference path="RTCPeerConnection.d.ts" />
var config = { iceServers: [{ url: "stun.l.google.com:19302" }] };
var constraints = { mandatory: { offerToReceiveAudio: true, offerToReceiveVideo: true } };
var peerConnection = new RTCPeerConnection(config, constraints);
navigator.getUserMedia({ audio: true, video: true }, function (stream) {
    peerConnection.addStream(stream);
}, function (error) {
    console.log('Error message: ' + error.message);
    console.log('Error name: ' + error.name);
});
peerConnection.onaddstream = function (ev) { return console.log(ev.type); };
peerConnection.ondatachannel = function (ev) { return console.log(ev.type); };
peerConnection.oniceconnectionstatechange = function (ev) { return console.log(ev.type); };
peerConnection.onnegotiationneeded = function (ev) { return console.log(ev.type); };
peerConnection.onopen = function (ev) { return console.log(ev.type); };
peerConnection.onicecandidate = function (ev) { return console.log(ev.type); };
peerConnection.onremovestream = function (ev) { return console.log(ev.type); };
peerConnection.onstatechange = function (ev) { return console.log(ev.type); };
peerConnection.createOffer(function (offer) {
    peerConnection.setLocalDescription(offer, function () { return console.log("set local description"); }, function (error) { return console.log("Error setting local description: " + error); });
}, function (error) { return console.log("Error creating offer: " + error); });
var type = RTCSdpType[RTCSdpType.offer];
var offer = { type: type, sdp: "some sdp" };
var sessionDescription = new RTCSessionDescription(offer);
peerConnection.setRemoteDescription(sessionDescription, function () {
    peerConnection.createAnswer(function (answer) {
        peerConnection.setLocalDescription(answer, function () { return console.log('Set local description'); }, function (error) { return console.log("Error setting local description from created answer: " + error + "; answer.sdp=" + answer.sdp); });
    }, function (error) { return console.log("Error creating answer: " + error); });
}, function (error) { return console.log('Error setting remote description: ' + error + "; offer.sdp=" + offer.sdp); });
var webkitSessionDescription = new webkitRTCSessionDescription(offer);
peerConnection.setRemoteDescription(webkitSessionDescription, function () {
    peerConnection.createAnswer(function (answer) {
        peerConnection.setLocalDescription(answer, function () { return console.log('Set local description'); }, function (error) { return console.log("Error setting local description from created answer: " + error + "; answer.sdp=" + answer.sdp); });
    }, function (error) { return console.log("Error creating answer: " + error); });
}, function (error) { return console.log('Error setting remote description: ' + error + "; offer.sdp=" + offer.sdp); });
var mozSessionDescription = new mozRTCSessionDescription(offer);
peerConnection.setRemoteDescription(mozSessionDescription, function () {
    peerConnection.createAnswer(function (answer) {
        peerConnection.setLocalDescription(answer, function () { return console.log('Set local description'); }, function (error) { return console.log("Error setting local description from created answer: " + error + "; answer.sdp=" + answer.sdp); });
    }, function (error) { return console.log("Error creating answer: " + error); });
}, function (error) { return console.log('Error setting remote description: ' + error + "; offer.sdp=" + offer.sdp); });
var wkPeerConnection = new webkitRTCPeerConnection(config, constraints);
//# sourceMappingURL=RTCPeerConnection-tests.js.map