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




