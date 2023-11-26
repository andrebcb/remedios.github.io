let participantes = [];

async function encurtarLinkTinyURL(link) {
    const url = `http://tinyurl.com/api-create.php?url=${encodeURIComponent(link)}`;
    const response = await fetch(url);

    if (response.ok) {
        const data = await response.text();
        return data;
    } else {
        throw new Error('Falha ao encurtar o link.');
    }
}

async function gerarLinkEncurtado(participante, sorteado) {
    const link = `${window.location.origin}/result.html?participante=${participante}&sorteado=${sorteado}`;
    const linkEncurtado = await encurtarLinkTinyURL(link);
    return linkEncurtado;
}

document.addEventListener('DOMContentLoaded', function () {
    const cadastrarButton = document.getElementById('cadastrar');
    cadastrarButton.addEventListener('click', cadastrarNome);

    const sortearButton = document.getElementById('sortear');
    sortearButton.addEventListener('click', sortearAmigo);
});

function cadastrarNome() {
    const nameInput = document.getElementById('name');
    const participantsDiv = document.getElementById('participants');

    const name = nameInput.value.trim();
    if (name === "") {
        alert('Por favor, insira um nome válido.');
        return;
    }

    participantes.push(name);
    nameInput.value = '';

    exibirParticipantes(participantsDiv);
}

function exibirParticipantes(container) {
    container.innerHTML = '<p>Participantes:</p>';
    participantes.forEach(name => {
        container.innerHTML += `<p>${name}</p>`;
    });
}

async function sortearAmigo() {
    const linksDiv = document.getElementById('links');

    if (participantes.length < 2 || participantes.length % 2 !== 0) {
        alert('Por favor, insira uma quantidade par de participantes maior que 1.');
        return;
    }

    linksDiv.innerHTML = '';
    const participantesSorteados = [];

    // Realiza o sorteio sem permitir que uma pessoa seja sorteada mais de uma vez
    participantes.forEach(async participante => {
        let sorteado;

        do {
            sorteado = sortear(participantes);
        } while (participantesSorteados.includes(sorteado) || sorteado === participante);

        participantesSorteados.push(sorteado);

        const linkEncurtado = await gerarLinkEncurtado(participante, sorteado);

        // Adiciona os links, botões de copiar e botões de compartilhar
        linksDiv.innerHTML += `
            <p>
                Link para ${participante}:
                <input type="text" value="${linkEncurtado}" readonly>
                <button onclick="copiarLink('${linkEncurtado}')">Copiar</button>
                <button onclick="compartilharLink('${linkEncurtado}')">Compartilhar</button>
            </p>`;
    });
}

function copiarLink(link) {
    const textarea = document.createElement('textarea');
    textarea.value = link;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('Link copiado para a área de transferência!');
}

function compartilharLink(link) {
    if (navigator.share) {
        navigator.share({
            title: 'Link do Sorteio',
            text: 'Confira o seu sorteio!',
            url: link,
        })
            .then(() => console.log('Link compartilhado com sucesso!'))
            .catch((error) => console.error('Erro ao compartilhar link:', error));
    } else {
        alert('Desculpe, o compartilhamento não é suportado no seu navegador.');
    }
}

function sortear(participantesRestantes) {
    const sorteadoIndex = Math.floor(Math.random() * participantesRestantes.length);
    return participantesRestantes[sorteadoIndex];
}
