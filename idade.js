document.addEventListener('DOMContentLoaded', function() {
  const inputNascimento = document.getElementById('idade');
  const divIdade = document.querySelector('.idade-calculada');

  inputNascimento.addEventListener('change', function() {
    const dataNascimento = new Date(this.value);
    const hoje = new Date();
    
    // Cálculo da idade
    let idade = hoje.getFullYear() - dataNascimento.getFullYear();
    const mesAtual = hoje.getMonth();
    const diaAtual = hoje.getDate();
    
    // Verifica se já fez aniversário este ano
    const mesNasc = dataNascimento.getMonth();
    const diaNasc = dataNascimento.getDate();
    
    if (mesAtual < mesNasc || (mesAtual === mesNasc && diaAtual < diaNasc)) {
      idade--;
    }

    // Atualiza o conteúdo da div
    divIdade.textContent = `${idade} anos`;
    divIdade.style.fontWeight = 'bold';
    divIdade.style.color = '#1e88e5';
  });
});