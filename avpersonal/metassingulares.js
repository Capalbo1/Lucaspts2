document.addEventListener('DOMContentLoaded', function() {
    // Seleciona os elementos necessários
    const containerMetasConsolidadas = document.querySelector('.metas-padrao-container .metas');
    const btnAtualizarMetas = document.createElement('button');
    btnAtualizarMetas.className = 'btn-nova-meta';
    btnAtualizarMetas.textContent = 'Atualizar Lista de Metas';
    
    // Insere o botão de atualizar antes do botão de PDF
    const btnPDF = document.querySelector('.metas-padrao-container .btn-nova-meta');
    btnPDF.parentNode.insertBefore(btnAtualizarMetas, btnPDF);
    
    // Função para coletar e exibir todas as metas
   function atualizarMetasConsolidadas() {
        containerMetasConsolidadas.innerHTML = '';
        
        document.querySelectorAll('.campo-observacao input[type="text"]').forEach(input => {
            if (input.value.trim() !== '') {
                const metaElement = document.createElement('article');
                metaElement.className = 'meta';
                
                // Checkbox (1º elemento)
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.name = 'meta-concluida';
                checkbox.id = 'meta-' + Math.random().toString(36).substr(2, 9);
                
                // Span da categoria (2º elemento)
                const categoria = input.closest('article').querySelector('h2').textContent;
                const badge = document.createElement('span');
                badge.className = 'categoria-badge';
                badge.textContent = categoria;
                
                // Texto da meta (3º elemento)
                const label = document.createElement('p');
                label.textContent = input.value;
                
                // Adiciona os elementos na ordem correta
                metaElement.appendChild(checkbox);
                metaElement.appendChild(badge);
                metaElement.appendChild(label);
                
                containerMetasConsolidadas.appendChild(metaElement);
            }
        });
        
        // Mostra mensagem se não houver metas
        if (containerMetasConsolidadas.children.length === 0) {
            const mensagem = document.createElement('p');
            mensagem.textContent = 'Nenhuma meta foi adicionada ainda.';
            mensagem.style.color = '#6c757d';
            mensagem.style.textAlign = 'center';
            mensagem.style.margin = '20px 0';
            containerMetasConsolidadas.appendChild(mensagem);
        }
    }
    
    // Atualiza as metas ao clicar no botão
    btnAtualizarMetas.addEventListener('click', atualizarMetasConsolidadas);
    
    // Atualiza automaticamente quando novas metas são adicionadas (opcional)
    document.addEventListener('metaAdicionada', atualizarMetasConsolidadas);
    
    // Modifica o script original para disparar o evento
    const originalBtnNovaMeta = document.querySelectorAll('.btn-nova-meta:not(.metas-padrao-container .btn-nova-meta)');
    originalBtnNovaMeta.forEach(botao => {
        botao.addEventListener('click', function(e) {
            e.preventDefault();
            // ... (seu código existente para adicionar metas)
            
            // Dispara evento quando uma nova meta é adicionada
            document.dispatchEvent(new CustomEvent('metaAdicionada'));
        });
    });
    
    // Botão para gerar PDF (implementação básica)
    btnPDF.addEventListener('click', function() {
        // Implementação da geração de PDF aqui
        alert('Funcionalidade de gerar PDF será implementada aqui');
    });
    
    // Atualiza metas ao carregar a página (caso já existam)
    setTimeout(atualizarMetasConsolidadas, 500);
});