$("ul.pagination-box.pt-xs-20.pb-xs-15 li a").click((event) => {
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

            $(".product-details-images.slider-navigation-1").empty();

            for (const productImage of productImages)
                $(".product-details-images.slider-navigation-1").append(
                    `<div class="lg-image">
                        <img src="${productImage.imageUrl}"/>
                    </div>`
                );

            $(".product-details-thumbs.slider-thumbs-1").empty();

            for (const productImage of productImages)
                $(".product-details-thumbs.slider-thumbs-1").append(
                    `<div class="sm-image">
                        <img src="${productImage.imageUrl}"/>
                    </div>`
                );

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
            $(".product-desc").text(product.description);
            $("form.cart-quantity").attr("action", product.id);
        },
    });
}

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

$("td.li-product-remove").click((event) => {
    const productId = $(event.target).closest("tr").attr("id");

    $(event.target).closest("tr").remove();
    deleteItemFromWishlist(productId);
});
