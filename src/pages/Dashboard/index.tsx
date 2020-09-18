import React from 'react';

import { Title, Form, Repositories } from './styles';
import logoImg from '../../assets/logo_app.svg';

const Dashboar: React.FC = () => {
  return (
    <>
      <img src={logoImg} alt="Github logo" />
      <Title> Explore repositorios no github </Title>

      <Form>
        <input placeholder="Digite o nome do repositorio" />
        <button type="submit">Pesquisar</button>
      </Form>

      <Repositories>
        <a href="teste">
          <img
            src="https://avatars1.githubusercontent.com/u/43320138?s=460&u=83e00cc7d76057e6eee42c085c444b47f16d87fa&v=4"
            alt="Francisco"
          />
          <div>
            <strong>francisco/repository</strong>
            <p>Aqui tem uma descricoa</p>
          </div>
        </a>
      </Repositories>
    </>
  );
};

export default Dashboar;
