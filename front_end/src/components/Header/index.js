import React from 'react';
import { useSelector } from 'react-redux';
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
  const profile = useSelector(state => state.user.profile);

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
              <strong>{profile.name}</strong>
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
