import { getProduct } from "../models/services/productService.js";
import { getCategoryFromProductSlug } from "../models/services/categoryService.js";
import { getProductImages } from "../models/services/productImageService.js";
import { getProductSpecificationFromProductSlug } from "../models/services/productSpecificationService.js";
import { getRelativeProducts } from "../models/services/productService.js";

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
            categorySlug: category.slug,
            limit: 5,
        });

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
