import uniqid from 'uniqid';

function generateId() {
    return uniqid()
}

const exportObject = {
    generateId
}

export default exportObject;