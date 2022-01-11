import { getProductsListByCategorySlug } from "../models/services/productService.js";
import { getBrandsByCategorySlug } from "../models/services/brandService.js";
import { getCategoryFromCategorySlug } from "../models/services/categoryService.js";

export const show = async (req, res) => {
    const { categorySlug } = req.params;
    const currentPage = req.query.page || 1;
    const limit = req.query.limit || 12;
    const filterBrands = req.query.brands;

    try {
        const { category } = await getCategoryFromCategorySlug({
            categorySlug,
        });

        const { totalPages, products } = await getProductsListByCategorySlug({
            categorySlug,
            page: currentPage,
            limit,
            brands: filterBrands,
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
            currentPage,
            totalPages,
            products,
            filterBrands: brands,
        });
    } catch (error) {
        console.log(error);
    }
};
