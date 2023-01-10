function merge(left, right) {
    let arr = []
    // Break out of loop if any one of the array gets empty
    while (left.length && right.length) {
        if (new Date(left[0].date) > new Date(right[0].date)) {
            arr.push(left.shift())
        } else {
            arr.push(right.shift())
        }
    }

    return [...arr, ...left, ...right]
}

export const mergeSort = (array) => {
    const half = array.length / 2
    // Base case or terminating case
    if (array.length < 2) return array

    const left = array.splice(0, half)
    return merge(mergeSort(left), mergeSort(array))
}