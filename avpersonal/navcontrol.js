window.addEventListener('DOMContentLoaded', () => {
  try {
    const resposta = localStorage.getItem('resposta-deambulacao');
    console.log("Resposta recebida do localStorage:", resposta);

    if (!resposta) {
      console.warn("Nenhuma resposta encontrada no localStorage.");
      return;
    }

    if (resposta === 'nao') {
      const liFisio = document.getElementById('li-fisio');
      const blocoDeambulacao = document.getElementById('bloco-deambulacao');

      if (liFisio) {
        liFisio.style.display = 'list-item';
        console.log("Aba Fisioterapia ativada com sucesso!");
      } else {
        console.error("Elemento #li-fisio não encontrado.");
      }

      if (blocoDeambulacao) {
        blocoDeambulacao.style.display = 'block';
        console.log("Article 'Não deambula' exibido com sucesso!");
      } else {
        console.error("Elemento #bloco-deambulacao não encontrado.");
      }

    } else {
      console.log("Resposta foi 'sim', nenhum bloco extra necessário.");
    }

  } catch (e) {
    console.error("Erro ao ler localStorage:", e.message);
  }
});

