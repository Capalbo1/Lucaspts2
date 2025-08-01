


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
        console.log("Article 'Suporte nutricional' exibido com sucesso!");
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


  // Inicializar ao carregar
  window.addEventListener('DOMContentLoaded', () => {
    try {
      atualizarBlocoRespiratorio();
    } catch (e) {
      console.error("Erro ao validar respiratório:", e.message);
    }
  });


  // script-atualizacao-dispositivos.js

// Função para atualizar o bloco de enfermagem
// ========== VALIDAÇÃO PARA DISPOSITIVOS DE ENFERMAGEM ==========
function atualizarBlocoDispositivosEnf() {
  const resposta = localStorage.getItem('resposta-dispositivos');
  const dispositivosSelecionados = JSON.parse(localStorage.getItem('dispositivos-selecionados') || '[]');
  const temOutros = localStorage.getItem('dispositivos-outros') === 'sim';
  const outrosDetalhes = localStorage.getItem('outros-dispositivos-detalhe');
  
  const blocoDispositivosEnf = document.getElementById('bloco-dispositivos-enf');
  const liEnfermagem = document.getElementById('li-enfermagem'); // Elemento da aba de enfermagem
  
  // Verificar se precisa mostrar o bloco
  const mostrarBloco = resposta === 'sim' && 
                      (dispositivosSelecionados.length > 0 || 
                       (temOutros && outrosDetalhes && outrosDetalhes.trim() !== ''));
  
  if(blocoDispositivosEnf) {
    blocoDispositivosEnf.style.display = mostrarBloco ? 'block' : 'none';
  }
  
  if(liEnfermagem) {
    liEnfermagem.style.display = mostrarBloco ? 'list-item' : 'none';
  }
  
  // Preencher observação se necessário
  if(mostrarBloco) {
    const obsInput = document.getElementById('obs-dispositivos-enf');
    if(obsInput) {
      // Criar texto com dispositivos selecionados
      let dispositivosTexto = dispositivosSelecionados.join(', ');
      
      // Adicionar outros dispositivos se existirem
      if(temOutros && outrosDetalhes) {
        if(dispositivosTexto) dispositivosTexto += ', ';
        dispositivosTexto += `Outros: ${outrosDetalhes}`;
      }
      
      // Atualizar campo de observação
      obsInput.value = dispositivosTexto;
    }
  }
  
  // Ativar aba se necessário
  if(mostrarBloco && typeof ativarAba === 'function') {
    ativarAba('enfermagem');
  }
}

// Inicializar ao carregar
window.addEventListener('DOMContentLoaded', () => {
  try {
    atualizarBlocoDispositivosEnf();
    
    // Adicionar listener para salvar observação
    const obsInput = document.getElementById('obs-dispositivos-enf');
    if(obsInput) {
      obsInput.addEventListener('input', function() {
        localStorage.setItem('obs-dispositivos-enf', this.value);
      });
      
      // Restaurar valor salvo
      const obsSalva = localStorage.getItem('obs-dispositivos-enf');
      if(obsSalva) obsInput.value = obsSalva;
    }
  } catch(e) {
    console.error("Erro ao validar dispositivos:", e);
  }
});

function atualizarBlocoLesaoPressao() {
  const resposta = localStorage.getItem('resposta-lesao-pressao');
  const local = localStorage.getItem('local-lesao-pressao');
  const blocoLesao = document.getElementById('bloco-lesao-pressao');
  const liEnfermagem = document.getElementById('li-enfermagem'); // ou li-fisio, conforme sua aba

  // Só mostra se respondeu "sim" e informou o local
  const mostrarBloco = resposta === 'sim' && local && local.trim() !== '';

  if (blocoLesao) {
    blocoLesao.style.display = mostrarBloco ? 'block' : 'none';
  }

  if (liEnfermagem) {
    liEnfermagem.style.display = mostrarBloco ? 'list-item' : 'none';
  }

  // Atualiza título ou observação, se desejar
  if (mostrarBloco) {
    const titulo = blocoLesao.querySelector('h2');
    if (titulo) {
      titulo.textContent = `Lesão por pressão: ${local}`;
    }
  }

  // Ativar aba se necessário
  if (mostrarBloco && typeof ativarAba === 'function') {
    ativarAba('enfermagem'); // ou 'fisioterapia', conforme sua lógica
  }
}

// Inicializar ao carregar
window.addEventListener('DOMContentLoaded', () => {
  try {
    atualizarBlocoLesaoPressao();
  } catch (e) {
    console.error("Erro ao validar lesão por pressão:", e);
  }
});

function atualizarLiEnfermagem() {
  const mostrarDispositivos = localStorage.getItem('resposta-dispositivos') === 'sim';
  const mostrarLesao = localStorage.getItem('resposta-lesao-pressao') === 'sim';
  const liEnfermagem =  document.getElementById('li-enfermagem'); // ou li-fisio, conforme sua aba
  const mostrarAVP = localStorage.getItem('resposta-avp') === 'sim, ' &&
                      (localStorage.getItem('dificuldade-avp') === 'medio' ||
                       localStorage.getItem('dificuldade-avp') === 'dificil');
  // Verifica se deve mostrar a aba de enfermagem
  if (mostrarDispositivos || mostrarLesao || mostrarAVP) {
  if (liEnfermagem) {
    liEnfermagem.style.display = (mostrarDispositivos || mostrarLesao || mostrarAVP) ? 'list-item' : 'none';
  }
}
}


// TUDO DE FISIO 

// Não deambula (Fisioterapia)
window.addEventListener('DOMContentLoaded', () => {
  try {
    const resposta = localStorage.getItem('resposta-deambulacao');
    if (resposta === 'nao') {
      const blocoDeambulacao = document.getElementById('bloco-deambulacao');
      if (blocoDeambulacao) blocoDeambulacao.style.display = 'block';
    }
  } catch (e) {
    console.error("Erro ao ler localStorage:", e.message);
  }
});

// Dependência (Fisioterapia)
window.addEventListener('DOMContentLoaded', () => {
  try {
    const respostaDependencia = localStorage.getItem('resposta-dependencia');
    if (respostaDependencia === 'sim') {
      const blocoDependencia = document.getElementById('bloco-dependencia');
      if (blocoDependencia) {
        blocoDependencia.style.display = 'block';
        const grau = localStorage.getItem('grau-dependencia');
        const titulo = blocoDependencia.querySelector('h2');
        if (grau && titulo) {
          titulo.textContent = `Dependência ${grau === 'parcial' ? 'Parcial' : 'Total'}`;
        }
      }
    }
  } catch (e) {
    console.error("Erro ao ler localStorage:", e.message);
  }
});

// Dispositivos Respiratórios (Fisioterapia)
window.addEventListener('DOMContentLoaded', () => {
  try {
    const resposta = localStorage.getItem('resposta-respiratorio');
    const tqt = localStorage.getItem('cuidados-tqt');
    const outros = localStorage.getItem('cuidados-outros');
    
    if (resposta === 'sim' && (tqt === 'sim' || outros === 'sim')) {
      const blocoResp = document.getElementById('bloco-dispositivos');
      if (blocoResp) blocoResp.style.display = 'block';
    }
  } catch (e) {
    console.error("Erro ao validar respiratório:", e.message);
  }
});

// ===== CONTROLE UNIFICADO DA ABA FISIOTERAPIA =====
function atualizarAbaFisioterapia() {
  const liFisio = document.getElementById('li-fisio');
  if (!liFisio) return;

  // Verificar todas as condições que exigem fisioterapia
  const condicoes = [
    localStorage.getItem('resposta-deambulacao') === 'nao',
    localStorage.getItem('resposta-dependencia') === 'sim',
    localStorage.getItem('resposta-respiratorio') === 'sim' && 
      (localStorage.getItem('cuidados-tqt') === 'sim' || 
       localStorage.getItem('cuidados-outros') === 'sim')
  ];

  // Mostrar aba se pelo menos uma condição for verdadeira
  liFisio.style.display = condicoes.some(cond => cond) ? 'list-item' : 'none';
}

// Inicialização
window.addEventListener('DOMContentLoaded', () => {
  atualizarAbaFisioterapia();
  
  // Adicione esta chamada sempre que atualizar dados relacionados
  // Exemplo: ao final de cada bloco que afeta fisioterapia
});