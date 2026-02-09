const productService = require("../services/product.service")
const httpStatus = require("../constant/httpStatus")
const catchAsync = require("../utils/catchAsync")

const createProduct = catchAsync(async (req, res) => {
   try {
        const product = await productService.createProduct(req.body)
        res.status(httpStatus.CREATED).send({
            message: "Product created successfully",
            data: product
        })
   } catch (error) {
        res.status(httpStatus.BAD_REQUEST).send({
            message: "Product creation failed",
            error: error.message
        })
   }
})

const queryProducts = catchAsync(async (req, res) => {
    const products = await productService.queryProducts();
    res.status(httpStatus.SUCCESS).send({
        data: products
    })
})

const getProductById = catchAsync(async (req, res) => {
    const product = await productService.getProductById(req.params.id)
    res.status(httpStatus.SUCCESS).send({
        data: product
    })
})

const updateProduct = catchAsync(async (req, res) => {
    const { params, body } = req;
    const product = await productService.updateProduct(params.id, body)
    res.status(httpStatus.SUCCESS).send({
        message: "Product updated successfully",
        data: product
    })
})

const deleteProduct = catchAsync(async (req, res) => {
    const { params } = req;
    await productService.deleteProduct(params.id)
    res.status(httpStatus.SUCCESS).send({
        message: "Product deleted successfully"
    })
})

const getProductByMenuId = catchAsync(async (req, res) => {
    const products = await productService.queryProductsByMenuId(req.params.menuId)
    res.status(httpStatus.SUCCESS).send({
        data: products
    })
})

const getProductsByRestaurantId = catchAsync(async (req, res) => {
    const products = await productService.queryProductsByRestaurantId(req.params.restaurantId)
    res.status(httpStatus.SUCCESS).send({
        data: products
    })
})

const addVariants = catchAsync(async (req, res) => {
    const { productId } = req.params;
    const products = await productService.addVariants(productId, req.body)
    res.status(httpStatus.SUCCESS).send({
        message: "Variants added successfully",
        data: products
    })
})

const updateVariant = catchAsync(async (req, res) => {
    const { productId, variantId } = req.params;
    const products = await productService.updateVariant(productId, variantId, req.body)
    res.status(httpStatus.SUCCESS).send({
        message: "Variant updated successfully",
        data: products
    })
})

const queryVariants = catchAsync(async (req, res) => {
    const { productId } = req.params;
    const variants = await productService.queryVariants(productId)
    res.status(httpStatus.SUCCESS).send({
        data: variants
    })
})

const removeVariant = catchAsync(async (req, res) => {
    const { productId, variantId } = req.params;
    const products = await productService.removeVariant(productId, variantId)
    res.status(httpStatus.SUCCESS).send({
        message: "Variant removed successfully",
        data: products
    })
})

module.exports = {
    createProduct,
    queryProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getProductByMenuId,
    getProductsByRestaurantId,
    addVariants,
    updateVariant,
    queryVariants,
    removeVariant
}
