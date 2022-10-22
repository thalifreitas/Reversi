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

Tabuleiro.prototype.searchUp = function(x, y, jogador) {
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

Tabuleiro.prototype.procurarBa = function(x, y, jogador) {
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

Tabuleiro.prototype.procurarDiagonalEsquerdaAlto = function(x, y, jogador) {
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

Tabuleiro.prototype.procurarDiagonalDireitaAlto = function(x, y, jogador) {
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

Tabuleiro.prototype.procurarDiagonalEsquerdaBaixo = function(x, y, jogador) {
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

Tabuleiro.prototype.procurarDiagonalDiretaBaixo = function(x, y, jogador) {
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

Tabuleiro.prototype.getPecasOponentes = function(x, y, jogador) {
    let pecas = [];

    if(this.tabuleiro[x][y]) {
        return [];
    }

    let up = this.searchUp(x, y, jogador);
    pecas = pecas.concat(up ? up : []);
    let down = this.procurarBa(x, y, jogador);
    pecas = pecas.concat(down ? down : []);
    let left = this.procurarEsquerda(x, y, jogador);
    pecas = pecas.concat(left ? left : []);
    let right = this.procurarDireita(x, y, jogador);
    pecas = pecas.concat(right ? right : []);
    let upLeft = this.procurarDiagonalEsquerdaAlto(x, y, jogador);
    pecas = pecas.concat(upLeft ? upLeft : []);
    let downLeft = this.procurarDiagonalEsquerdaBaixo(x, y, jogador);
    pecas = pecas.concat(downLeft ? downLeft : []);
    let upRight = this.procurarDiagonalDireitaAlto(x, y, jogador);
    pecas = pecas.concat(upRight ? upRight : []);
    let downRight = this.procurarDiagonalDiretaBaixo(x, y, jogador);
    pecas = pecas.concat(downRight ? downRight : []);
    
    return pecas;
}

Tabuleiro.prototype.copiar = function() {
    let tempjogadores = [];
    for (let i = this.jogadores.length - 1; i >= 0; i--) {
      tempjogadores[i] = new Jogador(this.jogadores[i].nome, this.jogadores[i].numero, this.jogadores[i].isIa, this.jogadores[i].qtdpecas);
    };

    let temptabuleiro = [];
    for (let i = 0; i < this.tabuleiro.length; i++) {
        temptabuleiro[i] = this.tabuleiro[i].slice();
    }
    
    return new Tabuleiro(tempjogadores, temptabuleiro);
  }

Tabuleiro.prototype.validMove = function(x, y, jogadorAtual) {
    let jogador = this.getJogador(jogadorAtual);

    return this.getPecasOponentes(x, y, jogador).length !== 0;
}

Tabuleiro.prototype.getMovimentosValidos = function(jogadorAtual) {
    let validMoves = [];

    for (let x = 0; x < this.tamanho; x++) {
        for (let y = 0; y < this.tamanho; y++) {
            if(this.validMove(x, y, jogadorAtual)) {
                validMoves.push({x: x, y: y});
            }
        }
    }

    return validMoves;
}

Tabuleiro.prototype.flip = function(x, y, jogadorAtual) {
    let jogador = this.getJogador(jogadorAtual);
    let outroJogador = this.getJogador(jogadorAtual, true);

    let pecas = this.getPecasOponentes(x, y, jogador)

    for (let i = 0; i < pecas.length; i++) {
        let piece = pecas[i];

        this.tabuleiro[piece.x][piece.y] = jogador.cor;
    }
    this.tabuleiro[x][y] = jogador.cor;

    jogador.qtdpecas += pecas.length + 1;
    outroJogador.qtdpecas -= pecas.length;
}

Tabuleiro.prototype.getJogador = function(jogadorAtual, opp) {
    let jogador;

    if(!opp) {
        jogador = this.jogadores[jogadorAtual]
    } else {
        jogador = this.jogadores[jogadorAtual ? 0 : 1]
    }

    return jogador;
}