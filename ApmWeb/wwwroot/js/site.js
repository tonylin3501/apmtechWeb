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

    // 合作單位輪播：按鈕、滑鼠滾輪與拖曳左右捲動
    document.querySelectorAll("[data-carousel]").forEach(function (root) {
        var track = root.querySelector(".logo-track");
        var navs = root.querySelectorAll(".logo-nav");
        var max = function () { return track.scrollWidth - track.clientWidth; };
        var update = function () {
            navs.forEach(function (n) {
                var back = n.getAttribute("data-dir") === "-1";
                n.disabled = back ? track.scrollLeft <= 1 : track.scrollLeft >= max() - 1;
            });
        };
        navs.forEach(function (n) {
            n.addEventListener("click", function () {
                var dir = Number(n.getAttribute("data-dir"));
                var still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
                track.scrollBy({ left: dir * track.clientWidth * 0.8, behavior: still ? "auto" : "smooth" });
            });
        });
        // 垂直滾輪轉為水平；捲到兩端後交還給頁面捲動
        track.addEventListener("wheel", function (e) {
            if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
            var canMove = e.deltaY < 0 ? track.scrollLeft > 1 : track.scrollLeft < max() - 1;
            if (!canMove) return;
            e.preventDefault();
            track.scrollLeft += e.deltaY;
        }, { passive: false });
        var startX = null, startLeft = 0;
        track.addEventListener("pointerdown", function (e) {
            if (e.pointerType !== "mouse" || e.button !== 0) return;
            startX = e.clientX;
            startLeft = track.scrollLeft;
            track.setPointerCapture(e.pointerId);
            track.classList.add("dragging");
        });
        track.addEventListener("pointermove", function (e) {
            if (startX !== null) track.scrollLeft = startLeft - (e.clientX - startX);
        });
        var end = function () { startX = null; track.classList.remove("dragging"); };
        track.addEventListener("pointerup", end);
        track.addEventListener("pointercancel", end);
        track.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", update);
        window.addEventListener("load", update);
        update();
    });
})();
