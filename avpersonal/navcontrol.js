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
              <option value="1"> 1    </option>
              <option value="2"> 2    </option>
              <option value="3"> 3    </option>
              <option value="4"> 4    </option>
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



function gerarMetaPsicologia() {
  // 1. Encontrar o container principal
  const metasContainer = document.querySelector('.metas-padrao-container');
  if (!metasContainer) {
    console.error('Container principal não encontrado (.metas-padrao-container)');
    return;
  }
  
  // 2. Encontrar a seção de metas dentro do container
  const sectionMetas = metasContainer.querySelector('.metas');
  if (!sectionMetas) {
    console.error('Seção de metas não encontrada (.metas)');
    return;
  }
  
  // 3. Remover meta existente se já existir
  const metaExistente = sectionMetas.querySelector('#meta-psicologia');
  if (metaExistente) {
    metaExistente.remove();
    console.log('Meta existente removida');
  }
  
  // 4. Obter dados do localStorage
  const resposta = localStorage.getItem('resposta-psicologico');
  const frequencia = localStorage.getItem('frequencia-psicologico');
  const motivo = localStorage.getItem('motivo-psicologico');
  const outrosMotivos = localStorage.getItem('outros-motivos-psicologico');
  
  console.log('Dados recuperados:', {
    resposta,
    frequencia,
    motivo,
    outrosMotivos
  });
  
  // 5. Verificar se deve gerar meta
  const deveGerar = resposta === 'sim' || 
                   (resposta === 'nao' && motivo && motivo !== 'nao_necessita');
  
  if (!deveGerar) {
    console.log('Não deve gerar meta de psicologia');
    return;
  }
  
  // 6. Criar elemento da meta
  const meta = document.createElement('article');
  meta.className = 'meta';
  meta.id = 'meta-psicologia';
  
  let textoMeta = '';
  
  if (resposta === 'sim') {
    textoMeta = 'Acompanhamento psicológico em andamento';
    if (frequencia) {
      textoMeta += ` (${formatarFrequencia(frequencia)})`;
    }
  } else {
    textoMeta = 'Necessita de acompanhamento psicológico';
    if (motivo) {
      textoMeta += ` - ${formatarMotivo(motivo, outrosMotivos)}`;
    }
  }
  
  meta.innerHTML = `
    <input type="checkbox" name="meta-psicologia">
    <p>${textoMeta}</p>
  `;
  
  // 7. Adicionar antes do botão
  sectionMetas.appendChild(meta);
  console.log('Meta de psicologia adicionada com sucesso!');
}

function formatarFrequencia(frequencia) {
  const formatos = {
    'menos_1': 'menos de 1x/mês',
    '1_a_2': '1-2x/mês',
    '2_a_4': '2-4x/mês',
    'mais_4': 'mais de 4x/mês'
  };
  return formatos[frequencia] || frequencia;
}

function formatarMotivo(motivo, outros) {
  const formatos = {
    'rede_sobrecarregada': 'Rede sobrecarregada',
    'nao_procurou': 'Não procurou atendimento',
    'outros': outros || 'Outros motivos'
  };
  return formatos[motivo] || motivo;
}

// 8. Verificar quando os dados mudam
function verificarMudancas() {
  // Estado inicial
  let estadoAnterior = JSON.stringify({
    resposta: localStorage.getItem('resposta-psicologico'),
    frequencia: localStorage.getItem('frequencia-psicologico'),
    motivo: localStorage.getItem('motivo-psicologico'),
    outros: localStorage.getItem('outros-motivos-psicologico')
  });
  
  // Verificar a cada 500ms
  setInterval(() => {
    const estadoAtual = JSON.stringify({
      resposta: localStorage.getItem('resposta-psicologico'),
      frequencia: localStorage.getItem('frequencia-psicologico'),
      motivo: localStorage.getItem('motivo-psicologico'),
      outros: localStorage.getItem('outros-motivos-psicologico')
    });
    
    if (estadoAtual !== estadoAnterior) {
      console.log('Dados mudaram - gerando nova meta');
      gerarMetaPsicologia();
      estadoAnterior = estadoAtual;
    }
  }, 500);
}

// 9. Inicialização
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM carregado - iniciando geração de meta');
  gerarMetaPsicologia();
  verificarMudancas();
});


function atualizarBlocoRedeApoio() {
  const bloco = document.getElementById('bloco-rede-apoio');
  if (!bloco) return;
  
  const resposta = localStorage.getItem('rede-apoio');
  const quantidade = localStorage.getItem('rede-apoio-quantidade');
  const quem = localStorage.getItem('rede-apoio-quem');
  
  // Ativar bloco se resposta for "Não"
  const mostrarBloco = resposta === 'nao';
  
  bloco.style.display = mostrarBloco ? 'block' : 'none';
  
  if (mostrarBloco) {
    // Atualizar título e conteúdo
    bloco.querySelector('h2').textContent = 'Sem rede de apoio';
    
    const observacao = bloco.querySelector('.campo-observacao');
    if (observacao) {
      observacao.innerHTML = `
        <p>Paciente declarou não possuir rede de apoio familiar/social.</p>
      `;
    }
    
    // Ativar aba se necessário
    const liAssistente = document.getElementById('li-assistente');
    if (liAssistente) liAssistente.style.display = 'list-item';
  }
}

document.addEventListener('DOMContentLoaded', atualizarBlocoRedeApoio);