const { categoryService } = require("../services")
const catchAsync = require("../utils/catchAsync")
const httpStatus = require("../constant/httpStatus")

const createCategory = catchAsync(async (req, res) => {
    const category = await categoryService.createCategory(req.body)
    res.status(httpStatus.CREATED).send({
        message: "Category created successfully",
        data: category
    })
})

const queryCategories = catchAsync(async (req, res) => {
    const categories = await categoryService.queryCategories()
    res.status(httpStatus.SUCCESS).send({
        data: categories
    })
})

const getCategoryById = catchAsync(async (req, res) => {
    const category = await categoryService.getCategoryById(req.params.id)
    res.status(httpStatus.SUCCESS).send({
        data: category
    })
})

const updateCategory = catchAsync(async (req, res) => {
    const { params, body } = req;
    const category = await categoryService.updateCategory(params.id, body)
    res.status(httpStatus.SUCCESS).send({
        message: "Category updated successfully",
        data: category
    })
})

const deleteCategory = catchAsync(async (req, res) => {
    await categoryService.deleteCategory(req.params.id)
    res.status(httpStatus.NO_CONTENT).send({
        message: "Category deleted successfully"
    })
})

const getCategoryByRestaurantId = catchAsync(async (req, res) => {
    const categories = await categoryService.queryCategoryByRestaurantId(req.params.restaurantId)
    res.status(httpStatus.SUCCESS).send({
        data: categories
    })
})

const getCategoryByName = catchAsync(async (req, res) => {
    const category = await categoryService.getCategoryByName(req.params.name)
    res.status(httpStatus.SUCCESS).send({
        data: category
    })
})

module.exports = {
    createCategory,
    queryCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
    getCategoryByRestaurantId,
    getCategoryByName
}

