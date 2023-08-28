
let data = {
    id: 1,
    name: 2,
}

function paramsChangeGet(data) {
    let str = '?'
    for (let i in data) {
        str += `${i}=${data[i]}&`
    }
    return str.replace(/.$/, "")
}
let url = "" + paramsChangeGet(data)
console.log('🎂', url);
