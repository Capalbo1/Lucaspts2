// script/generatePDF.js

function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF('p', 'mm', 'a4');
  const margin = 10;
  let verticalPosition = margin;
  const lineHeight = 6;
  const pageHeight = 297; // A4 height
  const maxContentHeight = pageHeight - 20; // Deixa margem no final
  const pageWidth = 210;

  // Título do documento
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('Relatório de Anamnese', 105, verticalPosition, { align: 'center' });
  verticalPosition += 20;

  // Processar todas as perguntas
  const questionGroups = document.querySelectorAll('.question-group');

  questionGroups.forEach((group, index) => {
    const questionText = group.querySelector('.question-text').textContent;
    const answer = getAnswer(group);

    // Preparar o texto completo
    const fullText = `${questionText}: ${answer}`;

    // Quebra de texto para linhas longas
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    const usableWidth = pageWidth - (margin * 2);
    const lines = doc.splitTextToSize(fullText, usableWidth);

    // Calcular espaço necessário para esta pergunta
    const neededSpace = (lines.length * lineHeight) + 8; // +8 para espaço entre perguntas

    // Verificar se precisa de nova página
    if (verticalPosition + neededSpace > maxContentHeight) {
      doc.addPage();
      verticalPosition = margin;
    }

    // Adicionar o número da pergunta se for muito longo
    if (lines.length > 3) {
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text(`Pergunta ${index + 1}:`, margin, verticalPosition);
      verticalPosition += lineHeight;
    }

    // Imprimir cada linha
    lines.forEach((line, lineIndex) => {
      // Primeira linha em negrito se for pergunta curto
      if (lineIndex === 0 && lines.length <= 3) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
      } else {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
      }

      doc.text(line, margin, verticalPosition);
      verticalPosition += lineHeight;
    });

    // Espaço extra entre perguntas
    verticalPosition += 4;

    // Linha separadora para perguntas muito longas
    if (lines.length > 4) {
      doc.setDrawColor(200, 200, 200);
      doc.line(margin, verticalPosition, pageWidth - margin, verticalPosition);
      verticalPosition += 4;
    }
  });

  // Processar metas se existirem
  addMetasSection(doc, verticalPosition, margin, lineHeight, maxContentHeight, pageWidth);

  doc.save('anamnese.pdf');
}

function addMetasSection(doc, startPosition, margin, lineHeight, maxContentHeight, pageWidth) {
  let verticalPosition = startPosition;

  // Verificar se existem metas
  const metasContainers = [
    'metas-padrao', 'metas-rapidas', 'resumo-interconsulta',
    'resumo-encaminhamento', 'resumo-vinculo-saude'
  ];

  let hasMetas = false;
  let allMetas = [];

  metasContainers.forEach(containerId => {
    const container = document.getElementById(containerId);
    if (container && container.innerHTML.trim()) {
      const metas = container.querySelectorAll('.resumo-item');
      metas.forEach(meta => {
        const metaText = meta.querySelector('.meta-tag');
        if (metaText && metaText.textContent.trim()) {
          allMetas.push(metaText.textContent.trim());
          hasMetas = true;
        }
      });
    }
  });

  if (!hasMetas) return;

  // Nova página para metas se necessário
  if (verticalPosition + 40 > maxContentHeight) {
    doc.addPage();
    verticalPosition = margin;
  }

  // Título das metas
  verticalPosition += 15;
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(200, 0, 0);
  doc.text('Metas do Paciente:', margin, verticalPosition);
  verticalPosition += 10;

  // Resetar formatação para as metas
  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'normal');

  // Ajustes solicitados: texto menor e espaçamento maior entre metas
  const metaFontSize = 10; // diminui um pouco o texto
  doc.setFontSize(metaFontSize);

  // Constantes para metas
  const pageInnerWidth = pageWidth - margin * 2;
  const checkboxSize = 4; // tamanho do quadrado do checkbox
  const checkboxGap = 4;  // espaço entre checkbox e texto
  const metaTextWidth = pageInnerWidth - (checkboxSize + checkboxGap);

  const metaLineHeight = lineHeight; // mantém lineHeight geral (6mm), pode ajustar se quiser
  const extraMarginPerMeta = 12; // margem extra no cálculo do espaço necessário
  const metaSpacing = 10; // espaço entre metas (aumentado)

  // Processar cada meta
  allMetas.forEach((meta) => {
    // Quebrar o texto da meta levando em conta o espaço do checkbox
    const metaLines = doc.splitTextToSize(meta, metaTextWidth);
    const numeroDeLinhas = metaLines.length;

    // Verificar se a meta inteira cabe na página atual
    const espacoNecessario = (numeroDeLinhas * metaLineHeight) + extraMarginPerMeta;

    if (verticalPosition + espacoNecessario > maxContentHeight) {
      doc.addPage();
      verticalPosition = margin;
    }

    // Desenhar checkbox alinhado verticalmente ao texto
    const checkboxY = verticalPosition - (metaFontSize / 2.5); // ajuste simples para alinhar ao baseline
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.rect(margin, checkboxY, checkboxSize, checkboxSize);

    // Posição inicial do texto (ao lado do checkbox)
    const textoX = margin + checkboxSize + checkboxGap;
    let linhaAtual = verticalPosition;

    // Imprimir todas as linhas desta meta usando metaLineHeight consistente
    metaLines.forEach((linha) => {
      doc.text(linha, textoX, linhaAtual);
      linhaAtual += metaLineHeight;
    });

    // Atualiza verticalPosition para a próxima meta (última linha + espaçamento aumentado)
    verticalPosition = linhaAtual + metaSpacing;
  });
}

function getAnswer(container) {
  const answers = [];

  // Coletar respostas principais
  const mainQuestion = container.querySelector('.main-question');
  if (mainQuestion) {
    // Respostas de radio/checkbox
    const checkedInputs = mainQuestion.querySelectorAll('input:checked');
    checkedInputs.forEach(input => {
      const label = input.closest('label');
      if (label) {
        answers.push(label.textContent.trim());
      }
    });

    const select = mainQuestion.querySelector('select');
    if (select && select.value) {
      answers.push(select.options[select.selectedIndex].text);
    }
  }

  // Coletar subrespostas visíveis
  const subQuestions = container.querySelectorAll('.subquestion');
  subQuestions.forEach(sub => {
    if (window.getComputedStyle(sub).display !== 'none') {
      // Inputs de texto
      const textInputs = sub.querySelectorAll('input[type="text"], input[type="number"]');
      textInputs.forEach(input => {
        if (input.value) {
          const label = input.previousElementSibling;
          const labelText = label ? label.textContent : 'Campo';
          answers.push(`${labelText}: ${input.value}`);
        }
      });

      // Checkboxes marcados
      const checkedSubInputs = sub.querySelectorAll('input[type="checkbox"]:checked, input[type="radio"]:checked');
      checkedSubInputs.forEach(input => {
        const label = input.closest('label');
        if (label) {
          answers.push(label.textContent.trim());
        }
      });

      // Selects com valor
      const subSelects = sub.querySelectorAll('select');
      subSelects.forEach(select => {
        if (select.value) {
          const label = select.previousElementSibling;
          const labelText = label ? label.textContent : 'Seleção';
          answers.push(`${labelText}: ${select.options[select.selectedIndex].text}`);
        }
      });
    }
  });

  return answers.length > 0 ? answers.join(', ') : 'Não respondido';
}

// Vinculando ao formulário
const formulario = document.getElementById('formulario');
if (formulario) {
  formulario.addEventListener('submit', function (e) {
    e.preventDefault();
    generatePDF();
  });
}
