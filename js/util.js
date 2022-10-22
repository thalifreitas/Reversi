//Mostrando as regras quando o botão for selecionado 
function mostrarDiv(regras, trueOrFalse, info) {
    let display = document.getElementById(regras).style.display; 
    if(trueOrFalse === true){
        document.getElementById(regras).style.display = 'block';
        document.getElementById(info).style.display = 'none';
    } else{ 
        document.getElementById(regras).style.display = 'none';
        document.getElementById(info).style.display = 'block';
    }

}




