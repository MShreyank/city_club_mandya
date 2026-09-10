/*=========================================================
    SHARED PAGE PARTIALS (header, mobile menu, footer,
    WhatsApp button) — defined once, injected into every page.

    Usage: each page sets <body data-page="KEY"> where KEY is one
    of the NAV_ITEMS keys below (or leaves it unset for pages like
    404 that have no active nav item), and includes three empty
    mount points before loading this script:

        <div id="site-header"></div>
        <div id="site-footer"></div>
        <div id="site-whatsapp"></div>

    This runs synchronously (no fetch/CORS dependency), so it also
    works when the site is opened directly via file:// as well as
    over http(s).
=========================================================*/

(function () {

    "use strict";

    var CURRENT_PAGE = document.body.getAttribute("data-page") || "";

    /* ---------------------------------------------------
        Primary navigation — single source of truth.
        Order here = order rendered (first 3 => nav-left,
        last 3 => nav-right, matching the original markup).
    --------------------------------------------------- */
    var NAV_ITEMS = [
        { key: "index",       href: "index.html",            label: "HOME",             mobileLabel: "Home" },
        { key: "about",       href: "about.html",             label: "ABOUT",            mobileLabel: "About" },
        { key: "gallery",     href: "gallery.html",           label: "GALLERY",          mobileLabel: "Gallery" },
        { key: "facilities",  href: "facilities.html",        label: "FACILITIES",      mobileLabel: "Facilities" },
        { key: "events",      href: "events.html",            label: "EVENTS",           mobileLabel: "Events" },
        { key: "affiliated",  href: "affiliated-clubs.html",  label: "AFFILIATED CLUBS", mobileLabel: "Affiliated Clubs" }
    ];

    function desktopLink(item) {
        var isActive = item.key === CURRENT_PAGE;
        var classAttr = isActive ? ' class="active"' : "";
        var currentAttr = isActive ? ' aria-current="page"' : "";
        return '<a' + classAttr + currentAttr + ' href="' + item.href + '">' + item.label + '</a>';
    }

    function mobileLink(item) {
        var isActive = item.key === CURRENT_PAGE;
        var classAttr = isActive ? ' class="active"' : "";
        var currentAttr = isActive ? ' aria-current="page"' : "";
        return '<a' + classAttr + currentAttr + ' href="' + item.href + '">' + item.mobileLabel + '</a>';
    }

    var navLeft = NAV_ITEMS.slice(0, 3).map(desktopLink).join("");
    var navRight = NAV_ITEMS.slice(3, 6).map(desktopLink).join("");
    var mobileLinks = NAV_ITEMS.map(mobileLink).join("");

    /* ---------------------------------------------------
        HEADER + MOBILE MENU
    --------------------------------------------------- */
    var headerHTML =
        '<header id="header">' +
            '<div class="top-strip">' +
                '<button type="button" class="menu-toggle" aria-label="Toggle menu" aria-expanded="false" aria-controls="mobile-menu">' +
                    '<span aria-hidden="true">\u2630</span>' +
                '</button>' +
                '<div class="mobile-brand">City Club Mandya</div>' +
            '</div>' +
            '<nav class="navbar" aria-label="Primary navigation">' +
                '<div class="nav-left">' + navLeft + '</div>' +
                '<div class="logo-container">' +
                    '<a href="index.html">' +
                        '<img src="images/logo.png" id="logo" alt="City Club Mandya \u2014 logo" width="76" height="76" loading="eager">' +
                    '</a>' +
                '</div>' +
                '<div class="nav-right">' + navRight + '</div>' +
            '</nav>' +
        '</header>' +
        '<aside class="mobile-menu" id="mobile-menu">' + mobileLinks + '</aside>';

    /* ---------------------------------------------------
        FOOTER
    --------------------------------------------------- */
    var footerHTML =
        '<footer>' +
            '<div class="container">' +
                '<div class="footer-content">' +
                    '<div class="footer-box">' +
                        '<h3>City Club Mandya</h3>' +
                        '<p>Mandya, Karnataka</p>' +
                        '<p>Phone : +91 XXXXX XXXXX</p>' +
                        '<p>Email : info@cityclubmandya.com</p>' +
                    '</div>' +
                    '<div class="footer-box">' +
                        '<h3>Quick Links</h3>' +
                        '<ul>' +
                            '<li><a href="index.html">Home</a></li>' +
                            '<li><a href="about.html">About</a></li>' +
                            '<li><a href="facilities.html">Facilities</a></li>' +
                            '<li><a href="gallery.html">Gallery</a></li>' +
                            '<li><a href="events.html">Events</a></li>' +
                            '<li><a href="affiliated-clubs.html">Affiliated Clubs</a></li>' +
                        '</ul>' +
                    '</div>' +
                    '<div class="footer-box">' +
                        '<h3>Follow Us</h3>' +
                        '<div class="social-icons">' +
                            '<a href="#">Facebook</a>' +
                            '<a href="#">Instagram</a>' +
                            '<a href="#">YouTube</a>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="copyright">\u00A9 2026 City Club Mandya. All Rights Reserved.</div>' +
            '</div>' +
        '</footer>';

    /* ---------------------------------------------------
        WHATSAPP CLICK-TO-CHAT BUTTON
    --------------------------------------------------- */
    // var whatsappHTML =
    //     '<a class="whatsapp-float" href="https://wa.me/919611963721" target="_blank" rel="noopener" aria-label="Chat with City Club Mandya on WhatsApp">' +
    //         '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16.001 3C9.107 3 3.5 8.605 3.5 15.5c0 2.4.66 4.64 1.804 6.556L3 29l7.14-2.257A12.44 12.44 0 0 0 16 28.999C22.894 29 28.5 23.394 28.5 16.5S22.894 3 16.001 3Zm7.29 17.606c-.31.87-1.532 1.63-2.51 1.84-.667.14-1.54.253-4.48-.962-3.76-1.556-6.183-5.373-6.372-5.622-.182-.25-1.522-2.028-1.522-3.868 0-1.84.965-2.744 1.307-3.121.31-.34.68-.425.907-.425.226 0 .453.002.652.012.21.01.49-.08.766.585.31.75 1.055 2.59 1.148 2.78.093.19.155.412.03.662-.124.25-.186.404-.372.62-.185.216-.39.482-.556.648-.185.185-.378.386-.163.756.216.37.958 1.582 2.058 2.563 1.415 1.263 2.607 1.654 2.977 1.84.37.185.586.155.802-.093.216-.25.925-1.078 1.172-1.448.247-.37.494-.308.833-.185.34.124 2.164 1.02 2.535 1.206.37.185.617.278.71.432.093.155.093.897-.216 1.766Z"/></svg>' +
    //     '</a>';

    /* ---------------------------------------------------
        INJECT INTO MOUNT POINTS
    --------------------------------------------------- */
    var headerMount = document.getElementById("site-header");
    if (headerMount) headerMount.outerHTML = headerHTML;

    var footerMount = document.getElementById("site-footer");
    if (footerMount) footerMount.outerHTML = footerHTML;

    var whatsappMount = document.getElementById("site-whatsapp");
    if (whatsappMount) whatsappMount.outerHTML = whatsappHTML;

}());
