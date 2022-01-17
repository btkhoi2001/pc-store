import {
    getCategoryBrand,
    getCategoryBrandById,
} from "../models/services/categoryBrandService.js";
import { createNewProduct } from "../models/services/productService.js";
import { createNewProductSpecification } from "../models/services/productSpecificationService.js";
import { createNewProductImage } from "../models/services/productImageService.js";

export const show = async (req, res) => {
    try {
        const { categoryBrands } = await getCategoryBrand();

        res.render("./products/add-product.pug", {
            title: "Thêm sản phẩm",
            currentMenu: "/add-product",
            categoryBrands,
            error: req.flash("error"),
            success: req.flash("success"),
            data: categoryBrands,
        });
    } catch (error) {
        console.log(error);
    }
};

export const createProduct = async (req, res) => {
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
        req.flash("error", "Yêu cầu không hợp lệ");
        return res.redirect("/add-product");
    }

    try {
        const { categoryBrand } = await getCategoryBrandById({
            categoryId: category,
            brandId: brand,
        });

        const { newProduct } = await createNewProduct({
            name: productName,
            description,
            categoryBrandId: categoryBrand.id,
            price,
            published,
        });

        if (specificationContent) {
            for (let i = 0; i < specificationContent.length; i++) {
                const { newProductSpecification } =
                    await createNewProductSpecification({
                        productId: newProduct.id,
                        numberOrder: i + 1,
                        content: specificationContent[i],
                        value: specificationValue[i],
                    });
            }
        }

        if (files) {
            for (let i = 0; i < files.length; i++) {
                const { newProductImage } = await createNewProductImage({
                    file: files[i],
                    productId: newProduct.id,
                    numberOrder: i + 1,
                });
            }
        }

        req.flash("success", "Thêm sản phẩm thành công");
        res.redirect("/add-product");
    } catch (error) {
        console.log(error);
        req.flash("error", "Có lỗi xảy ra, vui lòng nhập lại");
        res.redirect("/add-product");
    }
};
