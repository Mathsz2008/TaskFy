// 1. Dados do Usuário e Notificações
const dadosUsuario = {
    nome: "Jader Abreu",
    foto: "https://i1.rgstatic.net/ii/profile.image/684913976156168-1540307625967_Q512/Jader-Abreu-3.jpg",
    notificacoes: 3
};

// 2. Dados da Equipe (Simulação de Banco de Dados)
const equipeCarga = [
    { id: 1, nome: "João Pereira", cargo: "Desenvolvedor Backend", foto: "https://i.pravatar.cc/100?u=joao", horasDisponiveis: 30, horasOcupadas: 21 },
    { id: 2, nome: "Ana Costa", cargo: "Designer UI/UX", foto: "https://i.pravatar.cc/100?u=ana", horasDisponiveis: 30, horasOcupadas: 28 },
    { id: 3, nome: "Carlos Almeida", cargo: "Gerente de Projetos", foto: "https://i.pravatar.cc/100?u=carlos", horasDisponiveis: 30, horasOcupadas: 34 },
    { id: 4, nome: "Maria Silva", cargo: "Desenvolvedora Frontend", foto: "https://i.pravatar.cc/100?u=maria", horasDisponiveis: 30, horasOcupadas: 20 },
    { id: 5, nome: "Pedro Martins", cargo: "Analista de QA", foto: "https://i.pravatar.cc/100?u=pedro", horasDisponiveis: 30, horasOcupadas: 29 },
    { id: 6, nome: "Laura Mendes", cargo: "Marketing Digital", foto: "https://i.pravatar.cc/100?u=laura", horasDisponiveis: 30, horasOcupadas: 13 }
];

// 3. Funções de Renderização
function renderizarPerfil() {
    const elementoNome = document.getElementById('nome-usuario');
    const elementoFoto = document.getElementById('foto-usuario');
    const elementoContador = document.getElementById('contador-alertas');
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

function obterCorStatus(porcentagem) {
    if (porcentagem <= 80) return 'verde';
    if (porcentagem <= 100) return 'amarelo';
    return 'vermelho';
}

function renderizarTabelaCarga() {
    const corpoTabela = document.getElementById('corpo-tabela-carga');
    corpoTabela.innerHTML = '';

    equipeCarga.forEach(func => {
        const porcentagem = Math.round((func.horasOcupadas / func.horasDisponiveis) * 100);
        const corStatus = obterCorStatus(porcentagem);
        
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>
                <div class="info-funcionario">
                    <img src="${func.foto}" alt="${func.nome}">
                    <div>
                        <span class="nome-func">${func.nome}</span>
                        <span class="cargo-func">${func.cargo}</span>
                    </div>
                </div>
            </td>
            <td class="horas-col">
                ${func.horasDisponiveis}h
            </td>
            <td>
                <div class="container-barra">
                    <div class="barra-progresso-bg">
                        <div class="barra-progresso-fill barra-${corStatus}" style="width: ${Math.min(porcentagem, 100)}%"></div>
                    </div>
                    <div class="barra-info texto-${corStatus}">
                        <span>${func.horasOcupadas}/${func.horasDisponiveis}h</span>
                        <span>${porcentagem}%</span>
                    </div>
                </div>
            </td>
        `;
        corpoTabela.appendChild(linha);
    });
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    renderizarPerfil();
    renderizarTabelaCarga();
});