document.addEventListener('DOMContentLoaded', function() {
  const inputNascimento = document.getElementById('idade');
  const divIdade = document.querySelector('.idade-calculada');

  inputNascimento.addEventListener('change', function() {
    const dataNascimento = new Date(this.value);
    const hoje = new Date();

    let anos = hoje.getFullYear() - dataNascimento.getFullYear();
    let meses = hoje.getMonth() - dataNascimento.getMonth();
    let dias = hoje.getDate() - dataNascimento.getDate();

    // Ajustes para valores negativos
    if (dias < 0) {
      meses--;
      const ultimoDiaMesAnterior = new Date(hoje.getFullYear(), hoje.getMonth(), 0).getDate();
      dias += ultimoDiaMesAnterior;
    }

    if (meses < 0) {
      anos--;
      meses += 12;
    }

    // Armazena os valores separadamente
    document.getElementById('idade_anos').value = anos;
    document.getElementById('idade_meses').value = meses;
    document.getElementById('idade_dias').value = dias;

    // Atualiza a exibição
    divIdade.innerHTML = `
      <label class="pergunta">Idade Calculada:</label>
      <div class="resposta">${formatarIdade(anos, meses, dias)}</div>
    `;
  });

  function formatarIdade(anos, meses, dias) {
    const partes = [];
    if (anos > 0) partes.push(`${anos} ano${anos !== 1 ? 's' : ''}`);
    if (meses > 0) partes.push(`${meses} mês${meses !== 1 ? 'es' : ''}`);
    if (dias > 0 || partes.length === 0) partes.push(`${dias} dia${dias !== 1 ? 's' : ''}`);
    return partes.join(', ');
  }
});