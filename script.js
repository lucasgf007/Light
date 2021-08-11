const linha0 = document.getElementById('linha0')
const linha1 = document.getElementById('linha1')

function mudar(luz){
	document.getElementById(luz).src = 'img/Lon.png';           
}

function apagar(luz){
    document.getElementById(luz).src = 'img/Loff.png';
}

function blink(){
    var inter = 0;
    var cont = 0;
    while(cont < 10){
        inter += 300;
        setTimeout("document.getElementById().src = 'img/Lon.png';", inter);
        inter += 300;
        setTimeout("document.getElementById().src = 'img/Loff.png';", inter);

        cont++;
    }
}

    function sendToAPI(state){

        var KEY = "1959VTH4L01SLPC4";
        //criar um objeto capaz de enviar dados via requisição HTTP GET
        const http = new XMLHttpRequest();
        //prepara um GET passando a váriavel lux como ultimo paramentro do link
        http.open("GET", "https://api.thingspeak.com/update?api_key="+ KEY +" &field1 =0"+state);
        //envia um GET
        http.send();
        //quando a requisição retornar ele chama o console e imprime o valor gerado
        http.onload = console.log(http.responseText+" "+state)
    }

function colocarLampadas(){   
    for(let i=0; i<6 ; i++){
        if(i<3){
            linha0.innerHTML += `
        <div class="col-sm">
            <img id="luz${i}" class="luz" src="img/Loff.png" alt="luz">
            <br>
            <button type="button" class="btn btn-warning" onclick="mudar('luz${i}')">Liga</button>
            <button type="button" class="btn btn-danger" onclick="apagar('luz${i}')">Desliga</button>
            

        </div>
        `
        }else{
            linha1.innerHTML += `
        <div class="col-sm">
            <img id="luz${i}" class="luz" src="img/Loff.png" alt="luz">
            <br>
            <button type="button" class="btn btn-warning" onclick="mudar('luz${i}')">Liga</button>
            <button type="button" class="btn btn-danger" onclick="apagar('luz${i}')">Desliga</button>
            
        </div>
        `}
    }
}
colocarLampadas()