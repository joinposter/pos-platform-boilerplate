/**
 * Storage wrapper, so you can switch for better solution like websql if you need
 */
export default class Storage {
    /**
     * Сохраняет объект в БД
     * @param key
     * @param value
     */
    static set(key, value) {
        if (typeof value === 'object') {
            value = JSON.stringify(value);
        }

        localStorage.setItem(key, value);
    }

    /**
     * Получает значение из БД
     * @param key
     * @returns {*}
     */
    static get(key) {
        let value = localStorage.getItem(key);
        if (typeof value === 'string') {
            try {
                value = JSON.parse(value);
            } catch (e) {
                console.error('Storage.get JSON parse error', value);
            }
        }

        return value;
    }

    static remove(key) {
        localStorage.setItem(key, null);
    }
}
