function toggleAcompanhamentoPsiquiatrico(isSim) {
            document.getElementById('psiquiatrico-sim-details').style.display = isSim ? 'block' : 'none';
            document.getElementById('psiquiatrico-nao-details').style.display = isSim ? 'none' : 'block';
            
            // Se não for sim, esconder também detalhes de medicação
            if (!isSim) {
                document.getElementById('medicacao-details').style.display = 'none';
            }
        }
        
        // Função para toggle de uso de medicação
        function toggleMedicacao(isSim) {
            document.getElementById('medicacao-details').style.display = isSim ? 'block' : 'none';
        }
        
        // Função para toggle de outros motivos
        function toggleOutrosMotivosPsiquiatrico(show) {
            document.getElementById('outros-motivos-psiquiatrico').style.display = show ? 'block' : 'none';
        }
        
        // Função para toggle de diagnóstico
        function toggleDiagnostico(hasDiagnostico) {
            document.getElementById('diagnostico-details').style.display = hasDiagnostico ? 'block' : 'none';
        }
        
        // Função para toggle de internação
        function toggleInternacao(wasInternado) {
            document.getElementById('internacao-details').style.display = wasInternado ? 'block' : 'none';
        }
        
        // Adicionar validação no envio do formulário
        document.getElementById('psiquiatrico-form').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Formulário enviado com sucesso!');
            // Aqui você pode adicionar a lógica para processar os dados
        });


        function toggleUsoMedicacao(isSim) {
            document.getElementById('medicacao-sim-details').style.display = isSim ? 'block' : 'none';
            document.getElementById('medicacao-nao-details').style.display = isSim ? 'none' : 'block';
        }
        
        function toggleReceitaMedica(hasReceita) {
            document.getElementById('receita-details').style.display = hasReceita ? 'none' : 'block';
        }
        
        function toggleOutrosMotivosReceita(show) {
            document.getElementById('outros-motivos-receita').style.display = show ? 'block' : 'none';
        }
        
        function toggleTomaCorretamente(tomaCorretamente) {
            document.getElementById('toma-corretamente-details').style.display = tomaCorretamente ? 'block' : 'none';
            document.getElementById('nao-toma-corretamente-details').style.display = tomaCorretamente ? 'none' : 'block';
        }
        
        function toggleEfeitosColaterais(hasEfeitos) {
            document.getElementById('efeitos-colaterais-details').style.display = hasEfeitos ? 'block' : 'none';
        }
        
        function toggleOutrosMotivosNaoToma(show) {
            document.getElementById('outros-motivos-nao-toma').style.display = show ? 'block' : 'none';
        }
        
        function toggleOutrosMotivosNaoUsa(show) {
            document.getElementById('outros-motivos-nao-usa').style.display = show ? 'block' : 'none';
        }