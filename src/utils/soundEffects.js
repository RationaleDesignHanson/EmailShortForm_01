// Sound feedback system for haptic fallback
class SoundEffects {
  constructor() {
    this.audioContext = null;
    this.enabled = true;
  }

  init() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  playTone(frequency, duration, type = 'sine') {
    if (!this.enabled) return;
    
    try {
      this.init();
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      oscillator.frequency.value = frequency;
      oscillator.type = type;
      
      gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
      
      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + duration);
    } catch (e) {
      console.log('Sound not available');
    }
  }

  // Swipe sounds
  swipeRight() {
    this.playTone(800, 0.1, 'sine'); // High pleasant tone
  }

  swipeLeft() {
    this.playTone(400, 0.1, 'sine'); // Lower neutral tone
  }

  actionComplete() {
    // Pleasant success chord
    this.playTone(523, 0.05, 'sine'); // C
    setTimeout(() => this.playTone(659, 0.05, 'sine'), 50); // E
    setTimeout(() => this.playTone(784, 0.08, 'sine'), 100); // G
  }

  threshold() {
    this.playTone(600, 0.05, 'triangle'); // Subtle click
  }
}

const soundEffects = new SoundEffects();
export default soundEffects;

