import { payment, revert, XReport, ZReport, interrupt } from "./controllers";

// Подписываемся на события устройства payTerminal
const subscribeHandler = (device) => {
    if (!device) return;

    device.on('makePayment', payment);
    device.on('revertPayment', revert);
    device.on('x-report', XReport);
    device.on('z-report', ZReport);
    device.on('interrupt', interrupt);
};

export default subscribeHandler;
