// script.js - Substitua por este código
const searchInput = document.getElementById("searchInput");
const resultadosDiv = document.getElementById("resultados");
const loadingDiv = document.getElementById("loading");
const statsDiv = document.getElementById("stats");
const sugestoesDiv = document.getElementById("sugestoes");

let timeoutBusca;

// Configuração
const CONFIG = {
    delayBusca: 300,
    minCaracteres: 2,
    limiteResultados: 30
};

// Busca em tempo real
searchInput.addEventListener('input', (e) => {
    const termo = e.target.value.trim();
    
    clearTimeout(timeoutBusca);
    sugestoesDiv.style.display = 'none';
    
    if (!termo) {
        limparResultados();
        statsDiv.innerHTML = '🔍 Digite para buscar procedimentos...';
        return;
    }
    
    if (termo.length === 1) {
        // Para um caractere, mostra mensagem amigável
        statsDiv.innerHTML = '🔍 Continue digitando para buscar...';
        return;
    }
    
    timeoutBusca = setTimeout(() => {
        buscarProcedimentos(termo);
    }, CONFIG.delayBusca);
});

// Busca quando usuário pressiona Enter
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        const termo = searchInput.value.trim();
        if (termo) {
            buscarProcedimentos(termo);
        }
    }
});

// Busca de procedimentos
async function buscarProcedimentos(termo) {
    if (termo.length < CONFIG.minCaracteres) {
        statsDiv.innerHTML = `🔍 Digite pelo menos ${CONFIG.minCaracteres} caracteres...`;
        return;
    }
    
    loadingDiv.style.display = 'block';
    statsDiv.innerHTML = `⏳ Buscando "${termo}"...`;
    
    try {
        const response = await fetch(
    `https://lucaspts2.onrender.com/procedimentos/busca?termo=${encodeURIComponent(termo)}&limite=${CONFIG.limiteResultados}`
        );
        
        if (!response.ok) {
            throw new Error(`Erro no servidor: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.erro) {
            throw new Error(data.erro);
        }
        
        exibirResultados(data, termo);
        
    } catch (error) {
        console.error('Erro na busca:', error);
        statsDiv.innerHTML = `❌ Erro: ${error.message}`;
        resultadosDiv.innerHTML = `
            <div style="text-align: center; padding: 20px; color: #666;">
                ⚠️ Não foi possível realizar a busca. Tente novamente.
            </div>
        `;
    } finally {
        loadingDiv.style.display = 'none';
    }
}

function exibirResultados(data, termo) {
    resultadosDiv.innerHTML = '';
    
    if (!data.procedimentos || data.procedimentos.length === 0) {
        statsDiv.innerHTML = `🔍 Nenhum resultado para "${termo}"`;
        resultadosDiv.innerHTML = `
            <div style="text-align: center; padding: 20px; color: #666;">
                😞 Nenhum procedimento encontrado.
                <br>Tente usar termos diferentes.
            </div>
        `;
        return;
    }
    
    statsDiv.innerHTML = `✅ ${data.procedimentos.length} resultados para "${termo}"`;
    
    data.procedimentos.forEach(proc => {
        const item = document.createElement('div');
        item.className = 'resultado-item';
        item.innerHTML = `
            <div class="resultado-header">
                <span class="resultado-codigo">${proc.codigo}</span>
                <span class="resultado-dias">${proc.dias_permanencia || 'N/A'} dias</span>
            </div>
            <div class="resultado-nome">${proc.nome}</div>
        `;
        
        item.addEventListener('click', () => {
            selecionarProcedimento(proc);
        });
        
        resultadosDiv.appendChild(item);
    });
}

function selecionarProcedimento(procedimento) {
    searchInput.value = '';
    resultadosDiv.innerHTML = '';
    
    statsDiv.innerHTML = `✅ Procedimento selecionado`;
    
    const infoHTML = `
        <div class="detalhe-procedimento">
            <h3>📋 ${procedimento.nome}</h3>
            <div class="detalhe-info">
                <div class="detalhe-codigo">
                    <strong>Código:</strong> ${procedimento.codigo}
                </div>
                <div class="detalhe-dias">
                    <strong>Dias de Permanência:</strong>
                    <span class="dias-destaque">${procedimento.dias_permanencia || 'N/A'}</span> dias
                </div>
            </div>
            <button onclick="limparSelecao()" class="btn-limpar">
                🔍 Nova Busca
            </button>
        </div>
    `;
    
    resultadosDiv.innerHTML = infoHTML;
}

function limparResultados() {
    resultadosDiv.innerHTML = '';
    statsDiv.innerHTML = '🔍 Digite para buscar procedimentos...';
}

function limparSelecao() {
    limparResultados();
    searchInput.value = '';
    searchInput.focus();
}

// Foco automático no campo de busca
document.addEventListener('DOMContentLoaded', () => {
    searchInput.focus();
    statsDiv.innerHTML = '🔍 Digite para buscar procedimentos...';
    
    // Testa a conexão com o servidor
    testarConexao();
});

async function testarConexao() {
    try {
       const response = await fetch('https://lucaspts2.onrender.com/health');
        const data = await response.json();
        console.log('✅ Servidor conectado:', data);
    } catch (error) {
        console.error('❌ Servidor offline:', error);
        statsDiv.innerHTML = '❌ Servidor offline. Verifique se o backend está rodando.';
    }
}

// Função global para o botão
window.limparSelecao = limparSelecao;

function selecionarProcedimento(procedimento) {
    searchInput.value = '';
    resultadosDiv.innerHTML = '';
    
    statsDiv.innerHTML = `✅ Procedimento selecionado`;

    // Gerar meta do procedimento selecionado
    gerarMetaProcedimento(procedimento);

    const infoHTML = `
        <div class="detalhe-procedimento">
            <h3>📋 ${procedimento.nome}</h3>
            <div class="detalhe-info">
                <div class="detalhe-codigo">
                    <strong>Código:</strong> ${procedimento.codigo}
                </div>
                <div class="detalhe-dias">
                    <strong>Dias de Permanência:</strong>
                    <span class="dias-destaque">${procedimento.dias_permanencia || 'N/A'}</span> dias
                </div>
            </div>
            <button onclick="limparSelecao()" class="btn-limpar">
                🔍 Nova Busca
            </button>
        </div>
    `;
    
    resultadosDiv.innerHTML = infoHTML;
}

// Função para gerar a meta do procedimento selecionado
function gerarMetaProcedimento(procedimento) {
    const container = document.getElementById('metas-padrao');

    // Converte para número e soma 3 dias
    const dias = Number(procedimento.dias_permanencia || 0) + 3;

    // Verifica se já existe uma meta dinâmica do procedimento
    let metaExistente = document.getElementById('meta-procedimento');
    if (metaExistente) {
        // Atualiza o texto da meta existente
        metaExistente.querySelector('.resumo-texto').innerHTML = `
            Internação hospitalar para ${procedimento.nome}, com previsão de permanência por ${dias} dias
            <span class="meta-tag"></span>
        `;
        return;
    }

    // Cria o elemento da meta, caso não exista
    const metaElement = document.createElement('div');
    metaElement.id = 'meta-procedimento'; // define um id único
    metaElement.className = 'meta-padrao-item';
    metaElement.innerHTML = `
        <input type="checkbox" class="resumo-checkbox">
        <div class="resumo-texto">
            Internação hospitalar para ${procedimento.nome}, com previsão de permanência por ${dias} dias
            <span class="meta-tag"></span>
        </div>
    `;

    // Adiciona a meta no topo da lista
    container.prepend(metaElement);
}


