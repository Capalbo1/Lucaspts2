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

// ========== VALIDAÇÃO PARA fisio dispositivos ==========
  function atualizarBlocoRespiratorio() {
    const resposta = localStorage.getItem('resposta-respiratorio');
    const tqt = localStorage.getItem('cuidados-tqt');
    const outros = localStorage.getItem('cuidados-outros');
    const outrosDetalhes = localStorage.getItem('outros-detalhes');
    const blocoResp = document.getElementById('bloco-dispositivos');
    const liFisio = document.getElementById('li-fisio');

    let mostrarBloco = false;
    let titulo = 'Metas para dispositivos respiratórios';

    if (resposta === 'sim' && (tqt === 'sim' || outros === 'sim')) {
      mostrarBloco = true;

      // Pode incluir mais lógica aqui se quiser personalizar o título com base em TQT ou outros
    }

    if (blocoResp) {
      blocoResp.style.display = mostrarBloco ? 'block' : 'none';
    }

    if (liFisio && mostrarBloco) {
    liFisio.style.display = 'list-item';
    }


    if (mostrarBloco && typeof ativarAba === 'function') {
      ativarAba('fisioterapia');
    }
  }

  // Inicializar ao carregar
  window.addEventListener('DOMContentLoaded', () => {
    try {
      atualizarBlocoRespiratorio();
    } catch (e) {
      console.error("Erro ao validar respiratório:", e.message);
    }
  });


 function criarArticlesParaDispositivos() {
  const container = document.getElementById('container-dispositivos');
  if (!container) return;

  // Limpa o container antes de recriar
  container.innerHTML = '';

  // Recupera dados salvos
  const resposta = localStorage.getItem('resposta-dispositivos');
  const dispositivos = JSON.parse(localStorage.getItem('dispositivos-selecionados') || []);
  const temOutros = localStorage.getItem('dispositivos-outros') === 'sim';
  const outrosDetalhes = localStorage.getItem('outros-dispositivos-detalhe');

  // Verifica se deve mostrar algo
  const deveMostrar = resposta === 'sim' && 
                     (dispositivos.length > 0 || (temOutros && outrosDetalhes));

  if (deveMostrar) {
    // Cria um article para cada dispositivo principal
    dispositivos.forEach(dispositivo => {
      const article = document.createElement('article');
      article.className = 'bloco-dispositivo';
      article.innerHTML = `
        <h2>${dispositivo}</h2>
        <button class="btn-nova-meta">Gerar meta para ${dispositivo}</button>
        <div class="campo-observacao"></div>
      `;
      container.appendChild(article);
    });

    // Cria article para "Outros" se existir
    if (temOutros && outrosDetalhes) {
      const article = document.createElement('article');
      article.className = 'bloco-dispositivo';
      article.innerHTML = `
        <h2>${outrosDetalhes}</h2>
        <button class="btn-nova-meta">Gerar meta para ${outrosDetalhes}</button>
        <div class="campo-observacao"></div>
      `;
      container.appendChild(article);
    }

    // Ativa a aba de enfermagem
    const liEnfermagem = document.getElementById('li-enfermagem');
    if (liEnfermagem) {
      liEnfermagem.style.display = 'list-item';
    }
  }
}

// Inicializa quando a página carrega
document.addEventListener('DOMContentLoaded', criarArticlesParaDispositivos);


function criarArticlesParaLocais() {
  const container = document.getElementById('container-lesoes');
  if (!container) return;
  
  container.innerHTML = '';
  
  const locaisSalvos = JSON.parse(localStorage.getItem('locaisLesao') || '[]');
  
  if (locaisSalvos.length > 0) {
    locaisSalvos.forEach((local, index) => {
      const article = document.createElement('article');
      article.className = 'bloco-lesao';
      article.innerHTML = `
        <h2>LPP - ${local}</h2>
        <div class="linha-controles">
          <div class="grupo-infeccao">
            <label>Infectado:</label>
            <label class="option-label">
              <input type="radio" name="infeccao_${index}" value="sim" 
                     onchange="atualizarDadosLesao('${local}')"> Sim
            </label>
            <label class="option-label">
              <input type="radio" name="infeccao_${index}" value="nao" 
                     onchange="atualizarDadosLesao('${local}')"> Não
            </label>
          </div>
          
          <div class="grupo-grau">
            <label>Grau:</label>
            <select class="select-grau" onchange="atualizarDadosLesao('${local}')">
              <option value="1">Grau 1</option>
              <option value="2">Grau 2</option>
              <option value="3">Grau 3</option>
              <option value="4">Grau 4</option>
            </select>
          </div>
        </div>
        
        <button class="btn-nova-meta">Gerar meta para ${local}</button>
        <div class="campo-observacao"></div>
      `;
      container.appendChild(article);
    });
    console.log(`Criados ${locaisSalvos.length} articles para os locais:`, locaisSalvos);
  } else {
    console.log("Nenhum local salvo - nenhum article criado");
  }
}

document.addEventListener('DOMContentLoaded', criarArticlesParaLocais);