//INICIALIZA O JOGADOR COM NOME, NUMERO, SE É UMA IA E QTDEPECAS
function Jogador(nome, numero, isIa, qtdpecas) {
    this.nome = nome;
    this.numero = numero;
    this.isIa = isIa;
    this.cor = numero === 0 ? "black" : "white";
    this.qtdpecas = qtdpecas ? qtdpecas : 2;

    if(this.isIa){
        this.IA = new IA(this.numero);
    }
}

//pegando movimento
Jogador.prototype.getMovimento = function(tabuleiro) {
    return this.IA.move(tabuleiro);
}

