// 1. Dados do Usuário
const dadosUsuario = {
    nome: "Jader Abreu",
    foto: "https://i1.rgstatic.net/ii/profile.image/684913976156168-1540307625967_Q512/Jader-Abreu-3.jpg",
    notificacoes: 3
};

// 2. Dados de Projetos (Simulação de Banco de Dados)
const listaProjetos = [
    {
        id: 1,
        titulo: "Redesign do Site",
        categoria: "Marketing",
        progresso: 75,
        status: "no_prazo",
        icone: "fas fa-laptop-code",
        equipe: ["https://i.pravatar.cc/100?u=joao", "https://i.pravatar.cc/100?u=ana", "https://i.pravatar.cc/100?u=maria"]
    },
    {
        id: 2,
        titulo: "App Mobile TaskFy",
        categoria: "Desenvolvimento",
        progresso: 40,
        status: "em_risco",
        icone: "fas fa-mobile-alt",
        equipe: ["https://i.pravatar.cc/100?u=carlos", "https://i.pravatar.cc/100?u=pedro"]
    },
    {
        id: 3,
        titulo: "Campanha de Verão",
        categoria: "Publicidade",
        progresso: 90,
        status: "no_prazo",
        icone: "fas fa-sun",
        equipe: ["https://i.pravatar.cc/100?u=laura", "https://i.pravatar.cc/100?u=ana"]
    },
    {
        id: 4,
        titulo: "Migração de Servidor",
        categoria: "TI",
        progresso: 15,
        status: "atrasado",
        icone: "fas fa-server",
        equipe: ["https://i.pravatar.cc/100?u=joao", "https://i.pravatar.cc/100?u=carlos"]
    },
    {
        id: 5,
        titulo: "Treinamento Equipe",
        categoria: "RH",
        progresso: 100,
        status: "no_prazo",
        icone: "fas fa-users",
        equipe: ["https://i.pravatar.cc/100?u=maria", "https://i.pravatar.cc/100?u=laura"]
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

function obterClasseStatus(status) {
    switch(status) {
        case 'no_prazo': return 'verde';
        case 'em_risco': return 'amarelo';
        case 'atrasado': return 'vermelho';
        default: return '';
    }
}

function obterTextoStatus(status) {
    switch(status) {
        case 'no_prazo': return 'No Prazo';
        case 'em_risco': return 'Em Risco';
        case 'atrasado': return 'Atrasado';
        default: return '';
    }
}

function renderizarProjetos() {
    const container = document.getElementById('lista-projetos');
    if (!container) return;
    
    container.innerHTML = '';

    listaProjetos.forEach(projeto => {
        const classeStatus = obterClasseStatus(projeto.status);
        const textoStatus = obterTextoStatus(projeto.status);
        
        const cartao = document.createElement('div');
        cartao.className = 'cartao-projeto';
        
        let avataresHtml = projeto.equipe.map(foto => `<img src="${foto}" class="avatar-equipe">`).join('');
        
        cartao.innerHTML = `
            <div class="cabecalho-projeto">
                <div class="info-projeto">
                    <div class="icone-projeto"><i class="${projeto.icone}"></i></div>
                    <div style="margin-top: 10px;">
                        <h3 class="titulo-projeto">${projeto.titulo}</h3>
                        <span class="categoria-projeto">${projeto.categoria}</span>
                    </div>
                </div>
                <span class="status-badge ${classeStatus}">${textoStatus}</span>
            </div>
            
            <div class="progresso-projeto">
                <div class="info-progresso">
                    <span>Progresso</span>
                    <span>${projeto.progresso}%</span>
                </div>
                <div class="barra-progresso-container">
                    <div class="barra-progresso-valor" style="width: ${projeto.progresso}%; background-color: var(--${classeStatus})"></div>
                </div>
            </div>
            
            <div class="rodape-projeto">
                <div class="equipe-projeto">
                    ${avataresHtml}
                </div>
                <a href="detalhar.html?id=${projeto.id}" class="btn-texto" style="color: var(--cor-primaria)">Ver Detalhes</a>
            </div>
        `;
        container.appendChild(cartao);
    });
}

// 4. Inicialização
document.addEventListener('DOMContentLoaded', () => {
    renderizarPerfil();
    renderizarProjetos();
});