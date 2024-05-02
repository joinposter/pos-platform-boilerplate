import './styles.css';

import React from 'react';

export default class DeviceHandshakeApp extends React.Component {
    constructor(props) {
        super(props);

        // Показываем кнопки приложения в окне настроек и заказа
        Poster.interface.showApplicationIconAt({
            functions: 'Platform devices',
            order: 'Platform devices',
        });

        // Подписываемся на клик по кнопке
        Poster.on('applicationIconClicked', () => {
            Poster.interface.popup({ width: 500, height: 400, title: 'Platform devices' });
        });

        Poster.on('deviceMessage', () => {
            Poster.interface.showNotification({
                title: 'Message from device',
                message: 'Hello!',
                icon: 'https://demo.joinposter.com/upload/apps/icons/posterboss-ios.png',
            });
        });
    }

    sendMessage = async () => {
        const result = await Poster.devices.getAll();

        if (result.success) {
            result.devices.forEach((device) => {
                console.log('send message to', device);
                device.sendMessage({ text: 'Hello, World!' });
            });
        }
    };

    render() {
        return (
            <div className="device-handshake">
                <button onClick={this.sendMessage} className="btn-green btn-device">
                    Say 👋
                </button>
            </div>
        );
    }
}
