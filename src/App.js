import React, { useState, useEffect } from "react";
import axios from "axios";

import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    try {
      const response = await api.post("repositories", {
        id: "123",
        url: "https://github.com/josepholiveira",
        title: "Desafio ReactJS",
        techs: ["React", "Node.js"],
      });

      setRepositories([...repositories, response.data]);
    } catch (error) {}
  }

  async function handleRemoveRepository(id) {
    const repositoryIndex = repositories.findIndex((repo) => repo.id === id);

    if (repositoryIndex < 0) {
      return;
    }

    const repositoriesList = repositories;

    repositoriesList.splice(repositoryIndex, 1);

    setRepositories([...repositoriesList]);

    try {
      await api.delete(`repositories/${id}`);
    } catch (error) {}
  }

  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repo) => (
          <li key={repo.id}>
            {repo.title}

            <button onClick={() => handleRemoveRepository(repo.id)}>
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
