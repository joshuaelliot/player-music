import React, { useEffect } from 'react';
import { useState ,useRef } from 'react'
import { MiComponente} from "./conponente"
import ColorThief from "colorthief"
import './App.css'



const styleHeartLogo = {
  color: "salmon",
  border: "1px solid white",
  width: "50px",
  height: "50px",
  backgroundColor:"crimson",
}

const imagenes =[{
  imgUrl : "https://coversgo.com/wp-content/uploads/2022/12/portada-aesthetic-neon-bach.jpg"
},
{
  imgUrl : "https://img.freepik.com/vector-gratis/plantilla-portadas-musica-psicodelica_23-2148598431.jpg"
},
{
  imgUrl : "https://images.coveralia.com/audio/b/Belanova-Sueno_Electro_I-Frontal.jpg"
},
{
  imgUrl:"https://th.bing.com/th/id/R.453a5f0e7aaf2e88f8c62cdecec5c9d7?rik=42zkqjJUPirDPA&riu=http%3a%2f%2fwww.plasticosydecibelios.com%2fwp-content%2fuploads%2fcomplianz%2fplaceholders%2fyoutubegk8C7ZxsJCU-maxresdefault.jpg&ehk=0QVGTDiu7ug%2fvJrhiZmdZ9BOc6%2b8vjj6z%2bzTh7Tj6NE%3d&risl=&pid=ImgRaw&r=0"
}
]



function App() {
  const [imagenUrl,setImagenUrl] = useState("");
  const [colorFondo,setColorFondo] = useState([11,87,140]);
  const [nombreCancion,setNombreCancion] = useState("");
  const [nombreArtista,setNombreArtista] = useState("");
  let [uno,dos,tres] = colorFondo;
  const fondoPlayer={
    background:`linear-gradient(0deg, rgba(37,43,43,1) 0%, rgba(${uno},${dos}, ${tres},1) 100%)`,
  }
  useEffect(()=>{
    console.log(new ColorThief());
  },[])

  const cargaImagen = (e)=>{
  const imagen = e.target;
  const color = new ColorThief();
   if(e.target.complete){
    console.log("cargue completo");
    let paleta = color.getColor(imagen);
    setColorFondo(paleta);
    console.log("color : ", paleta);
   }
  }
  return (
    <>
      <div className='player-container'
      style={fondoPlayer}
      >
        <figure>
          <img
          onLoad={cargaImagen}
          src={imagenUrl} alt=""
          crossorigin='anonymous' 
          payaso="nel"/>
        </figure>
        <div className='dates-song-container'>
          <div className='name-song-container'>
            <span className='name-song'>{nombreCancion}</span><br />
            <span className='name-artist'>{nombreArtista}</span>
          </div>
          <span className='logo-heart-container'>
            <svg
            aria-hidden="true" focusable="false" data-icon="heart" className="svg-inline--fa fa-heart heartMio" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path
               onClick={(e)=>{
                const colorLike="rgb(30, 215, 96)";
                if(colorLike == e.target.style.fill){
                  e.target.style.fill = "transparent";
                  
                }else{
                  e.target.style.fill = colorLike;
                  
                }
                
              }} 
              fill="transparent" stroke="#DBEDDB" strokeWidth="15px" d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"></path>
            </svg>
          </span>

        </div>
        <div className='progress-bar-container'>
        <MiComponente
        cambiaImagen= {setImagenUrl}
        cambiaNombre ={setNombreCancion}
        cambiaArtista = {setNombreArtista}
        />
        </div>
      </div>
    </>
  )
}


export default App
