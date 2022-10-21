(function () {
    "use strict"

    let jogadores, currentJogador, tabuleiro;
    let tabuleiroContainer = $(".tabuleiroContainer");
    let table;

    iniciarJogo();

    function iniciarJogo() {
        jogadores = [
            new Jogador("Humano", 0, false),
            new Jogador("IA", 1, true)
        ];
        currentJogador = 0;
        tabuleiro = new Tabuleiro(jogadores);
        renderTabuleiro(tabuleiro.tabuleiro);
    }

    function renderTabuleiro(tabuleiro) {
        if(table) {
            for (let y = 0; y < tabuleiro.length; ++y) {
                for (let x = 0; x < tabuleiro.length; ++x) {
                    let peca = tabuleiro[x][y] ? tabuleiro[x][y] : "";
                    let td = $("#"+x+y).attr('class', "square "+peca);
                }
            }
        } else {
            tabuleiroContainer.empty();

            table = "<table class='tabuleiro'>";
            for (let y = 0; y < tabuleiro.length; ++y) {
                table += '<tr>';
                for (let x = 0; x < tabuleiro.length; ++x) {
                    let peca = tabuleiro[x][y] ? tabuleiro[x][y] : "";
    
                    table += '<td class="square '+peca+'" id=' + x + y + '><div></div></td>';
                }
            }
            table += " </table>";
            tabuleiroContainer.append(table);
            algumClick();
        }
        
        $(".turn").html("Vez do jogador " + jogadores[currentJogador].nome);
        $("#score1").text(jogadores[0].qtdPecas);
        $("#score2").text(jogadores[1].qtdPecas);
        $(".winner").hide();
    }

    function algumClick() {
        $('.tabuleiro .square').click(function () {
            if(currentJogador !== 0) {
                return;
            }

            let $this = $(this);
            let x = parseInt($this.attr('id').charAt(0));
            let y = parseInt($this.attr('id').charAt(1));

            movimentoProcesso(x, y);
        });
    }

    function movimentoProcesso(x, y) {
        let valido = tabuleiro.movimentoValido(x, y, currentJogador)

        if(valido) {
            let outroJogador = currentJogador === 0 ? 1 : 0;
            tabuleiro.flip(x, y, currentJogador);
            renderTabuleiro(tabuleiro.tabuleiro);

            currentJogador = outroJogador;

            let avaliarMovimento = tabuleiro.pegarTodosMovimentoValidos(currentJogador);
            if(!avaliarMovimento.length) {
                let avaliarMovimentoProximoJogador = tabuleiro.pegarTodosMovimentoValidos(currentJogador ? 0 : 1);

                if(!avaliarMovimentoProximoJogador.length) {
                    finalizarJogo();
                    return;
                } else {
                    let semJogadasDisponiveis = jogadores[currentJogador].nome;
                    setTimeout(function(){
                        alert("Jogador " + semJogadasDisponiveis + " não tem jogadas disponíveis, passando a vez...");
                    }, 1000);
                    currentJogador = currentJogador ? 0 : 1;
                }
            }

            $(".turn").html("Vez do jogador " + jogadores[currentJogador].nome);

            if(jogadores[currentJogador].isIa) {
                setTimeout(function(){
                    let t0 = performance.now()
                    let move = jogadores[currentJogador].pegarMovimento(tabuleiro);
                    let t1 = performance.now()
                    console.log("IA process time " + (t1 - t0) + " milliseconds.");

                    movimentoProcesso(move.x, move.y);
                }, 3000);
            }
        }
    }

    function finalizarJogo() {
        let mensagemVitoria;

        if(jogadores[0].qtdPecas > jogadores[1].qtdPecas) {
            mensagemVitoria = "O vencedor foi o jogador " + jogadores[0].nome + "!";
        } else if(jogadores[1].qtdPecas > jogadores[0].qtdPecas) {
            mensagemVitoria = "O vencedor foi o jogador " + jogadores[1].nome + "!";
        } else {
            mensagemVitoria = "O jogo terminou empatado."
        }

        $(".winner").show();
        $(".winner").html(mensagemVitoria);
    }
    
    $("#restartButton").click(function () {
        iniciarJogo();
    });
})();