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
      const texto = meta.querySelector('.resumo-texto')?.innerText.trim() || '';
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

    // 3. Layout inicial - CONFIGURAÇÕES AJUSTADAS
    const pageWidth = page.getWidth();
    const pageHeight = page.getHeight();

    // Margens e posições (ajuste se necessário)
    const topMargin = 140; // distância do topo da página (em pontos)
    const bottomMargin = 100; // margem inferior (em pontos)
    const startY = pageHeight - topMargin; // posição inicial Y
    let currentY = startY;

    const fontSize = 10; // Fonte das metas
    const titleFontSize = 16;
    // lineHeight baseado em fontSize para ser consistente
    const lineHeight = Math.round(fontSize * 1.8); // por exemplo: 10 * 1.8 = 18
    const metaSpacing = 20; // Espaço fixo entre metas (padrão maior para evitar sobreposição)
    const marginLeft = 80;
    const maxWidth = pageWidth - marginLeft - 80; // largura útil do texto (ajusta margem direita)
    const checkboxSize = 10;
    const textIndent = checkboxSize + 10; // indentação do texto após checkbox
    const extraPad = 6; // folga extra por meta para garantir não sobrepor

    // 4. Título
    const titleText = 'PROJETO TERAPÊUTICO SINGULAR';
    const titleWidth = helveticaBold.widthOfTextAtSize(titleText, titleFontSize);
    const titleX = (pageWidth - titleWidth) / 2;

    page.drawText(titleText, {
      x: titleX,
      y: currentY + 20,
      size: titleFontSize,
      font: helveticaBold,
      color: rgb(0.1, 0.1, 0.5)
    });

    currentY -= 50;

    // 🔹 Nome completo
    const nome = document.getElementById("nome")?.value || "Não informado";
    page.drawText("Nome Completo:", {
      x: marginLeft,
      y: currentY,
      size: fontSize + 1,
      font: helveticaBold,
      color: rgb(0, 0, 0)
    });

    page.drawText(nome, {
      x: marginLeft + 110,
      y: currentY,
      size: fontSize + 1,
      font: helveticaFont,
      color: rgb(0.2, 0.2, 0.2)
    });

    currentY -= 25;

    // 🔹 Diagnóstico Principal
    const diagnostico = document.getElementById("diagnostico")?.value || "Não informado";
    page.drawText("Diagnóstico Principal da Internação:", {
      x: marginLeft,
      y: currentY,
      size: fontSize + 1,
      font: helveticaBold,
      color: rgb(0, 0, 0)
    });

    page.drawText(diagnostico, {
      x: marginLeft + 220,
      y: currentY,
      size: fontSize + 1,
      font: helveticaFont,
      color: rgb(0.2, 0.2, 0.2)
    });

    currentY -= 40;

    // FUNÇÃO DE QUEBRA DE TEXTO (mesma ideia, mas garantindo que largura seja em "points")
    function quebrarTexto(texto, font, tamanhoFonte, larguraMaxima) {
      if (!texto || texto.trim() === '') return [''];
      const palavras = texto.trim().split(/\s+/);
      const linhas = [];
      let linhaAtual = '';

      for (let i = 0; i < palavras.length; i++) {
        const palavra = palavras[i];
        const testeComPalavra = linhaAtual ? `${linhaAtual} ${palavra}` : palavra;
        const larguraTeste = font.widthOfTextAtSize(testeComPalavra, tamanhoFonte);

        if (larguraTeste <= larguraMaxima) {
          linhaAtual = testeComPalavra;
        } else {
          if (linhaAtual) {
            linhas.push(linhaAtual);
            linhaAtual = palavra;
          } else {
            // palavra maior que larguraMaxima -> quebra forçada
            // dividimos a palavra em pedaços aproximados
            let fragment = palavra;
            while (font.widthOfTextAtSize(fragment, tamanhoFonte) > larguraMaxima) {
              // estimativa: corte um caractere até caber (simples e seguro)
              fragment = fragment.slice(0, -1);
              if (!fragment) break;
            }
            if (fragment) {
              linhas.push(fragment);
              const resto = palavra.slice(fragment.length);
              if (resto) {
                linhaAtual = resto;
              } else {
                linhaAtual = '';
              }
            } else {
              // fallback: guarda a palavra inteira
              linhas.push(palavra);
              linhaAtual = '';
            }
          }
        }
      }

      if (linhaAtual) linhas.push(linhaAtual);

      return linhas.length > 0 ? linhas : [''];
    }

    // FUNÇÃO PARA DESENHAR CHECKBOX
    function desenharCheckbox(pageRef, x, y, marcado = false) {
      // Desenha o quadrado (y refere-se ao baseline do texto; ajustamos para desenhar centrado verticalmente na linha)
      const squareY = y - (checkboxSize / 2);
      pageRef.drawRectangle({
        x: x,
        y: squareY,
        width: checkboxSize,
        height: checkboxSize,
        borderColor: rgb(0, 0, 0),
        borderWidth: 1.2,
        color: rgb(1, 1, 1)
      });

      if (marcado) {
        // desenha um check simples centralizado
        const checkX = x + 1.6;
        const checkY = squareY + 1.2;
        pageRef.drawText("✓", {
          x: checkX,
          y: checkY,
          size: checkboxSize - 3,
          font: helveticaBold,
          color: rgb(0, 0.6, 0)
        });
      }
    }

    // FUNÇÃO PARA VERIFICAR E CRIAR NOVA PÁGINA
    function verificarECriarNovaPagina(alturaNecessaria) {
      // altitudeNecessaria já considera o espaço que vamos usar (linhas + spacing)
      if (currentY - alturaNecessaria < bottomMargin) {
        page = pdfDoc.addPage([pageWidth, pageHeight]);
        currentY = startY;
        return true;
      }
      return false;
    }

    // FUNÇÃO PARA DESENHAR UMA META COMPLETA
    function desenharMeta(texto, marcada = false) {
      const linhas = quebrarTexto(texto, helveticaFont, fontSize, maxWidth - textIndent);
      const alturaLinhas = linhas.length * lineHeight;
      const alturaTotal = alturaLinhas + metaSpacing + extraPad;

      // Verifica se precisa de nova página e cria se necessário
      verificarECriarNovaPagina(alturaTotal);

      // Desenha checkbox próximo ao baseline da primeira linha
      const checkboxY = currentY;
      desenharCheckbox(page, marginLeft, checkboxY, marcada);

      // Desenha cada linha do texto
      linhas.forEach((linha, index) => {
        const yPosicao = currentY - (index * lineHeight);
        page.drawText(linha, {
          x: marginLeft + textIndent,
          y: yPosicao,
          size: fontSize,
          font: helveticaFont,
          color: rgb(0, 0, 0),
          maxWidth: maxWidth - textIndent
        });
      });

      // Atualiza posição Y para próxima meta (leva em conta todas as linhas + espaçamento)
      currentY -= alturaTotal;
    }

    // 5. DESENHAR METAS REALIZADAS
    if (realizadas.length > 0) {
      // Verifica espaço para título
      verificarECriarNovaPagina(40);
      
      page.drawText("Metas Realizadas:", {
        x: marginLeft,
        y: currentY,
        size: fontSize + 3,
        font: helveticaBold,
        color: rgb(0, 0.6, 0)
      });
      
      currentY -= 30;

      realizadas.forEach(meta => {
        if ((meta || '').trim()) desenharMeta(meta, true);
      });

      currentY -= 20; // Espaço extra entre seções
    }

    // 6. DESENHAR METAS PENDENTES
    if (pendentes.length > 0) {
      // Verifica espaço para título
      verificarECriarNovaPagina(40);

      page.drawText("Metas do Paciente:", {
        x: marginLeft,
        y: currentY,
        size: fontSize + 3,
        font: helveticaBold,
        color: rgb(0.8, 0, 0)
      });
      
      currentY -= 30;

      pendentes.forEach(meta => {
        if ((meta || '').trim()) desenharMeta(meta, false);
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
