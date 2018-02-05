import './styles.css';


export default class HelloWorldApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            emoji: '',
            message: ''
        };

        Poster.interface.showApplicationIconAt({
            functions: 'Кнопка платформы',
            order: 'Кнопка платформы',
        });

        Poster.on('afterOrderClose', () => {
            this.setState({
                emoji: '🍾',
                message: 'Вы только что закрыли заказ, ура!'
            });

            Poster.interface.popup({width: 500, height: 400, title: "Мое приложение"});
        });

        Poster.on('applicationIconClicked', (data) => {
            if (data.place === 'order') {
                this.setState({
                    emoji: '👩‍🍳',
                    message: 'Вы открыли окно заказа!'
                });
            } else {
                this.setState({
                    emoji: '⚙',
                    message: 'Вы открыли окно настроек!'
                });
            }

            Poster.interface.popup({width: 500, height: 400, title: "Мое приложение"});
        })
    }

    render() {
        return (
            <div className="hello-world">
                <h1>{this.state.emoji}</h1>
                <p>{this.state.message}</p>
            </div>
        )
    }
}