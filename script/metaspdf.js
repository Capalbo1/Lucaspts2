document.addEventListener('DOMContentLoaded', function() {
  const botaoPDF = document.getElementById('gerar-pdf-metas');
  if (botaoPDF) {
    botaoPDF.addEventListener('click', gerarPDFMetas);
  }

  async function gerarPDFMetas() {
    // 1. Coletar metas
    const todasMetas = [...document.querySelectorAll('.resumo-item, .meta-padrao-item')];
    const realizadas = [];
    const pendentes = [];

    todasMetas.forEach(meta => {
      const checkbox = meta.querySelector('.resumo-checkbox');
      const texto = meta.querySelector('.resumo-texto').innerText.trim();
      if (checkbox && checkbox.checked) {
        realizadas.push(texto);
      } else {
        pendentes.push(texto);
      }
    });

    // 2. Carregar modelo
    const existingPdfBytes = await fetch('assets/assets/img/TIMBRADO SCMT.pdf').then(res => res.arrayBuffer());
    const { PDFDocument, rgb } = window.PDFLib;
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const helveticaFont = await pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica);
    const helveticaBold = await pdfDoc.embedFont(PDFLib.StandardFonts.HelveticaBold);

    let page = pdfDoc.getPages()[0];

    // 3. Layout inicial
    let y = 700;
    const fontSize = 12;
    const titleFontSize = 16;
    const lineHeight = 20;
    const marginLeft = 80;
    const pageBottom = 60;
    const maxWidth = 440;

    // 4. Título
    const titleText = 'PROJETO TERAPÊUTICO SINGULAR';
    const titleWidth = helveticaBold.widthOfTextAtSize(titleText, titleFontSize);
    const pageWidth = page.getWidth();
    const titleX = (pageWidth - titleWidth) / 2;

    page.drawText(titleText, {
      x: titleX,
      y: y,
      size: titleFontSize,
      font: helveticaBold,
      color: rgb(0.1, 0.1, 0.5)
    });

    y -= lineHeight * 2;

    // Função para quebrar texto longo
    function quebrarTextoParaPDF(texto) {
      const palavras = texto.split(' ');
      const linhas = [];
      let linhaAtual = '';

      palavras.forEach(palavra => {
        const testeLinha = linhaAtual ? `${linhaAtual} ${palavra}` : palavra;
        if (helveticaFont.widthOfTextAtSize(testeLinha, fontSize) <= maxWidth) {
          linhaAtual = testeLinha;
        } else {
          if (linhaAtual) linhas.push(linhaAtual);
          linhaAtual = palavra;
        }
      });

      if (linhaAtual) linhas.push(linhaAtual);
      return linhas;
    }

    // 5. Seção Metas Realizadas
    if (realizadas.length > 0) {
      page.drawText("Metas Realizadas:", {
        x: marginLeft,
        y: y,
        size: fontSize + 2,
        font: helveticaBold,
        color: rgb(0, 0.5, 0) // Verde
      });
      y -= lineHeight;

      realizadas.forEach(meta => {
        if (y < pageBottom) {
          page = pdfDoc.addPage([page.getWidth(), page.getHeight()]);
          y = 750;
        }
        const linhas = quebrarTextoParaPDF(`• ${meta}`);
        linhas.forEach(linha => {
          page.drawText(linha, {
            x: marginLeft + 20,
            y: y,
            size: fontSize,
            font: helveticaFont,
            color: rgb(0, 0, 0)
          });
          y -= lineHeight;
        });
      });
      y -= 10;
    }

    // 6. Seção Metas Pendentes
    if (pendentes.length > 0) {
      page.drawText("Metas do Paciente:", {
        x: marginLeft,
        y: y,
        size: fontSize + 2,
        font: helveticaBold,
        color: rgb(0.7, 0, 0) // Vermelho
      });
      y -= lineHeight;

      pendentes.forEach(meta => {
        if (y < pageBottom) {
          page = pdfDoc.addPage([page.getWidth(), page.getHeight()]);
          y = 750;
        }
        const linhas = quebrarTextoParaPDF(` ${meta}`);
        linhas.forEach(linha => {
          page.drawText(linha, {
            x: marginLeft + 20,
            y: y,
            size: fontSize,
            font: helveticaFont,
            color: rgb(0, 0, 0)
          });
          y -= lineHeight;
        });
      });
    }

    // 7. Salvar PDF
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "metas_paciente.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
});

