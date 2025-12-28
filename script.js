
document.addEventListener("DOMContentLoaded", function () {
    // Toggle between profile and typing centered
    const typingElement = document.querySelector(".typing");
    const profileImg = document.querySelector('.profile-img');
    let showProfile = false;

    function showProfileOnly() {
        if (profileImg) profileImg.style.opacity = 1;
        if (typingElement) {
            typingElement.classList.add('hide-animate');
            // Ensure profile appears after animation
            setTimeout(() => {
                typingElement.style.opacity = 0;
            }, 650);
        }
    }
    function showTypingOnly() {
        if (profileImg) profileImg.style.opacity = 0;
        if (typingElement) {
            typingElement.classList.remove('hide-animate');
            typingElement.style.opacity = 1;
        }
    }

    document.body.addEventListener('click', function (e) {
        // Only toggle if click is NOT on .typing or .profile-img
        if (typingElement && typingElement.contains(e.target)) return;
        if (profileImg && profileImg.contains(e.target)) return;
        showProfile = !showProfile;
        if (showProfile) {
            showProfileOnly();
        } else {
            showTypingOnly();
        }
    });

    // Start with typing visible, profile hidden
    showTypingOnly();
    // Typing effect
    // const text = "Kiến Thức,Kinh Nghiệm,& Trải Nghiệm.".toLowerCase();
    const text = "stay hungry, stay foolish.".toLowerCase();
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
                cursorSpan.style.height = '1.0em';
                cursorSpan.style.background = 'none';
                const isDark = document.body.classList.contains('dark-mode');
                cursorSpan.style.borderLeft = isDark ? '1px solid #fff' : '1px solid #000';
                cursorSpan.style.marginLeft = '2px';
                cursorSpan.style.verticalAlign = 'middle';
                cursorSpan.style.animation = 'blink-cursor 1s steps(2, start) infinite';
            }
            // Đổi màu cursor khi chuyển dark mode
            function updateCursorColor() {
                const cursorSpan = document.querySelector('#typing-cursor');
                if (cursorSpan) {
                    const isDark = document.body.classList.contains('dark-mode');
                    cursorSpan.style.borderLeft = isDark ? '2px solid #fff' : '2px solid #000';
                }
            }
            document.getElementById('toggle-dark')?.addEventListener('click', () => {
                setTimeout(updateCursorColor, 100);
            });
            if (index < text.length) {
                index++;
                // Variable delay logic (slower)
                let delay = 120 + Math.random() * 100; // base random delay between 120-220ms
                const prevChar = text.charAt(index - 1);
                if (prevChar === ' ' || prevChar === '\n') {
                    delay = 350 + Math.random() * 120; // longer pause after space
                } else if (prevChar === ',' || prevChar === '.' || prevChar === ';' || prevChar === ':' || prevChar === '&') {
                    delay = 500 + Math.random() * 180; // even longer after punctuation
                }
                setTimeout(typeCharacter, delay);
            } else {
                // Khi typing xong
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
                    ctx.strokeStyle = 'rgba(30,30,30,0.55)'; // Đen xám
                    ctx.lineWidth = 1.2;
                    ctx.setLineDash([12, 4, 3, 4]); // Nét đứt dài-ngắn
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.stroke();
                    ctx.setLineDash([]); // Trở lại nét liền cho các phần khác
                    ctx.restore();
                }
            }
        }
        // Draw nodes
        for (let node of nodes) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.r, 0, 2 * Math.PI);
            ctx.fillStyle = 'rgba(40,40,40,0.85)'; // Đen xám
            ctx.shadowColor = 'rgba(0,0,0,0.18)';
            ctx.shadowBlur = 6;
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
