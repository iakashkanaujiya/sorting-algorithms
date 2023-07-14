"use strict";
/**
 * Make the content editable
 */
var editableContent = document.querySelectorAll(".col-1[contenteditable='true']");


//add random values
for (let i = 0; i < editableContent.length; i++) {
    editableContent[i].innerText = Math.floor(Math.random() * 100);
};

for (let i = 0; i < editableContent.length; i++) {
    editableContent[i].addEventListener('input', function () {
        var content = editableContent[i].innerText;
        // content should not be greater than 2 length
        if (content.length > 2) {
            editableContent[i].innerText = content.slice(0, 2);
        }
    });
    editableContent[i].addEventListener('blur', function () {
        var content = editableContent[i].innerText;
        if (content.length == 0) {
            editableContent[i].innerText = 0;
        }
    });
};

//deplay function
function wait(delay) {
    return new Promise(function (resolve) {
        setTimeout(resolve, delay);
    });
}

/**
 * Classes
 * 'show' to show the selection animation
 * 'arrow' to use as a pointer arrow 
 * (Show the pointing arrow on the selected Array Element)
 */
let classArray = ['show', 'arrow'];

/**
 * Bubble Sort
 */
async function bubbleSort() {
    // Get the Array element
    let divArr = document.getElementById("arr-data");
    let childElements = divArr.children;

    for (let i = 0; i < childElements.length - 1; i++) {
        let swapped = false;

        for (let j = 0; j < childElements.length - 1; j++) {
            //take the values
            let x = parseInt(childElements.item(j).innerText);
            let y = parseInt(childElements.item(j + 1).innerText);

            childElements.item(j).classList.add(...classArray);
            childElements.item(j + 1).classList.add(...classArray);

            //wait before swaping the element
            await wait(1000);

            if (x > y) {
                childElements.item(j).innerText = y;
                childElements.item(j + 1).innerText = x;
                swapped = true;
            }

            // wait before removing the class to show animation
            await wait(1000);

            childElements.item(j).classList.remove(...classArray);
            childElements.item(j + 1).classList.remove(...classArray);
        }
        if (swapped === false) {
            break;
        }
    }
};

//selection sort
const selectionSort = async () => {
    let divArr = document.getElementById("arr-data");
    let childElements = divArr.children;

    for (let i = 0; i < childElements.length - 1; i++) {
        //take the min index
        let minIdx = i;

        // add the class to first element
        childElements.item(i).classList.add(...classArray);

        for (let j = i + 1; j < divArr.children.length; j++) {
            let x = parseInt(childElements.item(minIdx).innerText);
            let y = parseInt(childElements.item(j).innerText);

            //move to others
            childElements.item(j).classList.add(...classArray);
            await wait(1000);

            if (y < x) {
                minIdx = j;
            }

            await wait(1000);
            childElements.item(j).classList.remove(...classArray);
        };

        if (minIdx != i) {
            childElements.item(minIdx).classList.add(...classArray);
            await wait(1000);

            let x = childElements.item(i).innerText;
            childElements.item(i).innerText = childElements.item(minIdx).innerText;
            childElements.item(minIdx).innerText = x;

            await wait(1000);
            divArr.children.item(minIdx).classList.remove(...classArray);
        }

        childElements.item(i).classList.remove(...classArray);
    };
};

//insetion sort
const insertionSort = async () => {
    let divArr = document.getElementById("arr-data");
    let childElements = divArr.children;

    for (let i = 1; i < childElements.length; i++) {
        for (let j = i; j > 0; j--) {
            childElements.item(j).classList.add(...classArray);
            childElements.item(j - 1).classList.add(...classArray);
            await wait(1000);

            if (parseInt(childElements.item(j).innerText) < parseInt(childElements.item(j - 1).innerText)) {
                //swap
                let x = childElements.item(j - 1).innerText;
                childElements.item(j - 1).innerText = childElements.item(j).innerText;
                childElements.item(j).innerText = x;
            }

            await wait(1000);
            childElements.item(j).classList.remove(...classArray);
            childElements.item(j - 1).classList.remove(...classArray);
        };
    };
}

/**
 * Quick Sort Partition
 */
async function partition(childElements, l, h) {

    let pivot = parseInt(childElements.item(h).innerText);
    let i = l - 1;

    /** Display as Pivot Element */
    childElements.item(h).classList.add(...classArray, "pivot");

    for (let j = l; j <= h - 1; j++) {
        // If current element is smaller than the pivot
        childElements.item(j).classList.add(...classArray);
        await wait(1000);
        /**
         * Compare with pivot element
         * and make the space the smallar element
         */
        if (parseInt(childElements.item(j).innerText) < pivot) {
            i++;
            childElements.item(i).classList.add(...classArray);
            await wait(1000);

            let temp = childElements.item(i).innerText;
            childElements.item(i).innerText = childElements.item(j).innerText;
            childElements.item(j).innerText = temp;

            await wait(1000);
            childElements.item(i).classList.remove(...classArray);
            childElements.item(j).classList.remove(...classArray);
        }

        if (childElements.item(j).classList.contains("show")) {
            await wait(1000);
            childElements.item(j).classList.remove(...classArray);
        }
    };

    childElements.item(i + 1).classList.add(...classArray);
    await wait(1000);

    /**
     * Add the pivot element at the right place
     */
    let temp = childElements.item(i + 1).innerText;
    childElements.item(i + 1).innerText = childElements.item(h).innerText;
    childElements.item(h).innerText = temp;

    await wait(1000);
    childElements.item(h).classList.remove(...classArray, "pivot");
    childElements.item(i + 1).classList.remove(...classArray);

    return (i + 1);
};

/**
 * 
 * @param {NodeList} childElements 
 * @param {Number} l 
 * @param {Number} h 
 */
const quick_Sort = async (childElements, l, h) => {
    if (l < h) {
        let pivotIdx = await partition(childElements, l, h);
        childElements.item(pivotIdx).classList.add("seperator");
        await quick_Sort(childElements, l, pivotIdx - 1);
        await quick_Sort(childElements, pivotIdx + 1, h);
    }
};
/**
 * Quick Sort
 */
const quickSort = async () => {
    let divArr = document.getElementById("arr-data");
    let childElements = divArr.children;

    let l = 0, h = divArr.children.length - 1;
    await quick_Sort(childElements, l, h);

    //remove the seperator class that seperate pivot element and make
    // recursive calls
    for (let i = 0; i < divArr.children.length; i++) {
        if (childElements.item(i).classList.contains("seperator")) {
            childElements.item(i).classList.remove("seperator")
        };
    }
};


/**
 * Merge Sort
 */

/**
 * Display the Temp Array DIV
 * @returns div
 */
function insertElements() {
    const div = document.getElementById("arr-data1");
    div.classList.add("t-show");
    return div;
};

//Merge into temp array
async function merge(childElements, arr, low, mid, high) {
    let classArray = ['show', 'arrow'];

    let i = low;
    let j = mid + 1;
    let k = i;

    childElements.item(mid).classList.add("mid");
    await wait(1000);

    while (i <= mid && j <= high) {
        childElements.item(i).classList.add(...classArray);
        childElements.item(j).classList.add(...classArray);
        arr.item(k).classList.add(...classArray);
        await wait(1000);

        if (parseInt(childElements.item(i).innerText) < parseInt(childElements.item(j).innerText)) {
            arr.item(k).innerText = childElements.item(i).innerText;
            i++; k++;

            await wait(1000);
            childElements.item(i-1).classList.remove(...classArray);
            arr.item(k-1).classList.remove(...classArray);
        } else {
            arr.item(k).innerText = childElements.item(j).innerText;
            j++; k++;

            await wait(1000);
            childElements.item(j-1).classList.remove(...classArray);
            arr.item(k - 1).classList.remove(...classArray);
        }        
    };

    await wait(1000);
    childElements.item(mid).classList.remove("mid");

    if (i > mid) {
        while (j <= high) {
            arr.item(k).classList.add(...classArray);
            childElements.item(j).classList.add(...classArray);
            await wait(1000);

            arr.item(k).innerText = childElements.item(j).innerText;
            k++; j++;

            await wait(1000);
            arr.item(k-1).classList.remove(...classArray);
            childElements.item(j-1).classList.remove(...classArray);
        }
    } else {
        while (i <= mid) {
            arr.item(k).classList.add(...classArray);
            childElements.item(i).classList.add(...classArray);

            arr.item(k).innerText = childElements.item(i).innerText;
            k++; i++;

            arr.item(k-1).classList.remove(...classArray);
            childElements.item(i-1).classList.remove(...classArray);
        }
    }

    for (let m = low; m <= high; m++){
        arr.item(m).classList.add(...classArray);
        childElements.item(m).classList.add(...classArray);

        childElements.item(m).innerText = arr.item(m).innerText;

        arr.item(m).classList.remove(...classArray);
        childElements.item(m).classList.remove(...classArray);
    };
    return;
};

/**
 * 
 * @param {NodeList} childElements 
 * @param {NodeList} arr 
 * @param {Number} low 
 * @param {Number} high 
 */
async function merge_sort(childElements, arr, low, high) {
    if (low < high) {
        let mid = Math.floor((low + high) / 2);
        await merge_sort(childElements, arr, low, mid);
        await merge_sort(childElements, arr, mid + 1, high);
        await merge(childElements, arr, low, mid, high);
    };
};

async function mergeSort() {
    let divArr = document.getElementById("arr-data");
    let childElements = divArr.children;
    let div = insertElements(childElements);
    let low = 0, high = childElements.length - 1;
    
    await wait(1000);
    await merge_sort(childElements, div.children, low, high);

    // Hide the Temp Array
    div.classList.remove("t-show");
};

