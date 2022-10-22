let nomeDoJogador;
function comecar(){
    nomeDoJogador = document.getElementById("formNome").value;
    if(nomeDoJogador === ""){
        alert("DIGITE UM NOME" + nomeDoJogador);
    } else {
        document.getElementById("nome").style.display = 'none';
        document.getElementById("iniciarJogo").style.display = 'block';
        $("#nomeDoJogador").text(nomeDoJogador);
    
    (function () {
        

        let jogadores, jogadorAtual, tabuleiro;
        let tabuleiroContainer = $(".tabuleiroContainer");
        let table;

        
        iniciarJogo();

        function iniciarJogo() {
            jogadores = [
                new Jogador(nomeDoJogador, 0, false),
                new Jogador("IA", 1, true)
            ];
            jogadorAtual = 0;
            tabuleiro = new Tabuleiro(jogadores);
            rendertabuleiro(tabuleiro.tabuleiro);
        }

        function rendertabuleiro(tabuleiro) {
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
                obterClicks();
            }
            
            $(".turn").html("Vamoos! É A vez do jogador " + jogadores[jogadorAtual].nome+ " <b>MANDAR VERRR!<b>");
            $("#pontos1").text(jogadores[0].qtdpecas);
            $("#pontos2").text(jogadores[1].qtdpecas);
            $(".winner").hide();
            
            
        }

        function obterClicks() {
            $('.tabuleiro .square').click(function () {
                if(jogadorAtual !== 0) {
                    return;
                }

                let $this = $(this);
                let x = parseInt($this.attr('id').charAt(0));
                let y = parseInt($this.attr('id').charAt(1));

                processoMovimento(x, y);
            });
            
        }

        function processoMovimento(x, y) {
            let valid = tabuleiro.validMove(x, y, jogadorAtual)

            if(valid) {
                let outroJogador = jogadorAtual === 0 ? 1 : 0;
                tabuleiro.flip(x, y, jogadorAtual);
                rendertabuleiro(tabuleiro.tabuleiro);

                jogadorAtual = outroJogador;

                let avaliarMovimentos = tabuleiro.getMovimentosValidos(jogadorAtual);
                if(!avaliarMovimentos.length) {
                    let avaliarMovimentoProxJogador = tabuleiro.getMovimentosValidos(jogadorAtual ? 0 : 1);

                    if(!avaliarMovimentoProxJogador.length) {
                        finalizarJogo();
                        return;
                    } else {
                        let jogadorSemVez = jogadores[jogadorAtual].nome;
                        setTimeout(function(){
                            alert("Vixe, o jogador " + jogadorSemVez + " não tem jogadas disponíveis, se ferrou, passando a vez...");
                        }, 1000);
                        jogadorAtual = jogadorAtual ? 0 : 1;
                    }
                }

                $(".turn").html("Vez do jogador " + jogadores[jogadorAtual].nome);

                if(jogadores[jogadorAtual].isIa) {
                    setTimeout(function(){
                        let move = jogadores[jogadorAtual].getMovimento(tabuleiro);
                        processoMovimento(move.x, move.y);
                    }, 3000);
                }
            }
            
        }

        function finalizarJogo() {
            let mensagemDeVitoria;

            if(jogadores[0].qtdpecas > jogadores[1].qtdpecas) {
                mensagemDeVitoria = "Booooa! O vencedor foi o jogador " + jogadores[0].nome + "!";
            } else if(jogadores[1].qtdpecas > jogadores[0].qtdpecas) {
                mensagemDeVitoria = "Booooa! O vencedor foi o jogador " + jogadores[1].nome + "!";
            } else {
                mensagemDeVitoria = "VIXE, EMPATOU =/"
            }

            $(".winner").show();
            $(".winner").html(mensagemDeVitoria);
        }
        
        $("#restartButton").click(function () {
            iniciarJogo();
        });
    })();
    }
}