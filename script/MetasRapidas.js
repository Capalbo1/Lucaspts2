function toggleSubquestion(elementId, show) {
  const element = document.getElementById(elementId);
  if (show) {
    element.style.display = 'block';
  } else {
    element.style.display = 'none';
    // Limpar todos os campos quando esconder
    clearAllFields();
  }
}

// Função para limpar todos os campos quando as metas rápidas são desmarcadas
function clearAllFields() {
  // Desmarcar todos os checkboxes
  const checkboxes = document.querySelectorAll('#metas-rapidas-details input[type="checkbox"]');
  checkboxes.forEach(checkbox => checkbox.checked = false);
  
  // Limpar campo de texto "outros"
  const otherText = document.querySelector('input[name="outra_meta_rapida"]');
  if (otherText) otherText.value = '';
  
  // Limpar campo de dias do antibiótico
  const antibioticoField = document.querySelector('input[name="antibiotico_dias"]');
  if (antibioticoField) antibioticoField.value = '';
  
  // Resetar todos os selects de frequência
  const selects = document.querySelectorAll('#metas-rapidas-details select');
  selects.forEach(select => select.selectedIndex = 0);
  
  // Esconder todos os campos condicionais
  const conditionalFields = document.querySelectorAll('#metas-rapidas-details div[style*="display: none"]');
  conditionalFields.forEach(field => field.style.display = 'none');
}

// Função para mostrar/esconder campo de dias do antibiótico
function toggleDaysField() {
  const checkbox = document.getElementById('antibiotico');
  const daysField = document.getElementById('antibiotico-dias');
  
  if (checkbox.checked) {
    daysField.style.display = 'block';
  } else {
    daysField.style.display = 'none';
  }
}

// Função genérica para mostrar/esconder campos de frequência
function toggleFrequencyField(fieldId, isChecked) {
  const frequencyField = document.getElementById(fieldId);
  
  if (isChecked) {
    frequencyField.style.display = 'block';
  } else {
    frequencyField.style.display = 'none';
  }
}

// Função para mostrar/esconder campo "Outros"
function toggleOtherField() {
  const checkbox = document.getElementById('outros-metas');
  const otherField = document.getElementById('outros-metas-detalhes');
  
  if (checkbox.checked) {
    otherField.style.display = 'block';
  } else {
    otherField.style.display = 'none';
  }
}



function atualizarMetasRapidas() {
  const container = document.getElementById('metas-padrao');
  const metasRapidasChecked = document.querySelector('input[name="metas_rapidas"]:checked');
  
  // Limpa se metas rápidas não estiver marcada
  if (!metasRapidasChecked) {
    container.innerHTML = '';
    return;
  }
  
  // Pega todos os checkboxes marcados das metas rápidas
  const metasMarcadas = document.querySelectorAll('#metas-rapidas-details input[type="checkbox"]:checked');
  
  let htmlContent = '';
  
  metasMarcadas.forEach(checkbox => {
    const valor = checkbox.value;
    let texto = '';
    let meta = '';
    
    switch(valor) {
      case 'Antibioticoterapia':
        const dias = document.querySelector('input[name="antibiotico_dias"]')?.value || '';
        texto = '';
        meta = dias ? `Antibioticoterapia por ${dias} dias` : 'Antibioticoterapia conforme prescrição médica';
        break;
        
      case 'Suporte clínico':
        texto = '';
        meta = 'Manter suporte clínico adequado';
        break;
        
      case 'Suporte Intensivo':
        texto = '';
        meta = 'Manter suporte intensivo conforme necessidade';
        break;
        
      case 'Vigilância neurológica':
        texto = '';
        meta = 'Manter vigilância neurológica contínua';
        break;
        
      case 'Vigilância hematimétrica':
        texto = '';
        meta = 'Manter vigilância hematimétrica';
        break;
        
      case 'Vigilância hemodinâmica':
        texto = '';
        meta = 'Manter vigilância hemodinâmica';
        break;
        
      case 'Controle hídrico':
        const freqHidrico = document.querySelector('select[name="ctrl_hidrico_freq"]')?.value || '';
        texto = '';
        meta = freqHidrico ? `Controle hídrico ${freqHidrico}` : 'Controle hídrico rigoroso';
        break;
        
      case 'Controle glicêmico':
        const freqGlicemico = document.querySelector('select[name="ctrl_glicemico_freq"]')?.value || '';
        texto = '';
        meta = freqGlicemico ? `Controle glicêmico ${freqGlicemico}` : 'Controle glicêmico rigoroso';
        break;
        
      case 'Sinais vitais':
        const freqSinais = document.querySelector('select[name="sinais_vitais_freq"]')?.value || '';
        texto = '';
        meta = freqSinais ? `Verificar sinais vitais ${freqSinais}` : 'Verificar sinais vitais conforme protocolo';
        break;
        
      case 'Cabeceira elevada':
        texto = '';
        meta = 'Manter cabeceira elevada a 30-45°';
        break;
        
      case 'Risco de queda':
        texto = '';
        meta = 'Implementar medidas de prevenção de quedas';
        break;
        
      case 'Oxigenoterapia':
        texto = '';
        meta = 'Manter oxigenoterapia conforme prescrição';
        break;
        
      case 'Manter as vias aereas perveas':
        texto = '';
        meta = 'Manter vias aéreas pérvias e desobstruídas';
        break;
        
      case 'Controle da dor':
        texto = '';
        meta = 'Controle adequado da dor conforme escala';
        break;
        
      case 'Estabilização hemodinâmica':
        texto = '';
        meta = 'Manter estabilização hemodinâmica';
        break;
        
      case 'outros':
        const outroTexto = document.querySelector('input[name="outra_meta_rapida"]')?.value || '';
        if (outroTexto) {
          texto = '';
          meta = outroTexto;
        }
        break;
    }
    
    // Só adiciona se tiver meta definida
    if (meta) {
      htmlContent += `
        <div class="resumo-item">
          <input type="checkbox" class="resumo-checkbox">
          <div class="resumo-texto">
            ${texto}
            <div class="meta-tag">${meta}</div>
          </div>
        </div>
      `;
    }
  });
  
  container.innerHTML = htmlContent;
}

// Função para chamar quando qualquer checkbox das metas rápidas for alterado
function onMetaRapidaChange() {
  atualizarMetasRapidas();
}

// Adicionar event listeners para todos os checkboxes das metas rápidas
document.addEventListener('DOMContentLoaded', function() {
  // Event listener para o checkbox principal das metas rápidas
  const metasRapidasCheckbox = document.querySelector('input[name="metas_rapidas"]');
  if (metasRapidasCheckbox) {
    metasRapidasCheckbox.addEventListener('change', atualizarMetasRapidas);
  }
  
  // Event listeners para todos os checkboxes individuais das metas
  const metasIndividuais = document.querySelectorAll('#metas-rapidas-details input[type="checkbox"]');
  metasIndividuais.forEach(checkbox => {
    checkbox.addEventListener('change', atualizarMetasRapidas);
  });
  
  // Event listeners para os campos de frequência e dias
  const camposFrequencia = document.querySelectorAll('#metas-rapidas-details select');
  camposFrequencia.forEach(select => {
    select.addEventListener('change', atualizarMetasRapidas);
  });
  
  const campoDias = document.querySelector('input[name="antibiotico_dias"]');
  if (campoDias) {
    campoDias.addEventListener('input', atualizarMetasRapidas);
  }
  
  const campoOutros = document.querySelector('input[name="outra_meta_rapida"]');
  if (campoOutros) {
    campoOutros.addEventListener('input', atualizarMetasRapidas);
  }
});