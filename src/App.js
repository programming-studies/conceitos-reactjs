import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    (async function loadRepositories() {
      setRepositories((await api.get("repositories")).data);
    })();
  }, []);

  async function handleAddRepository() {
    // TODO
  }

  async function handleRemoveRepository(id) {
    (async function () {
      const response = await api.delete(`repositories/${id}`);
      if (response.status !== 204) {
        alert("Não foi possível remover o repositório.");
        return;
      }
      setRepositories(repositories.filter(repository => repository.id !== id));
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

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
