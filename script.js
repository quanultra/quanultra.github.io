const canvas = document.getElementById('networkCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];
const numberOfParticles = 100;

class Particle {
    constructor(x, y, size, color, weight) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.weight = weight;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        this.size -= 0.05;
        if (this.size < 0) {
            this.x = (Math.random() * canvas.width) + canvas.width / 2;
            this.y = (Math.random() * canvas.height) + canvas.height / 2;
            this.size = (Math.random() * 5) + 2;
            this.weight = (Math.random() * 2) - 0.5;
        }
        this.y += this.weight;
        this.weight += 0.02;

        if (this.y > canvas.height) {
            this.weight *= -1;
        }
        this.draw();
    }
}

function init() {
    for (let i = 0; i < numberOfParticles; i++) {
        const size = (Math.random() * 5) + 2;
        const x = (Math.random() * canvas.width) + canvas.width / 2;
        const y = (Math.random() * canvas.height) + canvas.height / 2;
        const color = 'white';
        const weight = 1;
        particlesArray.push(new Particle(x, y, size, color, weight));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connect();
    requestAnimationFrame(animate);
}

function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            const distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
                + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
            if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                opacityValue = 1 - (distance / 20000);
                ctx.strokeStyle = `rgba(255, 255, 255, ${opacityValue})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

init();
animate();
