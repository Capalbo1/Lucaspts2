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

window.addEventListener('DOMContentLoaded', () => {
  try {
    // ... seu código existente ...
    
    // ========== VALIDAÇÃO PARA ASSISTENTE SOCIAL ==========
    const respostaAuxilio = localStorage.getItem('resposta-auxilio-governo');
    console.log("Resposta auxílio governo:", respostaAuxilio);
    
    if (respostaAuxilio === 'nao') {
      const liAssistente = document.getElementById('li-assistente');
      const blocoAssistente = document.getElementById('bloco-assistente');
      
      if (liAssistente) {
        liAssistente.style.display = 'list-item';
        console.log("Item Assistente Social ativado!");
      }
      
      if (blocoAssistente) {
        blocoAssistente.style.display = 'block';
        console.log("Bloco Assistente Social exibido!");
      }
      
      // Ativar aba de assistente social
      if (typeof ativarAba === 'function') {
        ativarAba('assistente-social');
      }
    }
  } catch (e) {
    console.error("Erro ao validar auxílio governo:", e.message);
  }
});


window.addEventListener('DOMContentLoaded', () => {
  try {
    // ... código existente ...
    
    // ========== VALIDAÇÃO PARA ENFERMAGEM (AVP) ==========
    const respostaAVP = localStorage.getItem('resposta-avp');
    const dificuldadeAVP = localStorage.getItem('dificuldade-avp');
    
    if (respostaAVP === 'sim' && (dificuldadeAVP === 'medio' || dificuldadeAVP === 'dificil')) {
      const liEnfermagem = document.getElementById('li-enfermagem');
      const blocoEnfermagem = document.getElementById('bloco-enfermagem');
      
      if (liEnfermagem) {
        liEnfermagem.style.display = 'list-item';
        console.log("Item Enfermagem ativado!");
      }
      
      if (blocoEnfermagem) {
        blocoEnfermagem.style.display = 'block';
        console.log("Bloco Enfermagem exibido!");
      }
      
      // Ativar aba de enfermagem
      if (typeof ativarAba === 'function') {
        ativarAba('enfermagem');
      }
    }
  } catch (e) {
    console.error("Erro ao validar AVP:", e.message);
  }
});

window.addEventListener('DOMContentLoaded', () => {
  try {
    // ... código existente ...
    
    // ========== VALIDAÇÃO PARA PSICOLOGIA ==========
    const respostaPsicologico = localStorage.getItem('resposta-psicologico');
    const motivoPsicologico = localStorage.getItem('motivo-psicologico');
    const outrosMotivos = localStorage.getItem('outros-motivos-psicologico');
    
    // Determinar se deve mostrar
    let mostrarPsicologia = false;
    
    if (respostaPsicologico === 'sim') {
      mostrarPsicologia = true;
    } else if (respostaPsicologico === 'nao' && motivoPsicologico !== 'nao_necessita') {
      mostrarPsicologia = true;
    }
    
    if (mostrarPsicologia) {
      const liPsicologo = document.getElementById('li-psicologo');
      const blocoPsicologico = document.getElementById('bloco-psicologico');
      
      if (liPsicologo) {
        liPsicologo.style.display = 'list-item';
        console.log("Item Psicólogo ativado!");
      }
      
      if (blocoPsicologico) {
        blocoPsicologico.style.display = 'block';
        
        // Atualizar título com motivo se necessário
        if (respostaPsicologico === 'nao') {
          let motivoTexto = '';
          switch (motivoPsicologico) {
            case 'rede_sobrecarregada':
              motivoTexto = 'Rede sobrecarregada';
              break;
            case 'nao_procurou':
              motivoTexto = 'Não procurou atendimento';
              break;
            case 'outros':
              motivoTexto = outrosMotivos || 'Outros motivos';
              break;
          }
          
          if (motivoTexto) {
            const titulo = `Necessita de Suporte psicológico (${motivoTexto})`;
            const tituloElement = blocoPsicologico.querySelector('h2');
            if (tituloElement) tituloElement.textContent = titulo;
          }
        }
        
        console.log("Bloco Psicologia exibido!");
      }
      
      // Ativar aba de psicologia
      if (typeof ativarAba === 'function') {
        ativarAba('psicologia');
      }
    }
  } catch (e) {
    console.error("Erro ao validar psicologia:", e.message);
  }
});