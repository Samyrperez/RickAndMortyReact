import { useState, useEffect } from "react";
import RickAndMorty from "./RickAndMorty";

function App() {
  const [personajes, setPersonajes] = useState([]);
  const [contador, setContador] = useState(1);
  const [busqueda, setBusqueda] = useState("");
  const urlApi = `https://rickandmortyapi.com/api/character?page=${contador}`;


  async function obtenerPersonajes() {
    try {
      const respuesta = await fetch(urlApi);
      const data = await respuesta.json();
      setPersonajes(data.results);
      console.log(data.results)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    obtenerPersonajes();
  },[contador]);

  const avanzar = () => {
    setContador(contador + 1);
  };

  const retroceder = () => {
    if (contador > 1) {
      setContador(contador -1);
    } 
  };
  // Filtrar personajes según la búsqueda
  const personajesFiltrados = personajes.filter((personaje) =>
    personaje.name.toLowerCase().includes(busqueda.toLowerCase())
  );


  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        {/* Título */}
        <h1 className="text-3xl font-bold mb-6 text-center">Rick And Morty</h1>

        {/* Input de búsqueda */}
      <input
        type="text"
        placeholder="Buscar personaje..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="mb-6 w-80 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

        {/* Mostrar personajes por defecto o filtrados */}
  <div className="w-full max-w-6xl flex flex-wrap justify-center gap-6">
    {busqueda === "" ? ( 
      // ✅ Si no hay búsqueda, mostramos los personajes de la página actual
      <RickAndMorty personajes={personajes} />
    ) : personajesFiltrados.length > 0 ? (
      // ✅ Si hay búsqueda y hay coincidencias, mostramos los filtrados
      personajesFiltrados.map((personaje) => (
        <div key={personaje.id} className="w-64 h-80 bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <img
            alt={personaje.name}
            src={personaje.image}
            className="w-24 h-24 rounded-full border-4 border-indigo-500"
          />
          <h3 className="text-lg font-semibold text-gray-900 mt-4">{personaje.name}</h3>
          <p className="text-sm font-medium text-indigo-600">{personaje.status}</p>
          <p className="text-sm text-gray-700">{personaje.species}</p>
        </div>
      ))
    ) : (
      // ❌ Si hay búsqueda pero no hay coincidencias, mostramos un mensaje
      <p className="text-lg font-semibold text-gray-500">No se encontraron personajes</p>
    )}
  </div>

        {/* Contenedor del paginador */}
        <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-md mt-6">
          {contador > 1 && ( // evalúa la segunda expresión solo si la primera es true.
            <button
              onClick={retroceder}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Anterior
            </button>
          )}

          <p className="text-lg font-semibold">Página: {contador}</p>

          <button
            onClick={avanzar}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Siguiente
          </button>
        </div>
      </div>

    </>

    
  )
  
}

export default App;
