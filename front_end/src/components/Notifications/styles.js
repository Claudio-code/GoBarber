import styled, { css } from 'styled-components';
import { lighten } from 'polished';
import PerfectScrollbar from 'react-perfect-scrollbar';

export const Container = styled.div`
  position: relative;  
`;

export const Scroll = styled(PerfectScrollbar)`
  max-height: 200px;
  padding: 5px 15px;
`;

export const Badge = styled.button`
  background: none;
  border: 0;
  position: relative;

  ${props => props.hasUnread && 
    css`
      &::after {
        position: absolute;
        right: 0;
        top: 0;
        width: 8px;
        height: 8px;
        background: #ff9800;
        content: '';
        border-radius: 50%;
      }
  `}

`;

export const NotificationList = styled.div`
  position: absolute;
  width: 260px;
  left: calc(50% - 130px);
  top: calc(100% + 30px);
  background: rgba(0, 0, 0, 0.6);
  border-radius: 8px;
  padding: 15px 5px;

  &::before {
    content: '';
    position: absolute;
    left: calc(50% - 20px);
    top: -20px;
    width: 0;
    height: 0;
    border-right: 20px solid transparent;
    border-left: 20px solid transparent;
    border-bottom: 20px solid rgba(0, 0, 0, 0.6);
  }
`;

export const Notification = styled.div`
  color: #DDD;

  & + div {
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid rgba(255, 255, 255, 0.12);
  }

  p {
    font-size: 13px;
    line-height: 18px;
  }

  time {
    font-size: 12px;
    opacity: 0.6;
  }

  button {
    font-size: 12px;
    border: 0;
    background: none;
    color: ${lighten(0.2, '#009688')};
    padding: 0 5px;
    margin: 0 5px;
    border-left: 1px solid rgba(255, 255, 255, 0.12);
  }

  ${props => props.unread && css`
    &::after {
      content: '';
      display: inline-block;
      margin-left: 5px;
      width: 9px;
      height: 9px;
      background: #ff9800;
      border-radius: 50%;
    }
  `}
`;

