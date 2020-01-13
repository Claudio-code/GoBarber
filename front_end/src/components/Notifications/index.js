import React, { useState, useEffect } from 'react';
import { parseISO, formatDistance } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { MdNotifications } from 'react-icons/md';

import { Container, Badge, Notification, NotificationList ,Scroll } from './styles';
import api from '../../services/api';


export default function Notifications() {
  const [visible, setVisible] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    async function loadNotification() {
      try {
        const response = await api.get('notifications');
        
          
        const data = response.data.map(notification => ({
          ...notification,
          timeDistance: formatDistance(
            parseISO(notification.createdAt),
            new Date(),
            { addSuffix: true, locale: pt }
          )
        }));
        console.log(data);
        
        setNotifications(data);
      } catch (error) {
        console.log(error);
        return;
      }
    }
    loadNotification();
  },[]);

  function handleToggleVisible() {
    setVisible(!visible);
  }

  return (
    <Container>
      <Badge onClick={handleToggleVisible} hasUnread>
        <MdNotifications color="#009688" size={20} />
      </Badge>
      <NotificationList visible={visible}>
        <Scroll>
          { notifications.map(notification => (
            <Notification 
              key={notification._id}
              unread={!notification.read}
            >
              <p>{notification.content}</p>
              <time>{notification.timeDistance}</time>
              <button type="button">Marcar como lida</button>
            </Notification>
          ))}

          
        </Scroll>
      </NotificationList>
    </Container>
  );
}
