function ligar(luz){
	document.getElementById(luz).src = '../img/Lon.png';  
    sendToAPI(Math.random() * (100 - 1) + 1)     
}

function apagar(luz){
    document.getElementById(luz).src = '../img/Loff.png';
    sendToAPI(Math.random() * (100 - 1) + 1)
}

function blink(luz){
    var inter = 0;
    var cont = 0;

    const intervalo  = setInterval(() => {
        if(cont%2 == 0 && cont < 10){
            ligar(luz)
            cont++
        } else if(cont < 10){
            apagar(luz)
            cont++
        } else{
            clearInterval(intervalo)
        }
    }, 500);

}

    function sendToAPI(state){

        //criar um objeto capaz de enviar dados via requisição HTTP GET
        const http = new XMLHttpRequest();
        //prepara um GET passando a váriavel lux como ultimo paramentro do link
        http.open("GET", "https://api.thingspeak.com/update?api_key=1959VTH4L01SLPC4&field1="+state);
        //envia um GET
        http.send();
        //quando a requisição retornar ele chama o console e imprime o valor gerado
        http.onload = console.log(http.responseText+" "+state)
    }


