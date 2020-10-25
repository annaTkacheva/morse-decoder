const MORSE_TABLE = {
    '.-':     'a',
    '-...':   'b',
    '-.-.':   'c',
    '-..':    'd',
    '.':      'e',
    '..-.':   'f',
    '--.':    'g',
    '....':   'h',
    '..':     'i',
    '.---':   'j',
    '-.-':    'k',
    '.-..':   'l',
    '--':     'm',
    '-.':     'n',
    '---':    'o',
    '.--.':   'p',
    '--.-':   'q',
    '.-.':    'r',
    '...':    's',
    '-':      't',
    '..-':    'u',
    '...-':   'v',
    '.--':    'w',
    '-..-':   'x',
    '-.--':   'y',
    '--..':   'z',
    '.----':  '1',
    '..---':  '2',
    '...--':  '3',
    '....-':  '4',
    '.....':  '5',
    '-....':  '6',
    '--...':  '7',
    '---..':  '8',
    '----.':  '9',
    '-----':  '0',
};

const NUMBER_DECODE = {
    '.': '10',
    '-': '11',
    ' ': '**********',
};

function decode(expr) {
    let result = [];

    if (isDecoded(expr)) {
        let binaryWords = [];
        piece(expr, 10).forEach(word => binaryWords.push(decodeSpace(word).join('')));
        binaryWords.forEach(word => result.push(MORSE_TABLE[word] || ' '));
    } else {
        expr.split('').forEach((letter) => {
            const decoded = letter !== ' ' ? getKeyByValue(MORSE_TABLE, letter) : ' ';
            result.push(decodeSymbol(decoded));
        });
    }

    return result.join('');
}

function decodeSpace(decodedSpace) {
    let decryptedWords = [];
    if (decodedSpace === '**********') { return [' '] }
    piece(decodedSpace, 2).forEach(item => {
        if (item !== '00') {
            decryptedWords.push(getKeyByValue(NUMBER_DECODE, item))
        }
    });

    return decryptedWords;
}

function decodeSymbol(symb) {
    if (symb === ' ') {
        return NUMBER_DECODE[' ']
    }
    const decoded = []
    let templateArray = ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0']
    symb.split('').forEach((x) => {
        decoded.push(NUMBER_DECODE[x])
    })

    const stringToReplace = decoded.join('')
    templateArray.splice(templateArray.length - stringToReplace.length,
        stringToReplace.length,
        stringToReplace);
    return templateArray.join('');
}

function piece(array, size) {
    const pieced_arr = [];
    let index = 0;
    while (index < array.length) {
        pieced_arr.push(array.slice(index, size + index));
        index += size;
    }

    return pieced_arr;
}


function isDecoded(str) {
    return RegExp(/^[01*]+$/).test(str);
}

function getKeyByValue(object ,value) {
    return Object.keys(object).find(key => object[key] === value);
}

module.exports = {
    decode
}
