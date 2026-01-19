// 1. Configurações e Estado da Aplicação
let dataAtual = new Date(); // Data de referência para a visualização
let diaSelecionado = new Date(); // Dia que o usuário clicou

// 2. Simulação de Banco de Dados (Mock Data)
const dadosUsuario = {
    nome: "Jader Abreu",
    foto: "https://i1.rgstatic.net/ii/profile.image/684913976156168-1540307625967_Q512/Jader-Abreu-3.jpg",
    notificacoes: 4
};

// Chaves no formato YYYY-MM-DD
const bancoDeDadosTarefas = {
    "2026-01-20": [
        { id: 1, titulo: "Revisão do Projeto TaskFy", projeto: "Desenvolvimento", tempo: "09:00 - 10:30", status: "no_prazo" },
        { id: 2, titulo: "Reunião de Alinhamento", projeto: "Equipe", tempo: "14:00 - 15:00", status: "em_risco" }
    ],
    "2026-01-22": [
        { id: 3, titulo: "Finalizar Documentação", projeto: "Documentação", tempo: "10:00 - 12:00", status: "atrasado", aviso: "Entrega hoje!" }
    ],
    "2026-01-25": [
        { id: 4, titulo: "Pesquisa de Mercado", projeto: "Marketing", tempo: "11:00 - 13:00", status: "no_prazo" }
    ]
};

// 3. Funções de Utilidade
function formatarDataISO(data) {
    return data.toISOString().split('T')[0];
}

function obterNomeDia(data) {
    const dias = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    return dias[data.getDay()];
}

function obterNomeMes(data) {
    const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    return meses[data.getMonth()];
}

// 4. Funções de Renderização
function renderizarBarraDias() {
    const listaDias = document.getElementById('lista-dias');
    listaDias.innerHTML = '';

    // Encontrar o início da semana (Domingo)
    const inicioSemana = new Date(dataAtual);
    inicioSemana.setDate(dataAtual.getDate() - dataAtual.getDay());

    for (let i = 0; i < 7; i++) {
        const dia = new Date(inicioSemana);
        dia.setDate(inicioSemana.getDate() + i);

        const elementoDia = document.createElement('div');
        elementoDia.className = `dia-item ${formatarDataISO(dia) === formatarDataISO(new Date()) ? 'hoje' : ''} ${formatarDataISO(dia) === formatarDataISO(diaSelecionado) ? 'selecionado' : ''}`;
        
        elementoDia.innerHTML = `
            <span class="nome-dia">${obterNomeDia(dia)}</span>
            <span class="numero-dia">${dia.getDate()}</span>
        `;

        elementoDia.onclick = () => {
            diaSelecionado = new Date(dia);
            renderizarBarraDias();
            renderizarTarefas();
        };

        listaDias.appendChild(elementoDia);
    }

    // Atualizar texto do período
    const fimSemana = new Date(inicioSemana);
    fimSemana.setDate(inicioSemana.getDate() + 6);
    document.getElementById('texto-periodo').textContent = 
        `${inicioSemana.getDate()} ${obterNomeMes(inicioSemana)} - ${fimSemana.getDate()} ${obterNomeMes(fimSemana)} ${fimSemana.getFullYear()}`;
}

function renderizarTarefas() {
    const container = document.getElementById('lista-tarefas');
    const dataChave = formatarDataISO(diaSelecionado);
    const tarefas = bancoDeDadosTarefas[dataChave] || [];

    container.innerHTML = `<h3 class="grupo-dia-titulo">${obterNomeDia(diaSelecionado)}, ${diaSelecionado.getDate()} de ${obterNomeMes(diaSelecionado)}</h3>`;

    if (tarefas.length === 0) {
        container.innerHTML += `<p style="color: #a3aed0; padding: 20px;">Nenhuma tarefa agendada para este dia.</p>`;
        return;
    }

    tarefas.forEach(tarefa => {
        const classeStatus = {
            'no_prazo': 'verde',
            'em_risco': 'amarelo',
            'atrasado': 'vermelho'
        }[tarefa.status];

        const labelStatus = {
            'no_prazo': 'No Prazo',
            'em_risco': 'Em Risco',
            'atrasado': 'Atrasado'
        }[tarefa.status];

        const html = `
            <div class="cartao-tarefa ${classeStatus}">
                <div class="barra-lateral-status"></div>
                <div class="corpo-tarefa">
                    <div class="topo-tarefa">
                        <span class="titulo-tarefa">${tarefa.titulo}</span>
                        <span class="info-tempo">${tarefa.tempo}</span>
                    </div>
                    <div class="rodape-tarefa">
                        <div class="projeto-tag">
                            <i class="fas fa-folder-open"></i>
                            <span>${tarefa.projeto}</span>
                        </div>
                        <div class="status-detalhe">
                            ${tarefa.aviso ? `<span style="margin-right: 10px;"><i class="fas fa-exclamation-triangle"></i> ${tarefa.aviso}</span>` : ''}
                            <span>${labelStatus}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += html;
    });
}

// 5. Eventos de Navegação
document.getElementById('btn-anterior').onclick = () => {
    dataAtual.setDate(dataAtual.getDate() - 7);
    renderizarBarraDias();
    renderizarTarefas();
};

document.getElementById('btn-proximo').onclick = () => {
    dataAtual.setDate(dataAtual.getDate() + 7);
    renderizarBarraDias();
    renderizarTarefas();
};

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
    
    // Renderizar notificações
    if (elementoContador) {
        elementoContador.textContent = dadosUsuario.notificacoes;
        // Esconde o contador se não houver notificações
        elementoContador.style.display = dadosUsuario.notificacoes > 0 ? 'block' : 'none';
    }
    if (elementoPonto) {
        elementoPonto.style.display = dadosUsuario.notificacoes > 0 ? 'block' : 'none';
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    renderizarPerfil();
    renderizarBarraDias();
    renderizarTarefas();
});

// Lógica do Menu Mobile
const btnMenu = document.getElementById('btn-menu-mobile');
const sidebar = document.querySelector('.sidebar');
const overlay = document.getElementById('overlay-menu');

function alternarMenu() {
    sidebar.classList.toggle('aberto');
    overlay.classList.toggle('ativo');
    // Trava o scroll do fundo quando o menu está aberto
    document.body.style.overflow = sidebar.classList.contains('aberto') ? 'hidden' : 'auto';
}

btnMenu.addEventListener('click', alternarMenu);
overlay.addEventListener('click', alternarMenu); // Fecha ao clicar fora do menu
