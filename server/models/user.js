const data = require('../data/products.json')
const { CustomError, statusCodes } = require('./errors')
const { connect } = require('./supabase')

const TABLE_NAME = 'users'

const BaseQuery = () => connect().from(TABLE_NAME)
    .select('*')
    //.select('*')

const isAdmin = true;

async function getAll(limit = 30, offset = 0, sort = 'id', order = 'desc'){
    const list = await BaseQuery()
    .order(sort, { ascending: order === 'asc' })
    .range(offset, offset + limit - 1) // 0 based index but range is inclusive
    if(list.error){
        throw list.error
    }
    return {
        items: list.data,
        total: list.count
    }
}

async function get(id){
    const { data: item, error } = await connect().from(TABLE_NAME)
    .select('*, product_reviews(*)').eq('id', id)
    if (!item.length) {
        throw new CustomError('Item not found', statusCodes.NOT_FOUND)
    }
    if (error) {
        throw error
    }
    return item
}

async function search(query, limit = 30, offset = 0, sort = 'id', order = 'desc'){
    const { data: items, error, count } = await BaseQuery()
    .or(`firstName.ilike.%${query}%,lastName.ilike.%${query}%,email.ilike.%${query}%,phaneNumber.ilike.%${query}%`)
    .order(sort, { ascending: order === 'asc' })
    .range(offset, offset + limit -1)
    if (error) {
        throw error
    }
    return {
        items,
        total: count
    }
} 

async function create(item){
    if(!isAdmin){
        throw CustomError("Sorry, you are not authorized to create a new item", statusCodes.UNAUTHORIZED)
    }
    const { data: newItem, error } = await connect().from(TABLE_NAME).insert(item).select('*')
    if (error) {
        throw error
    }
    return newItem
}

async function update(id, item){
    if(!isAdmin){
        throw CustomError("Sorry, you are not authorized to update this item", statusCodes.UNAUTHORIZED)
    }
    const { data: updatedItem, error } = await connect().from(TABLE_NAME).update(item).eq('id', id).select('*')
    if (error) {
        throw error
    }
    return updatedItem

}

async function remove(id){
    if(!isAdmin){
        throw CustomError("Sorry, you are not authorized to delete this item", statusCodes.UNAUTHORIZED)
    }
    const { data: deletedItem, error } = await connect().from(TABLE_NAME).delete().eq('id', id)
    if (error) {
        throw error
    }
    return deletedItem
}

async function seed(){
    for (const item of data.items) {

        const insert = mapToDB(item)
        const { data: newItem, error } = await connect().from(TABLE_NAME).insert(insert).select('*')
        if (error) {
            throw error
        }

        for (const review of item.reviews) {
            const reviewInsert = mapReviewToDB(review, newItem[0].id)

            const { data: newReview, error } = await connect().from('product_reviews').insert(reviewInsert).select('*')

            if (error) {
                throw error
            }
        }

    }
    return { message: 'Seeded successfully' }
}

function mapToDB(item) {
    return {
        firstName: item.firstName,
        lastName: item.lastName,
        email: item.email,
        phoneNumber: item.phoneNumber,
        age: item.age,
        gender: item.gender,
        birthDate: item.birthDate,
        image: item.image,
        university: item.university,
        role: item.role
    }
}

function mapReviewToDB(review, product_id) {
    return {
        product_id: product_id,
        rating: review.rating,
        comment: review.comment,
        reviewer_email: review.reviewerEmail,
        reviewer_name: review.reviewerName,
        date: review.date,
    }
}

module.exports = {
    getAll,
    get,
    search,
    create,
    update,
    remove,
    seed,
}