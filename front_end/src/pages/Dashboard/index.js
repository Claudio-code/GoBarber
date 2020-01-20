import React from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

import { Container, Time } from './styles';

export default function Dashboard() {
  return (
    <Container>
      <header>
        <button type="button">
          <MdChevronLeft size={35} color="#FFF" />
        </button>
        <strong> 4 de Maio</strong>
        <button type="button">
          <MdChevronRight size={35} color="#FFF" />
        </button>
      </header>

      <ul>
        <Time past>
          <strong>09:00</strong>
          <span>Kraudio</span>
        </Time>
        <Time available>
          <strong>10:00</strong>
          <span>Kraudio</span>
        </Time>
        <Time>
          <strong>11:00</strong>
          <span>Kraudio</span>
        </Time>
        <Time>
          <strong>12:00</strong>
          <span>Kraudio</span>
        </Time>
      </ul>
    </Container>
  );
}
