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

  // Função principal para salvar todos os dados
function salvarDispositivos() {
  // Salvar resposta Sim/Não
  const resposta = document.querySelector('input[name="dispositivos"]:checked')?.value;
  localStorage.setItem('resposta-dispositivos', resposta || '');

  // Salvar dispositivos selecionados
  const dispositivos = [];
  document.querySelectorAll('input[name="dispositivos_tipo"]:checked').forEach(checkbox => {
    if (checkbox.value !== 'outros') {
      dispositivos.push(checkbox.value);
    }
  });
  localStorage.setItem('dispositivos-selecionados', JSON.stringify(dispositivos));

  // Salvar detalhes de "Outros"
  const outrosCheckbox = document.querySelector('input[name="dispositivos_tipo"][value="outros"]');
  const outrosDetalhes = document.querySelector('input[name="outros_dispositivos"]')?.value;
  
  localStorage.setItem('dispositivos-outros', outrosCheckbox?.checked ? 'sim' : 'nao');
  if (outrosDetalhes) {
    localStorage.setItem('outros-dispositivos-detalhe', outrosDetalhes);
  }

  console.log("Dados salvos:", {
    resposta,
    dispositivos,
    outros: outrosCheckbox?.checked ? outrosDetalhes : null
  });
}

// Configuração inicial
document.addEventListener('DOMContentLoaded', function() {
  // Eventos para checkboxes/radios
  document.querySelectorAll(
    'input[name="dispositivos"], input[name="dispositivos_tipo"]'
  ).forEach(input => {
    input.addEventListener('change', salvarDispositivos);
  });

  // Evento para campo "Outros"
  document.querySelector('input[name="outros_dispositivos"]')?.addEventListener(
    'input', salvarDispositivos
  );
});

// Mostrar/ocultar campos da lesão
function mostrarCamposLesao(mostrar) {
  const detalhesLesao = document.getElementById('lesao-details');
  detalhesLesao.style.display = mostrar ? 'block' : 'none';
  
  // Mostrar campo "Outros" se já estiver marcado
  if (mostrar) {
    const outrosCheckbox = document.getElementById('outros-lesao');
    const outrosDetalhes = document.getElementById('outros-lesao-detalhes');
    outrosDetalhes.style.display = outrosCheckbox.checked ? 'block' : 'none';
  }
}

// Mostrar/ocultar campos da lesão
function mostrarCamposLesao(mostrar) {
  const detalhesLesao = document.getElementById('lesao-details');
  detalhesLesao.style.display = mostrar ? 'block' : 'none';
  
  if (mostrar) {
    const outrosCheckbox = document.getElementById('outros-lesao');
    const outrosDetalhes = document.getElementById('outros-lesao-detalhes');
    outrosDetalhes.style.display = outrosCheckbox.checked ? 'block' : 'none';
  } else {
    // Se selecionar "Não", limpa os locais salvos
    localStorage.removeItem('locaisLesao');
    console.log("Lesão por pressão: Não - Dados removidos");
  }
}

// Salvar automaticamente quando mudar qualquer checkbox
function salvarAutomatico() {
  const locais = [];
  
  document.querySelectorAll('input[name="local_lesao"]:checked').forEach(checkbox => {
    if (checkbox.value === 'Outros') {
      const outroLocal = document.getElementById('outro-local-texto').value;
      if (outroLocal) locais.push(outroLocal);
    } else {
      locais.push(checkbox.value);
    }
  });
  
  localStorage.setItem('locaisLesao', JSON.stringify(locais));
  console.log("Locais salvos:", locais);
}

// Configura eventos
document.addEventListener('DOMContentLoaded', function() {
  // Evento para radio "Sim/Não"
  document.querySelectorAll('input[name="lesao"]').forEach(radio => {
    radio.addEventListener('change', function() {
      mostrarCamposLesao(this.value === 'sim');
      if (this.value === 'nao') salvarAutomatico();
    });
  });
  
  // Evento para checkboxes de local
  document.querySelectorAll('input[name="local_lesao"]').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      if (this.id === 'outros-lesao') {
        document.getElementById('outros-lesao-detalhes').style.display = 
          this.checked ? 'block' : 'none';
      }
      salvarAutomatico();
    });
  });
  
  // Evento para campo "Outros"
  document.getElementById('outro-local-texto')?.addEventListener('input', salvarAutomatico);
  
  // Inicialização
  const respostaLesao = document.querySelector('input[name="lesao"]:checked');
  if (respostaLesao) mostrarCamposLesao(respostaLesao.value === 'sim');
});

// psico

// Salvar resposta principal
function salvarRespostaPsicologico(resposta) {
  localStorage.setItem('resposta-psicologico', resposta);
  console.log("Resposta psicológico salva:", resposta);
  
  // Atualizar exibição das subseções
  toggleAcompanhamentoPsicologico(resposta === 'sim');
}

// Salvar frequência
function salvarFrequenciaPsicologico(frequencia) {
  localStorage.setItem('frequencia-psicologico', frequencia);
  console.log("Frequência psicológico salva:", frequencia);
}

// Salvar motivo
function salvarMotivoPsicologico(motivo) {
  localStorage.setItem('motivo-psicologico', motivo);
  console.log("Motivo psicológico salvo:", motivo);
  
  // Mostrar campo "Outros" se necessário
  if (motivo === 'outros') {
    document.getElementById('outros-motivos-psicologico').style.display = 'block';
  } else {
    document.getElementById('outros-motivos-psicologico').style.display = 'none';
    localStorage.removeItem('outros-motivos-psicologico');
  }
}

// Salvar outros motivos
function salvarOutrosMotivosPsicologico() {
  const outrosMotivos = document.querySelector('input[name="outros_motivos_psicologico"]').value;
  localStorage.setItem('outros-motivos-psicologico', outrosMotivos);
  console.log("Outros motivos salvos:", outrosMotivos);
}

// Mostrar/ocultar seções
function toggleAcompanhamentoPsicologico(temAcompanhamento) {
  document.getElementById('psicologico-sim-details').style.display = 
    temAcompanhamento ? 'block' : 'none';
  document.getElementById('psicologico-nao-details').style.display = 
    temAcompanhamento ? 'none' : 'block';
  
  // Limpar campos quando escondidos
  if (!temAcompanhamento) {
    document.querySelectorAll('#psicologico-sim-details input').forEach(input => {
      input.checked = false;
    });
    localStorage.removeItem('frequencia-psicologico');
  } else {
    document.querySelectorAll('#psicologico-nao-details input').forEach(input => {
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
}

// Mostrar/ocultar campo "Outros"
function toggleOutrosMotivosPsicologico(mostrar) {
  document.getElementById('outros-motivos-psicologico').style.display = 
    mostrar ? 'block' : 'none';
  
  if (!mostrar) {
    document.querySelector('input[name="outros_motivos_psicologico"]').value = '';
    localStorage.removeItem('outros-motivos-psicologico');
  }
}

// Inicialização ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
  // Restaurar estado salvo
  const resposta = localStorage.getItem('resposta-psicologico');
  if (resposta) {
    document.querySelector(`input[name="acompanhamento_psicologico"][value="${resposta}"]`).checked = true;
    toggleAcompanhamentoPsicologico(resposta === 'sim');
  }
  
  const motivo = localStorage.getItem('motivo-psicologico');
  if (motivo) {
    document.querySelector(`input[name="motivo_sem_psicologico"][value="${motivo}"]`).checked = true;
    if (motivo === 'outros') {
      document.getElementById('outros-motivos-psicologico').style.display = 'block';
    }
  }
  
  const outrosMotivos = localStorage.getItem('outros-motivos-psicologico');
  if (outrosMotivos) {
    document.querySelector('input[name="outros_motivos_psicologico"]').value = outrosMotivos;
  }
  
  const frequencia = localStorage.getItem('frequencia-psicologico');
  if (frequencia) {
    document.querySelector(`input[name="frequencia_psicologico"][value="${frequencia}"]`).checked = true;
  }
  
  // Configurar eventos
  document.querySelectorAll('input[name="acompanhamento_psicologico"]').forEach(radio => {
    radio.addEventListener('change', () => salvarRespostaPsicologico(radio.value));
  });
  
  document.querySelectorAll('input[name="frequencia_psicologico"]').forEach(radio => {
    radio.addEventListener('change', () => salvarFrequenciaPsicologico(radio.value));
  });
  
  document.querySelectorAll('input[name="motivo_sem_psicologico"]').forEach(radio => {
    radio.addEventListener('change', () => {
      salvarMotivoPsicologico(radio.value);
      toggleOutrosMotivosPsicologico(radio.value === 'outros');
    });
  });
  
  document.querySelector('input[name="outros_motivos_psicologico"]')?.addEventListener('input', salvarOutrosMotivosPsicologico);
});

// Função para salvar resposta principal
function salvarRedeApoio(resposta) {
  localStorage.setItem('rede-apoio', resposta);
  console.log("Resposta rede apoio salva:", resposta);
  
  // Mostrar/ocultar detalhes conforme resposta
  toggleSubquestion('rede-apoio-details', resposta === 'sim');
  
  // Se for "Não", já salva automaticamente para ativar o bloco
  if (resposta === 'nao') {
    localStorage.setItem('rede-apoio-quantidade', 'nenhuma');
    localStorage.removeItem('rede-apoio-quem');
  }
}

// Função para salvar quantidade de apoio
function salvarQuantidadeApoio(quantidade) {
  localStorage.setItem('rede-apoio-quantidade', quantidade);
  console.log("Quantidade apoio salva:", quantidade);
  
  // Mostrar campo para detalhar quem é a rede
  toggleSubquestion('quem-apoio-container', true);
}

// Função para salvar detalhes da rede
function salvarQuemApoio() {
  const detalhes = document.querySelector('textarea[name="quem_apoio"]').value;
  localStorage.setItem('rede-apoio-quem', detalhes);
  console.log("Detalhes rede apoio salvos:", detalhes);
}

// Função auxiliar para mostrar/ocultar elementos
function toggleSubquestion(id, mostrar) {
  const element = document.getElementById(id);
  if (element) {
    element.style.display = mostrar ? 'block' : 'none';
  }
}

// Inicialização ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
  // Restaurar estado salvo
  const resposta = localStorage.getItem('rede-apoio');
  if (resposta) {
    document.querySelector(`input[name="rede_apoio"][value="${resposta}"]`).checked = true;
    toggleSubquestion('rede-apoio-details', resposta === 'sim');
  }
  
  const quantidade = localStorage.getItem('rede-apoio-quantidade');
  if (quantidade && quantidade !== 'nenhuma') {
    document.querySelector(`input[name="quantidade_apoio"][value="${quantidade}"]`).checked = true;
    toggleSubquestion('quem-apoio-container', true);
  }
  
  const quem = localStorage.getItem('rede-apoio-quem');
  if (quem) {
    document.querySelector('textarea[name="quem_apoio"]').value = quem;
  }
  
  // Adicionar eventos
  document.querySelectorAll('input[name="rede_apoio"]').forEach(radio => {
    radio.addEventListener('change', () => salvarRedeApoio(radio.value));
  });
  
  document.querySelectorAll('input[name="quantidade_apoio"]').forEach(radio => {
    radio.addEventListener('change', () => salvarQuantidadeApoio(radio.value));
  });
  
  document.querySelector('textarea[name="quem_apoio"]').addEventListener(
    'input', salvarQuemApoio
  );
});