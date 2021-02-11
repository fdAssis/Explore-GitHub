import React, { useState, FormEvent, useEffect } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { Title, Form, Repositories, Error } from './styles';
import logoImg from '../../assets/logo_app.svg';

import api from '../../services/api';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboar: React.FC = () => {
  const [newRepo, setNewRepo] = useState('');
  const [inputError, setInputError] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storagedRepositories = localStorage.getItem(
      '@GithubExplorer:repositores',
    );
    if (storagedRepositories) {
      return JSON.parse(storagedRepositories);
    }

    return [];

  });

  useEffect(() => {
    localStorage.setItem('@GithubExplorer:repositores',
      JSON.stringify(repositories),
    );
  }, [repositories]);

  async function handleAddRepository(
    evente: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    evente.preventDefault();

    if(!newRepo) {
      setInputError('Digite o autor/nome do repositorio');
      return;
    }

    try {
      const response = await api.get<Repository>(`repos/${newRepo}`);

      const repository = response.data;

      setRepositories([...repositories, repository]);
      setNewRepo('');
      setInputError('');
    } catch (err) {
      setInputError('Erro na busca desse repositorio repositorio');
    }
  }

  return (
    <>
      <img src={logoImg} alt="Github logo" />
      <Title> Explore repositorios no github </Title>

      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input
          value={newRepo}
          onChange={e => setNewRepo(e.target.value)}
          placeholder="Digite o nome do repositorio"
        />
        <button type="submit">Pesquisar</button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      <Repositories>
       {repositories.map(reposirory => (
          <Link key={reposirory.full_name} to={`/repository/${reposirory.full_name}`}>
          <img
            src={reposirory.owner.avatar_url}
            alt={reposirory.owner.login}
          />
          <div>
            <strong>{reposirory.full_name}</strong>
            <p>{reposirory.description}</p>
          </div>
          <FiChevronRight size={20} />
        </Link>
       ))}
      </Repositories>
    </>
  );
};

export default Dashboar;
