let participantes = [];

function cadastrarParticipante() {
    const nomeInput = document.getElementById('nome');
    const nome = nomeInput.value.trim();

    if (nome === "") {
        alert('Por favor, insira um nome válido.');
        return;
    }

    participantes.push(nome);
    nomeInput.value = '';

    exibirParticipantesPersistencia();
}

function exibirParticipantesPersistencia() {
    const listaParticipantesDiv = document.getElementById('listaParticipantes');
    listaParticipantesDiv.innerHTML = '<p>Participantes Cadastrados:</p>';
    participantes.forEach(nome => {
        listaParticipantesDiv.innerHTML += `<p>${nome}</p>`;
    });
}
