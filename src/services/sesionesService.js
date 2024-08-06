import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const sesionService = {
    stompClient: null,
    isConnected: false,

    connect: (userId, onSesionUpdated) => {
        const socket = new SockJS('https://educonnectb.onrender.com/ws');
        sesionService.stompClient = Stomp.over(socket);

        sesionService.stompClient.connect({}, (frame) => {
            sesionService.isConnected = true;
            console.log('Conectado al servidor: ' + frame);

            sesionService.stompClient.subscribe(`/topic/sesiones/${userId}`, (message) => {
                onSesionUpdated(JSON.parse(message.body));
            });
        }, (error) => {
            console.error('Error al conectar a WebSocket:', error);
        });
    },

    disconnect: () => {
        if (sesionService.isConnected && sesionService.stompClient) {
            sesionService.stompClient.disconnect(() => {
                sesionService.isConnected = false;
                console.log('Desconectado del WebSocket');
            });
        } else {
            console.warn('No se puede desconectar: el cliente no está conectado.');
        }
    },
};

export default sesionService;
