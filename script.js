
document.addEventListener("DOMContentLoaded", function () {
    // Typing effect
    const text = "Kiến Thức, Kinh Nghiệm, & Trải Nghiệm.";
    const typingElement = document.querySelector(".typing");
    const cursor = document.getElementById("typing-cursor");
    function type() {
        let index = 0;
        function typeCharacter() {
            let html = '';
            for (let i = 0; i < index; i++) {
                if (text.charAt(i) === ',') {
                    html += ',';
                    html += '<br>';
                } else if (text.charAt(i) === ' ') {
                    html += '&nbsp;';
                } else {
                    html += text.charAt(i);
                }
            }
            // Luôn đặt cursor cuối cùng
            typingElement.innerHTML = html + '<span id="typing-cursor"></span>';
            const cursorSpan = typingElement.querySelector('#typing-cursor');
            if (cursorSpan) {
                cursorSpan.style.display = 'inline-block';
                cursorSpan.style.width = '1ch';
                cursorSpan.style.height = '1.2em';
                cursorSpan.style.background = 'none';
                cursorSpan.style.borderLeft = '2px solid #000';
                cursorSpan.style.marginLeft = '2px';
                cursorSpan.style.verticalAlign = 'middle';
                cursorSpan.style.animation = 'blink-cursor 1s steps(2, start) infinite';
            }
            if (index < text.length) {
                index++;
                setTimeout(typeCharacter, 250);
            }
        }
        typingElement.style.visibility = 'hidden';
        setTimeout(() => {
            typingElement.style.visibility = 'visible';
            typeCharacter();
        }, 1000);
    }
    type();

    // Neural network background animation
    const canvas = document.getElementById('neural-bg');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Node and connection config
    let NODE_COUNT = 48;
    if (window.innerWidth < 576) {
        NODE_COUNT = 18;
    } else if (window.innerWidth < 768) {
        NODE_COUNT = 28;
    } else if (window.innerWidth < 992) {
        NODE_COUNT = 36;
    }
    const nodes = [];
    for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 1.2,
            vy: (Math.random() - 0.5) * 1.2,
            r: 3 + Math.random() * 2
        });
    }

    function drawNeural() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Draw connections
        for (let i = 0; i < NODE_COUNT; i++) {
            for (let j = i + 1; j < NODE_COUNT; j++) {
                const a = nodes[i], b = nodes[j];
                const dist = Math.hypot(a.x - b.x, a.y - b.y);
                if (dist < 180) {
                    ctx.save();
                    ctx.strokeStyle = `rgba(8,148,255,${0.15 + 0.35 * (1 - dist/180)})`;
                    ctx.lineWidth = 1.2;
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.stroke();
                    ctx.restore();
                }
            }
        }
        // Draw nodes
        for (let node of nodes) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.r, 0, 2 * Math.PI);
            ctx.fillStyle = 'rgba(201,89,221,0.85)';
            ctx.shadowColor = '#FF2E54';
            ctx.shadowBlur = 8;
            ctx.fill();
            ctx.restore();
        }
    }

    function updateNeural() {
        for (let node of nodes) {
            node.x += node.vx;
            node.y += node.vy;
            if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
        }
    }

    function animate() {
        updateNeural();
        drawNeural();
        requestAnimationFrame(animate);
    }
    animate();
});
