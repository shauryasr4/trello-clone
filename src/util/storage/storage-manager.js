function processVal(val) {
    if (typeof val === 'string')
        return val
    return JSON.stringify(val)
}
function setItem(key, val) {
    localStorage.setItem(key, processVal(val));
}
function getItem(key, shouldParse = true) {
    if (shouldParse)
        return JSON.parse(localStorage.getItem(key));
    return localStorage.getItem(key)
}
function deleteItem(key) {
    localStorage.removeItem(key)
}

const exportObject = {
    setItem,
    getItem,
    deleteItem,
}

export default exportObject;