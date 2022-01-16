import {
    getProducts,
    getRelativeProducts,
} from "../models/services/productService.js";

export const show = async (req, res) => {
    try {
        const newProducts = (
            await getProducts({
                page: 1,
                limit: 10,
                sortBy: "new",
            })
        ).products;

        const componentProducts = (
            await getRelativeProducts({
                categorySlug: [
                    "vi-xu-ly",
                    "tan-nhiet",
                    "bo-mach-chu",
                    "o-cung-hdd",
                    "o-cung-ssd",
                    "card-do-hoa",
                    "bo-nho",
                    "nguon",
                    "vo-may-tinh",
                    "card-am-thanh",
                ],
                limit: 10,
            })
        ).relativeProducts;

        const monitorProducts = (
            await getRelativeProducts({
                categorySlug: ["man-hinh"],
                limit: 10,
            })
        ).relativeProducts;

        const keyboardProducts = (
            await getRelativeProducts({
                categorySlug: ["ban-phim"],
                limit: 10,
            })
        ).relativeProducts;

        const sliderProducts = (
            await getRelativeProducts({
                limit: 3,
            })
        ).relativeProducts;

        res.render("./home/index", {
            title: "Trang chủ",
            newProducts,
            componentProducts,
            monitorProducts,
            keyboardProducts,
            sliderProducts,
        });
    } catch (error) {
        console.log(error);
    }
};
