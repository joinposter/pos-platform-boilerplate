import React, { useEffect } from "react";
import subscribeHandler from './subscribeHandler';

const handleDevice = async (device) => {
    await device.setAuth();
    await device.setOnline();

    subscribeHandler(device)
};

const handleValidateDevice = ({ ip }, next) => {
    // Пример получения данных устройства с IP, которое было передано в событие.
    // При работе с реальным устройством можно использовать метод Poster.makeRequest.

    const getDeviceInfoByIp = (ip) =>({ serialNumber: 123, vendor: 'Ingenico', model: 'iPP350' });

    const { serialNumber, vendor, model } = getDeviceInfoByIp(ip);
    if (!model) {
        next(false);
        return;
    }

    const deviceObject = {
        ip,
        id: serialNumber,
        name: `${vendor} ${model}`,
        appVersion: '0.1',
        deviceClass: 'platformPayTerminal',
        type: 'payTerminal',
        auth: true,
    };
    next(deviceObject);
};

const handleDeviceCreated = async (createdDevice) => {
    const devices = await Poster.devices.getAll({ type: 'payTerminal' });
    const [device] = devices.filter((device) => device.id === createdDevice.id);

    subscribeHandler(device);
}

const initializeIntegration = async () => {
    // Событие validateDevice срабатывает при поиске устройства через вкладку Другое оборудование в кассе Poster
    // В событие передается только те устройства у которых открыт порт. Подробнее в README
    Poster.on('validateDevice', handleValidateDevice);

    // Событие deviceCreated срабатывает после того как устройство было создано после события validateDevice
    Poster.on('deviceCreated', handleDeviceCreated);

    // При инициализации интеграции получаем также все активные устройства и подписываемся на события
    let devices = await Poster.devices.getAll({ type: 'payTerminal' })
    devices = devices.filter((device) => device.online && !device.hidden);

    if (devices.length > 0) await Promise.all(devices.map(handleDevice));
};

const BankIntegrationApp = () => {
    useEffect(() => {
        initializeIntegration()
    }, []);

    return <></>
}

export default BankIntegrationApp;
