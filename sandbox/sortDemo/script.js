const data = {
    length: 20,
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
    console.table(`比較回数:${compareCount}`, `交換回数:${swapCount}`, `結果${shuffledArray}`)
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

const insertionSort = () => {

    for (let i = 1; i < shuffledArray.length; i++) {
        const currentIndex = shuffledArray[i];
        let changeIndex = i

        for (let j = i - 1; j >= 0; j--) {

            if (shuffledArray[j] < shuffledArray[i]) {
                break;
            }
            changeIndex = j + 1
        }
        splice(currentIndex, 1);
        splice(changeIndex, 0, currentIndex)

    }
}
// console.table(`比較回数:${compareCount}`, `交換回数:${swapCount}`, `結果${shuffledArray}`,)


//====================================================================
let shuffledArray = itemShuffle()
console.log('ソート前', shuffledArray)
//BubbleSort();
//SelectionSort ();
insertionSort()
console.log('ソート後', shuffledArray)

