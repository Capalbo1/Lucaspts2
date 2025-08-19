document.addEventListener('DOMContentLoaded', function() {
    const btnPdf = document.getElementById('btnPdf');

    // Função para limpar texto para o PDF
    function limparTextoParaPDF(texto) {
        if (!texto) return '';
        return texto
            .replace(/"/g, "'") // Substitui aspas
            .replace(/\n/g, ' ') // Substitui quebras de linha por espaço
            .replace(/\s+/g, ' ') // Remove espaços múltiplos
            .trim();
    }

    // Função para quebrar texto longo em múltiplas linhas
    function quebrarTextoParaPDF(texto, font, size, maxWidth) {
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

    btnPdf.addEventListener('click', async function() {
        // 1. Coletar dados do formulário
        const form = document.getElementById('triagemForm');
        const formData = new FormData(form);

        // Pegar conteúdo da div resultado
        const divResultado = document.getElementById('resultado');
        const conteudoResultado = limparTextoParaPDF(divResultado.textContent || divResultado.innerText) || 'Nenhum resultado disponível';

        // 2. Montar perguntas e respostas - USANDO O CAMPO CORRETO PARA DATA
        const perguntasRespostas = [
            { pergunta: 'Nome completo', resposta: limparTextoParaPDF(formData.get('nome')) || '' },
            { 
                pergunta: 'Data de Nascimento', 
                // CORREÇÃO: Usar o campo data_nascimento_formatada
                resposta: formData.get('data_nascimento_formatada') || 'Não informada' 
            },
            { 
                pergunta: 'Idade', 
                resposta: formatarIdadeParaPDF(
                    formData.get('idade_anos'),
                    formData.get('idade_meses'),
                    formData.get('idade_dias')
                )
            },
                      {
              pergunta: 'Sexo',
              resposta: (() => {
                const sexo = limparTextoParaPDF(formData.get('sexo')) || '';
                const nomeSocial = limparTextoParaPDF(formData.get('nome_social')) || '';
                
                if (sexo === 'outros' && nomeSocial) {
                  return `Não especificado (Nome social: ${nomeSocial})`;
                }
                return sexo;
              })()
            },
            { pergunta: 'Paciente é dependente?', resposta: formData.get('dependente') === 'sim' ? 'Sim' : 'Não' },
            { pergunta: 'Suporte assistencial adequado?', resposta: formData.get('suporte') === 'sim' ? 'Sim' : 'Não' },
            { pergunta: 'Paciente é acamado?', resposta: formData.get('acamado') === 'sim' ? 'Sim' : 'Não' },
            { pergunta: 'Faz uso de oxigênio domiciliar?', resposta: formData.get('oxigenio') === 'sim' ? 'Sim' : 'Não' },
            { pergunta: 'Possui problemas psicológicos?', resposta: formData.get('problema_psicologico') === 'sim' ? 'Sim' : 'Não' },
            { pergunta: 'Observações', resposta: limparTextoParaPDF(formData.get('observacoes')) || '' },
            { pergunta: 'Resultado da Triagem', resposta: conteudoResultado }
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
        let y = 700;
        const fontSize = 12;
        const titleFontSize = 16;
        const lineHeight = 30;
        const marginLeft = 80;
        const respostaOffset = 250;
        const pageBottom = 60;
        const maxWidth = 300;

        // 6. Adicionar título ao PDF
        const titleText = 'Triagem do Paciente';
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

        // 7. Escrever perguntas e respostas no PDF
        for (let item of perguntasRespostas) {
            if (y < pageBottom) {
                const newPage = pdfDoc.addPage([page.getWidth(), page.getHeight()]);
                page = newPage;
                y = 750;
            }

            const perguntaTexto = item.pergunta + ':';
            const respostaTexto = item.resposta || '-';

            // Desenha a pergunta (negrito)
            page.drawText(perguntaTexto, {
                x: marginLeft,
                y: y,
                size: fontSize,
                font: helveticaBold,
                color: rgb(0.1, 0.1, 0.5)
            });

            // Tratamento especial para campos longos
            if (item.pergunta === 'Observações' || item.pergunta === 'Resultado da Triagem') {
                y -= lineHeight;
                const linhas = quebrarTextoParaPDF(respostaTexto, helveticaFont, fontSize, 440);
                
                for (let linha of linhas) {
                    if (y < pageBottom) {
                        const newPage = pdfDoc.addPage([page.getWidth(), page.getHeight()]);
                        page = newPage;
                        y = 750;
                    }
                    
                    page.drawText(linha, {
                        x: marginLeft,
                        y: y,
                        size: fontSize,
                        font: helveticaFont,
                        color: rgb(0, 0, 0)
                    });
                    
                    y -= lineHeight;
                }
            } else if (item.pergunta === 'Idade') {
                // Destaque para idade
                page.drawText(respostaTexto, {
                    x: respostaOffset + 30,
                    y: y,
                    size: fontSize + 2,
                    font: helveticaBold,
                    color: rgb(0.2, 0.3, 0.7)
                });
                y -= lineHeight;
            } else {
                // Resposta normal
                page.drawText(respostaTexto, {
                    x: respostaOffset + 30,
                    y: y,
                    size: fontSize,
                    font: helveticaFont,
                    color: rgb(0, 0, 0)
                });
                y -= lineHeight;
            }
        }

        // 8. Salvar e baixar o PDF
        const pdfBytes = await pdfDoc.save();
        downloadPDF(pdfBytes, 'Respostas_Triagem_PTS.pdf');
    });

    // Função para formatar idade
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

    // Função para download
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