function Jogador(nome, numero, isIa, qtdPecas) {
    this.nome = nome;
    this.numero = numero;
    this.isIa = isIa;
    this.cor = numero === 0 ? "black" : "white";
    this.qtdPecas = qtdPecas ? qtdPecas : 2;

    if(this.isIa){
        this.IA = new IA(this.numero);
    }
}

Jogador.prototype.pegarMovimento = function(tabuleiro) {
    return this.IA.mover(tabuleiro);
}