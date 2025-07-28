function salvarRespostaDeambulacao(resposta) {
  try {
    localStorage.setItem('resposta-deambulacao', resposta);
    console.log("LocalStorage salva:", localStorage.getItem('resposta-deambulacao'));
  } catch (e) {
    alert("Erro ao salvar no localStorage: " + e.message);
  }
}

function toggleSubquestion(id, isSim) {
  const sub = document.getElementById(id);
  if (sub) {
    sub.style.display = isSim ? 'none' : 'block';
  }
}



// Salvar resposta principal de dependência
function salvarRespostaDependencia(resposta) {
  try {
    localStorage.setItem('resposta-dependencia', resposta);
    console.log("LocalStorage salva (dependencia):", resposta);
    
    // Se for "não", remove o grau salvo
    if (resposta === 'nao') {
      localStorage.removeItem('grau-dependencia');
    }
  } catch (e) {
    alert("Erro ao salvar no localStorage: " + e.message);
  }
}

// Salvar grau de dependência
function salvarGrauDependencia(grau) {
  try {
    localStorage.setItem('grau-dependencia', grau);
    console.log("Grau dependencia salvo:", grau);
  } catch (e) {
    alert("Erro ao salvar grau dependencia: " + e.message);
  }
}

// Função toggleSubquestion (mantida igual à sua versão)
function toggleSubquestion(id, isSim) {
  const sub = document.getElementById(id);
  if (sub) {
    sub.style.display = isSim ? 'none' : 'block';
  }
}


// Salvar resposta nutricional
function salvarRespostaNutricional(resposta) {
  try {
    localStorage.setItem('resposta-nutricional', resposta);
    console.log("LocalStorage salva (nutricional):", resposta);
  } catch (e) {
    alert("Erro ao salvar no localStorage: " + e.message);
  }
}

// Salvar resposta principal
function salvarRespostaPsicologico(resposta) {
  try {
    localStorage.setItem('resposta-psicologico', resposta);
  } catch (e) {
    console.error("Erro ao salvar resposta psicológico:", e);
  }
}

// Salvar frequência
function salvarFrequenciaPsicologico(frequencia) {
  try {
    localStorage.setItem('frequencia-psicologico', frequencia);
  } catch (e) {
    console.error("Erro ao salvar frequência psicológico:", e);
  }
}

// Salvar motivo
function salvarMotivoPsicologico(motivo) {
  try {
    localStorage.setItem('motivo-psicologico', motivo);
  } catch (e) {
    console.error("Erro ao salvar motivo psicológico:", e);
  }
}

// Salvar outros motivos
function salvarOutrosMotivosPsicologico(outros) {
  try {
    localStorage.setItem('outros-motivos-psicologico', outros);
  } catch (e) {
    console.error("Erro ao salvar outros motivos psicológico:", e);
  }
}

function toggleAcompanhamentoPsicologico(temAcompanhamento) {
  document.getElementById('psicologico-sim-details').style.display = temAcompanhamento ? 'block' : 'none';
  document.getElementById('psicologico-nao-details').style.display = temAcompanhamento ? 'none' : 'block';
  
  // Limpa os campos quando escondidos
  if (!temAcompanhamento) {
    document.getElementById('psicologico-sim-details').querySelectorAll('input').forEach(input => {
      input.checked = false;
    });
    localStorage.removeItem('frequencia-psicologico');
  } else {
    document.getElementById('psicologico-nao-details').querySelectorAll('input').forEach(input => {
      if (input.type !== 'radio') {
        input.value = '';
      } else {
        input.checked = false;
      }
    });
    document.getElementById('outros-motivos-psicologico').style.display = 'none';
    localStorage.removeItem('motivo-psicologico');
    localStorage.removeItem('outros-motivos-psicologico');
  }
  
  // Atualiza o resumo
  atualizarResumoPsicologico();
}

function toggleOutrosMotivosPsicologico(mostrar) {
  const outrosMotivos = document.getElementById('outros-motivos-psicologico');
  outrosMotivos.style.display = mostrar ? 'block' : 'none';
  if (!mostrar) {
    document.querySelector('input[name="outros_motivos_psicologico"]').value = '';
    localStorage.removeItem('outros-motivos-psicologico');
  }
}




