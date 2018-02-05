'use strict';

import "../css/main.less";

import LoyaltyApp       from '../../examples/loyalty/app';
import HelloWorldApp    from '../../examples/hello-world/app';


class ExampleApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        // Чтобы отобразить нужный пример просто вызовите нужную компоненту

        return (
            <HelloWorldApp/>
        );

        return (
            <LoyaltyApp/>
        );
    }
}

ReactDOM.render(
    <ExampleApp/>,
    document.getElementById('app-container')
);