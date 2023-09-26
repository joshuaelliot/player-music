const audio = new Audio("https://archive.org/download/stories_20220331/03%2C%20Touch%20me.mp3") ;

const input = document.createElement("input");
const playBoton = document.createElement("button");
playBoton.textContent = "play Music";
const musicDuration = document.createElement("span");
const musicTime= document.createElement("span");
const root= document.getElementById("container");
let reproduce = true;

input.type = "range";
input.value = "0";
input.max = undefined;

playBoton.addEventListener("click",()=>{
    console.log(audio.currentTime);
    if(audio.paused){
        audio.play();
    }else{
        audio.pause();
    }
});
root.appendChild(playBoton);
root.appendChild(musicDuration);
root.appendChild(input);
root.appendChild(musicTime);

audio.addEventListener("loadedmetadata",()=>{
    const durationMusic = Math.floor(audio.duration);
    
    input.max = durationMusic;
    musicDuration.textContent = parseMinutes(parseInt(input.value));
    musicTime.textContent = parseMinutes(durationMusic)
})
audio.addEventListener("timeupdate",()=>{
    let currentTimeMusic = Math.floor(audio.currentTime);
    let inputTimeMusic = Math.floor(input.value);
    if(inputTimeMusic < currentTimeMusic || parseInt(input.max) == currentTimeMusic){
        input.value = currentTimeMusic.toString();
        musicDuration.textContent = parseMinutes(parseInt(input.value));
        console.log("cambio a : ", input.value);
    }
    
})
function parseMinutes (tiempo){
    let minutos= Math.floor(tiempo / 60);
    let segundos = tiempo - (minutos * 60 ) ;
    let segundosFormateados = segundos.toString().padStart(2, '0');
    let displayTiempo = `${minutos}:${segundosFormateados}`;

    return displayTiempo;
}


const mitadCancion = document.createElement("button");
mitadCancion.textContent= "retorcede"

/*
input.addEventListener("click",()=>{
    let valor = 10
    audio.pause();
    audio.currentTime = input.value ;
    //input.value = valor.toString();
    musicDuration.textContent = parseMinutes(parseInt(input.value));
    audio.play();
});*/

input.addEventListener("input",(e)=>{
    audio.pause();
    audio.currentTime = e.target.value ;
    musicDuration.textContent = parseMinutes(parseInt(e.target.value));
    console.log(e.target.value);
});
input.addEventListener("mouseup",()=>{
    audio.play();
    console.log("ola");
})

root.appendChild(mitadCancion);