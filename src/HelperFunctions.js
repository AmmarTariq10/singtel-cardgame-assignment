import uuid from 'react-native-uuid';
const generatePairs = (numbers) => {
    var theRandomNumber = Math.floor(Math.random() * 100) + 1;
    if (numbers.includes(theRandomNumber)) {
        return generatePairs(numbers)
    }
    return theRandomNumber;
}
const generateNumbers = () => {
    var numbers = [];
    for (let i = 0; i < 7; i++) {
        numbers.push(generatePairs(numbers));
    }
    return numbers;
}
const getIndex = array => {
    var index = Math.floor(Math.random() * 12)
    const res = array.filter(item => item === undefined)
    if (res.length > 0) {
        if (array[index] != undefined) {
            return getIndex(array)
        }
        return index
    }
}
export const createCards = () => {
    var numbers = generateNumbers()
    var cards = new Array(12).fill(undefined)
    for (let number in numbers) {
        cards[getIndex(cards)] = {
            number: parseInt(number),
            id: uuid.v4()
        }
        cards[getIndex(cards)] = {
            number: parseInt(number),
            id: uuid.v4()
        }
    }
    return cards
}