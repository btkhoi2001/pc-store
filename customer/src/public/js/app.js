$("#pagination-products li a").click((event) => {
    event.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    const href = $(event.target).attr("href");

    if (href[0] != "?") return;

    const name = href.substr(1, href.indexOf("=") - 1);
    const value = href.substr(href.indexOf("=") + 1);

    urlParams.set(name, value);
    window.location.search = urlParams;
});

$("button.btn-clear-all.mb-sm-30.mb-xs-30").click(() => {
    window.location = window.location.href.split("?")[0];
});

$("input[type=checkbox]").click((event) => {
    const urlParams = new URLSearchParams(window.location.search);

    const name = $(event.target).attr("name");
    const value = $(event.value).val();

    if ($(event.target).is(":checked")) urlParams.delete(name, value);
    else urlParams.set(name, value);

    $(event.target).closest("form").submit();
});

$("#submit-price").click((event) => {
    const minPrice = $("#min-price").val();
    const maxPrice = $("#max-price").val();
    const urlParams = new URLSearchParams(window.location.search);

    if (minPrice) urlParams.set("minPrice", minPrice);
    else urlParams.delete("minPrice", minPrice);

    if (maxPrice) urlParams.set("maxPrice", maxPrice);
    else urlParams.delete("maxPrice", maxPrice);

    window.location.search = urlParams.toString();
});

$(".nice-select").on("change", (event) => {
    const urlParams = new URLSearchParams(window.location.search);

    urlParams.set("sortBy", $(event.target).val());

    window.location.search = urlParams.toString();
});

$(document).ready(function () {
    var readURL = function (input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $(".profile-pic").attr("src", e.target.result);
            };

            reader.readAsDataURL(input.files[0]);
        }
    };

    $(".file-upload").on("change", function () {
        readURL(this);
    });

    $(".upload-button").on("click", function () {
        $(".file-upload").click();
    });
});

function validate(evt) {
    var theEvent = evt || window.event;

    // Handle paste
    if (theEvent.type === "paste") {
        key = event.clipboardData.getData("text/plain");
    } else {
        // Handle key press
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
    }
    var regex = /[0-9]|\./;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
}

function updateCart() {
    $.ajax({
        type: "GET",
        url: "/api/cart",
        dataType: "json",
        success: function (data) {
            const { cart } = data.cart;

            $(".cart-page-total ul li span").text(`${cart.total} VNĐ`);
            $("span.item-text").text(`${cart.total} VNĐ`);
            $("span.item-text").append(
                `<span class="cart-item-count">${cart.quantity}</span>`
            );
            $(".minicart-total span").text(`${cart.total} VNĐ`);
            $("ul.minicart-product-list").empty();

            for (const item of cart.items)
                $("ul.minicart-product-list").append(
                    `<li>
                        <a class="minicart-product-image" href="/product/${item.slug}">
                            <img src="${item.imageUrl}" alt="${item.name}"/>
                        </a>
                        <div class="minicart-product-details">
                            <h6>
                                <a href="/products/${item.slug}">${item.name}</a>
                            </h6>
                            <span>${item.price} x ${item.quantity}</span>`
                );
        },
    });
}

function addItemToCart(productId, quantity = 1) {
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/api/cart",
        data: JSON.stringify({ productId, quantity }),
        dataType: "json",
        success: function (data) {
            updateCart();
        },
    });
}

function updateQuickView(productId) {
    $.ajax({
        type: "GET",
        url: `/api/product/${productId}`,
        dataType: "json",
        success: function (data) {
            const { product, productImages } = data;

            $(
                ".modal-inner-area.row .product-details-images.slider-navigation-1"
            ).empty();

            for (const productImage of productImages)
                $(
                    ".modal-inner-area.row .product-details-images.slider-navigation-1"
                ).append(
                    `<div class="lg-image">
                        <img src="${productImage.imageUrl}"/>
                    </div>`
                );

            $(
                ".modal-inner-area.row .product-details-thumbs.slider-thumbs-1"
            ).empty();

            for (const productImage of productImages)
                $(
                    ".modal-inner-area.row .product-details-thumbs.slider-thumbs-1"
                ).append(
                    `<div class="sm-image">
                        <img src="${productImage.imageUrl}"/>
                    </div>`
                );

            $(".product-info a").attr("href", `/product/${product.slug}`);
            $(".product-info h2").text(product.name);
            $("ul.rating.rating-with-review-item").empty();

            for (let i = 0; i < Math.ceil(product.averageRating); i++)
                $("ul.rating.rating-with-review-item").append(
                    `<li>
                        <i class="fa fa-star-o"/>
                    </li>`
                );

            for (let i = Math.ceil(product.averageRating); i < 5; i++)
                $("ul.rating.rating-with-review-item").append(
                    `<li class="no-star">
                        <i class="fa fa-star-o"/>
                    </li>`
                );

            $("ul.rating.rating-with-review-item").append(
                `<li class="review-item">
                    <a href="/product/${product.slug}">Nhận xét</a>
                </li>`
            );

            $("span.new-price.new-price-2").text(`${product.price} VNĐ`);
            $(".product-desc").empty();

            for (const line of product.description.split("\n")) {
                $(".product-desc").append(`<p>${line.trim()}</p>`);
            }

            $("form.cart-quantity").attr("action", product.id);
        },
    });
}

function deleteItemFromCart(productId) {
    $.ajax({
        type: "DELETE",
        contentType: "application/json",
        url: "api/cart",
        data: JSON.stringify({ productId }),
        dataType: "json",
        success: function () {
            updateCart();
        },
    });
}

function updateCartPage() {
    $.ajax({
        type: "GET",
        url: "/api/cart",
        dataType: "json",
        success: function (data) {
            const { cart } = data.cart;

            $(".cart-page-total ul li span").text(`${cart.total} VNĐ`);
        },
    });
}

$("td.li-product-remove.cart").click((event) => {
    const productId = $(event.target).closest("tr").attr("id");

    $(event.target).closest("tr").remove();

    deleteItemFromCart(productId);
});

$(".inc.qtybutton").click((event) => {
    const productId = $(event.target).closest("tr").attr("id");
    const quantity = $(event.target)
        .closest("tr")
        .find("input.cart-plus-minus-box")
        .val();

    let price = $(event.target)
        .closest("tr")
        .find("td.li-product-price.cart span.amount")
        .text();

    price = price.substring(0, price.length - 4);
    price = price.replaceAll(".", "");

    let total = price * quantity;
    total = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    $(event.target)
        .closest("tr")
        .find("td.product-subtotal span.amount")
        .text(`${total} VNĐ`);

    addItemToCart(productId, 1);

    $(event.target)
        .closest("tr")
        .find("input.cart-plus-minus-box")
        .prop("defaultValue", quantity);
});

$(".dec.qtybutton").click((event) => {
    const prev = $(event.target)
        .closest("tr")
        .find("input.cart-plus-minus-box")
        .prop("defaultValue");

    if (prev == 1) return;

    const productId = $(event.target).closest("tr").attr("id");
    const quantity = $(event.target)
        .closest("tr")
        .find("input.cart-plus-minus-box")
        .val();

    let price = $(event.target)
        .closest("tr")
        .find("td.li-product-price.cart span.amount")
        .text();

    price = price.substring(0, price.length - 4);
    price = price.replaceAll(".", "");

    let total = price * quantity;
    total = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    $(event.target)
        .closest("tr")
        .find("td.product-subtotal span.amount")
        .text(`${total} VNĐ`);

    addItemToCart(productId, -1);

    $(event.target)
        .closest("tr")
        .find("input.cart-plus-minus-box")
        .prop("defaultValue", quantity);
});

$("input.cart-plus-minus-box").change((event) => {
    const prev = $(event.target)
        .closest("tr")
        .find("input.cart-plus-minus-box")
        .prop("defaultValue");

    const productId = $(event.target).closest("tr").attr("id");
    const quantity = $(event.target)
        .closest("tr")
        .find("input.cart-plus-minus-box")
        .val();

    let price = $(event.target)
        .closest("tr")
        .find("td.li-product-price.cart span.amount")
        .text();

    price = price.substring(0, price.length - 4);
    price = price.replaceAll(".", "");

    let total = price * quantity;
    total = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    $(event.target)
        .closest("tr")
        .find("td.product-subtotal span.amount")
        .text(`${total} VNĐ`);

    addItemToCart(productId, quantity - prev);

    $(event.target)
        .closest("tr")
        .find("input.cart-plus-minus-box")
        .prop("defaultValue", quantity);
});

$("button.add-to-cart").click((event) => {
    event.preventDefault();

    const productId = $("form.cart-quantity").attr("action");
    const quantity = $("input.cart-plus-minus-box").val();

    addItemToCart(productId, quantity);
});

$("a.wishlist-btn").click((event) => {
    event.preventDefault();

    const productId = $("form.cart-quantity").attr("action");

    addItemToWishlist(productId);
});

function updateWishlist() {
    $.ajax({
        type: "GET",
        url: "/api/wishlist",
        dataType: "json",
        success: function (data) {
            const { wishlist } = data;
            $("span.cart-item-count.wishlist-item-count").text(wishlist.length);
        },
    });
}

function addItemToWishlist(productId) {
    $.ajax({
        type: "POST",
        url: "/api/auth/logged-in",
        dataType: "json",
        success: function () {
            $.ajax({
                type: "POST",
                contentType: "application/json",
                url: "/api/wishlist",
                data: JSON.stringify({ productId }),
                dataType: "json",
                success: function (data) {
                    updateWishlist();
                },
            });
        },
        error: function () {
            window.location.replace("/auth");
        },
    });
}

function deleteItemFromWishlist(productId) {
    $.ajax({
        type: "DELETE",
        contentType: "application/json",
        url: "api/wishlist",
        data: JSON.stringify({ productId }),
        dataType: "json",
        success: function () {
            updateWishlist();
        },
    });
}

$("td.li-product-remove.wishlist").click((event) => {
    const productId = $(event.target).closest("tr").attr("id");

    $(event.target).closest("tr").remove();
    deleteItemFromWishlist(productId);
});

$("#update-account-btn").click((event) => {
    event.preventDefault();

    const data = new FormData();

    data.append("avatar", $("input.file-upload[type='file']").prop("files")[0]);
    data.append("fullName", $("input#display-name").val());
    data.append("address", $("input#display-address").val());
    data.append("phoneNumber", $("input#display-phonenumber").val());

    $.ajax({
        type: "PUT",
        url: "/api/user/account",
        data,
        dataType: "text",
        contentType: false,
        processData: false,
        success: function () {
            $("#message-account").text("Lưu thành công");
            $("#message-account").attr("class", "success");

            setTimeout(() => {
                $("#message-account").text("");
            }, 5000);
        },
    });
});

$("#change-password-btn").click((event) => {
    event.preventDefault();

    const currentPassword = $("input#current-pwd").val();
    const newPassword = $("input#new-pwd").val();
    const confirmPassword = $("input#confirm-pwd").val();

    $.ajax({
        type: "PUT",
        url: "/api/user/change-password",
        contentType: "application/json",
        data: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
        dataType: "json",
        success: function () {
            $("#message-password").text("Thay đổi mật khẩu thành công");
            $("#message-password").attr("class", "success");

            setTimeout(() => {
                $("#message-password").text("");
            }, 5000);
        },
        error: function (data) {
            const { message } = data.responseJSON;

            $("#message-password").text(message);
            $("#message-password").attr("class", "error");

            setTimeout(() => {
                $("#message-password").text("");
            }, 5000);
        },
    });
});

$(".order-button-payment").click((event) => {
    event.preventDefault();

    const fullName = $("input#fullname-checkout").val();
    const address = $("input#address-checkout").val();
    const email = $("input#email-checkout").val();
    const phoneNumber = $("input#phonenumber-checkout").val();
    const note = $("textarea#checkout-mess").val();

    $.ajax({
        type: "POST",
        url: "/api/checkout",
        contentType: "application/json",
        data: JSON.stringify({ fullName, address, email, phoneNumber, note }),
        dataType: "json",
        success: function (data) {
            const { newOrder } = data;

            window.location.replace(`/order/${newOrder.id}`);
        },
        error: function (data) {
            const { message } = data.responseJSON;

            $("#message-checkout").text(message);
            $("#message-checkout").attr("class", "error");

            setTimeout(() => {
                $("#message-checkout").text("");
            }, 5000);
        },
    });
});

$("a.review-links").click((event) => {
    event.preventDefault();

    $.ajax({
        type: "POST",
        url: "/api/auth/logged-in",
        dataType: "json",
        error: function () {
            window.location.replace("/auth");
        },
    });
});

$("a#submit-review").click((event) => {
    const rating = $("select.star-rating").val();
    const content = $("textarea#feedback").val();
    const productId = $("form.cart-quantity").attr("action");

    $.ajax({
        type: "POST",
        url: "/api/review",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({ productId, rating, content }),
        success: function (data) {
            const { newReview } = data;

            $("select.star-rating").val(1);
            $("textarea#feedback").val("");
            $("sub#feedback-message").text("");

            $(".product-details-comment-block").prepend(
                `<div class="comment-author-infos pt-25">
                    <span>${newReview.fullName}</span>
                    <ul class="rating"></ul>
                    <em>${newReview.createdAt}</em>
                    <p>${newReview.content}
                </div>`
            );

            for (let i = 0; i < newReview.rating; i++)
                $(
                    ".product-details-comment-block .comment-author-infos.pt-25:first-child ul"
                ).append(
                    `<li>
                        <i class="fa fa-star-o"></i>
                    </li>`
                );

            for (let i = newReview.rating; i < 5; i++)
                $(
                    ".product-details-comment-block .comment-author-infos.pt-25:first-child ul"
                ).append(
                    `<li class="no-star">
                        <i class="fa fa-star-o"></i>
                    </li>`
                );

            $("a.close").trigger("click");
        },
        error: function (data) {
            const { message } = data.responseJSON;

            $("sub#feedback-message").text(message);
        },
    });
    $("a.close").trigger("click");
    $(".modal-backdrop.fade.show").remove();
});

$("#pagination-review li a").click((event) => {
    event.preventDefault();

    let page;
    const productId = $("form.cart-quantity").attr("action");

    if (event.target.nodeName == "A") page = $(event.target).attr("href");
    else page = $(event.target).closest("a").attr("href");

    if (page === undefined || page == "#") return;
    page = parseInt(page);

    $.ajax({
        type: "GET",
        url: "/api/review",
        contentType: "application/json",
        data: { productId, page, limit: 10 },
        success: function (data) {
            const { totalPages, reviews } = data;

            $(".comment-author-infos.pt-25").remove();

            for (let i = reviews.length - 1; i >= 0; i--) {
                $(".product-details-comment-block").prepend(
                    `<div class="comment-author-infos pt-25">
                        <span>${reviews[i].fullName}</span>
                        <ul class="rating"></ul>
                        <em>${reviews[i].createdAt}</em>
                        <p>${reviews[i].content}
                    </div>`
                );

                for (let j = 0; j < reviews[i].rating; j++)
                    $(
                        ".product-details-comment-block .comment-author-infos.pt-25:first-child ul"
                    ).append(
                        `<li>
                            <i class="fa fa-star-o"></i>
                        </li>`
                    );

                for (let j = reviews[i].rating; j < 5; j++)
                    $(
                        ".product-details-comment-block .comment-author-infos.pt-25:first-child ul"
                    ).append(
                        `<li class="no-star">
                            <i class="fa fa-star-o"></i>
                        </li>`
                    );
            }

            if (page > 1) {
                $("a.Previous").attr("href", page - 1);
                $("#previous-arrow").removeClass("disabled");
            } else {
                $("a.Previous").attr("href", "#");
                $("#previous-arrow").addClass("disabled");
            }

            if (page >= totalPages) {
                $("a.Next").attr("href", "#");
                $("#next-arrow").addClass("disabled");
            } else {
                $("a.Next").attr("href", page + 1);
                $("#next-arrow").removeClass("disabled");
            }

            if (totalPages == 1) {
                $("#previous-page").attr("style", "display: none;");

                $("#current-page").attr("style", "");
                $("#current-page").attr("class", "active");
                $("#current-page a").attr("href", "#");
                $("#current-page a").text("1");

                $("#next-page").attr("style", "display: none;");
            } else if (totalPages == 2) {
                if (page == 1) {
                    $("#previous-page").attr("style", "");
                    $("#previous-page").attr("class", "active");
                    $("#previous-page a").attr("href", "#");
                    $("#previous-page a").text("1");

                    $("#current-page").attr("style", "");
                    $("#current-page").attr("class", "");
                    $("#current-page a").attr("href", "2");
                    $("#current-page a").text("2");

                    $("#next-page").attr("style", "display: none;");
                } else {
                    $("#previous-page").attr("style", "display: none;");

                    $("#current-page").attr("style", "");
                    $("#current-page").attr("class", "");
                    $("#current-page a").attr("href", "1");
                    $("#current-page a").text("1");

                    $("#next-page").attr("style", "");
                    $("#next-page").attr("class", "active");
                    $("#next-page a").attr("href", "#");
                    $("#next-page a").text("2");
                }
            } else {
                if (page <= 1) {
                    $("#previous-page").attr("style", "");
                    $("#previous-page").attr("class", "active");
                    $("#previous-page a").attr("href", "#");
                    $("#previous-page a").text("1");

                    $("#current-page").attr("style", "");
                    $("#current-page").attr("class", "");
                    $("#current-page a").attr("href", "2");
                    $("#current-page a").text("2");

                    $("#next-page").attr("style", "");
                    $("#next-page").attr("class", "");
                    $("#next-page a").attr("href", "3");
                    $("#next-page a").text("3");
                } else if (page >= totalPages) {
                    $("#previous-page").attr("style", "");
                    $("#previous-page").attr("class", "");
                    $("#previous-page a").attr("href", totalPages - 2);
                    $("#previous-page a").text(totalPages - 2);

                    $("#current-page").attr("style", "");
                    $("#current-page").attr("class", "");
                    $("#current-page a").attr("href", totalPages - 1);
                    $("#current-page a").text(totalPages - 1);

                    $("#next-page").attr("style", "");
                    $("#next-page").attr("class", "active");
                    $("#next-page a").attr("href", totalPages);
                    $("#next-page a").text(totalPages);
                } else {
                    $("#previous-page").attr("style", "");
                    $("#previous-page").attr("class", "");
                    $("#previous-page a").attr("href", page - 1);
                    $("#previous-page a").text(page - 1);

                    $("#current-page").attr("style", "");
                    $("#current-page").attr("class", "active");
                    $("#current-page a").attr("href", "#");
                    $("#current-page a").text(page);

                    $("#next-page").attr("style", "");
                    $("#next-page").attr("class", "");
                    $("#next-page a").attr("href", page + 1);
                    $("#next-page a").text(page + 1);
                }
            }
        },
    });
});

$("form.reset-password.form-group").submit((event) => {
    event.preventDefault();

    const email = $("input.reset-password.form-control.input-lg").val();

    $.ajax({
        type: "POST",
        url: "/api/token/reset-password",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({ email }),
        success: function () {
            $("p#message-reset-password").attr("class", "text-success");
            $("p#message-reset-password").text(
                "Vui lòng kiểm tra email trong 24 giờ"
            );

            setTimeout(() => {
                $("p#message-reset-password").text("");
            }, 5000);
        },
        error: function (data) {
            const { message } = data.responseJSON;

            $("p#message-reset-password").attr("class", "text-danger");
            $("p#message-reset-password").text(message);

            setTimeout(() => {
                $("p#message-reset-password").text("");
            }, 5000);
        },
    });
});

$("form.submit-reset-password.form-group").submit((event) => {
    event.preventDefault();

    const newPassword = $(
        "input.submit-reset-password.form-control.input-lg"
    ).val();
    const url = $("form.submit-reset-password.form-group").attr("action");

    $.ajax({
        type: "POST",
        url: url,
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({ newPassword }),
        success: function () {
            $("p#message-submit-reset-password").attr("class", "text-success");
            $("p#message-submit-reset-password").text(
                "Thay đổi mật khẩu thành công"
            );

            setTimeout(() => {
                window.location.replace("/");
            }, 5000);
        },
        error: function () {
            $("p#message-submit-reset-password").attr("class", "text-danger");
            $("p#message-submit-reset-password").text(
                "Có lỗi xảy ra vui lòng thử lại"
            );

            setTimeout(() => {
                $("p#message-submit-reset-password").text("");
            }, 5000);
        },
    });
});
