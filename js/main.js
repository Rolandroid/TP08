window.onload = () => {
  const app = document.getElementById("root");
  const favoritas = document.getElementById("favoritas");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);
  
    favoritas.style = "display:none"

    if (sessionStorage.getItem("ids") || [].length > 0 ){
    favoritas.style = "display:inline"
   
  }
  
  // Aquí debemos agregar nuestro fetch
  const obtenerPeliculas = async () => {
    try {
      const response = await fetch('http://localhost:3031/api/movies/');
      const data = await response.json();
      
      let favoriteIds = sessionStorage.getItem("ids") || [];


    // Código que debemos usar para mostrar los datos en el frontend
    data.data.forEach((movie) => {
      const card = document.createElement("div");
      card.setAttribute("class", "card");

      const h1 = document.createElement("h1");
      h1.textContent = movie.title;

      const p = document.createElement("p");
      p.textContent = `Rating: ${movie.rating}`;

      const duracion = document.createElement("p");
      duracion.textContent = `Duración: ${movie.length}`;
      
      const edicion = document.createElement("a");
      edicion.href = `formulario.html?id=${movie.id}`;
      edicion.textContent = `Editar`
      edicion.className = `botonAgregar`


      


      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
      if (movie.genre !== null) {
        const genero = document.createElement("p");
        genero.textContent = `Género: ${movie.genre.name}`;
        card.appendChild(genero);
      }
      card.appendChild(duracion);
      card.appendChild(edicion);

      const addButton = document.createElement("button")
      addButton.setAttribute("class","botonAgregar")
      addButton.textContent= "Agregar a favoritos"
      card.appendChild(addButton)

     
      if(favoriteIds.includes(movie.id)) {
        
        addButton.textContent= "Remover de Favoritos"
      }

      addButton.addEventListener("click", () =>{
        toggleFavorite(movie.id);
        if (favoriteIds.includes(movie.id)) {
         
          addButton.textContent = "Agregar a favoritos"
        }else{
        
          addButton.textContent="Remover de favoritos"
        }
        location.reload()
      
      })
    })

  } catch (error) {
    console.log('Error al obtener las películas:', error);
  }
function toggleFavorite(movieId) {
  let favoriteIds = JSON.parse(sessionStorage.getItem("ids")) || []
  const index = favoriteIds.indexOf(movieId)
  if(index > -1){
    favoriteIds.splice(index,1)
  }else{
    favoriteIds.push(movieId)
  }
  sessionStorage.setItem("ids", favoriteIds)
}

};

obtenerPeliculas();

}