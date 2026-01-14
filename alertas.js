// 1. Dados do Usuário
const dadosUsuario = {
    nome: "Jader Abreu",
    foto: "https://i1.rgstatic.net/ii/profile.image/684913976156168-1540307625967_Q512/Jader-Abreu-3.jpg",
    notificacoes: 4
};

// 2. Dados de Alertas (Simulação de Banco de Dados)
const listaDeAlertas = [
    {
        id: 1,
        usuario: "Carlos Almeida",
        foto: "https://i.pravatar.cc/100?u=carlos",
        mensagem: "notificou risco de atraso na etapa",
        projeto: "Relatório Mensal",
        tempo: "Agora",
        status: "atencao" // amarelo
    },
    {
        id: 2,
        usuario: "Ana Costa",
        foto: "https://i.pravatar.cc/100?u=ana",
        mensagem: "notificou adiantamento na etapa",
        projeto: "Apresentação da Semana",
        tempo: "Hoje - 11:05",
        status: "concluido" // verde
    },
    {
        id: 3,
        usuario: "João Pereira",
        foto: "https://i.pravatar.cc/100?u=joao",
        mensagem: "notificou risco de atraso na etapa",
        projeto: "Preparar Webinar",
        tempo: "Hoje - 09:30",
        status: "urgente" // vermelho
    },
    {
        id: 4,
        usuario: "Ana Costa",
        foto: "https://i.pravatar.cc/100?u=ana",
        mensagem: "notificou adiantamento na etapa",
        projeto: "Apresentação da Semana",
        tempo: "Hoje - 09:30",
        status: "concluido" // verde
    }
];

// 3. Funções de Renderização
function renderizarPerfil() {
    const elementoNome = document.getElementById('nome-usuario');
    const elementoFoto = document.getElementById('foto-usuario');
    const elementoPonto = document.getElementById('ponto-notificacao');
    
    if (elementoNome) elementoNome.textContent = dadosUsuario.nome;
    if (elementoFoto) {
        elementoFoto.src = dadosUsuario.foto;
        elementoFoto.alt = `Foto de ${dadosUsuario.nome}`;
    }
    if (elementoPonto) {
        elementoPonto.style.display = dadosUsuario.notificacoes > 0 ? 'block' : 'none';
    }
}

function obterCorStatus(status) {
    switch(status) {
        case 'concluido': return 'var(--verde)';
        case 'atencao': return 'var(--amarelo)';
        case 'urgente': return 'var(--vermelho)';
        default: return 'var(--cor-texto-secundario)';
    }
}

function renderizarAlertas() {
    const container = document.getElementById('lista-alertas');
    if (!container) return;
    
    container.innerHTML = '';

    listaDeAlertas.forEach(alerta => {
        const cor = obterCorStatus(alerta.status);
        const cartao = document.createElement('div');
        cartao.className = 'cartao-alerta';
        cartao.innerHTML = `
            <div class="alerta-info-principal">
                <img src="${alerta.foto}" alt="${alerta.usuario}" class="alerta-avatar">
                <div class="alerta-texto">
                    <span><b>${alerta.usuario}</b> ${alerta.mensagem}</span>
                    <p><i class="fas fa-folder"></i> ${alerta.projeto}</p>
                </div>
            </div>
            <div class="alerta-meta">
                <span>${alerta.tempo}</span>
                <span class="ponto-status" style="background-color: ${cor}"></span>
            </div>
        `;
        container.appendChild(cartao);
    });
}

// 4. Eventos
document.addEventListener('DOMContentLoaded', () => {
    renderizarPerfil();
    renderizarAlertas();

    const btnMarcarLidas = document.getElementById('btn-marcar-lidas');
    if (btnMarcarLidas) {
        btnMarcarLidas.addEventListener('click', () => {
            dadosUsuario.notificacoes = 0;
            renderizarPerfil();
            alert('Todas as notificações foram marcadas como lidas!');
        });
    }
});