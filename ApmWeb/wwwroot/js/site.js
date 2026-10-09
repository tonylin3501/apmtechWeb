(function () {
    var toggle = document.getElementById("navToggle");
    var nav = document.getElementById("mainNav");
    if (toggle && nav) {
        toggle.addEventListener("click", function () {
            var open = nav.classList.toggle("open");
            toggle.setAttribute("aria-expanded", open ? "true" : "false");
        });
    }

    var top = document.getElementById("backTop");
    if (top) {
        window.addEventListener("scroll", function () {
            top.classList.toggle("show", (window.scrollY || 0) > 480);
        }, { passive: true });
        top.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
    }

    // 成功案例分類篩選
    var buttons = document.querySelectorAll("[data-filter]");
    var cases = document.querySelectorAll("[data-category]");
    buttons.forEach(function (b) {
        b.addEventListener("click", function () {
            var f = b.getAttribute("data-filter");
            buttons.forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
            cases.forEach(function (c) { c.hidden = !(f === "all" || c.getAttribute("data-category") === f); });
        });
    });
})();
