function IA(currentJogador) {
    this.currentJogador = currentJogador;
    this.profundidadeMaxima = 5;
}
  
IA.prototype.mover = function(tabuleiro) {
    this.visitas = 0;
    let resultado = this.minimax(tabuleiro, 0, this.currentJogador, this.profundidadeMaxima, -100000, 100000);
    console.log("Total nodes: " + this.visitas);
    return resultado;
}

IA.prototype.minimax = function(tabuleiro, profundidade, currentJogador, profundidadeMaxima, alpha, beta) {
    this.visitas++;
    let novoTabuleiro, score, move;
    let melhoresMovimentos;
    let moves = tabuleiro.pegarTodosMovimentoValidos(currentJogador);

   
    if(profundidade >= profundidadeMaxima || moves.length === 0){
        let he = this.mobilidade(tabuleiro, currentJogador);
        return he;
    }
    if(currentJogador === this.currentJogador){
        // Maximize
        for (let i = moves.length - 1; i >= 0; i--) {
            move = moves[i];
            novoTabuleiro = tabuleiro.copiar();
            this.fazerMovimento(novoTabuleiro, move, currentJogador);
            score = this.minimax(novoTabuleiro, (profundidade + 1), (currentJogador ? 0 : 1), profundidadeMaxima, alpha, beta);
            move.score = score;
            if(score > alpha){
                alpha = score;
                melhoresMovimentos = move;
                
            }
            if(beta <= alpha){
                break;
            }
        }
        if(profundidade === 0){
            return melhoresMovimentos;
        } else {
            return alpha;
        }
    } else {
        // Minimize
        let min = 100000;
        for (let i = moves.length - 1; i >= 0; i--) {
            move = moves[i];
            novoTabuleiro = tabuleiro.copiar();
            this.fazerMovimento(novoTabuleiro, move, currentJogador);
            score = this.minimax(novoTabuleiro, (profundidade + 1), (currentJogador ? 0 : 1), profundidadeMaxima, alpha, beta);
            if(score < beta){
                beta = score;
            }
            if(beta <= alpha){
                break;
            }
        }
        return beta;
    }
}

IA.prototype.fazerMovimento = function(tabuleiro, move, currentJogador) {
    tabuleiro.flip(move.x, move.y, currentJogador);
}

IA.prototype.mobilidade = function(tabuleiro, currentJogador) {
    let aiMoves = tabuleiro.pegarTodosMovimentoValidos(currentJogador).length;
    let oppMoves = tabuleiro.pegarTodosMovimentoValidos(currentJogador ? 0 : 1).length;
    return Math.ceil((oppMoves + aiMoves) === 0 ? 0 : 100 * ((aiMoves - oppMoves)/(aiMoves + oppMoves)));
}
  