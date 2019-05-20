/**
 * @name Mic Input
 * @description <p>Get audio input from your computer's microphone.
 * Make noise to float the ellipse.</p>
 * <p>Note: p5.AudioIn contains its own p5.Amplitude object,
 * so you can call getLevel on p5.AudioIn without
 * creating a p5.Amplitude.</p>
 * <p><em><span class="small"> To run this example locally, you will need the
 * <a href="http://p5js.org/reference/#/libraries/p5.sound">p5.sound library</a>
 * and a running <a href="https://github.com/processing/p5.js/wiki/Local-server">local server</a>.</span></em></p>
 */
var input;
var analyzer;
var R = 6;
var docStyle = document.documentElement.style;

function setup() {
  // Create an Audio input
  mic = new p5.AudioIn();
  fft = new p5.FFT();
  // start the Audio Input.
  // By default, it does not .connect() (to the computer speakers)
  mic.start();
  fft = new p5.FFT(0.5, 32);
  fft.setInput(mic);

}

function draw() {
  setSpeed();
  sleep(0.2);
}

function setSpeed (){
  var vol = mic.getLevel();
  var vol = mic.getLevel();
  return docStyle.setProperty('--speed', (vol*100));
  console.log(vol*100);
}

function sleep(seconds){
  var waitUntil = new Date().getTime() + seconds*1000;
  while(new Date().getTime() < waitUntil) true;
}
