export const show = async (req, res) => {
    res.render("./order/order", {
        title: "Đơn hàng",
    });
};
