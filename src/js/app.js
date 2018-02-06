'use strict';

import "../css/main.less";

import HelloWorldApp    from '../../examples/hello-world/app';
import LoyaltyApp       from '../../examples/loyalty/app';


class ExampleApp extends React.Component {
    render() {
        // Чтобы отобразить нужный пример просто закомментируйте не нужныйе компоненты

        return <HelloWorldApp/>;

        // return <LoyaltyApp/>;
    }
}

ReactDOM.render(
    <ExampleApp/>,
    document.getElementById('app-container')
);