let uri="https://accounts.spotify.com/api/token";

let dato1="grant_type=client_credentials";
let dato2="client_id=29c8b72f213045d0bb8c60584918e13c";
let dato3="client_secret=31e33f25714246d9ae052b5ac2c4e261";

let parametrosPeticion={
    method:"POST",
    headers:{
        "Content-Type":"application/x-www-form-urlencoded"
    },
    body:dato1+"&"+dato2+"&"+dato3
    //body:`${dato1}&${dato2}&${dato3}`
}

fetch(uri,parametrosPeticion)
.then(function(respuesta){
    return(respuesta.json())
})
.then(function(respuesta){
    console.log(respuesta)
    obtenerToken(respuesta)

})
.catch(function(error){
    console.log(error)
})

function obtenerToken(datos){

    let token=datos.token_type+" "+datos.access_token
    console.log(token)
    pedirCanciones(token)

}

function pedirCanciones(token){

    let uri="https://api.spotify.com/v1/artists/4gzpq5DPGxSnKTe4SA8HAU/top-tracks?market=us";

    let parametrosEnvio={
        method:"GET",
        headers:{
            Authorization:token
        }
    }

    fetch(uri,parametrosEnvio)
        .then(function(respuesta){
            return(respuesta.json())
        })
        .then(function(respuesta){
            console.log(respuesta)
            pintarDatos(respuesta)
        })
        .catch(function(error){
            console.log(error)
        })

}

function pintarDatos(datos){

    let fila=document.getElementById("fila")

    datos.tracks.forEach(function(cancion){
        console.log(cancion.name)
        console.log(cancion.preview_url)
        console.log(cancion.album.images[0].url)

        //crear un div con js
        let columna=document.createElement("div")
        columna.classList.add("col")

        //creo un div que sirve de tarjeta
        let tarjeta=document.createElement("div")
        tarjeta.classList.add("card")
        tarjeta.classList.add("h-100")

        //creo una img de tarjeta
        let imagen=document.createElement("img")
        imagen.classList.add("card-img-top")
        imagen.src=cancion.album.images[0].url

        //creo un audio
        let audio=document.createElement("audio")
        audio.classList.add("w-100");
        audio.setAttribute("controls","controls")
        audio.src=cancion.preview_url;

        //PADRES E HIJOS
        tarjeta.appendChild(imagen)
        tarjeta.appendChild(audio)
        columna.appendChild(tarjeta)
        fila.appendChild(columna)
        
        

    })

}

