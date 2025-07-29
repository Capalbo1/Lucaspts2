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


// ========== FUNÇÕES PARA AUXÍLIO GOVERNO ==========

// Salvar resposta principal
function salvarRespostaAuxilioGoverno(resposta) {
  try {
    localStorage.setItem('resposta-auxilio-governo', resposta);
    console.log("Resposta auxílio governo salva:", resposta);
    
    // Atualiza o estado do formulário
    atualizarEstadoAuxilioGoverno();
  } catch (e) {
    console.error("Erro ao salvar resposta auxílio governo:", e);
  }
}

// Salvar tipo de benefício
function salvarTipoBeneficio(tipo) {
  try {
    localStorage.setItem('tipo-beneficio', tipo);
    console.log("Tipo benefício salvo:", tipo);
  } catch (e) {
    console.error("Erro ao salvar tipo benefício:", e);
  }
}

// Salvar tipo de BPC
function salvarTipoBPC(tipo) {
  try {
    localStorage.setItem('tipo-bpc', tipo);
    console.log("Tipo BPC salvo:", tipo);
  } catch (e) {
    console.error("Erro ao salvar tipo BPC:", e);
  }
}

// Mostrar/ocultar detalhes do benefício
function toggleBeneficioDetails(mostrar) {
  const element = document.getElementById('beneficio-sim-details');
  if (element) {
    element.style.display = mostrar ? 'block' : 'none';
    
    // Se estiver escondendo, limpa os campos
    if (!mostrar) {
      element.querySelectorAll('input').forEach(input => {
        if (input.type === 'radio') input.checked = false;
        else input.value = '';
      });
      localStorage.removeItem('tipo-beneficio');
      localStorage.removeItem('tipo-bpc');
      document.getElementById('bpc-details').style.display = 'none';
    }
  }
}

// Mostrar/ocultar detalhes do BPC
function toggleBPCDetails(mostrar) {
  const element = document.getElementById('bpc-details');
  if (element) {
    element.style.display = mostrar ? 'block' : 'none';
    
    // Se estiver escondendo, limpa os campos
    if (!mostrar) {
      element.querySelectorAll('input').forEach(input => {
        input.checked = false;
      });
      localStorage.removeItem('tipo-bpc');
    }
  }
}

// Atualizar estado do formulário
function atualizarEstadoAuxilioGoverno() {
  const resposta = localStorage.getItem('resposta-auxilio-governo');
  
  // Mostra/oculta detalhes com base na resposta
  toggleBeneficioDetails(resposta === 'sim');
  
  // Atualiza o estado no segundo formulário
  atualizarBlocoAssistenteSocial();
}

// ========== FUNÇÃO PARA ATUALIZAR BLOCO ASSISTENTE SOCIAL ==========
function atualizarBlocoAssistenteSocial() {
  const resposta = localStorage.getItem('resposta-auxilio-governo');
  const blocoAssistente = document.getElementById('bloco-assistente');
  const liAssistente = document.getElementById('li-assistente');
  
  if (resposta === 'nao') {
    // Mostrar bloco e item de navegação
    if (blocoAssistente) blocoAssistente.style.display = 'block';
    if (liAssistente) liAssistente.style.display = 'list-item';
    
    // Ativar aba de assistente social
    if (typeof ativarAba === 'function') {
      ativarAba('assistente-social');
    }
  } else {
    // Ocultar bloco e item de navegação
    if (blocoAssistente) blocoAssistente.style.display = 'none';
    if (liAssistente) liAssistente.style.display = 'none';
  }
}

// Inicializar estado ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
  atualizarEstadoAuxilioGoverno();
});

// ========== FUNÇÕES PARA AVP ==========

// Salvar resposta principal
function salvarRespostaAVP(resposta) {
  try {
    localStorage.setItem('resposta-avp', resposta);
    console.log("Resposta AVP salva:", resposta);
    atualizarEstadoAVP();
  } catch (e) {
    console.error("Erro ao salvar resposta AVP:", e);
  }
}

// Salvar dificuldade
function salvarDificuldadeAVP(dificuldade) {
  try {
    localStorage.setItem('dificuldade-avp', dificuldade);
    console.log("Dificuldade AVP salva:", dificuldade);
    atualizarEstadoAVP();
  } catch (e) {
    console.error("Erro ao salvar dificuldade AVP:", e);
  }
}

// Salvar considerar PICC
function salvarConsiderarPICC(resposta) {
  try {
    localStorage.setItem('considerar-picc', resposta);
    console.log("Considerar PICC salvo:", resposta);
  } catch (e) {
    console.error("Erro ao salvar considerar PICC:", e);
  }
}

// Mostrar/ocultar detalhes do PICC
function togglePICC(select) {
  const dificuldade = select.value;
  const element = document.getElementById('picc-details');
  
  if (element) {
    element.style.display = (dificuldade === 'medio' || dificuldade === 'dificil') ? 'block' : 'none';
    
    // Se estiver escondendo, limpa os campos
    if (element.style.display === 'none') {
      element.querySelectorAll('input').forEach(input => {
        input.checked = false;
      });
      localStorage.removeItem('considerar-picc');
    }
  }
}

// Atualizar estado do formulário
function atualizarEstadoAVP() {
  const resposta = localStorage.getItem('resposta-avp');
  const dificuldade = localStorage.getItem('dificuldade-avp');
  
  // Atualiza a exibição da subpergunta
  toggleSubquestion('avp-details', resposta === 'sim');
  
  // Atualiza o estado da pergunta PICC
  if (resposta === 'sim' && dificuldade) {
    const select = document.querySelector('select[name="dificuldade_avp"]');
    if (select) {
      select.value = dificuldade;
      togglePICC(select);
    }
  }
  
  // Atualiza o bloco de enfermagem
  atualizarBlocoEnfermagem();
}

// ========== FUNÇÃO PARA ATUALIZAR BLOCO ENFERMAGEM ==========
function atualizarBlocoEnfermagem() {
  const resposta = localStorage.getItem('resposta-avp');
  const dificuldade = localStorage.getItem('dificuldade-avp');
  const blocoEnfermagem = document.getElementById('bloco-enfermagem');
  const liEnfermagem = document.getElementById('li-enfermagem');
  
  // Mostrar bloco se resposta for "sim" e dificuldade for média ou difícil
  if (resposta === 'sim' && (dificuldade === 'medio' || dificuldade === 'dificil')) {
    if (blocoEnfermagem) blocoEnfermagem.style.display = 'block';
    if (liEnfermagem) liEnfermagem.style.display = 'list-item';
    
    // Ativar aba de enfermagem
    if (typeof ativarAba === 'function') {
      ativarAba('enfermagem');
    }
  } else {
    // Ocultar se não atender aos critérios
    if (blocoEnfermagem) blocoEnfermagem.style.display = 'none';
    if (liEnfermagem) liEnfermagem.style.display = 'none';
  }
}

// Inicializar estado ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
  atualizarEstadoAVP();
});



// ========== FUNÇÕES PARA PSICOLOGIA ==========

// Salvar resposta principal
function salvarRespostaPsicologico(resposta) {
  try {
    localStorage.setItem('resposta-psicologico', resposta);
    console.log("Resposta psicológico salva:", resposta);
    atualizarEstadoPsicologico();
  } catch (e) {
    console.error("Erro ao salvar resposta psicológico:", e);
  }
}

// Salvar frequência
function salvarFrequenciaPsicologico(frequencia) {
  try {
    localStorage.setItem('frequencia-psicologico', frequencia);
    console.log("Frequência psicológico salva:", frequencia);
  } catch (e) {
    console.error("Erro ao salvar frequência psicológico:", e);
  }
}

// Salvar motivo
function salvarMotivoPsicologico(motivo) {
  try {
    localStorage.setItem('motivo-psicologico', motivo);
    console.log("Motivo psicológico salvo:", motivo);
    atualizarEstadoPsicologico();
  } catch (e) {
    console.error("Erro ao salvar motivo psicológico:", e);
  }
}

// Salvar outros motivos
function salvarOutrosMotivosPsicologico(outros) {
  try {
    localStorage.setItem('outros-motivos-psicologico', outros);
    console.log("Outros motivos psicológico salvos:", outros);
  } catch (e) {
    console.error("Erro ao salvar outros motivos psicológico:", e);
  }
}

// Mostrar/ocultar detalhes do acompanhamento psicológico
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
  
  // Atualiza o estado
  atualizarEstadoPsicologico();
}

// Mostrar/ocultar campo de outros motivos
function toggleOutrosMotivosPsicologico(mostrar) {
  const outrosMotivos = document.getElementById('outros-motivos-psicologico');
  outrosMotivos.style.display = mostrar ? 'block' : 'none';
  if (!mostrar) {
    document.querySelector('input[name="outros_motivos_psicologico"]').value = '';
    localStorage.removeItem('outros-motivos-psicologico');
  }
}

// Atualizar estado do formulário
function atualizarEstadoPsicologico() {
  const resposta = localStorage.getItem('resposta-psicologico');
  
  // Atualiza a exibição das subseções
  if (resposta) {
    toggleAcompanhamentoPsicologico(resposta === 'sim');
  }
  
  // Atualiza o bloco de psicologia
  atualizarBlocoPsicologia();
}

// ========== FUNÇÃO PARA ATUALIZAR BLOCO PSICOLOGIA ==========
// ========== FUNÇÕES PARA PSICOLOGIA ==========

// Salvar resposta principal
function salvarRespostaPsicologico(resposta) {
  try {
    localStorage.setItem('resposta-psicologico', resposta);
    console.log("Resposta psicológico salva:", resposta);
    toggleAcompanhamentoPsicologico(resposta === 'sim');
  } catch (e) {
    console.error("Erro ao salvar resposta psicológico:", e);
  }
}

// ... demais funções de salvar permanecem iguais ...

// Função principal para mostrar/ocultar detalhes
function toggleAcompanhamentoPsicologico(temAcompanhamento) {
  // Elementos das seções
  const secaoSim = document.getElementById('psicologico-sim-details');
  const secaoNao = document.getElementById('psicologico-nao-details');
  
  if (!secaoSim || !secaoNao) return;
  
  // Mostrar/ocultar seções
  secaoSim.style.display = temAcompanhamento ? 'block' : 'none';
  secaoNao.style.display = temAcompanhamento ? 'none' : 'block';
  
  // Limpar campos quando escondidos
  if (!temAcompanhamento) {
    limparCamposPsicologicoSim();
  } else {
    limparCamposPsicologicoNao();
  }
  
  // Atualizar estado (assincronamente para evitar recursão)
  setTimeout(() => atualizarEstadoPsicologico(), 0);
}

// Funções auxiliares para limpar campos
function limparCamposPsicologicoSim() {
  const inputs = document.querySelectorAll('#psicologico-sim-details input');
  inputs.forEach(input => {
    if (input.type === 'radio') input.checked = false;
  });
  localStorage.removeItem('frequencia-psicologico');
}

function limparCamposPsicologicoNao() {
  const inputs = document.querySelectorAll('#psicologico-nao-details input');
  inputs.forEach(input => {
    if (input.type === 'radio') {
      input.checked = false;
    } else {
      input.value = '';
    }
  });
  document.getElementById('outros-motivos-psicologico').style.display = 'none';
  localStorage.removeItem('motivo-psicologico');
  localStorage.removeItem('outros-motivos-psicologico');
}

// Mostrar/ocultar campo de outros motivos
function toggleOutrosMotivosPsicologico(mostrar) {
  const outrosMotivos = document.getElementById('outros-motivos-psicologico');
  if (outrosMotivos) {
    outrosMotivos.style.display = mostrar ? 'block' : 'none';
    if (!mostrar) {
      document.querySelector('input[name="outros_motivos_psicologico"]').value = '';
      localStorage.removeItem('outros-motivos-psicologico');
    }
  }
}

// Atualizar estado do formulário
function atualizarEstadoPsicologico() {
  // Atualiza apenas o bloco de psicologia
  atualizarBlocoPsicologia();
}

// ========== FUNÇÃO PARA ATUALIZAR BLOCO PSICOLOGIA ==========
function atualizarBlocoPsicologia() {
  const resposta = localStorage.getItem('resposta-psicologico');
  const motivo = localStorage.getItem('motivo-psicologico');
  const outrosMotivos = localStorage.getItem('outros-motivos-psicologico');
  const blocoPsicologia = document.getElementById('bloco-psicologico');
  const liPsicologo = document.getElementById('li-psicologo');
  
  // Determinar se deve mostrar o bloco
  let mostrarBloco = false;
  let titulo = 'Necessita de Suporte psicológico';
  
  if (resposta === 'sim') {
    mostrarBloco = true;
  } else if (resposta === 'nao' && motivo !== 'nao_necessita') {
    mostrarBloco = true;
    
    // Adicionar motivo ao título
    switch (motivo) {
      case 'rede_sobrecarregada':
        titulo += ' (Rede sobrecarregada)';
        break;
      case 'nao_procurou':
        titulo += ' (Não procurou atendimento)';
        break;
      case 'outros':
        titulo += outrosMotivos ? ` (${outrosMotivos})` : ' (Outros motivos)';
        break;
    }
  }
  
  // Atualizar elementos da interface
  if (blocoPsicologia) {
    if (mostrarBloco) {
      blocoPsicologia.style.display = 'block';
      
      // Atualizar título
      const tituloElement = blocoPsicologia.querySelector('h2');
      if (tituloElement) tituloElement.textContent = titulo;
    } else {
      blocoPsicologia.style.display = 'none';
    }
  }
  
  if (liPsicologo) {
    liPsicologo.style.display = mostrarBloco ? 'list-item' : 'none';
  }
  
  // Ativar aba se necessário
  if (mostrarBloco && typeof ativarAba === 'function') {
    ativarAba('psicologia');
  }
}

// Inicializar estado ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
  const resposta = localStorage.getItem('resposta-psicologico');
  if (resposta) {
    toggleAcompanhamentoPsicologico(resposta === 'sim');
  }
  atualizarBlocoPsicologia();
});

  function toggleCuidadosRespiratorios(show) {
    const detalhes = document.getElementById("cuidados-respiratorios-details");
    detalhes.style.display = show ? "block" : "none";

    if (!show) {
      // Limpa se marcar "Não"
      localStorage.removeItem('resposta-respiratorio');
      localStorage.removeItem('cuidados-tqt');
      localStorage.removeItem('cuidados-outros');
      localStorage.removeItem('outros-detalhes');
    } else {
      localStorage.setItem('resposta-respiratorio', 'sim');
    }
  }

  function toggleOutrosCuidados(checkbox) {
    const outrosDetalhes = document.getElementById("outros-cuidados-detalhes");
    outrosDetalhes.style.display = checkbox.checked ? "block" : "none";
    localStorage.setItem('cuidados-outros', checkbox.checked ? 'sim' : 'nao');

    if (!checkbox.checked) {
      localStorage.removeItem('outros-detalhes');
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('input[name="tipo_cuidado"]');
    checkboxes.forEach(cb => {
      cb.addEventListener('change', () => {
        if (cb.value === 'tqt') {
          localStorage.setItem('cuidados-tqt', cb.checked ? 'sim' : 'nao');
        }
        if (cb.value === 'outros') {
          toggleOutrosCuidados(cb);
        }

        // Armazena o valor de outros cuidados se preenchido
        const outrosInput = document.querySelector('input[name="outros_cuidados"]');
        if (outrosInput) {
          outrosInput.addEventListener('input', () => {
            localStorage.setItem('outros-detalhes', outrosInput.value);
          });
        }
      });
    });
  });

  // script-dispositivos.js



// Funções para manipulação de dispositivos
// Funções para manipulação de dispositivos
// Funções para manipulação de dispositivos
// Funções para manipulação de dispositivos
// Funções para manipulação de dispositivos
// Funções para gerenciar dispositivos
function toggleDispositivos(show) {
  const detalhes = document.getElementById("dispositivos-sim-details");
  detalhes.style.display = show ? "block" : "none";
  
  if (!show) {
    // Limpa todos os dados ao selecionar "Não"
    localStorage.removeItem('resposta-dispositivos');
    localStorage.removeItem('dispositivos-selecionados');
    localStorage.removeItem('dispositivos-outros');
    localStorage.removeItem('outros-dispositivos-detalhe');
  } else {
    localStorage.setItem('resposta-dispositivos', 'sim');
  }
}

function toggleOutrosDispositivos(checked) {
  const outrosDetalhes = document.getElementById("outros-dispositivos-detalhe");
  outrosDetalhes.style.display = checked ? "block" : "none";
  localStorage.setItem('dispositivos-outros', checked ? 'sim' : 'nao');
  
  if (!checked) {
    localStorage.removeItem('outros-dispositivos-detalhe');
  }
}

function salvarRespostaDispositivos(resposta) {
  localStorage.setItem('resposta-dispositivos', resposta);
}

function salvarDispositivosSelecionados() {
  // Salvar checkboxes principais
  const selecionados = [];
  document.querySelectorAll('input[name="dispositivos_tipo"]:checked').forEach(checkbox => {
    if(checkbox.value !== 'outros') {
      selecionados.push(checkbox.value);
    }
  });
  localStorage.setItem('dispositivos-selecionados', JSON.stringify(selecionados));
  
  // Salvar campo "Outros"
  const outrosInput = document.querySelector('input[name="outros_dispositivos"]');
  if(outrosInput) {
    localStorage.setItem('outros-dispositivos-detalhe', outrosInput.value);
  }
}

// Inicialização ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  // Restaurar estado principal
  const respostaSalva = localStorage.getItem('resposta-dispositivos');
  if(respostaSalva) {
    const radio = document.querySelector(`input[name="dispositivos"][value="${respostaSalva}"]`);
    if(radio) {
      radio.checked = true;
      toggleDispositivos(respostaSalva === 'sim');
    }
  }
  
  // Restaurar checkboxes
  const selecionadosSalvos = JSON.parse(localStorage.getItem('dispositivos-selecionados') || '[]');
  selecionadosSalvos.forEach(valor => {
    const checkbox = document.querySelector(`input[name="dispositivos_tipo"][value="${valor}"]`);
    if(checkbox) checkbox.checked = true;
  });
  
  // Restaurar campo "Outros"
  const outrosSalvo = localStorage.getItem('dispositivos-outros');
  if(outrosSalvo === 'sim') {
    const outrosCheckbox = document.querySelector('input[name="dispositivos_tipo"][value="outros"]');
    if(outrosCheckbox) {
      outrosCheckbox.checked = true;
      toggleOutrosDispositivos(true);
    }
    
    const detalhesSalvos = localStorage.getItem('outros-dispositivos-detalhe');
    if(detalhesSalvos) {
      const outrosInput = document.querySelector('input[name="outros_dispositivos"]');
      if(outrosInput) outrosInput.value = detalhesSalvos;
    }
  }
  
  // Adicionar listeners
  document.querySelectorAll('input[name="dispositivos_tipo"]').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      if(this.value === 'outros') {
        toggleOutrosDispositivos(this.checked);
      }
      salvarDispositivosSelecionados();
    });
  });
  
  // Listener para input de outros dispositivos
  const outrosInput = document.querySelector('input[name="outros_dispositivos"]');
  if(outrosInput) {
    outrosInput.addEventListener('input', salvarDispositivosSelecionados);
  }
});