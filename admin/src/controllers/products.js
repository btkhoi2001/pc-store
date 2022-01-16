import {
    getProductQuantity,
    getProductList,
    deleteProductByProductId,
    getProductByProductId,
} from "../models/services/productService.js";
import { getCategoryBrand } from "../models/services/categoryBrandService.js";
import { getProductSpecificationByProductId } from "../models/services/productSpecificationService.js";
import { getProductImageByProductId } from "../models/services/productImageService.js";

export const show = async (req, res) => {
    const currentPage = req.query.page || 1;
    const limit = req.query.limit || 10;
    const pattern = req.query.search || "";

    try {
        const { productQuantity } = await getProductQuantity({ pattern });
        const totalPages = Math.ceil(productQuantity / limit) || 1;

        if (currentPage < 1)
            res.redirect(`./products?page=1&search=${pattern}`);
        else if (currentPage > totalPages)
            res.redirect(`./products?page=${totalPages}&search=${pattern}`);

        const { products } = await getProductList({
            offset: (currentPage - 1) * limit,
            limit,
            pattern,
        });

        res.render("./products/products.pug", {
            pattern,
            currentPage,
            totalPages,
            products,
        });
    } catch (error) {
        console.log(error);
    }
};

export const deleteProduct = async (req, res) => {
    const { productId } = req.params;

    try {
        const { deletedProduct } = await deleteProductByProductId({
            id: parseInt(productId),
        });
    } catch (error) {
        console.log(error);
    }

    res.status(200).json({});
};

export const showEditProduct = async (req, res) => {
    const { productId } = req.params;

    try {
        const { product } = await getProductByProductId({ id: productId });
        const { productSpecifications } =
            await getProductSpecificationByProductId({ productId });
        const { productImages } = await getProductImageByProductId({
            productId,
        });
        const { categoryBrands } = await getCategoryBrand();

        for (const categoryBrand of categoryBrands) {
            let flag = false;

            for (const brand of categoryBrand.brands)
                if (brand.categoryBrandId == product.categoryBrandId) {
                    categoryBrand.checked = true;
                    brand.checked = true;

                    flag = true;
                    break;
                }

            if (flag) break;
        }

        for (let i = 1; i < 4; i++)
            if (!productImages[i] || productImages[i].numberOrder != i)
                productImages.splice(i, 0, null);

        res.render("./products/edit-product", {
            product,
            productSpecifications,
            productImages,
            categoryBrands,
        });
    } catch (error) {
        console.log(error);
    }
};

export const editProduct = async (req, res) => {
    const { productId } = req.params;
    const {
        productName,
        description,
        category,
        brand,
        spec,
        specValue,
        price,
        published,
    } = req.body;

    if (!productName || !description || !price) {
        req.flash("error", "Mục còn trống");
        return res.redirect(`/products/${productId}/edit`);
    }

    try {
        const categoryBrand = await sequelize.query(
            `SELECT id
            FROM category_brand
            WHERE categoryId = ${category} AND brandId = ${brand}`,
            { type: QueryTypes.SELECT }
        );

        const newProduct = await Product.create({
            name: productName,
            description,
            categoryBrandId: categoryBrand[0].id,
            price,
            published,
        });

        if (typeof spec != "undefined") {
            for (let i = 0; i < spec.length; i++) {
                const newSpec = await ProductSpecification.create({
                    productId: newProduct.dataValues.id,
                    numberOrder: i + 1,
                    content: spec[i],
                    value: specValue[i],
                });
            }
        }

        req.flash("success", "Sửa sản phẩm thành công");
        res.redirect(`/products/${productId}/edit`);
    } catch (error) {
        req.flash("error", "Có lỗi xảy ra, vui lòng thử lại");
        res.redirect(`/products/${productId}/edit`);
    }
};
