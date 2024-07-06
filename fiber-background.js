class FiberBackground {
    constructor() {
      this.canvas = document.createElement('canvas');
      this.ctx = this.canvas.getContext('2d');
      const container = document.getElementById('fiber-background');
      if (!container) {
        console.error('Fiber background container not found');
        return;
      }
      container.appendChild(this.canvas);
  
      this.resize();
      window.addEventListener('resize', this.resize.bind(this));
  
      this.lines = [];
      this.createLines();
      this.animate();
    }
  
    resize() {
      // Adjust canvas size to window size
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }
  
    createLines() {
      // Create fiber lines
      const lineCount = 50;
      for (let i = 0; i < lineCount; i++) {
        const hue = Math.floor(Math.random() * 60) + 180;
        this.lines.push({
          x: Math.random() * this.canvas.width,
          y: Math.random() * this.canvas.height,
          length: Math.random() * 100 + 50,
          speed: Math.random() * 2 + 1,
          thickness: Math.random() * 2 + 1,
          color: `hsl(${hue}, 100%, 50%)`
        });
      }
    }
  
    animate() {
      // Animate fiber lines
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  
      this.lines.forEach((line) => {
        this.ctx.beginPath();
        this.ctx.moveTo(line.x, line.y);
        this.ctx.lineTo(line.x + line.length, line.y);
        this.ctx.strokeStyle = line.color;
        this.ctx.lineWidth = line.thickness;
        this.ctx.stroke();
  
        line.x += line.speed;
        if (line.x > this.canvas.width) {
          line.x = -line.length;
          line.y = Math.random() * this.canvas.height;
        }
      });
  
      requestAnimationFrame(this.animate.bind(this));
    }
  }
  
  function initFiberBackground() {
    try {
      new FiberBackground();
    } catch (error) {
      console.error('Error initializing FiberBackground:', error);
    }
  }
  
  // Initialize fiber background when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFiberBackground);
  } else {
    initFiberBackground();
  }