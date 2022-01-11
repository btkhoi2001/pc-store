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
