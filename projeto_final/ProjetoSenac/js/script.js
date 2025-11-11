var imagens = [
    "imagens/aulaf75.webp",
    "imagens/g305.webp",
    "imagens/g733.webp",
];

var indice = 0;

var banner = document.getElementById('banner');

function monstrarImagens () {
    banner.src = imagens[indice];
}

function Next() {
    //Incrementa o indice
    indice++;
    if(indice >= imagens.length) {
        indice = 0;
    }
    monstrarImagens();
}

function Return() {
    //Decrementa o indice
    indice--;
    if(indice < 0) {
        indice = imagens.length - 1;
    }
    monstrarImagens();
}