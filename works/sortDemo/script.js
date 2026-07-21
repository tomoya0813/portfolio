const data = {
    length: 1000,
}

const itemShuffle = () => {

    const numBox = Array.from({ length: data.length }, (_, i) => i + 1)
    const randItem = [];

    for (let i = data.length; i > 0; i--) {
        const randNum = Math.floor(Math.random() * i);
        randItem.push(numBox[randNum]);
        numBox.splice(randNum, 1)
    }
    return randItem
}

let shuffledArray = itemShuffle()

const BubbleSort = () => {
    let swapCount = 0;
    let compareCount = 0;
    let end = shuffledArray.length - 1;
    let swapped = true;

    while (swapped) {

        swapped = false;

        for (let j = 0; j < end; j++) {
            compareCount++
            if (shuffledArray[j] > shuffledArray[j + 1]) {
                const box = shuffledArray[j];
                shuffledArray[j] = shuffledArray[j + 1];
                shuffledArray[j + 1] = box;
                swapCount++;
                swapped = true;
            }
        }
        end--
    }
    console.table(`比較回数:${compareCount}`, `交換回数:${swapCount}`, `結果${shuffledArray}`,)
    return shuffledArray
}

const SelectionSort = () => {
    for (let i = 0; i < shuffledArray.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < shuffledArray.length; j++) {
            if (shuffledArray[minIndex] > shuffledArray[j]) {
                minIndex = j
            }
        }
        [shuffledArray[i], shuffledArray[minIndex]] = [shuffledArray[minIndex], shuffledArray[i]]
    }
}

console.log('前', shuffledArray)
console.log('後', shuffledArray)

