/*
Aqui ocorre o funcionamento da Inteligência Artifical, utilizamos o algoritmo de busca minmax.
Podendo ser encontrato explicações no seguinte site: 
https://www.javatpoint.com/mini-max-algorithm-in-ai
*/

// Inicializa recebendo um jogador atual. 
function IA(jogadorAtual) {
    this.jogadorAtual = jogadorAtual;
    this.profundidadeMax = 5; // Para o algoritmo minmax
}

//Fazendo o movimento chamando a funcao flip 
IA.prototype.fazerMovimento = function(tabuleiro, move, jogadorAtual) {
    tabuleiro.flip(move.x, move.y, jogadorAtual);
}


//Mobilidade no tabuleiro
IA.prototype.mobilidade = function(tabuleiro, jogadorAtual) {
    let aiMoves = tabuleiro.getMovimentosValidos(jogadorAtual).length;
    let oppMoves = tabuleiro.getMovimentosValidos(jogadorAtual ? 0 : 1).length;
    return Math.ceil((oppMoves + aiMoves) === 0 ? 0 : 100 * ((aiMoves - oppMoves)/(aiMoves + oppMoves)));
}
  
  
//MOVENDO PECA 
IA.prototype.move = function(tabuleiro) {
    this.visitas = 0;
    let res = this.minimax(tabuleiro, 0, this.jogadorAtual, this.profundidadeMax, -100000, 100000);
    return res;
}

// ALGORITMO MINIMAX ESSENCIAL PARA O FUNCIONAMENTO DA IA 
IA.prototype.minimax = function(tabuleiro, profundidade, jogadorAtual, profundidadeMax, alpha, beta) {
    this.visitas++; 
    let novoTabuleiro;
    let pontos, move;
    let melhorMovimento;
    let moves = tabuleiro.getMovimentosValidos(jogadorAtual);
    
    if(profundidade >= profundidadeMax || moves.length === 0){
        let he = this.mobilidade(tabuleiro, jogadorAtual);
        return he;
    }
    if(jogadorAtual === this.jogadorAtual){
        // MAXIMIZE
        for (let i = moves.length - 1; i >= 0; i--) {
            move = moves[i];
            novoTabuleiro = tabuleiro.copiar();
            this.fazerMovimento(novoTabuleiro, move, jogadorAtual);
            pontos = this.minimax(novoTabuleiro, (profundidade + 1), (jogadorAtual ? 0 : 1), profundidadeMax, alpha, beta);
            move.pontos = pontos;
            if(pontos > alpha){
                alpha = pontos;
                melhorMovimento = move;
                
            }
            if(beta <= alpha){
                break;
            }
        }
        if(profundidade === 0){
            return melhorMovimento;
        } else {
            return alpha;
        }
    } else {
        // MINIMIZE
        for (let i = moves.length - 1; i >= 0; i--) {
            move = moves[i];
            novoTabuleiro = tabuleiro.copiar();
            this.fazerMovimento(novoTabuleiro, move, jogadorAtual);
            pontos = this.minimax(novoTabuleiro, (profundidade + 1), (jogadorAtual ? 0 : 1), profundidadeMax, alpha, beta);
            if(pontos < beta){
                beta = pontos;
            }
            if(beta <= alpha){
                break;
            }
        }
        return beta;
    }
}
