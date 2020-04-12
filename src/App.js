import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [techs, setTechs] = useState('');

  useEffect(() => {
    (async function loadRepositories() {
      setRepositories((await api.get("repositories")).data);
    })();
  }, []);

  async function handleAddRepository() {
    const response = await api.post("repositories", { title, url, techs });
    setRepositories([...repositories, response.data]);
    setTitle('');
    setUrl('');
    setTechs('');
  }

  async function handleRemoveRepository(id) {
    (async function () {
      const response = await api.delete(`repositories/${id}`);
      if (response.status !== 204) {
        alert("Não foi possível remover o repositório.");
        return;
      }
      setRepositories(
        repositories.filter((repository) => repository.id !== id)
      );
    })();
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Title"
      />
      <input
        value={url}
        onChange={(event) => setUrl(event.target.value)}
        placeholder="Url"
      />
      <input
        value={techs}
        onChange={(event) => setTechs(event.target.value)}
        placeholder="Techs (comma-separated)"
      />
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
