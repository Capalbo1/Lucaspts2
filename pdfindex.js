// script.js

document.addEventListener('DOMContentLoaded', function() {
  const btnPdf = document.getElementById('btnPdf');

  btnPdf.addEventListener('click', async function() {
    // 1. Coletar dados do formulário
    const form = document.getElementById('triagemForm');
    const formData = new FormData(form);

    // 2. Montar perguntas e respostas
    const perguntasRespostas = [
      { pergunta: 'Nome completo', resposta: formData.get('nome') || '' },
      { pergunta: 'Idade', resposta: formData.get('idade') || '' },
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

    // 4. Pega a primeira página do modelo
    const [page] = pdfDoc.getPages();

    // 5. Escrever perguntas e respostas no PDF (formatado)
    let y = 650; // Posição inicial
    const fontSize = 13;
    const lineHeight = 22;
    const marginLeft = 80;
    const respostaOffset = 10; // Espaço entre pergunta e resposta
    const pageBottom = 60; // Margem inferior

    for (let item of perguntasRespostas) {
      let pergunta = `${item.pergunta}:`;
      let resposta = item.resposta || '';

      // Para observações ou respostas muito longas, quebrar em linhas menores
      let linhasResposta = [];
      if (item.pergunta === 'Observações' || resposta.length > 60) {
        // Quebra a resposta em linhas que cabem na largura da página
        const maxWidth = 400; // ajuste conforme necessário
        const font = await pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica);
        let palavras = resposta.split(' ');
        let linha = '';
        palavras.forEach(palavra => {
          const testLine = linha + palavra + ' ';
          if (font.widthOfTextAtSize(testLine, fontSize) > maxWidth) {
            linhasResposta.push(linha.trim());
            linha = '';
          }
          linha += palavra + ' ';
        });
        if (linha) linhasResposta.push(linha.trim());
      } else {
        linhasResposta = [resposta];
      }

      // Se não couber na página, cria nova página
      if (y - (linhasResposta.length * lineHeight) < pageBottom) {
        pdfDoc.addPage();
        const pages = pdfDoc.getPages();
        page = pages[pages.length - 1];
        y = 750; // Posição inicial da nova página
      }

      // Pergunta em azul
      page.drawText(pergunta, {
        x: marginLeft,
        y: y,
        size: fontSize,
        color: rgb(0.1, 0.1, 0.7),
      });

      // Resposta(s) em preto, na frente da pergunta ou abaixo se for muito longa
      if (linhasResposta.length === 1) {
        // Resposta curta, na mesma linha
        page.drawText(linhasResposta[0], {
          x: marginLeft + page.getWidth() * 0.35, // Ajuste para alinhar após a pergunta
          y: y,
          size: fontSize,
          color: rgb(0, 0, 0),
        });
        y -= lineHeight;
      } else {
        // Resposta longa, cada linha abaixo da pergunta
        let respY = y - lineHeight;
        linhasResposta.forEach(linha => {
          // Se não couber, nova página
          if (respY < pageBottom) {
            pdfDoc.addPage();
            const pages = pdfDoc.getPages();
            page = pages[pages.length - 1];
            respY = 750;
          }
          page.drawText(linha, {
            x: marginLeft + 10,
            y: respY,
            size: fontSize,
            color: rgb(0, 0, 0),
          });
          respY -= lineHeight;
        });
        y = respY;
      }
    }

    // 6. Salvar e baixar o PDF
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Respostas_Triagem_PTS.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });
  
  // Função para formatar as chaves (nomes dos campos) para um texto mais legível
  function formatKey(key) {
    const replacements = {
      'nome': 'Nome completo',
      'idade': 'Idade',
      'sexo': 'Sexo',
      'dependente': 'Paciente é dependente',
      'suporte': 'Suporte assistencial adequado',
      'acamado': 'Paciente é acamado',
      'oxigenio': 'Faz uso de oxigênio domiciliar',
      'problema_psicologico': 'Possui problemas psicológicos',
      'observacoes': 'Observações'
    };
    return replacements[key] || key;
  }

}); // Fecha o DOMContentLoaded