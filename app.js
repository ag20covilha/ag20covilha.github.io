/* Agrupamento 20 Covilhã — o pouco de JavaScript do site. */
(function () {
  /* o menu no telemóvel */
  var bt = document.querySelector('.menu-bt'), nav = document.getElementById('menu');
  if (bt && nav) bt.addEventListener('click', function () {
    var aberto = nav.classList.toggle('aberto');
    bt.setAttribute('aria-expanded', aberto ? 'true' : 'false');
    bt.setAttribute('aria-label', aberto ? 'Fechar o menu' : 'Abrir o menu');
  });

  /* contagem decrescente: <b data-contagem="2027-07-30"> */
  document.querySelectorAll('[data-contagem]').forEach(function (el) {
    var p = el.getAttribute('data-contagem').split('-');
    var alvo = new Date(+p[0], +p[1] - 1, +p[2]);
    var hoje = new Date(); hoje.setHours(0, 0, 0, 0);
    el.textContent = Math.max(0, Math.round((alvo - hoje) / 86400000));
  });

  /* «Deixe aqui as suas questões»: o site é estático, por isso o formulário
     prepara a mensagem no programa de email de quem escreve, já com o
     destinatário, o assunto e o texto. Quando houver um Google Form, o
     site.config.json (formularioContactos) troca este formulário por ele. */
  var f = document.getElementById('questoes-f');
  if (f) f.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var v = function (n) { return (f.elements[n] && f.elements[n].value || '').trim(); };
    var para = 'geral.20@escutismo.pt';   /* sempre para o email geral do Agrupamento */
    var corpo = v('mensagem') + '\n\n—\n' + v('nome') + (v('contacto') ? '\n' + v('contacto') : '');
    location.href = 'mailto:' + para + '?subject=' + encodeURIComponent('[Site] ' + (v('assunto') || 'Questão')) +
      '&body=' + encodeURIComponent(corpo);
    var ok = document.getElementById('questoes-ok');
    if (ok) ok.hidden = false;
  });
})();
