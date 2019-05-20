/**
 * @name Frequency Spectrum
 * @description <p>Visualize the frequency spectrum of live audio input.</p>
 * <p><em><span class="small"> To run this example locally, you will need the
 * <a href="http://p5js.org/reference/#/libraries/p5.sound">p5.sound library</a>
 * and a running <a href="https://github.com/processing/p5.js/wiki/Local-server">local server</a>.</span></em></p>
 */
var mic, fft;

function setup() {
   createCanvas(1920,1080);
   noFill();
   colorMode(HSB);
   angleMode(DEGREES);

   mic = new p5.AudioIn();
   mic.start();
   fft = new p5.FFT();
   fft.setInput(mic);
}

function draw() {
   background(0);
   var spectrum = fft.analyze();

  noStroke();
  translate(width / 2, height / 2 );
  //beginShape();
  for (var i = 0; i < spectrum.length; i++) {
        var angle = map(i, 50, spectrum.length/5, 100, 2880);
        var mic = spectrum[i];
        var r = map(mic*5, 75, 6, 45, 60);
        //fill(i, 255, 255);
        var x = r * cos(angle);
        var y = r * sin(angle);
	if ( i == 0 ) {
		stroke(255, 92, 32);
	}else{
		stroke(mic*25.5, 100, 255);
	}
        line(0, 0, x*50, y*50);
  }

  //endShape();
}
