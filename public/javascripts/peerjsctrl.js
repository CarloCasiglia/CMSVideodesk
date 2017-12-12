// Compatibility shim
//navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

var callerStream;
var name = prompt("Come ti chiami?");

var peer = new Peer(name, {
  //key: 'skumarul4pjy8pvi',
  host: 'https://cmsvideodesk.herokuapp.com/',
  //host: 'localhost',
  path: '/',
  port: 42098,
  //key: 'peerjs'
  //secure: true
});

if (navigator.mediaDevices) {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      .then(function onSuccess(stream) {
        callerStream = stream;
        var video = document.getElementById('localCam');
        video.autoplay = true;
        video.srcObject = stream;
      })
      .catch(function onError() {
        alert('Impossibile accedere alla webcam');
      });
} else {
  alert('getUserMedia is not supported in this browser.');
}

peer.on('open', function(name){
  alert(name + ' connesso');
});

peer.on('call', function(mediaConnection){
  mediaConnection.answer(window.localStream);
  mediaConnection.on('stream', function (stream) {
      document.getElementById('remoteCam').srcObject = stream;
  });
});

function videocall() {
  peer.connect('carlo');
  peer.call('carlo', callerStream);
};
