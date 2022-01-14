import { getProducts } from "../models/services/productService.js";
import { getBrandsByCategorySlug } from "../models/services/brandService.js";
import { getCategoryFromCategorySlug } from "../models/services/categoryService.js";

export const show = async (req, res) => {
    const { categorySlug } = req.params;
    const currentPage = req.query.page || 1;
    const limit = req.query.limit || 12;
    const filterBrands = req.query.brands;
    const { minPrice, maxPrice, sortBy } = req.query;

    try {
        const { category } = await getCategoryFromCategorySlug({
            categorySlug,
        });

        const { totalPages, products } = await getProducts({
            categorySlug,
            page: currentPage,
            limit,
            minPrice,
            maxPrice,
            brands: filterBrands,
            sortBy,
        });

        const { brands } = await getBrandsByCategorySlug({
            categorySlug,
        });

        if (typeof filterBrands != "undefined")
            brands.forEach((value, index, array) => {
                if (filterBrands.includes(value.content)) value.checked = true;
            });

        res.render("./products/products-list", {
            title: category.content,
            category,
            currentPage,
            totalPages,
            products,
            filterBrands: brands,
            minPrice,
            maxPrice,
            sortBy,
        });
    } catch (error) {
        console.log(error);
    }
};
