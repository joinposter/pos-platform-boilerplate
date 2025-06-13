import './styles.css';
import React from 'react';


export default class HelloWorldApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            emoji: '',
            message: '',
        };

        // Показываем кнопки приложения в окне настроек и заказа
        Poster.interface.showApplicationIconAt({
            functions: 'Кнопка платформы',
            order: 'Кнопка платформы',
            payment: 'My Button',
        });

        // Подписываемся на клик по кнопке
        Poster.on('applicationIconClicked', (data) => {
            if (data.place === 'order') {
                this.setState({ emoji: '👩‍🍳', message: 'Вы открыли окно заказа!' });
            } else {
                this.setState({ emoji: '💵', message: 'Checkout modal!' });
            }
            // Показываем интерфейс
            Poster.interface.popup({ width: 500, height: 400, title: 'My app' });
        });

        // Подписываемся на ивент закрытия заказа
        Poster.on('afterOrderClose', () => {
            this.setState({ emoji: '🍾', message: 'Вы только что закрыли заказ, ура!' });
            // Показываем интерфейс
            Poster.interface.popup({ width: 500, height: 400, title: 'Мое приложение' });
        });
    }

    render() {
        const { emoji, message } = this.state;

        return (
            <div className="hello-world">
                <h1>{emoji}</h1>
                <p>{message}</p>
            </div>
        );
    }
}
