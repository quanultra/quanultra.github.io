
document.addEventListener("DOMContentLoaded", function () {
    // Toggle between profile and typing centered
    const typingElement = document.querySelector(".typing");

    // Typing effect
    // const text = "Kiến Thức,Kinh Nghiệm,& Trải Nghiệm.".toLowerCase();
    const text = "stay hungry,stay foolish.".toLowerCase();
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
                // Tăng độ chân thật cho delay typing
                let delay;
                const prevChar = text.charAt(index - 1);
                // Xác suất dừng lâu (giả lập người gõ dừng lại)
                if (Math.random() < 0.07) {
                    delay = 600 + Math.random() * 800; // dừng lâu bất chợt
                } else if (prevChar === ' ' || prevChar === '\n') {
                    delay = 320 + Math.random() * 180; // lâu hơn sau khoảng trắng
                } else if (prevChar === ',') {
                    delay = 1200 + Math.random() * 400; // lâu sau dấu phẩy
                } else if (prevChar === '.' || prevChar === ';' || prevChar === ':' || prevChar === '&') {
                    delay = 700 + Math.random() * 300; // lâu sau dấu câu
                } else {
                    delay = 70 + Math.random() * 80; // nhanh hơn cho ký tự thường
                }
                setTimeout(typeCharacter, delay);
            } else {
                // Khi typing xong
            }
        }
        setTimeout(() => {
            typeCharacter();
        }, 1000);
    }
    type();
});
