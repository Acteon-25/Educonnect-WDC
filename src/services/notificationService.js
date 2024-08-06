import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const notificationService = {
    stompClient: null,
    isConnected: false,

    connect: (userId, onNotificationReceived) => {
        const socket = new SockJS('https://educonnectb.onrender.com/ws');
        notificationService.stompClient = Stomp.over(socket);

        notificationService.stompClient.connect({}, (frame) => {
            notificationService.isConnected = true;
            console.log('Conectado al servidor: ' + frame);

            notificationService.stompClient.subscribe(`/topic/notificaciones/${userId}`, (message) => {
                onNotificationReceived(JSON.parse(message.body));
            });
        }, (error) => {
            console.error('Error al conectar a WebSocket:', error);
        });
    },

    disconnect: () => {
        if (notificationService.isConnected && notificationService.stompClient) {
            notificationService.stompClient.disconnect(() => {
                notificationService.isConnected = false;
                console.log('Desconectado del WebSocket');
            });
        } else {
            console.warn('No se puede desconectar: el cliente no está conectado.');
        }
    },

    getNotifications: async (userId, token) => {
        const response = await fetch(`https://educonnectb.onrender.com/educ/notificaciones/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Error al obtener las notificaciones');
        }
        return await response.json();
    },

    markAsRead: async (userId, notificationId, token) => {
        const response = await fetch(`https://educonnectb.onrender.com/educ/notificaciones/${userId}/markAsRead/${notificationId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Error al marcar la notificación como leída');
        }
    },

    markAllAsRead: async (userId, token) => {
        const response = await fetch(`https://educonnectb.onrender.com/educ/notificaciones/${userId}/markAllAsRead`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Error al marcar todas las notificaciones como leídas');
        }
    }
};

export default notificationService;
