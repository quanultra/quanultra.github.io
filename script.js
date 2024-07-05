document.addEventListener("DOMContentLoaded", function () {
    const text = "Bui Van Quan,";
    const typingElement = document.querySelector(".typing");

    function type() {
        let index = 0;

        function typeCharacter() {
            if (index < text.length) {
                typingElement.innerHTML += text.charAt(index);
                index++;
                setTimeout(typeCharacter, 280);
            } else {
                const lastChar = typingElement.innerHTML.slice(-1);
                if (lastChar === ',') {
                    typingElement.innerHTML = typingElement.innerHTML.slice(0, -1) + '<span class="blink">,</span>';
                }

                setTimeout(() => {
                    typingElement.innerHTML = '';
                    setTimeout(type, 5000);
                }, 5000);
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
