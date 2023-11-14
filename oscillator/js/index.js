// Generate Sine on Hover

class Sound {
  
    constructor(context) {
      this.context = context;
    }
    
    setup() {
      this.oscillator = this.context.createOscillator();
      this.delayNode = this.context.createDelay();
      this.gainNode = this.context.createGain();
      this.analyser = this.context.createAnalyser();
  
      // Original Oscillator
      this.oscillator.connect(this.gainNode);
      this.gainNode.connect(this.analyser);
      this.analyser.connect(this.context.destination);

      // Delay Effect
      this.oscillator2 = this.context.createOscillator();
      this.gainNode2 = this.context.createGain();

      this.delayNode = this.context.createDelay();
      this.feedback = context.createGain();

      this.oscillator2.connect(this.delayNode);
      this.delayNode.connect(this.feedback);
      this.feedback.connect(this.delayNode);
      this.delayNode.connect(this.gainNode2);
      this.gainNode2.connect(this.analyser);
      this.analyser.connect(this.context.destination);
      
      // Parameters

      this.oscillator.type = 'sine';
      // this.oscillator.type = 'square';
      // this.oscillator.type = 'triangle';
      // this.oscillator.type = 'sawtooth';

      this.delayNode.delayTime.value = 0.25; // seconds
      
      this.analyser.smoothingTimeConstant = 0.8;
      this.analyser.fftSize = 2048;

      const bufferLength = this.analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);


      // Draw Oscilloscope
      const draw = () => {
        requestAnimationFrame(draw);
        this.analyser.getByteTimeDomainData(dataArray);
        let pixelRatio, sizeOnScreen, sliceWidth;
        const canvas = document.getElementById("oscilloscope"),
        c = canvas.getContext("2d");
        pixelRatio = window.devicePixelRatio;
        sizeOnScreen = canvas.getBoundingClientRect();
        canvas.width = sizeOnScreen.width * pixelRatio;
        canvas.height = sizeOnScreen.height * pixelRatio;
        canvas.style.width = canvas.width / pixelRatio + "px";
        canvas.style.height = canvas.height / pixelRatio + "px";
        c.strokeStyle = "greenyellow";
        c.lineWidth = 2;
        sliceWidth = (canvas.width * 1.0) / bufferLength;
        for (let i = 1; i < bufferLength; i += 1) {
            let x = i * sliceWidth;
            let v = dataArray[i] / 128.0;
            let y = (v * canvas.height) / 2;
            c.lineTo(x, y);
        } 
        c.stroke();
      };
      draw();
    }
  
    play(value) {
      this.setup();
  
      // Original Oscillator
      this.oscillator.frequency.value = value;
      this.gainNode.gain.setValueAtTime(0, this.context.currentTime);
      this.gainNode.gain.linearRampToValueAtTime(0.075, this.context.currentTime + 0.01); // starting volume

      // Delay Effect
      this.oscillator2.frequency.value = value;
      this.gainNode2.gain.setValueAtTime(0, this.context.currentTime);
      this.gainNode2.gain.linearRampToValueAtTime(0.025, this.context.currentTime + 0.01); // starting volume
      this.feedback.gain.value = 1; // amount of signal 1 = 100%

      // Play Control
      this.oscillator.start(this.context.currentTime);
      this.oscillator2.start(this.context.currentTime);
      this.stop(this.context.currentTime);

    }
    
    stop() {
      this.gainNode.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + 4);
      this.oscillator.stop(this.context.currentTime + 4);

      this.gainNode2.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + 4);
      this.oscillator2.stop(this.context.currentTime + 4);
      this.feedback.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + 8);
      
    }
   
  }

  let context = new (window.AudioContext || window.webkitAudioContext)();
  
  var notes = document.querySelectorAll('.note');
  
  notes.forEach((note) => {
    note.addEventListener('click', () => {
      playSound(note);
    })
    note.addEventListener('tap', () => {
      playSound(note);
    })
  })
  
  function playSound(note) {
    let sound = new Sound(context);
    let value = note.dataset.frequency;
    sound.play(value);
    sound.stop(); 
  }

