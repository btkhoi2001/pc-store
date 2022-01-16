import { getProduct, getProducts } from "../models/services/productService.js";
import { getCategoryFromProductSlug } from "../models/services/categoryService.js";
import { getProductImages } from "../models/services/productImageService.js";
import { getProductSpecificationFromProductSlug } from "../models/services/productSpecificationService.js";
import { getRelativeProducts } from "../models/services/productService.js";
import { getReviews } from "../models/services/reviewService.js";

export const show = async (req, res) => {
    const currentPage = req.query.page || 1;
    const limit = req.query.limit || 12;
    const { search, minPrice, maxPrice, sortBy, categories, brands } =
        req.query;

    try {
        const { totalPages, products, filterBrands, filterCategories } =
            await getProducts({
                search,
                page: currentPage,
                limit,
                minPrice,
                maxPrice,
                brands,
                categories,
                sortBy,
            });

        if (brands !== undefined)
            filterBrands.forEach((value, index, array) => {
                if (brands.includes(value.content)) value.checked = true;
            });

        if (categories !== undefined)
            filterCategories.forEach((value, index, array) => {
                if (categories.includes(value.content)) value.checked = true;
            });

        res.render("./products/products-list", {
            title: "Tìm kiếm",
            currentPage,
            totalPages,
            products,
            filterBrands,
            filterCategories,
            minPrice,
            maxPrice,
            sortBy,
        });
    } catch (error) {
        console.log(error);
    }
};

export const showDetail = async (req, res) => {
    const { productSlug } = req.params;

    try {
        const { product } = await getProduct({ productSlug });
        const { category } = await getCategoryFromProductSlug({ productSlug });
        const { productImages } = await getProductImages({
            productSlug,
        });
        const { productSpecifications } =
            await getProductSpecificationFromProductSlug({ productSlug });
        const { relativeProducts } = await getRelativeProducts({
            categorySlug: [category.slug],
            limit: 5,
        });
        const { totalPages, reviews } = await getReviews({
            productId: product.id,
            limit: 10,
            page: 1,
        });

        res.render("./products/product-details", {
            title: product.name,
            category,
            product,
            productImages,
            productSpecifications,
            relativeProducts,
            currentPage: 1,
            totalPages,
            reviews,
        });
    } catch (error) {
        console.log(error);
    }
};

export const getProductAPI = async (req, res) => {
    const { productId } = req.params;

    try {
        const { product } = await getProduct({ productId });
        const { productImages } = await getProductImages({ productId });

        res.status(200).json({ product, productImages });
    } catch (error) {
        res.status(500).json({});
    }
};
