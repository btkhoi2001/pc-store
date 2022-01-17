import {
    getProducts,
    deleteProductByProductId,
    getProduct,
    updateProduct,
} from "../models/services/productService.js";
import { getCategories } from "../models/services/categoryService.js";
import {
    getCategoryBrandById,
    getCategoryBrands,
} from "../models/services/categoryBrandService.js";
import {
    deleteProductSpecification,
    getProductSpecificationByProductId,
} from "../models/services/productSpecificationService.js";
import {
    createNewProductImage,
    deleteProductImage,
} from "../models/services/productImageService.js";

export const show = async (req, res) => {
    const currentPage = req.query.page || 1;
    const limit = req.query.limit || 10;
    const { search, sortBy, category } = req.query;

    try {
        const { totalPages, products } = await getProducts({
            page: currentPage,
            limit,
            search,
            sortBy,
            category,
        });

        const { categories } = await getCategories();

        res.render("./products/products.pug", {
            title: "Sản phẩm",
            currentMenu: "/products",
            search,
            currentPage,
            totalPages,
            categories,
            category,
            products,
            sortBy,
        });
    } catch (error) {
        console.log(error);
    }
};

export const deleteProduct = async (req, res) => {
    const { productId } = req.params;

    try {
        await deleteProductByProductId({
            id: parseInt(productId),
        });

        res.status(200).json({});
    } catch (error) {
        res.status(500).json({});
    }
};

export const showEditProduct = async (req, res) => {
    const { productId } = req.params;

    try {
        const { product } = await getProduct({ productId });
        const { productSpecifications } =
            await getProductSpecificationByProductId({ productId });
        const { categoryBrands } = await getCategoryBrands();

        for (const categoryBrand of categoryBrands) {
            let flag = false;
            for (const brand of categoryBrand.brands) {
                if (brand.categoryBrandId == product.categoryBrandId) {
                    categoryBrand.checked = true;
                    brand.checked = true;
                    flag = true;
                    break;
                }
            }
            if (flag) break;
        }

        res.render("./products/edit-product", {
            title: "Cập nhật sản phẩm",
            currentMenu: "/products",
            product,
            productSpecifications,
            categoryBrands,
            data: categoryBrands,
            success: req.flash("success"),
            error: req.flash("error"),
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
        specificationContent,
        specificationValue,
        price,
        published,
    } = req.body;

    const { files } = req;

    if (!productName || !description || !price) {
        req.flash("error", "Mục còn trống");
        return res.redirect(`/products/${productId}/edit`);
    }

    try {
        const { categoryBrand } = await getCategoryBrandById({
            categoryId: category,
            brandId: brand,
        });

        await updateProduct({
            productId,
            description,
            categoryBrandId: categoryBrand.id,
            price,
            published,
        });

        await deleteProductSpecification({ productId });

        if (specificationContent) {
            for (let i = 0; i < specificationContent.length; i++) {
                await createNewProductSpecification({
                    productId,
                    numberOrder: i + 1,
                    content: specificationContent[i],
                    value: specificationValue[i],
                });
            }
        }

        await deleteProductImage({ productId });

        if (files) {
            for (let i = 0; i < files.length; i++) {
                await createNewProductImage({
                    file: files[i],
                    productId,
                    numberOrder: i + 1,
                });
            }
        }

        req.flash("success", "Sửa sản phẩm thành công");
        res.redirect(`/products/${productId}/edit`);
    } catch (error) {
        console.log(error);
        req.flash("error", "Có lỗi xảy ra, vui lòng thử lại");
        res.redirect(`/products/${productId}/edit`);
    }
};
