// Função para calcular idade baseado na data de nascimento
function calcularIdade() {
    const dataNascimento = document.getElementById('dn').value;
    
    if (dataNascimento) {
        const hoje = new Date();
        const nascimento = new Date(dataNascimento);
        let idade = hoje.getFullYear() - nascimento.getFullYear();
        
        const mes = hoje.getMonth() - nascimento.getMonth();
        if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
            idade--;
        }
        
        document.getElementById('idade').value = idade;
        classificarIMC(); // Recalcula a classificação quando a idade muda
    } else {
        document.getElementById('idade').value = '';
    }
}

// Função para calcular a diferença de peso
function calcularDiferencaPeso() {
    const pesoAtual = parseFloat(document.getElementById('peso_atual').value);
    const pesoHabitual = parseFloat(document.getElementById('peso_habitual').value);
    
    if (!isNaN(pesoAtual) && !isNaN(pesoHabitual)) {
        const diferenca = pesoAtual - pesoHabitual;
        document.getElementById('peso_diferenca').value = diferenca.toFixed(1);
    } else {
        document.getElementById('peso_diferenca').value = '';
    }
}

// Função para calcular o IMC
function calcularIMC() {
    const pesoAtual = parseFloat(document.getElementById('peso_atual').value);
    const altura = parseFloat(document.getElementById('altura').value);
    
    if (!isNaN(pesoAtual) && !isNaN(altura) && altura > 0) {
        const imc = pesoAtual / (altura * altura);
        document.getElementById('imc').value = imc.toFixed(1);
        classificarIMC(); // Recalcula a classificação quando IMC muda
    } else {
        document.getElementById('imc').value = '';
        document.getElementById('classificacao_imc').textContent = '';
    }
}

// Função para classificar o IMC baseado na idade
function classificarIMC() {
    const imc = parseFloat(document.getElementById('imc').value);
    const idade = parseInt(document.getElementById('idade').value);
    const spanClassificacao = document.getElementById('classificacao_imc');
    
    if (!imc || !idade || imc <= 0 || idade <= 0) {
        spanClassificacao.textContent = '';
        spanClassificacao.className = 'classificacao-imc';
        return;
    }
    
    let classificacao = '';
    let classe = '';
    
    if (idade >= 60) {
        // Classificação para Idosos (≥ 60 anos)
        if (imc < 22) {
            classificacao = 'Magreza';
            classe = 'magreza';
        } else if (imc >= 22 && imc < 27) {
            classificacao = 'Eutrofia (Peso Ideal)';
            classe = 'eutrofia';
        } else {
            classificacao = 'Excesso de Peso';
            classe = 'excesso-peso';
        }
    } else if (idade >= 18) {
        // Classificação para Adultos (18-59 anos)
        if (imc < 18.5) {
            classificacao = 'Abaixo do peso';
            classe = 'abaixo-peso';
        } else if (imc >= 18.5 && imc <= 24.9) {
            classificacao = 'Peso normal (Eutrofia)';
            classe = 'eutrofia';
        } else if (imc >= 25.0 && imc <= 29.9) {
            classificacao = 'Sobrepeso';
            classe = 'sobrepeso';
        } else if (imc >= 30.0 && imc <= 34.9) {
            classificacao = 'Obesidade Grau I';
            classe = 'obesidade-1';
        } else if (imc >= 35.0 && imc <= 39.9) {
            classificacao = 'Obesidade Grau II';
            classe = 'obesidade-2';
        } else if (imc >= 40.0) {
            classificacao = 'Obesidade Grau III';
            classe = 'obesidade-3';
        }
    } else {
        // Para menores de 18 anos
        classificacao = 'Classificação não aplicável (menor de 18 anos)';
        classe = 'nao-aplicavel';
    }
    
    spanClassificacao.textContent = classificacao;
    spanClassificacao.className = `classificacao-imc ${classe}`;
}

// Função que executa todos os cálculos
function calcularTudo() {
    calcularDiferencaPeso();
    calcularIMC();
}

// Adicionar eventos quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    // Eventos para calcular idade
    document.getElementById('dn').addEventListener('change', calcularIdade);
    
    // Eventos para peso atual
    document.getElementById('peso_atual').addEventListener('input', calcularTudo);
    document.getElementById('peso_atual').addEventListener('change', calcularTudo);
    
    // Eventos para peso habitual
    document.getElementById('peso_habitual').addEventListener('input', calcularDiferencaPeso);
    document.getElementById('peso_habitual').addEventListener('change', calcularDiferencaPeso);
    
    // Eventos para altura
    document.getElementById('altura').addEventListener('input', calcularIMC);
    document.getElementById('altura').addEventListener('change', calcularIMC);
});



  function calcularScore() {
            let scoreNutricional = 0;
            let scoreDoenca = 0;

            // Calcular score nutricional
            const nutricionalSelecionado = document.querySelector('input[name="estado_nutricional"]:checked');
            if (nutricionalSelecionado && nutricionalSelecionado.value !== '') {
                scoreNutricional = parseInt(nutricionalSelecionado.value);
            }

            // Calcular score doença
            const doencaSelecionado = document.querySelector('input[name="gravidade_doenca"]:checked');
            if (doencaSelecionado && doencaSelecionado.value !== '') {
                scoreDoenca = parseInt(doencaSelecionado.value);
            }

            const scoreTotal = scoreNutricional + scoreDoenca;

            // Atualizar display
            document.getElementById('score-total').textContent = scoreTotal;
            document.getElementById('score-nutricional').textContent = scoreNutricional;
            document.getElementById('score-doenca').textContent = scoreDoenca;

            // Classificação do risco
            let classificacao = '';
            if (scoreTotal === 0) {
                classificacao = 'Baixo Risco';
            } else if (scoreTotal >= 1 && scoreTotal <= 2) {
                classificacao = 'Risco Médio';
            } else if (scoreTotal >= 3 && scoreTotal <= 4) {
                classificacao = 'Alto Risco';
            } else {
                classificacao = 'Risco Muito Alto';
            }

            document.getElementById('classificacao').textContent = classificacao;
        }

        function adicionarEventos() {
            const radioButtons = document.querySelectorAll('input[type="radio"]');
            
            radioButtons.forEach(radio => {
                radio.addEventListener('change', function() {
                    // Remover seleção visual anterior do mesmo grupo
                    const grupo = document.querySelectorAll(`input[name="${this.name}"]`);
                    grupo.forEach(r => {
                        r.closest('.opcao').classList.remove('selecionada');
                    });
                    
                    // Adicionar seleção visual atual
                    if (this.checked) {
                        this.closest('.opcao').classList.add('selecionada');
                    }
                    
                    calcularScore();
                });
            });
        }

        document.addEventListener('DOMContentLoaded', function() {
            adicionarEventos();
            calcularScore();

            document.getElementById('form-score').addEventListener('submit', function(e) {
                e.preventDefault();
                const scoreTotal = document.getElementById('score-total').textContent;
                const classificacao = document.getElementById('classificacao').textContent;
                
                alert(`Avaliação finalizada!\nScore Total: ${scoreTotal}\nClassificação: ${classificacao}`);
            });
        });


        function verificarTriagem1() {
    const triagem2 = document.getElementById('form-score');
    
    // Buscar todos os radio buttons "Sim" da Triagem 1
    const radiosSim = [
        document.getElementById('imc_sim'),
        document.getElementById('peso_sim'),
        document.getElementById('dieta_sim'),
        document.getElementById('grave_sim')
    ];
    
    // Verificar se algum "Sim" está selecionado
    const algumSimSelecionado = radiosSim.some(radio => radio && radio.checked);
    
    if (algumSimSelecionado) {
        // Mostrar e ativar Triagem 2
        triagem2.style.display = 'block';
        triagem2.style.opacity = '1';
        triagem2.style.pointerEvents = 'auto';
        
        // Adicionar classe para animação suave
        triagem2.classList.add('triagem-ativa');
    } else {
        // Esconder e desativar Triagem 2
        triagem2.style.display = 'none';
        triagem2.style.opacity = '0';
        triagem2.style.pointerEvents = 'none';
        
        // Remover classe
        triagem2.classList.remove('triagem-ativa');
        
        // Limpar respostas da Triagem 2
        limparTriagem2();
    }
}

// Função para limpar todas as respostas da Triagem 2
function limparTriagem2() {
    const radiosTriagem2 = document.querySelectorAll('#form-score input[type="radio"]');
    
    radiosTriagem2.forEach(radio => {
        radio.checked = false;
        // Remover classe visual de selecionada
        radio.closest('.opcao').classList.remove('selecionada');
    });
    
    // Resetar o score
    document.getElementById('score-total').textContent = '0';
    document.getElementById('score-nutricional').textContent = '0';
    document.getElementById('score-doenca').textContent = '0';
    document.getElementById('classificacao').textContent = 'Baixo Risco';
}

// Função para calcular score da Triagem 2
function calcularScore() {
    let scoreNutricional = 0;
    let scoreDoenca = 0;

    // Calcular score nutricional
    const nutricionalSelecionado = document.querySelector('input[name="estado_nutricional"]:checked');
    if (nutricionalSelecionado && nutricionalSelecionado.value !== '') {
        scoreNutricional = parseInt(nutricionalSelecionado.value);
    }

    // Calcular score doença
    const doencaSelecionado = document.querySelector('input[name="gravidade_doenca"]:checked');
    if (doencaSelecionado && doencaSelecionado.value !== '') {
        scoreDoenca = parseInt(doencaSelecionado.value);
    }

    const scoreTotal = scoreNutricional + scoreDoenca;

    // Atualizar display
    document.getElementById('score-total').textContent = scoreTotal;
    document.getElementById('score-nutricional').textContent = scoreNutricional;
    document.getElementById('score-doenca').textContent = scoreDoenca;

    // Classificação do risco baseada no NRS 2002
    let classificacao = '';
    if (scoreTotal < 3) {
        classificacao = 'Sem Risco Nutricional';
    } else {
        classificacao = 'Risco Nutricional Presente';
    }

    document.getElementById('classificacao').textContent = classificacao;
}

// Função para adicionar eventos visuais na Triagem 2
function adicionarEventosTriagem2() {
    const radioButtonsTriagem2 = document.querySelectorAll('#form-score input[type="radio"]');
    
    radioButtonsTriagem2.forEach(radio => {
        radio.addEventListener('change', function() {
            // Remover seleção visual anterior do mesmo grupo
            const grupo = document.querySelectorAll(`input[name="${this.name}"]`);
            grupo.forEach(r => {
                r.closest('.opcao').classList.remove('selecionada');
            });
            
            // Adicionar seleção visual atual
            if (this.checked) {
                this.closest('.opcao').classList.add('selecionada');
            }
            
            calcularScore();
        });
    });
}

// Função principal para configurar tudo
function inicializarTriagem() {
    // Esconder Triagem 2 inicialmente
    const triagem2 = document.getElementById('form-score');
    triagem2.style.display = 'none';
    triagem2.style.opacity = '0';
    triagem2.style.pointerEvents = 'none';
    
    // Adicionar eventos para todos os radio buttons da Triagem 1
    const radiosTriagem1 = document.querySelectorAll('.triagem-container form:first-of-type input[type="radio"]');
    
    radiosTriagem1.forEach(radio => {
        radio.addEventListener('change', function() {
            // Adicionar classe visual para Triagem 1 também
            const grupo = document.querySelectorAll(`input[name="${this.name}"]`);
            grupo.forEach(r => {
                r.closest('.opcao').classList.remove('selecionada');
            });
            
            if (this.checked) {
                this.closest('.opcao').classList.add('selecionada');
            }
            
            // Verificar se deve mostrar Triagem 2
            verificarTriagem1();
        });
    });
    
    // Adicionar eventos para Triagem 2
    adicionarEventosTriagem2();
    
    // Handler do submit da Triagem 2
    document.getElementById('form-score').addEventListener('submit', function(e) {
        e.preventDefault();
        const scoreTotal = document.getElementById('score-total').textContent;
        const classificacao = document.getElementById('classificacao').textContent;
        
        alert(`Avaliação completa!\nScore Total: ${scoreTotal}\nClassificação: ${classificacao}`);
    });
}

// Executar quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    inicializarTriagem();
});