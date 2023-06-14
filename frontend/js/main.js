window.onload = () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);
  
  // Aquí debemos agregar nuestro fetch
  const obtenerPeliculas = async () => {
    try {
      const response = await fetch('http://localhost:3031/api/movies/');
      const data = await response.json();
      
     

    // Código que debemos usar para mostrar los datos en el frontend
    console.log(data);
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
    }
    );
  } catch (error) {
    console.log('Error al obtener las películas:', error);
  }
};

obtenerPeliculas();

}