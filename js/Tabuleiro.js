function Tabuleiro(jogadores, tabuleiroExistente) {
    this.tamanho = 8;
    this.jogadores = jogadores;
  
    this.gerarTabuleiro();
    this.iniciarTabuleiro(tabuleiroExistente);
}

Tabuleiro.prototype.gerarTabuleiro = function() {
    let tabuleiro = [];
    for (let x = 0; x < this.tamanho; x++) {
        tabuleiro[x] = [];
        for (let y = 0; y < this.tamanho; y++) {
            tabuleiro[x][y] = null;
        }
    }
    this.tabuleiro = tabuleiro;
}

Tabuleiro.prototype.iniciarTabuleiro = function(tabuleiroExistente) {
    if(tabuleiroExistente) {
        this.tabuleiro = tabuleiroExistente;
    } else {
        let floor = Math.round((this.tamanho/2)-1);
        let round =  Math.round((this.tamanho/2));

        this.tabuleiro[floor][floor] = this.jogadores[0].cor;
        this.tabuleiro[round][round] = this.jogadores[0].cor;
        this.tabuleiro[round][floor] = this.jogadores[1].cor;
        this.tabuleiro[floor][round] = this.jogadores[1].cor;
    }
}

Tabuleiro.prototype.procurarEmCima = function(x, y, jogador) {
    let pecas = [];

    y--;
    while(y >= 0){
        if(!this.tabuleiro[x][y]){
            return false;
        }
        if(this.tabuleiro[x][y] === jogador.cor){
            if(pecas.length === 0){
                return false;
            } else {
                return pecas;
            }
        }
        pecas.push({x: x, y: y});
        y--;
    }

    return [];
}

Tabuleiro.prototype.procurarEmBaixo = function(x, y, jogador) {
    let pecas = [];

    y++;
    while(y < this.tamanho){
        if(!this.tabuleiro[x][y]){
            return false;
        }
        if(this.tabuleiro[x][y] === jogador.cor){
            if(pecas.length === 0){
                return false;
            } else {
                //console.log("currentSquare", x, y, initialX, initialY, this.tabuleiro[x][y]);
                return pecas;
            }
        }
        pecas.push({x: x, y: y});
        y++;
    }
    
    return [];
}

Tabuleiro.prototype.procurarEsquerda = function(x, y, jogador) {
    let pecas = [];

    x--;
    while(x >= 0){
        if(!this.tabuleiro[x][y]){
            return false;
        }
        if(this.tabuleiro[x][y] === jogador.cor){
            if(pecas.length === 0){
                return false;
            } else {
                return pecas;
            }
        }
        pecas.push({x: x, y: y});
        x--;
    }

    return [];
}

Tabuleiro.prototype.procurarDireita = function(x, y, jogador) {
    let pecas = [];

    x++;
    while(x < this.tamanho){
        if(!this.tabuleiro[x][y]){
            return false;
        }
        if(this.tabuleiro[x][y] === jogador.cor){
            if(pecas.length === 0){
                return false;
            } else {
                return pecas;
            }
        }
        pecas.push({x: x, y: y});
        x++;
    }

    return [];
}

Tabuleiro.prototype.procurarDiagonalEsquerdaEmCima = function(x, y, jogador) {
    let pecas = [];

    x--;
    y--;
    while(x >= 0 && y >= 0){
        if(!this.tabuleiro[x][y]){
            return false;
        }
        if(this.tabuleiro[x][y] === jogador.cor){
            if(pecas.length === 0){
                return false;
            } else {
                return pecas;
            }
        }
        pecas.push({x: x, y: y});
        x--;
        y--;
    }

    return [];
}

Tabuleiro.prototype.procurarDiagonalDireitaEmCima = function(x, y, jogador) {
    let pecas = [];

    x++;
    y--;
    while(x < this.tamanho && y >= 0){
        if(!this.tabuleiro[x][y]){
            return false;
        }
        if(this.tabuleiro[x][y] === jogador.cor){
            if(pecas.length === 0){
                return false;
            } else {
                return pecas;
            }
        }
        pecas.push({x: x, y: y});
        x++;
        y--;
    }

    return [];
}

Tabuleiro.prototype.procurarDiagonalEsquerdaEmBaixo = function(x, y, jogador) {
    let pecas = [];

    x--;
    y++;
    while(x >= 0 && y < this.tamanho){
        if(!this.tabuleiro[x][y]){
            return false;
        }
        if(this.tabuleiro[x][y] === jogador.cor){
            if(pecas.length === 0){
                return false;
            } else {
                return pecas;
            }
        }
        pecas.push({x: x, y: y});
        x--;
        y++;
    }

    return [];
}

Tabuleiro.prototype.procurarDiagonalDireitaEmBaixo = function(x, y, jogador) {
    let pecas = [];

    x++;
    y++;
    while(x < this.tamanho && y < this.tamanho){
        if(!this.tabuleiro[x][y]){
            return false;
        }
        if(this.tabuleiro[x][y] === jogador.cor){
            if(pecas.length === 0){
                return false;
            } else {
                return pecas;
            }
        }
        pecas.push({x: x, y: y});
        x++;
        y++;
    }

    return [];
}

Tabuleiro.prototype.pegarPecasDoOponente = function(x, y, jogador) {
    let pecas = [];

    if(this.tabuleiro[x][y]) {
        return [];
    }

    let up = this.procurarEmCima(x, y, jogador);
    pecas = pecas.concat(up ? up : []);

    let down = this.procurarEmBaixo(x, y, jogador);
    pecas = pecas.concat(down ? down : []);

    let left = this.procurarEsquerda(x, y, jogador);
    pecas = pecas.concat(left ? left : []);

    let right = this.procurarDireita(x, y, jogador);
    pecas = pecas.concat(right ? right : []);

    let upLeft = this.procurarDiagonalEsquerdaEmCima(x, y, jogador);
    pecas = pecas.concat(upLeft ? upLeft : []);

    let downLeft = this.procurarDiagonalEsquerdaEmBaixo(x, y, jogador);
    pecas = pecas.concat(downLeft ? downLeft : []);

    let upRight = this.procurarDiagonalDireitaEmCima(x, y, jogador);
    pecas = pecas.concat(upRight ? upRight : []);

    let downRight = this.procurarDiagonalDireitaEmBaixo(x, y, jogador);
    pecas = pecas.concat(downRight ? downRight : []);
    
    return pecas;
}

Tabuleiro.prototype.copiar = function() {
    let tempJogadores = [];
    for (let i = this.jogadores.length - 1; i >= 0; i--) {
      tempJogadores[i] = new Jogador(this.jogadores[i].nome, this.jogadores[i].numero, this.jogadores[i].isIa, this.jogadores[i].qtdPecas);
    };

    let tempTabuleiro = [];
    for (let i = 0; i < this.tabuleiro.length; i++) {
        tempTabuleiro[i] = this.tabuleiro[i].slice();
    }
    
    return new Tabuleiro(tempJogadores, tempTabuleiro);
  }

Tabuleiro.prototype.movimentoValido = function(x, y, currentJogador) {
    let jogador = this.pegarJogador(currentJogador);

    return this.pegarPecasDoOponente(x, y, jogador).length !== 0;
}

Tabuleiro.prototype.pegarTodosMovimentoValidos = function(currentJogador) {
    let movimentoValidos = [];

    for (let x = 0; x < this.tamanho; x++) {
        for (let y = 0; y < this.tamanho; y++) {
            if(this.movimentoValido(x, y, currentJogador)) {
                movimentoValidos.push({x: x, y: y});
            }
        }
    }

    return movimentoValidos;
}

Tabuleiro.prototype.flip = function(x, y, currentJogador) {
    let jogador = this.pegarJogador(currentJogador);
    let outroJogador = this.pegarJogador(currentJogador, true);

    let pecas = this.pegarPecasDoOponente(x, y, jogador)

    for (let i = 0; i < pecas.length; i++) {
        let peca = pecas[i];

        this.tabuleiro[peca.x][peca.y] = jogador.cor;
    }
    this.tabuleiro[x][y] = jogador.cor;

    jogador.qtdpecas += pecas.length + 1;
    outroJogador.qtdpecas -= pecas.length;
}

Tabuleiro.prototype.pegarJogador = function(currentJogador, opp) {
    let jogador;

    if(!opp) {
        jogador = this.jogadores[currentJogador]
    } else {
        jogador = this.jogadores[currentJogador ? 0 : 1]
    }

    return jogador;
}