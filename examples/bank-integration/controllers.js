/**
 * Событие вызывается при оплате заказа картой на кассе
 */
export const payment = (data, next) => {
    // В data приходит объект с суммой оплаты и устройством, на котором оплата вызывается. Из устройства можно получить IP-адрес.
    const { device, sum } = data;

    // Пример ответа на успешную оплату от терминала.
    // В реальной интеграции нужно отправлять запрос на терминал методом Poster.makeRequest и обрабатывать ответ.
    const response = {
        "error": false,
        "errorDescription": "",
        "method": "Purchase",
        "params":
            {
                "amount":"100.00",
                "approvalCode":"111111",
                "bankAcquirer":"ПриватБанк",
                "cardExpiryDate":"0530",
                "date":"16.07.2024",
                "signVerify": 0,
                "invoiceNumber":"000111",
                "issuerName":"MASTER",
                "merchant":"S1KKKK",
                "pan":"XXXXXXXXXXXX1111",
                "paymentSystem":"MasterCard",
                "rrn":"111111111111",
                "terminalId":"S1KKKK",
            },
    };

    // Пример ответа с ошибкой от терминала

    // const response = {
    //     "error": true,
    //     "errorDescription": "Недостаточно денег для проведения оплаты",
    //     "method": "Purchase",
    // }

    if (response.error) {
        // При ошибке клиент на кассе увидит ошибку указанную в error_text
        next({ success: false, error_text: response.errorDescription });
    }

    if (!response.error) {
        // При успешной оплате нужно передать sstParams. Эти данные сохранятся и привяжутся к чеку в Poster.
        // При возврате картой через интеграцию именно из sstData вы сможете получить данные для автоматического возврата.

        // Данные ниже – обязательные для Украины. Эти данные будут напечатаны на фискальном чеке ПРРО/РРО.
        const sstParams = {
            merchantId: response.params.merchant,
            paymentSystemName: response.params.paymentSystem,
            authCode: response.params.approvalCode,
            signVerify: response.params.signVerify,
            rrn: response.params.rrn,

            // operationType: 1 - оплата, 2 - возврат
            operationType: 1
        }
        next({ success: true, sstParams });
    }
};

/**
 * Событие вызывается при возврате оплаты заказа картой на кассе
 */
export const revert = (data, next) => {
    const { device, sstData } = data;

    const params = {
        rrn: sstData.rrn,
        amount: sstData.amount,
    }

    const response = {
        "error": false,
        "errorDescription": "",
        "method": "Refund",
        "params":
            {
                "amount":"100.00",
                "approvalCode":"111111",
                "bankAcquirer":"ПриватБанк",
                "cardExpiryDate":"0530",
                "date":"16.07.2024",
                "signVerify": 0,
                "invoiceNumber":"000111",
                "issuerName":"MASTER",
                "merchant":"S1KKKK",
                "pan":"XXXXXXXXXXXX1111",
                "paymentSystem":"MasterCard",
                "rrn":"111111111111",
                "terminalId":"S1KKKK",
            },
    };

    // Пример ответа с ошибкой от терминала

    // const response = {
    //     "error": true,
    //     "errorDescription": "Недостаточно денег для проведения оплаты",
    //     "method": "Purchase",
    // }

    if (response.error) {
        // При ошибке клиент на кассе увидит ошибку указанную в error_text
        next({ success: false, error_text: response.errorDescription });
    }

    if (!response.error) {
        // При успешном возврате нужно передать sstParams. Эти данные сохранятся и привяжутся к чеку в Poster.
        // Данные ниже – обязательные для Украины. Эти данные будут напечатаны на фискальном чеке ПРРО/РРО.

        const sstParams = {
            merchantId: response.params.merchant,
            paymentSystemName: response.params.paymentSystem,
            authCode: response.params.approvalCode,
            signVerify: response.params.signVerify,
            rrn: response.params.rrn,

            // operationType: 1 - оплата, 2 - возврат
            operationType: 2
        }
        next({ success: true, sstParams });
    }
};

/**
 * Событие вызывается при нажатии на кнопку X-отчет на кассе в блоке платежного терминала.
 */
export const XReport = (data, next) => {
    const { device } = data;

    // Ваша логика снятия X-отчета на терминале

    next({ success: true });
};

/**
 * Событие вызывается при нажатии на кнопку полного отчета на кассе в блоке платежного терминала.
 */
export const ZReport = (data, next) => {
    const { device } = data;

    // Ваша логика снятия Z-отчета на терминале

    next({ success: true });
};

/**
 * Событие вызывается при закрытии окна ожидания оплаты на кассе. Например, если клиент отказался от оплаты.
 */
export const interrupt = (data, next) => {
    const { device } = data;

    // Ваша логика снятия прерывания оплаты на терминале

    next({ success: true });
};
