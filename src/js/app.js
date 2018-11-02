'use strict';

import "../css/main.less";

// Required for work on iOS 9
import 'babel-polyfill';

import HelloWorldApp from '../../examples/hello-world/app';
import LoyaltyApp from '../../examples/loyalty/app';
import DeviceHandshakeApp from '../../examples/device-handshake/app';


class ExampleApp extends React.Component {
    render() {
        // Чтобы отобразить нужный пример просто закомментируйте не нужныйе компоненты

        return <HelloWorldApp />;

        // return <LoyaltyApp/>;

        // return <DeviceHandshakeApp />
    }
}

ReactDOM.render(
    <ExampleApp />,
    document.getElementById('app-container')
);
