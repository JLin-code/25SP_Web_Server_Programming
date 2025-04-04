
const data = require('../data/products.json')
const CustomError = require('../utils/CustomError')
const statusCodes = require('../utils/statusCodes')

const isAdmin = true;

async function getAll() {
    return data.items
}

async function get(id) {
    const item = data.items.find((item) => item.id == id)
    if (!item) 
        throw new CustomError('Item not found', statusCodes.NOT_FOUND)
    return item
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