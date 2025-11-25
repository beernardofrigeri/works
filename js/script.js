var imagens = [
    "imagens/aulaf75.webp",
    "imagens/g305.webp",
    "imagens/g733.webp"
];
var indice = 0;
var TRANSITION_MS = 150;
var banner = document.getElementById('banner');
var prevBtn = document.getElementById('prevBtn');
var nextBtn = document.getElementById('nextBtn');
if (banner) {
    banner.style.transition = `opacity ${TRANSITION_MS}ms ease`;
    banner.style.opacity = '1';
}
var isSwitching = false;
function animateButton(btn) {
    if (!btn) return;
    btn.classList.add('nav-anim');
    setTimeout(() => btn.classList.remove('nav-anim'), 180);
}
// Adiciona mapeamento de dados por imagem
var produtos = {
    "imagens/aulaf75.webp": {
        title: "Teclado AULA X EPOMAKER F75",
        price: "R$ 149,00",
        desc: "Teclado mecânico compacto 75%, switches táteis, iluminação RGB e construção em alumínio.",
        url: "aulaf75.html"
    },
    "imagens/g305.webp": {
        title: "Mouse Logitech G305",
        price: "R$ 89,00",
        desc: "Mouse sem fio para jogos com sensor HERO, alta precisão e bateria de longa duração.",
        url: "g305.html"
    },
    "imagens/g733.webp": {
        title: "Fone Logitech G733",
        price: "R$ 199,00",
        desc: "Fone sem fio leve com iluminação RGB, som imersivo e microfone removível.",
        url: "g733.html"
    }
};

function mostrarImagem() {
    if (!banner) return;
    var proxima = imagens[indice];
    if (banner.dataset.target === proxima) return;
    banner.dataset.target = proxima;
    if (banner._onFade) {
        banner.removeEventListener('transitionend', banner._onFade);
        banner._onFade = null;
    }
    const onTransitionEnd = (e) => {
        if (e.propertyName !== 'opacity') return;
        banner.removeEventListener('transitionend', onTransitionEnd);
        banner._onFade = null;
        banner.src = proxima;
        // atualiza dados do produto quando a imagem muda
        var info = produtos[proxima] || {};
        var elTitle = document.getElementById('banner_title');
        var elPrice = document.getElementById('banner_price');
        var elDesc = document.getElementById('banner_desc');
        var elBtn = document.getElementById('banner_view');
        if (elTitle) elTitle.textContent = info.title || "";
        if (elPrice) elPrice.textContent = info.price || "";
        if (elDesc) elDesc.textContent = info.desc || "";
        if (elBtn) {
            elBtn.onclick = () => { if (info.url) location.href = info.url; };
        }
        // define click direto na imagem
        banner.onclick = () => { if (info.url) location.href = info.url; };
        requestAnimationFrame(() => requestAnimationFrame(() => banner.style.opacity = '1'));
    };
    banner._onFade = onTransitionEnd;
    banner.addEventListener('transitionend', onTransitionEnd);
    banner.style.opacity = '0';
    setTimeout(() => { isSwitching = false; }, TRANSITION_MS * 2 + 60);
}
function nextImage() {
    if (isSwitching) return;
    isSwitching = true;
    animateButton(nextBtn);
    indice = (indice + 1) % imagens.length;
    mostrarImagem();
}
function prevImage() {
    if (isSwitching) return;
    isSwitching = true;
    animateButton(prevBtn);
    indice = (indice - 1 + imagens.length) % imagens.length;
    mostrarImagem();
}
if (nextBtn) nextBtn.addEventListener('click', nextImage);
if (prevBtn) prevBtn.addEventListener('click', prevImage);

// Inicializa área de info com a primeira imagem ao carregar
document.addEventListener('DOMContentLoaded', function() {
    // garante que banner existe e que o src inicial esteja sincronizado com o índice
    if (banner) {
        // se o src atual é diferente do mapeado pelo índice, sincroniza
        banner.src = imagens[indice];
        mostrarImagem();
    }
});