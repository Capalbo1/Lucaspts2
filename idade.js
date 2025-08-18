   document.addEventListener('DOMContentLoaded', function() {
            const idadeInputTexto = document.getElementById('idade-texto');
            const idadeResultado = document.getElementById('idade-resultado');
            const dataNascimentoFormatada = document.getElementById('data_nascimento_formatada');
            
            // Aplicar máscara ao campo de texto
            idadeInputTexto.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                
                if (value.length > 2) {
                    value = value.substring(0, 2) + '/' + value.substring(2);
                }
                if (value.length > 5) {
                    value = value.substring(0, 5) + '/' + value.substring(5, 9);
                }
                
                e.target.value = value;
                
                // Verificar se a data está completa e calcular
                if (value.length === 10) {
                    calcularIdadeFromText(value);
                } else {
                    idadeResultado.textContent = 'Digite sua data de nascimento';
                    dataNascimentoFormatada.value = '';
                }
            });
            
            // Função para calcular idade a partir do texto
            function calcularIdadeFromText(dateStr) {
                const parts = dateStr.split('/');
                if (parts.length === 3) {
                    const day = parseInt(parts[0], 10);
                    const month = parseInt(parts[1], 10) - 1;
                    const year = parseInt(parts[2], 10);
                    
                    if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
                        const date = new Date(year, month, day);
                        
                        // Verificar se a data é válida
                        if (date.getDate() === day && date.getMonth() === month && date.getFullYear() === year) {
                            // Formatar para YYYY-MM-DD para usar na função existente
                            const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                            dataNascimentoFormatada.value = dateStr; // Armazena a data formatada
                            calcularIdade(formattedDate);
                            return;
                        }
                    }
                }
                
                idadeResultado.textContent = 'Data inválida!';
                dataNascimentoFormatada.value = '';
            }
            
            // Função para calcular a idade
            function calcularIdade(dataNascimento) {
                if (!dataNascimento) {
                    idadeResultado.textContent = 'Digite sua data de nascimento';
                    return { anos: 0, meses: 0, dias: 0 };
                }

                const hoje = new Date();
                const nascimento = new Date(dataNascimento);
                
                let anos = hoje.getFullYear() - nascimento.getFullYear();
                let meses = hoje.getMonth() - nascimento.getMonth();
                let dias = hoje.getDate() - nascimento.getDate();

                if (dias < 0) {
                    meses--;
                    const ultimoDiaMesAnterior = new Date(
                        hoje.getFullYear(),
                        hoje.getMonth(),
                        0
                    ).getDate();
                    dias += ultimoDiaMesAnterior;
                }

                if (meses < 0) {
                    anos--;
                    meses += 12;
                }

                // Preenche os campos hidden
                document.getElementById('idade_anos').value = anos;
                document.getElementById('idade_meses').value = meses;
                document.getElementById('idade_dias').value = dias;

                // Atualiza o resultado visível
                idadeResultado.textContent = formatarIdade(anos, meses, dias);
                
                return { anos, meses, dias };
            }

            function formatarIdade(anos, meses, dias) {
                const partes = [];
                if (anos > 0) partes.push(`${anos} ano${anos !== 1 ? 's' : ''}`);
                if (meses > 0) partes.push(`${meses} mês${meses !== 1 ? 'es' : ''}`);
                if (dias > 0 || partes.length === 0) partes.push(`${dias} dia${dias !== 1 ? 's' : ''}`);
                
                return partes.join(', ');
            }
        });