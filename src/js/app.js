'use strict';

import "../css/main.less";

import LoyaltyApp from '../../examples/loyalty/loyaltyApp';


class ExampleApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <LoyaltyApp/>
        );
    }
}

ReactDOM.render(
    <ExampleApp/>,
    document.getElementById('app-container')
);