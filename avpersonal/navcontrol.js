// Não deambula
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


// Dependencia parcial ou total 

window.addEventListener('DOMContentLoaded', () => {
  try {
    // Verifica a resposta de dependência
    const respostaDependencia = localStorage.getItem('resposta-dependencia');
    console.log("Resposta dependencia:", respostaDependencia);

    if (respostaDependencia === 'sim') {
      const liFisio = document.getElementById('li-fisio');
      const blocoDependencia = document.getElementById('bloco-dependencia');

      if (liFisio) {
        liFisio.style.display = 'list-item';
        console.log("Aba fisio ativada!");
      } else {
        console.error("Elemento Fisio não encontrado.");
      }

      if (blocoDependencia) {
        blocoDependencia.style.display = 'block';
        console.log("Article 'Dependência' exibido com sucesso!");
        
        // Atualiza o título com o grau salvo
        const grau = localStorage.getItem('grau-dependencia');
        const titulo = document.querySelector('#bloco-dependencia h2');
        
        if (grau) {
          titulo.textContent = `Dependência ${grau === 'parcial' ? 'Parcial' : 'Total'}`;
        }
      } else {
        console.error("Elemento #bloco-dependencia não encontrado.");
      }
    }
  } catch (e) {
    console.error("Erro ao ler localStorage:", e.message);
  }
});


window.addEventListener('DOMContentLoaded', () => {
  try {
    // Verifica a resposta nutricional
    const respostaNutricional = localStorage.getItem('resposta-nutricional');
    console.log("Resposta nutricional:", respostaNutricional);

    if (respostaNutricional === 'nao') {
      const liNutricao = document.getElementById('li-nutricao');
      const blocoNutricao = document.getElementById('bloco-nutricao');

      if (liNutricao) {
        liNutricao.style.display = 'list-item';
        console.log("Aba Nutricionista ativada!");
      } else {
        console.error("Elemento #li-nutricao não encontrado.");
      }

      if (blocoNutricao) {
        blocoNutricao.style.display = 'block';
        console.log("Article 'Suporte nutricional adequado' exibido com sucesso!");
      } else {
        console.error("Elemento #bloco-nutricao não encontrado.");
      }
    }
  } catch (e) {
    console.error("Erro ao ler localStorage:", e.message);
  }
});


// Adicione esta seção ao seu navcontrol.js
window.addEventListener('DOMContentLoaded', () => {
  try {
    // ... código existente ...
    
    // Verificar psicólogo
    const respostaPsicologico = localStorage.getItem('resposta-psicologico');
    if (respostaPsicologico) {
      const liPsicologo = document.getElementById('li-psicologo');
      const blocoPsicologico = document.getElementById('bloco-psicologico');
      
      // Mostrar psicólogo se:
      // - Resposta for "não" e motivo não for "não necessita"
      // - Ou se resposta for "sim" (e talvez alguma condição adicional)
      if (respostaPsicologico === 'nao') {
        const motivo = localStorage.getItem('motivo-psicologico');
        if (motivo !== 'nao_necessita') {
          if (liPsicologo) liPsicologo.style.display = 'list-item';
          if (blocoPsicologico) blocoPsicologico.style.display = 'block';
        }
      } else if (respostaPsicologico === 'sim') {
        // Aqui você pode adicionar condições adicionais se necessário
        if (liPsicologo) liPsicologo.style.display = 'list-item';
        if (blocoPsicologico) blocoPsicologico.style.display = 'block';
      }
    }
  } catch (e) {
    console.error("Erro ao ler localStorage:", e.message);
  }
});


// Adicione isso ao seu navcontrol.js
window.addEventListener('DOMContentLoaded', () => {
  try {
    // ... código existente ...
    
    // Verificar assistente social
    const respostaBeneficio = localStorage.getItem('resposta-beneficio');
    if (respostaBeneficio === 'nao') {
      const liAssistente = document.getElementById('li-assistente');
      const blocoAssistente = document.getElementById('bloco-assistente');
      
      if (liAssistente) {
        liAssistente.style.display = 'list-item';
        console.log("Aba Assistente Social ativada!");
      }
      
      if (blocoAssistente) {
        blocoAssistente.style.display = 'block';
        console.log("Bloco Assistente Social exibido!");
      }
      
      // Ativar a aba de assistente social se a função existir
      if (typeof ativarAba === 'function') {
        ativarAba('assistente-social');
      }
    }
  } catch (e) {
    console.error("Erro ao validar benefícios:", e.message);
  }
});