const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

// Function to create particles for the confetti effect
function createParticles(x, y) {
    const particleCount = 100;
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: x,
            y: y,
            radius: Math.random() * 5 + 2,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`,
            speed: Math.random() * 5 + 2,
            direction: Math.random() * 2 * Math.PI,
            gravity: Math.random() * 0.1 + 0.05
        });
    }
}

// Function to draw particles on the canvas
function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle, index) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        particle.x += Math.cos(particle.direction) * particle.speed;
        particle.y += Math.sin(particle.direction) * particle.speed + particle.gravity;

        if (particle.y > canvas.height) {
            particles.splice(index, 1);
        }
    });
}

// Function to animate particles
function animate() {
    drawParticles();
    requestAnimationFrame(animate);
}

// Start the confetti animation on page load
window.addEventListener('load', () => {
    // Initialize the animation
    animate();
});

// Function to create confetti when the game ends
function createConfettiOnGameEnd() {
    canvas.style.display = 'block'; // Show the canvas
    createParticles(canvas.width / 2, canvas.height / 2);
}

// Optional: Adjust canvas size on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});