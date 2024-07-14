document.addEventListener("DOMContentLoaded", function () {
    const text = "Kiến Thức, Kinh Nghiệm, & Trải Nghiệm.";
    const typingElement = document.querySelector(".typing");

    function type() {
        let index = 0;

        function typeCharacter() {
            if (index < text.length) {
                if (text.charAt(index) === ',') {
                    typingElement.innerHTML += '<span>,</span>';
                    typingElement.innerHTML += '<span class="line-break"></span>';
                } else {
                    typingElement.innerHTML += text.charAt(index);
                }
                index++;
                setTimeout(typeCharacter, 280);
            } else {
                setTimeout(() => {
                    typingElement.classList.add("zoom");
                }, 1000);
            }
        }

        typingElement.style.visibility = 'hidden';
        setTimeout(() => {
            typingElement.style.visibility = 'visible';
            typeCharacter();
        }, 1500);
    }

    type();
});
