// abas.js - Controle das abas de especialidades

document.addEventListener('DOMContentLoaded', function() {
  // Elementos das abas e conteúdos
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.especialidade-section');
  
  // Função para ativar uma aba específica
  function ativarAba(tabId) {
    // Remove a classe ativa de todas as abas
    tabBtns.forEach(btn => btn.classList.remove('active'));
    
    // Adiciona a classe ativa na aba especificada
    const btnAtivo = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
    if (btnAtivo) {
      btnAtivo.classList.add('active');
    }
    
    // Esconde todos os conteúdos
    tabContents.forEach(content => content.classList.remove('active'));
    
    // Mostra o conteúdo correspondente
    const conteudoAtivo = document.getElementById(tabId);
    if (conteudoAtivo) {
      conteudoAtivo.classList.add('active');
    }
  }
  
  // Event listeners para os botões das abas
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');
      ativarAba(tabId);
    });
  });
  
  // Ativa a aba da especialidade quando clicar no menu de profissionais
  const navLinks = document.querySelectorAll('.menu-profissionais a');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = this.getAttribute('href').substring(1); // Remove o #
      ativarAba(target);
      
      // Rola para o topo do formulário
      document.querySelector('.form-container').scrollIntoView({ behavior: 'smooth' });
    });
  });
  
  // Ativa automaticamente a aba quando a página carrega com hash na URL
  if (window.location.hash) {
    const hash = window.location.hash.substring(1);
    ativarAba(hash);
  }
});