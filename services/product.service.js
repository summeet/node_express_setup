const Product = require("../schemas/product.schema")
const httpStatus = require("../constant/httpStatus");
const ApiError = require("../utils/ApiError")
const mongoose = require("mongoose")

const createProduct = async (productBody) => {
    try {
        return await Product.create(productBody)
    } catch (error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error.message)
    }
}

const queryProductsByRestaurantId = async (restaurantId) => {
    const products = await Product.find({ restaurantId: mongoose.Types.ObjectId(restaurantId) })
    return products
}

const getProductById = async (productId) => {
    const product = await Product.findById(productId)
    if (!product) {
        throw new ApiError(httpStatus.NOT_FOUND, "Product not found")
    }
    return product
}

const updateProduct = async (productId, updateBody) => {
    const product = await getProductById(productId)
    Object.assign(product, updateBody)
    await product.save()
    return product
}

const deleteProduct = async (productId) => {
    const product = await Product.findByIdAndDelete(productId)
    if (!product) {
        throw new ApiError(httpStatus.NOT_FOUND, "Product not found")
    }
    return product
}

const queryProducts = async () => {
    const products = await Product.find()
    return products
}

const queryProductsByMenuId = async (menuId) => {
    const products = await Product.find({ menuId: new mongoose.Types.ObjectId(menuId) })
    return products
}

const getProductByMenuId = async (menuId) => {
    const products = await Product.findOne({ menuId: new mongoose.Types.ObjectId(menuId)  })
    return products
}

const addVariants = async (productId, variants) => {
    const product = await Product.findByIdAndUpdate(productId, {
        $push: {
            variants
        }
     }, { new: true })
    return product
}

const updateVariant = async (productId, variantId, updateBody) => {
    const product = await getProductById(productId)
    if(!product){
        throw new ApiError(httpStatus.NOT_FOUND, "Product not found")
    }
    const variant = await product.variants.id(variantId)
    if(!variant){
        throw new ApiError(httpStatus.NOT_FOUND, "Variant not found")
    }   
    Object.assign(variant, updateBody)
    await product.save()
    return product
}

const queryVariants = async (productId) => {
    const product = await getProductById(productId)
    if(!product){
        throw new ApiError(httpStatus.NOT_FOUND, "Product not found")
    }
    return product.variants
}

const removeVariant = async (productId, variantId) => {
    const product = await getProductById(productId)
    if(!product){
        throw new ApiError(httpStatus.NOT_FOUND, 'Variant not found')
    }
    const variant = await product.variants.id(variantId)
    if(!variant){
        throw new ApiError(httpStatus.NOT_FOUND, 'Variant not found')
    }
    product.variants.pull(variantId)
    await product.save()
    return product
}

const addBulkProducts = async (products) => {
    return await Product.insertMany(products)
}

module.exports = {
    createProduct,
    queryProductsByRestaurantId,
    getProductById,
    updateProduct,
    deleteProduct,
    queryProducts,
    queryProductsByMenuId,
    getProductByMenuId,
    addVariants,
    updateVariant,
    queryVariants,
    removeVariant,
    addBulkProducts
}