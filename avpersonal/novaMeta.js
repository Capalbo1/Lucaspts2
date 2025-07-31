document.addEventListener('DOMContentLoaded', function() {
    // Seleciona todos os botões de nova meta
    const botoesNovaMeta = document.querySelectorAll('.btn-nova-meta');
    
    // Adiciona o evento de clique a cada botão
    botoesNovaMeta.forEach(function(botao) {
        botao.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Encontra o container de metas mais próximo
            const containerMetas = botao.closest('article');
            const containerObservacao = containerMetas.querySelector('.campo-observacao');
            
            // Cria um ID único baseado no ID do article
            const prefixoId = containerMetas.id.replace('bloco-', '');
            const contador = containerMetas.querySelectorAll('.campo-observacao').length + 1;
            const novoId = `obs-${prefixoId}-${contador}`;
            
            // Cria os elementos da nova meta
            const novoLabel = document.createElement('label');
            novoLabel.htmlFor = novoId;
            
            const novoInput = document.createElement('input');
            novoInput.type = 'text';
            novoInput.id = novoId;
            novoInput.name = `obs-${prefixoId}[]`;
            novoInput.placeholder = 'Descreva a meta aqui...';
            novoInput.className = 'input-meta';
            
            // Cria um novo container para a meta (opcional, pode adicionar direto ao containerObservacao)
            const novaMetaDiv = document.createElement('div');
            novaMetaDiv.className = 'campo-meta';
            novaMetaDiv.appendChild(novoLabel);
            novaMetaDiv.appendChild(novoInput);
            
            // Adiciona ao container de observações
            containerObservacao.appendChild(novaMetaDiv);
        });
    });
});