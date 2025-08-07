document.addEventListener('DOMContentLoaded', function() {
  const idadeInput = document.getElementById('idade');
  const idadeTexto = document.getElementById('idade-texto');
  
  if (idadeInput) {
    idadeInput.addEventListener('change', function() {
      const idadeCalculada = calcularIdade(this.value);
      idadeTexto.textContent = formatarIdade(idadeCalculada.anos, idadeCalculada.meses, idadeCalculada.dias);
    });
  }

  function calcularIdade(dataNascimento) {
    if (!dataNascimento) return { anos: 0, meses: 0, dias: 0 };

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

    return { anos, meses, dias };
  }

  function formatarIdade(anos, meses, dias) {
    const partes = [];
    if (anos > 0) partes.push(`${anos} ano${anos !== 1 ? 's' : ''}`);
    if (meses > 0) partes.push(`${meses} mês${meses !== 1 ? 'es' : ''}`);
    if (dias > 0 || partes.length === 0) partes.push(`${dias} dia${dias !== 1 ? 's' : ''}`);
    
    return partes.join(', ');
  }

  // Calcular idade se já houver uma data preenchida (em caso de recarregamento da página)
  if (idadeInput && idadeInput.value) {
    const idadeCalculada = calcularIdade(idadeInput.value);
    idadeTexto.textContent = formatarIdade(idadeCalculada.anos, idadeCalculada.meses, idadeCalculada.dias);
  }
});