$("#add-button").click(() => {
    const numberOrder =
        ($("#specifications div:last-child div:first-child").text() | 0) + 1;

    $("#specifications").append(
        `<div class="row gx-2">
			<div class="col-1"><p class="pt-20">${numberOrder}</p></div>
			<div class="col-5"><input name="specificationContent[]" placeholder="Chi tiết" type="text" class="form-control"/></div>
			<div class="col-6"><input name="specificationValue[]" placeholder="Thông số" type="text" class="form-control"/></div>
		</div>`
    );
});

$("input.form-control").keyup((event) => {
    if (event.keyCode == 13) {
        const urlParams = new URLSearchParams();
        urlParams.set("search", $(event.target).val());
        window.location.search = urlParams;
    }
});

$("li.page-item a.page-link").click((event) => {
    event.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    const href = $(event.target).attr("href");

    if (href[0] != "?") return;

    const name = href.substr(1, href.indexOf("=") - 1);
    const value = href.substr(href.indexOf("=") + 1);

    urlParams.set(name, value);
    window.location.search = urlParams;
});

$(".info-wrap .btn.btn-sm.btn-outline-danger").click((event) => {
    const id = $(event.target).attr("data-id");

    $.ajax({
        url: `/products/${id}`,
        type: "DELETE",
    }).done(() => {
        window.location.reload();
    });
});

if (localStorage.getItem("asidemini")) {
    var body_el = document.body;
    body_el.classList.add("aside-mini");
}

if (localStorage.getItem("darkmode")) {
    var body_el = document.body;
    body_el.classList.add("dark");
}

function showPreview(event) {
    if (event.target.files.length > 0) {
        var src = URL.createObjectURL(event.target.files[0]);
        // var preview = document.getElementById("file-ip-1-preview");
        var preview = $(event.target).parent().find(".preview img")[0];
        preview.src = src;
        preview.style.display = "block";
    }
}

$("select.form-select.orders").change((event) => {
    const status = $(event.target).val();
    const urlParams = new URLSearchParams(window.location.search);

    urlParams.set("status", status);
    window.location.search = urlParams;
});

$("input.form-control").keypress((event) => {
    if (event.which == 13) {
        const search = $(event.target).val();
        const urlParams = new URLSearchParams(window.location.search);

        urlParams.set("search", search);
        window.location.search = urlParams;
    }
});

$("form.orders").submit((event) => {
    const status = $("select.form-select.d-inline-block.orders").val();

    if (status == "Thay đổi trạng thái") event.preventDefault();
});

$("select.form-select.users").change((event) => {
    const blocked = $(event.target).val();
    const urlParams = new URLSearchParams(window.location.search);

    urlParams.set("blocked", blocked);
    window.location.search = urlParams;
});

$("form.users").submit((event) => {
    const status = $("select.form-select.d-inline-block.orders").val();

    if (status == "Thao tác") event.preventDefault();
});
