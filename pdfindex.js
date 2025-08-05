document.addEventListener('DOMContentLoaded', function() {
  const btnPdf = document.getElementById('btnPdf');

  btnPdf.addEventListener('click', async function() {
    // 1. Coletar dados do formulário
    const form = document.getElementById('triagemForm');
    const formData = new FormData(form);

    // 2. Montar perguntas e respostas (com idade calculada detalhada)
    const perguntasRespostas = [
      { pergunta: 'Nome completo', resposta: formData.get('nome') || '' },
      { 
        pergunta: 'Data de Nascimento', 
        resposta: formData.get('idade') ? new Date(formData.get('idade')).toLocaleDateString('pt-BR') : '' 
      },
      { 
        pergunta: 'Idade', 
        resposta: formatarIdadeParaPDF(
          formData.get('idade_anos'),
          formData.get('idade_meses'),
          formData.get('idade_dias')
        )
      },
      { pergunta: 'Sexo', resposta: formData.get('sexo') || '' },
      { pergunta: 'Paciente é dependente?', resposta: formData.get('dependente') === 'sim' ? 'Sim' : 'Não' },
      { pergunta: 'Suporte assistencial adequado?', resposta: formData.get('suporte') === 'sim' ? 'Sim' : 'Não' },
      { pergunta: 'Paciente é acamado?', resposta: formData.get('acamado') === 'sim' ? 'Sim' : 'Não' },
      { pergunta: 'Faz uso de oxigênio domiciliar?', resposta: formData.get('oxigenio') === 'sim' ? 'Sim' : 'Não' },
      { pergunta: 'Possui problemas psicológicos?', resposta: formData.get('problema_psicologico') === 'sim' ? 'Sim' : 'Não' },
      { pergunta: 'Observações', resposta: formData.get('observacoes') || '' }
    ];

    // 3. Carregar o PDF modelo
    const existingPdfBytes = await fetch('assets/assets/img/TIMBRADO SCMT.pdf').then(res => res.arrayBuffer());
    const { PDFDocument, rgb } = window.PDFLib;
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const helveticaFont = await pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica);
    const helveticaBold = await pdfDoc.embedFont(PDFLib.StandardFonts.HelveticaBold);

    // 4. Pega a primeira página do modelo
    let page = pdfDoc.getPages()[0];

    // 5. Configurações de layout
    let y = 650; // Posição inicial Y
    const fontSize = 12;
    const lineHeight = 18;
    const marginLeft = 80;
    const respostaOffset = 200; // Posição das respostas
    const pageBottom = 60; // Margem inferior
    const maxWidth = 450; // Largura máxima do texto

    // 6. Escrever perguntas e respostas no PDF
    for (let item of perguntasRespostas) {
      // Verifica espaço na página
      if (y < pageBottom) {
        const newPage = pdfDoc.addPage([page.getWidth(), page.getHeight()]);
        page = newPage;
        y = 750; // Reset Y position for new page
      }

      // Desenha a pergunta (negrito)
      page.drawText(item.pergunta + ':', {
        x: marginLeft,
        y: y,
        size: fontSize,
        font: helveticaBold,
        color: rgb(0.1, 0.1, 0.5)
      });

      // Processa a resposta (quebra de linha se necessário)
      const resposta = item.resposta || '';
      let linhasResposta = [];

      if (resposta.length > 0) {
        if (item.pergunta === 'Observações' || helveticaFont.widthOfTextAtSize(resposta, fontSize) > maxWidth) {
          // Quebra texto longo em múltiplas linhas
          linhasResposta = quebrarTexto(resposta, helveticaFont, fontSize, maxWidth);
        } else {
          linhasResposta = [resposta];
        }
      } else {
        linhasResposta = ['-'];
      }

      // Desenha as linhas da resposta
      let currentY = y;
      for (let linha of linhasResposta) {
        currentY -= lineHeight;
        
        // Verifica se precisa de nova página
        if (currentY < pageBottom) {
          const newPage = pdfDoc.addPage([page.getWidth(), page.getHeight()]);
          page = newPage;
          currentY = 750 - lineHeight;
        }

        // Destaque especial para a idade
        if (item.pergunta === 'Idade') {
          const textWidth = helveticaBold.widthOfTextAtSize(linha, fontSize + 2);
          
          // Fundo destacado
          page.drawRectangle({
            x: respostaOffset - 5,
            y: currentY - 2,
            width: textWidth + 10,
            height: lineHeight + 2,
            color: rgb(0.95, 0.95, 1),
            borderWidth: 0.5,
            borderColor: rgb(0.7, 0.7, 0.9)
          });
          
          // Texto em negrito e azul
          page.drawText(linha, {
            x: respostaOffset,
            y: currentY,
            size: fontSize + 2,
            font: helveticaBold,
            color: rgb(0.2, 0.3, 0.7)
          });
        } else {
          // Resposta normal
          page.drawText(linha, {
            x: respostaOffset,
            y: currentY,
            size: fontSize,
            font: helveticaFont,
            color: rgb(0, 0, 0)
          });
        }
      }

      y = currentY - lineHeight * 0.5; // Espaço entre itens
    }

    // 7. Salvar e baixar o PDF
    const pdfBytes = await pdfDoc.save();
    downloadPDF(pdfBytes, 'Respostas_Triagem_PTS.pdf');
  });

  // Funções auxiliares
  function formatarIdadeParaPDF(anos, meses, dias) {
    anos = parseInt(anos) || 0;
    meses = parseInt(meses) || 0;
    dias = parseInt(dias) || 0;

    const partes = [];
    if (anos > 0) partes.push(`${anos} ano${anos !== 1 ? 's' : ''}`);
    if (meses > 0) partes.push(`${meses} mês${meses !== 1 ? 'es' : ''}`);
    if (dias > 0 || partes.length === 0) partes.push(`${dias} dia${dias !== 1 ? 's' : ''}`);
    
    return partes.join(', ');
  }

  function quebrarTexto(texto, font, size, maxWidth) {
    const palavras = texto.split(' ');
    const linhas = [];
    let linhaAtual = '';

    palavras.forEach(palavra => {
      const testeLinha = linhaAtual ? `${linhaAtual} ${palavra}` : palavra;
      if (font.widthOfTextAtSize(testeLinha, size) <= maxWidth) {
        linhaAtual = testeLinha;
      } else {
        if (linhaAtual) linhas.push(linhaAtual);
        linhaAtual = palavra;
      }
    });

    if (linhaAtual) linhas.push(linhaAtual);
    return linhas;
  }

  function downloadPDF(pdfBytes, fileName) {
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
});