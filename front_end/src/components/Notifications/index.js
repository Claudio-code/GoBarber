import React, { useState, useEffect, useMemo } from 'react';
import { parseISO, formatDistance } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { MdNotifications } from 'react-icons/md';

import { Container, Badge, Notification, NotificationList ,Scroll } from './styles';
import api from '../../services/api';


export default function Notifications() {
  const [visible, setVisible] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const hasUnread = useMemo(
    () => !!notifications.find(notification => notification.read === false),
    [notifications]
  );

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

  async function handleMarkRead(id) {
    try {
      await api.put(`notifications/${id}`);
      setNotifications(
        notifications.map(notification => notification._id === id ?
          {...notification, read: true} : notification)
      )
    } catch (error) {
      console.log(error);
      return;
    }
  }

  return (
    <Container>
      <Badge onClick={handleToggleVisible} hasUnread={hasUnread}>
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
              {!notification.read && (
                <button
                type="button"
                onClick={() => handleMarkRead(notification._id)}
               >
                 Marcar como lida
               </button>
              )}
            </Notification>
          ))}

          
        </Scroll>
      </NotificationList>
    </Container>
  );
}
