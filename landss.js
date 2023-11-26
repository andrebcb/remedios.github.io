document.addEventListener("DOMContentLoaded", function () {
  const paragraphs = document.querySelectorAll("[data-text]");

  paragraphs.forEach(async (para, index) => {
    await new Promise(resolve => setTimeout(resolve, 1000 * index));
    typeWriter(para, para.dataset.text);
  });
});

function typeWriter(element, text) {
  let i = 0;
  const speed = 30; // Velocidade da digitação

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}
