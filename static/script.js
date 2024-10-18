async function obtenerNombres() {
  const filtro = document.getElementById("filtro").value;
  const response = await fetch(`/nombres`); // Asumiendo que este endpoint devuelve todos los nombres
  const data = await response.json();

  const listaNombres = document.getElementById("nombres-lista");
  const listaFiltrados = document.getElementById("nombres-filtrados");

  // Limpiar listas existentes
  listaNombres.innerHTML = "";
  listaFiltrados.innerHTML = "";

  // Mostrar todos los nombres
  data.nombres.forEach((nombre) => {
    const li = document.createElement("li");
    li.textContent = nombre;
    listaNombres.appendChild(li);
  });

  // Filtrar nombres si se ha ingresado un filtro
  if (filtro) {
    const nombresFiltrados = data.nombres.filter((nombre) =>
      nombre.toLowerCase().includes(filtro.toLowerCase())
    );

    // Mostrar nombres filtrados
    if (nombresFiltrados.length > 0) {
      nombresFiltrados.forEach((nombre) => {
        const li = document.createElement("li");
        li.textContent = nombre;
        listaFiltrados.appendChild(li);
      });
    } else {
      const li = document.createElement("li");
      li.textContent = "No se encontraron nombres.";
      listaFiltrados.appendChild(li);
    }
  }
}
