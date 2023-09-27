import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import { Slider } from './slider';
import { Play } from './botones/play';
import { Pause } from './botones/pause'
import { Prev } from './botones/prev';
import { Next } from './botones/next';
import './App.css'
import "./style/styleBotones/controls.css"

const canciones = [
  {
    imgUrl : "https://ia904703.us.archive.org/13/items/daf-punk/daf-punk.jpeg",
    url:"https://ia800503.us.archive.org/30/items/daft_20230926/daft.mp3",
    nombre:"Infinity Repeating",
    artista:"Daft Punk",
  },
  {
    imgUrl : "https://marvelous-vacherin-a8c0dc.netlify.app/img/stories.jpg",
    url:"https://archive.org/download/stories_20220331/03%2C%20Touch%20me.mp3",
    nombre:"Touch me",
    artista:"Avicii",
  },
  {
    imgUrl : "https://marvelous-vacherin-a8c0dc.netlify.app/img/los-amigos-invisibles.jpg",
    url:"https://ia600503.us.archive.org/30/items/daft_20230926/Yonose.mp3",
    nombre:"Yo no se ",
    artista:"Los Amigos Invisibles",
  },
  {
    imgUrl:"https://marvelous-vacherin-a8c0dc.netlify.app/img/true.jpeg",
    url:"https://marvelous-vacherin-a8c0dc.netlify.app/songs/HeyBrother.mp3",
    nombre:"Hey Brother",
    artista:"Avicii",
  },
];

const styleSlider = {
  width:"100%",
  display:"flex",
  justifyContent : "space-between",

}


export function MiComponente(props) {
  const [numCancion,setNumCancion] = useState(0);
  const [audio] = useState(new Audio());
  const [reproduce, setReproduce] = useState(true);
  const [currentTimeMusic, setCurrentTimeMusic] = useState(0);
  const [durationMusic, setDurationMusic] = useState(0);


    audio.addEventListener("loadedmetadata", () => {
      const duration = Math.floor(audio.duration);
      setDurationMusic(duration);
    });

    audio.addEventListener("timeupdate", () => {
      const currentTime = Math.floor(audio.currentTime);
      setCurrentTimeMusic(currentTime);
    });

    const changeAudioSource = (cancionIndex) => {
      let imagenPortada = canciones[cancionIndex].imgUrl;
      let nombreCancion = canciones[cancionIndex].nombre;
      let nombreArtista = canciones[cancionIndex].artista;
      props.cambiaImagen(imagenPortada);
      props.cambiaNombre(nombreCancion);
      props.cambiaArtista(nombreArtista);
      audio.src = canciones[cancionIndex].url;
      audio.load(); // Cargar la nueva fuente de audio
    };

  const handlePlayPause = () => {
    if (audio.paused) {
      audio.play();
      setReproduce(false)
    } else {
      audio.pause();
      setReproduce(true);
    }

  };

  const handleInputChange = (e) => {
    audio.pause();
    audio.currentTime = e.target.value;
  };

  const handleNext = ()=>{
    audio.pause();
    const nextSong = numCancion + 1;
    if (nextSong < canciones.length) {
      setNumCancion(nextSong);
      setReproduce(false);
      changeAudioSource(nextSong); 
      audio.play();
    }
  }
  const handlePrev = ()=>{
    audio.pause();
    const prevSong = numCancion - 1;
    if (prevSong >= 0) {
      setNumCancion(prevSong);
      setReproduce(false);
      changeAudioSource(prevSong); 
      audio.play();
    }
  }
  useEffect(()=>{
    changeAudioSource(numCancion); 
    props.cambiaImagen(canciones[0].imgUrl);
   
  },[]);
  return (
    <div className='controler-container'>
      <div className='slider-container' style={styleSlider}>
      <span className='minutes time-progress'>{parseMinutes(currentTimeMusic)}</span>
      <Slider
      valorDuracionMusica ={durationMusic}
      valorAudio = {currentTimeMusic}
      value={currentTimeMusic}
      max={durationMusic}
      eventChange={handleInputChange}
      eventMouseUp={handlePlayPause}
      />
      <span className='minutes time-complete'>{parseMinutes(durationMusic)}</span>
      </div>
      

      <div className='controls'>
      <button 
      className='btn btn-secondary'
      onClick={handlePrev}>
        <Prev/>
      </button>
      <button
      className='btn btn-primary' 
      onClick={handlePlayPause}>
        {reproduce ? <Play/> : <Pause/>}
      </button>
      <button
      className='btn btn-secondary'
      onClick={handleNext}>
      <Next/>
      </button>
      </div>
      
    </div>
  );
}

function parseMinutes(tiempo) {
  let minutos = Math.floor(tiempo / 60);
  let segundos = tiempo - minutos * 60;
  let segundosFormateados = segundos.toString().padStart(2, "0");
  let displayTiempo = `${minutos}:${segundosFormateados}`;

  return displayTiempo;
}


