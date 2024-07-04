document.addEventListener("DOMContentLoaded", function () {
    const text = "Bui Van Quan,";
    let index = 0;
    const typingElement = document.querySelector(".typing");

    function type() {
        if (index < text.length) {
            typingElement.innerHTML += text.charAt(index);
            index++;
            setTimeout(type, 280);
        }
    }

    typingElement.style.visibility = 'hidden';

    setTimeout(() => {
        typingElement.style.visibility = 'visible';
        type();
    }, 1500);
});
