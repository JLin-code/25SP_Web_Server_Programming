
const data = require('../data/products.json')

async function getAll() {
    return data.items
}

async function get(id) {
    return data.items.find(item => item.id == id)
    if(!item) {
        throw new Error('Item not found', Error)
    }
}

async function create(item) {
    const newItem = {
        id: data.items.length + 1,
        ...item
    }
    data.push(newItem)
    return newItem
}

async function update(id, item) {
    const index = data.items.findIndex((item) => item.id == id)
    if (index === -1) {
        return null
    }
    const updatedItem = { 
        ...data[index], 
        ...item 
    }
    data[index] = updatedItem
    return updatedItem

}

async function remove(id) {
    const index = data.items.findIndex((item) => item.id == id)
    if (index === -1) {
        return null
    }
    const deletedItem = data[index]
    data.items.splice(index, 1)[0]
    return deletedItem

}

module.exports = {
    getAll,
    get,
    create,
    update,
    remove
}