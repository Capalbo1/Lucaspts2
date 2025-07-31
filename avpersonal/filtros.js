// Adicione este código em um novo arquivo ou no final do body (pode ser no metassingulares.js)

document.addEventListener('DOMContentLoaded', function() {
    // Mapeamento dos profissionais para seus respectivos blocos
    const filtroProfissionais = {
        'enfermagem': ['bloco-enfermagem', 'bloco-dispositivos-enf'],
        'fisioterapia': ['bloco-deambulacao', 'bloco-dependencia'],
        'nutricao': ['bloco-nutricao'],
        'psicologia': ['bloco-psicologico'],
        'assistente-social': ['bloco-assistente'],
        'farmacia': [], // Adicione os blocos relevantes
        'terapia-ocupacional': [], // Adicione os blocos relevantes
        'fonoaudiologia': [] // Adicione os blocos relevantes
    };

    // Ativa os links do menu de profissionais
    const linksProfissionais = document.querySelectorAll('.menu-profissionais a');
    
    linksProfissionais.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Obtém o ID da seção do profissional (remove o # do href)
            const profissionalId = this.getAttribute('href').substring(1);
            
            // Esconde todos os blocos primeiro
            document.querySelectorAll('.bloco').forEach(bloco => {
                bloco.style.display = 'none';
            });
            
            // Mostra apenas os blocos relacionados ao profissional
            if (filtroProfissionais[profissionalId]) {
                filtroProfissionais[profissionalId].forEach(blocoId => {
                    const bloco = document.getElementById(blocoId);
                    if (bloco) {
                        bloco.style.display = 'block';
                    }
                });
            }
            
            // Adiciona classe ativa ao link clicado
            linksProfissionais.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Opcional: Botão para mostrar todos os blocos
    const btnMostrarTodos = document.createElement('button');
    btnMostrarTodos.textContent = 'Mostrar Todas as Metas';
    btnMostrarTodos.className = 'btn-nova-meta';
    btnMostrarTodos.style.margin = '10px 0';
    
    btnMostrarTodos.addEventListener('click', function() {
        document.querySelectorAll('.bloco').forEach(bloco => {
            bloco.style.display = 'block';
        });
        linksProfissionais.forEach(l => l.classList.remove('active'));
    });
    
    // Insere o botão no container de profissionais
    const areaProfissionais = document.querySelector('.area-profissionais');
    areaProfissionais.appendChild(btnMostrarTodos);
});