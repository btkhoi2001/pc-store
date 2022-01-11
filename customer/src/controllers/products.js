import { getProductByProductSlug } from "../models/services/productService.js";
import { getCategoryFromProductSlug } from "../models/services/categoryService.js";
import { getProductImageFromProductSlug } from "../models/services/productImageService.js";
import { getProductSpecificationFromProductSlug } from "../models/services/productSpecificationService.js";
import { getRelativeProductListByCategorySlug } from "../models/services/productService.js";

export const showDetail = async (req, res) => {
    const { productSlug } = req.params;

    try {
        const { product } = await getProductByProductSlug({ productSlug });
        const { category } = await getCategoryFromProductSlug({ productSlug });
        const { productImages } = await getProductImageFromProductSlug({
            productSlug,
        });
        const { productSpecifications } =
            await getProductSpecificationFromProductSlug({ productSlug });
        const { relativeProducts } = await getRelativeProductListByCategorySlug(
            {
                categorySlug: category.slug,
                limit: 5,
            }
        );

        res.render("./products/product-details", {
            title: product.name,
            category,
            product,
            productImages,
            productSpecifications,
            relativeProducts,
        });
    } catch (error) {
        console.log(error);
    }
};
