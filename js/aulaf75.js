var imagens = [
    "imagens/aulaf75.webp",
    "imagens/aulaf75_glacial.webp",
    "imagens/aulaf75_cedar_green.webp",
    "imagens/aulaf75_preto.webp",
    "imagens/aulaf75_pro.webp"
];
var descricoes = [
    { title: "Teclado Aula F75", text: "Teclado mecânico compacto, switches hot-swap e iluminação RGB.", price: "R$ 249,00" },
    { title: "Aula F75 Glacial", text: "Edição Glacial com acabamento especial.", price: "R$ 259,00" },
    { title: "Aula F75 Cedar Green", text: "Cor Cedar Green, switch igual.", price: "R$ 259,00" },
    { title: "Aula F75 Preto", text: "Versão clássica preta.", price: "R$ 249,00" },
    { title: "Aula F75 Pro", text: "Versão Pro com features extras.", price: "R$ 699,00" }
];
var indice = 0;
var TRANSITION_MS = 150;
var banner = document.getElementById('banner_produto');
var prevBtn = document.getElementById('button-retorno');
var nextBtn = document.getElementById('button-avanco');
var bannerTitle = document.getElementById('banner-title') || null;
var bannerText = document.getElementById('banner-text') || null;
var bannerPrice = document.getElementById('banner-price') || null;
if (banner) {
    banner.style.transition = `opacity ${TRANSITION_MS}ms ease`;
    banner.style.opacity = '1';
}
// inicializa descrição junto com a imagem atual
function atualizarDescricao() {
    if (bannerTitle) bannerTitle.textContent = descricoes[indice].title || "";
    if (bannerText) bannerText.textContent = descricoes[indice].text || "";
    if (bannerPrice) bannerPrice.textContent = descricoes[indice].price || "";
}
atualizarDescricao();
var isSwitching = false;
function animateButton(btn) {
    if (!btn) return;
    btn.classList.add('nav-anim');
    setTimeout(() => btn.classList.remove('nav-anim'), 180);
}
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
        // atualiza a descrição quando a imagem for trocada
        atualizarDescricao();
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
function adicionar_carrinho() {
    alert("Produto adicionado ao carrinho!");
}
if (nextBtn) nextBtn.addEventListener('click', nextImage);
if (prevBtn) prevBtn.addEventListener('click', prevImage);
