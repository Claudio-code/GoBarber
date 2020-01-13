import React from 'react';
import { Link } from 'react-router-dom';

import { 
  Container, 
  Content, 
  Profile, 
  Nav, 
  Aside 
} from './styles';
import logo from '../../assets/logo.svg';

import Notifications from '../Notifications';
export default function Header() {

  return (
    <Container>
      <Content>
        <Nav>
          <img src={logo} alt="Gobarber" />
          <Link to="/dashboard">DASHBOARD</Link>
        </Nav>
        <Aside>
          <Notifications />
          <Profile>
            <div>
              <strong>Claudio S. Junior</strong>
              <Link to="/profile">Meu Perfil</Link>
            </div>
            <img 
              src="https://api.adorable.io/avatars/40/abott@adorable.png"
              alt="Diego Fernandes"
            />
          </Profile>
        </Aside>
      </Content>
    </Container>
  );
  
}
