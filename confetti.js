const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let animationFrameId = null;

// Function to create particles for the confetti effect
function createParticles(x, y) {
    const particleCount = window.innerWidth < 576 ? 50 : 100; // Fewer particles on mobile
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: x,
            y: y,
            radius: Math.random() * 5 + 2,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`,
            speed: Math.random() * 5 + 2,
            direction: Math.random() * 2 * Math.PI,
            gravity: Math.random() * 0.1 + 0.05,
            opacity: 1, // New: For fade-out effect
            shape: Math.random() > 0.5 ? 'circle' : 'rect' // New: Mix circles and rectangles
        });
    }
}

// Function to draw particles on the canvas
function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle, index) => {
        ctx.globalAlpha = particle.opacity; // Apply opacity
        ctx.beginPath();
        if (particle.shape === 'circle') {
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        } else {
            ctx.rect(particle.x - particle.radius, particle.y - particle.radius, particle.radius * 2, particle.radius);
        }
        ctx.fillStyle = particle.color;
        ctx.fill();

        particle.x += Math.cos(particle.direction) * particle.speed;
        particle.y += Math.sin(particle.direction) * particle.speed + particle.gravity;
        particle.opacity -= 0.005; // Fade out gradually

        if (particle.y > canvas.height || particle.opacity <= 0) {
            particles.splice(index, 1);
        }
    });

    // Stop animation when particles are gone
    if (particles.length === 0) {
        cancelAnimationFrame(animationFrameId);
        canvas.style.display = 'none';
        animationFrameId = null;
    }
}

// Function to animate particles
function animate() {
    drawParticles();
    animationFrameId = requestAnimationFrame(animate);
}

// Function to create confetti when the game ends
function createConfettiOnGameEnd() {
    canvas.style.display = 'block';
    createParticles(canvas.width / 2, canvas.height / 2);
    if (!animationFrameId) {
        animate(); // Start animation only when needed
    }
    // Auto-hide canvas after 5 seconds
    setTimeout(() => {
        particles = [];
        canvas.style.display = 'none';
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }, 5000);
}

// Optional: Adjust canvas size on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});