const linha0 = document.getElementById('linha0')
const linha1 = document.getElementById('linha1')

function mudar(luz){
	document.getElementById(luz).src = 'img/Lon.png';           
}

function apagar(luz){
    document.getElementById(luz).src = 'img/Loff.png';
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