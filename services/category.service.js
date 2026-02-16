const categoryModel = require("../schemas/category.schema")
const ApiError = require("../utils/ApiError")
const httpStatus = require("../constant/httpStatus")

const createCategory = async (categoryBody) => {
    return await categoryModel.create(categoryBody)
}

const queryCategories = async () => {
    return await categoryModel.find()
}

const getCategoryById = async (id) => {
    const category = await categoryModel.findById(id)
    if (!category) {
        throw new ApiError(httpStatus.NOT_FOUND, "Category not found")
    }
    return category
}

const updateCategory = async (id, category) => {
    const updatedCategory = await categoryModel.findByIdAndUpdate(id, category, { new: true })
    if (!updatedCategory) {
        throw new ApiError(httpStatus.NOT_FOUND, "Category not found")
    }
    return updatedCategory
}

const deleteCategory = async (id) => {
    const category = await categoryModel.findByIdAndDelete(id)
    if (!category) {
        throw new ApiError(httpStatus.NOT_FOUND, "Category not found")
    }
}

const queryCategoriesByRestaurantId = async (restaurantId) => {
    return await categoryModel.find({ restaurantId })
}

const getCategoryByName = async (name) => {
    return await categoryModel.findOne({ name: { $regex: new RegExp(name, 'i') } });
}


module.exports = {
    createCategory,
    queryCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
    queryCategoriesByRestaurantId,
    getCategoryByName
}