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