import numeral from 'numeral';

// ----------------------------------------------------------------------

export function fCurrency(number) {
    return numeral(number).format(Number.isInteger(number) ? '0,0.00' : '0,0.00');
}

export function fPercent(number) {
    return numeral(number / 100).format('0.0%');
}

export function fNumber(number) {
    return numeral(number).format();
}

export function fShortenNumber(number) {
    return numeral(number).format('0.00a').replace('.00', '');
}

export function fData(number) {
    return numeral(number).format('0.0 b');
}

export function fPhone(number) {
    let phone = number;
    phone = phone.replace(/ /gm, '');
    let num = "";

    if (phone.length === 11) {
        num = `(+${phone.substring(0, 1)}) ${phone.substring(1, 4)} - ${phone.substring(4, 7)} - ${phone.substring(7, phone.length)}`;
    } else if (phone.length === 12) {
        num = `(+${phone.substring(0, 2)}) ${phone.substring(2, 5)} - ${phone.substring(5, 8)} - ${phone.substring(8, phone.length)}`;
    } else if (phone.length === 13) {
        num = `(+${phone.substring(0, 3)}) ${phone.substring(3, 6)} - ${phone.substring(6, 9)} - ${phone.substring(9, phone.length)}`;
    } else if (phone.length === 14) {
        num = `(+${phone.substring(0, 4)}) ${phone.substring(4, 7)} - ${phone.substring(7, 10)} - ${phone.substring(10, phone.length)}`;
    } else {
        num = `${phone.substring(0, 3)} - ${phone.substring(3, 6)} - ${phone.substring(6, phone.length)}`;
    }

    num = num.trim();
    return num;
}
