import React, { useState, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi';

import { Title, Form, Repositories } from './styles';
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
  const [repositories, setRepositories] = useState<Repository[]>([]);

  async function handleAddRepository(
    evente: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    evente.preventDefault();

    const response = await api.get<Repository>(`repos/${newRepo}`);

    const repository = response.data;

    setRepositories([...repositories, repository]);
    setNewRepo('');
  }

  return (
    <>
      <img src={logoImg} alt="Github logo" />
      <Title> Explore repositorios no github </Title>

      <Form onSubmit={handleAddRepository}>
        <input
          value={newRepo}
          onChange={e => setNewRepo(e.target.value)}
          placeholder="Digite o nome do repositorio"
        />
        <button type="submit">Pesquisar</button>
      </Form>

      <Repositories>
       {repositories.map(reposirory => (
          <a key={reposirory.full_name} href="teste">
          <img
            src={reposirory.owner.avatar_url}
            alt={reposirory.owner.login}
          />
          <div>
            <strong>{reposirory.full_name}</strong>
            <p>{reposirory.description}</p>
          </div>
          <FiChevronRight size={20} />
        </a>
       ))}
      </Repositories>
    </>
  );
};

export default Dashboar;
