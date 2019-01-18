export default class Helper {
    static setCookie(name, value, expires, path, domain, secure) {
        document.cookie = `${name}=${encodeURI(value)
        }${(expires) ? `; expires=${expires}` : '; expires=Mon, 07-Dec-2030 00:00:00 GMT'
        }${(path) ? `; path=${path}` : '; path=/'
        }${(domain) ? `; domain=${domain}` : ''
        }${(secure) ? '; secure' : ''}`;
    }

    static getCookie(name) {
        const cookie = ` ${document.cookie}`;
        const search = ` ${name}=`;
        let setStr = null;
        let offset = 0;
        let end = 0;

        if (cookie.length > 0) {
            offset = cookie.indexOf(search);
            if (offset !== -1) {
                offset += search.length;
                end = cookie.indexOf(';', offset);
                if (end === -1) {
                    end = cookie.length;
                }
                setStr = decodeURI(cookie.substring(offset, end));
            }
        }
        return (setStr);
    }

    static delCookie(name) {
        document.cookie = `${name}=` + '; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    }

    static floatFormat(number, round = false) {
        let parsed = parseFloat(number),
            excludedCountries = ['UZ', 'LA'],
            country = Poster.settings.country;

        // Костыль для вьетнама, Узбекистана -  не показываем копейки
        if (Poster.settings.currency === 'vnd' || excludedCountries.indexOf(country) > -1 || round) {
            parsed = parsed.toFixed(0);
        } else {
            parsed = parsed.toFixed(2);
        }

        parsed = Helper.changeComa(parsed);

        // Для Лаоса добавляем пробелы между тысячами
        if (country === 'LA') {
            parsed = (+parsed).toLocaleString('ru-RU');
        }

        return parsed;
    }

    static changeComa(value) {
        const lang = Poster.settings.lang;
        if (lang === 'ru' || lang === 'ua') {
            return `${value}`.replace('.', ',');
        }

        return value;
    }

    static moneyFormat(amount, showCurrency = true) {
        let result = '',
            currency = Poster.settings.currency,
            currencySymbol = Poster.settings.currencySymbol;

        result += Helper.floatFormat(amount);

        if (showCurrency) {
            if (currency === 'грн.' || currency === 'руб.') {
                // TODO: &nbsp;
                result += ` ${currency}`;
            } else if (currencySymbol === '$' || currencySymbol === '£') {
                result = `${currencySymbol}${result}`;
            } else if (currencySymbol === 'R') {
                // TODO: &nbsp;
                result = `${currencySymbol} ${result}`;
            } else {
                // TODO: &nbsp;
                result += ` ${currencySymbol}`;
            }
        }

        return result;
    }

    static getEditDistance(a, b) {
        if (a.length === 0) return b.length;
        if (b.length === 0) return a.length;

        const matrix = [];

        // increment along the first column of each row
        let i;
        for (i = 0; i <= b.length; i++) {
            matrix[i] = [i];
        }

        // increment each column in the first row
        let j;
        for (j = 0; j <= a.length; j++) {
            matrix[0][j] = j;
        }

        // Fill in the rest of the matrix
        for (i = 1; i <= b.length; i++) {
            for (j = 1; j <= a.length; j++) {
                if (b.charAt(i - 1) == a.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, // substitution
                        Math.min(matrix[i][j - 1] + 1, // insertion
                            matrix[i - 1][j] + 1)); // deletion
                }
            }
        }

        return matrix[b.length][a.length];
    }
}
