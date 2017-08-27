import "../css/main.less";

class HelloWorldApp extends React.Component {
    constructor (props) {
        super(props);

        Poster.on('afterOrderClose', () => {
            Poster.interface.popup({
                width: 600,
                height: 400,
                title: "Hello world application"
            });
        });
    }

	render () {
        return(
            <h1>Hello world!</h1>
        );
	}
}

ReactDOM.render(
    <HelloWorldApp/>,
    document.getElementById('app-container')
);