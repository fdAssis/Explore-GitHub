import React from 'react';

import { Title } from './styles';
import logoImg from '../../assets/logo_app.svg';

const Dashboar: React.FC = () => {
  return (
    <>
      <img src={logoImg} alt="Github logo" />
      <Title> Explore repositorios no github </Title>
    </>
  );
};

export default Dashboar;
