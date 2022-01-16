import { getProducts } from "../models/services/productService.js";
import { getBrandsByCategorySlug } from "../models/services/brandService.js";
import { getCategoryFromCategorySlug } from "../models/services/categoryService.js";

export const show = async (req, res) => {
    const { categorySlug } = req.params;
    const currentPage = req.query.page || 1;
    const limit = req.query.limit || 12;
    const { minPrice, maxPrice, sortBy, brands } = req.query;

    try {
        const { category } = await getCategoryFromCategorySlug({
            categorySlug,
        });

        const { totalPages, products, filterBrands } = await getProducts({
            categorySlug,
            page: currentPage,
            limit,
            minPrice,
            maxPrice,
            brands,
            sortBy,
        });

        if (brands !== undefined)
            filterBrands.forEach((value, index, array) => {
                if (brands.includes(value.content)) value.checked = true;
            });

        res.render("./products/products-list", {
            title: category.content,
            category,
            currentPage,
            totalPages,
            products,
            filterBrands,
            minPrice,
            maxPrice,
            sortBy,
        });
    } catch (error) {
        console.log(error);
    }
};
