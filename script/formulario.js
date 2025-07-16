function salvarRespostaDeambulacao(resposta) {
  try {
    localStorage.setItem('resposta-deambulacao', resposta);
    alert("Resposta salva: " + resposta);
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
