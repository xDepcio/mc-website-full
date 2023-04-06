const arr = new Array(27).fill(null)

const newVal = arr.map((e, i) => {
    console.log('t')
    return i
})

console.log(arr, newVal)
