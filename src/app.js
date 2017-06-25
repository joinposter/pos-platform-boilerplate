class CounterApp extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            counter: 1
        };
    }

    proceedToPayment () {
        let { counter } = this.state;

        this.setState({
            counter: counter + 1
        });

        this.nextCallback();
    }

    componentDidMount () {
        Poster.on('beforeOrderClose', (data, next) => {
            this.nextCallback = next;

            Poster.popup({
                title: "Incust",
                width: 600,
                height: 450
            });
        });
    }

	render () {
        let { counter } = this.state;

		return (
			<div>
                <p style={{ fontSize: 20, margin: "20px 0" }}>Заказ { counter }</p>
                <button className="btn btn-green" onClick={ this.proceedToPayment.bind(this) }>Продолжить</button>
            </div>
		);
	}
}

ReactDOM.render(
    <CounterApp/>,
    document.body
);