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

function setup() {
  frameRate(60);
    createCanvas(1920, 1080);
  ellipseMode(CENTER);
  background(235, 235, 235);
  // Create an Audio input
  mic = new p5.AudioIn();
  fft = new p5.FFT();
  // start the Audio Input.
  // By default, it does not .connect() (to the computer speakers)
  mic.start();
  fft = new p5.FFT(0.5, 32);
  fft.setInput(mic);
}
var t = 0;
var Q = 0;
function draw() {
  background(200);

  // Get the overall volume (between 0 and 1.0)
  
   background(0, 0, 0); //fill(235,235,235)
  translate(width/2, height/2);
  var vol = mic.getLevel();
  var waveform = fft.waveform();

  //ellipse(0, 0, h, h);
  var r = 20;
  //var AX = mouseX-width/2; var AY = mouseY-height/2;
  var AX = 0; var AY = 0;
  var l = waveform.length; 
  noStroke();
  for (var i = 0; i <= 26; i++) {
    //for (int i = 1; i <= 5; i++) {

    var d = i * 6;
    if (i == 0) {
      d = 1;
    }
    var n = 2*PI/d;
    for (var u = 0; u < d; u++) {
      var vol = mic.getLevel();
      var h = map(vol, 0, 0.05, 0, 3)
      //var h = vol*3;
      var a = n*u;
      //println(n);
      var xR = i*2*r;
      var x = xR * cos(a+t);
      var y = xR * sin(a+t);
      var b = dist(AX, AY, x, y);
     if (i == 0) {
        b = 30; }      
      var c = map(10/b, 0, .065, .7, 1);
      var B = (b/(20*PI));
      var R = r*(h*0.24*sin((B+Q)*.7)+.1);
     

      var T = map(waveform[l-1-i], 0.12, 1, 0.1, 1);
      stroke(map(vol, 0, 0.25, 0, 255), map(vol, 0, 0.5, 0, 255), map(vol, 0, 0.8, 0, 255));
      noFill();
      ellipse(x, y, 2.5*r*T, 2.5*r*T);
      
    }
    
  } 
    // fill(255,255,255);text(1000/b, 10,10);
      Q -= .12;
    t += PI/720;
}