//Mostrando as regras quando o botão for selecionado 
function mostrarDiv(el, trueOrFalse) {
    let display = document.getElementById(el).style.display; 
    if(trueOrFalse === true){
        document.getElementById(el).style.display = 'block';
    } else{ 
        document.getElementById(el).style.display = 'none';
    }
}

