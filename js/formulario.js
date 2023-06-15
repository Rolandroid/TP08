window.onload = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const valor = urlParams.get('id');

  const title = document.getElementById("title")
  const rating = document.getElementById("rating")
  const awards = document.getElementById("awards")
  const release_date = document.getElementById("release_date")
  const length = document.getElementById("length")
  const genre = document.getElementById("genre")
  const editar = document.getElementById("editar")
  const crear = document.getElementById("crear")
  const eliminar = document.getElementById("eliminar")
  const deleteCheklabel = document.getElementById("deleteCheklabel")
  const deleteChek = document.getElementById("deleteChek")
  const formCreate = document.getElementById("formCreate")

  try {
    if (valor) {
      console.log(valor)
      crear.style = "display:none"

      const response = await fetch(`http://localhost:3031/api/movies/${valor}`);
      const data = await response.json();
      const releaseDate = new Date(data.data.release_date);

      const day = releaseDate.getDate()
      const month = releaseDate.getMonth() + 1
      const year = releaseDate.getFullYear()

      const formattedDateFromAPI = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      title.value = data.data.title
      rating.value = data.data.rating
      awards.value = data.data.awards
      release_date.value = formattedDateFromAPI
      length.value = data.data.length





    }
    else {
      console.log("completa el body")
      editar.style = "display:none"
      deleteCheklabel.style = "display:none"
      eliminar.style = "display:none"
    }





  }
  catch { error => console.log(error) }


  formCreate.addEventListener("submit", async function (event) {
    event.preventDefault();
    console.log("se hizo clic");

    try {


      if (!valor) {
        const response = await fetch("http://localhost:3031/api/movies/create/", {
          method: 'POST',
          body: JSON.stringify({
            title: title.value,
            rating: rating.value,
            awards: awards.value,
            release_date: release_date.value,
            length: length.value
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          console.log("El objeto se creó correctamente");
          // Aquí puedes realizar cualquier acción adicional después de crear el objeto
          window.location.href="home.html"
        } else {
          console.log("Ocurrió un error al crear el objeto");
        }
      } else if (valor && !deleteChek.checked) {


        const response = await fetch(`http://localhost:3031/api/movies/update/${valor}`, {
          method: 'PUT',
          body: JSON.stringify({
            title: title.value,
            rating: rating.value,
            awards: awards.value,
            release_date: release_date.value,
            length: length.value
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });


        if (response.ok) {
          console.log("El objeto se editó correctamente");
          // Aquí puedes realizar cualquier acción adicional después de crear el objeto
          window.location.href="home.html"
        } else {
          console.log("Ocurrió un error al editar el objeto");
        }

      } else if (valor && deleteChek.checked) {
        const response = await fetch(`http://localhost:3031/api/movies/delete/${valor}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          console.log("El objeto se Elimino correctamente");
          // Aquí puedes realizar cualquier acción adicional después de crear el objeto
          window.location.href="home.html"
        } else {
          console.log("Ocurrió un error al crear el objeto");
        }

      }else{}

    } catch (error) {
      console.log(error);
    }
  });
};



