import "../css/main.less";
import React from 'react';
import ReactDOM from 'react-dom';

class HelloWorldApp extends React.Component {
    constructor (props) {
        super(props);

        // TODO: add Poster and uncomment below
        //
        // Poster.on('afterOrderClose', () => {
        //     Poster.interface.popup({
        //         width: 600,
        //         height: 400,
        //         title: "Hello world application"
        //     });
        // });
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