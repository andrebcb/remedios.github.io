document.addEventListener('DOMContentLoaded', function() {
    const resultadoDiv = document.getElementById('resultado');
    
    const urlParams = new URLSearchParams(window.location.search);
    const participante = urlParams.get('participante');
    const sorteado = urlParams.get('sorteado');

    if (participante && sorteado) {
        resultadoDiv.innerHTML = `<p>${participante}, a pessoa sorteada é: ${sorteado}</p>`;
    } else {
        resultadoDiv.innerHTML = '<p>Erro ao carregar o resultado.</p>';
    }
});
