/*=========================================
        HEADER HEIGHT (for hero sizing)
=========================================*/

const headerEl = document.getElementById("header");

function setHeaderHeight(){

    if(headerEl){

        document.documentElement.style.setProperty("--header-h", headerEl.offsetHeight + "px");

    }

}

setHeaderHeight();

window.addEventListener("load", setHeaderHeight);

window.addEventListener("resize", setHeaderHeight);


/*=========================================
            HERO SLIDER (home page only)
=========================================*/

const slides = document.querySelectorAll(".slide");

const dots = document.querySelectorAll(".dot");

const nextBtn = document.querySelector(".next");

const prevBtn = document.querySelector(".prev");

const heroEl = document.querySelector(".hero");

if(slides.length && dots.length && nextBtn && prevBtn){

    let slideIndex = 0;

    // Respect the user's OS-level "reduce motion" preference:
    // autoplay is disabled entirely, but manual arrow/dot/swipe
    // navigation still works.
    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let autoplayEnabled = !reduceMotionQuery.matches;

    let autoplayTimer = null;
    let isPaused = false;

    showSlide(slideIndex);

    function showSlide(index){

        slides.forEach(slide=>{

            slide.style.display="none";

        });

        dots.forEach(dot=>{

            dot.classList.remove("active");

        });

        if(index>=slides.length){

            slideIndex=0;

        }

        if(index<0){

            slideIndex=slides.length-1;

        }

        slides[slideIndex].style.display="block";

        dots[slideIndex].classList.add("active");

    }

    function nextSlide(){

        slideIndex++;

        showSlide(slideIndex);

    }

    function previousSlide(){

        slideIndex--;

        showSlide(slideIndex);

    }

    function startAutoplay(){

        if(!autoplayEnabled) return;

        stopAutoplay();

        autoplayTimer = setInterval(()=>{

            if(!isPaused){

                nextSlide();

            }

        },5000);

    }

    function stopAutoplay(){

        if(autoplayTimer){

            clearInterval(autoplayTimer);

            autoplayTimer = null;

        }

    }

    nextBtn.addEventListener("click",()=>{

        nextSlide();

    });

    prevBtn.addEventListener("click",()=>{

        previousSlide();

    });

    dots.forEach((dot,index)=>{

        dot.addEventListener("click",()=>{

            slideIndex=index;

            showSlide(slideIndex);

        });

    });

    startAutoplay();

    // Live-update if the user toggles reduced motion mid-session
    reduceMotionQuery.addEventListener("change",(e)=>{

        autoplayEnabled = !e.matches;

        if(autoplayEnabled){

            startAutoplay();

        } else {

            stopAutoplay();

        }

    });

    /*=========================================
            PAUSE ON HOVER (desktop)
    =========================================*/

    if(heroEl){

        heroEl.addEventListener("mouseenter",()=>{

            isPaused = true;

        });

        heroEl.addEventListener("mouseleave",()=>{

            isPaused = false;

        });

        heroEl.addEventListener("focusin",()=>{

            isPaused = true;

        });

        heroEl.addEventListener("focusout",()=>{

            isPaused = false;

        });

        /*=========================================
            TOUCH / SWIPE SUPPORT (mobile)
        =========================================*/

        let touchStartX = 0;

        let touchStartY = 0;

        let touchActive = false;

        const SWIPE_THRESHOLD = 40;

        heroEl.addEventListener("touchstart",(e)=>{

            if(!e.touches || !e.touches.length) return;

            touchStartX = e.touches[0].clientX;

            touchStartY = e.touches[0].clientY;

            touchActive = true;

            isPaused = true;

        },{passive:true});

        heroEl.addEventListener("touchmove",()=>{

            // Presence of a touchmove keeps autoplay paused while the
            // user is actively interacting with the slider.

        },{passive:true});

        heroEl.addEventListener("touchend",(e)=>{

            if(!touchActive) return;

            touchActive = false;

            isPaused = false;

            const touch = (e.changedTouches && e.changedTouches[0]) || null;

            if(!touch) return;

            const deltaX = touch.clientX - touchStartX;

            const deltaY = touch.clientY - touchStartY;

            // Ignore mostly-vertical swipes (page scrolling)

            if(Math.abs(deltaX) < Math.abs(deltaY)) return;

            if(Math.abs(deltaX) < SWIPE_THRESHOLD) return;

            if(deltaX < 0){

                nextSlide();

            } else {

                previousSlide();

            }

        },{passive:true});

    }

}


/*=========================================
            MOBILE MENU
=========================================*/

const mobileMenu=document.querySelector(".mobile-menu");

const menuBtn=document.querySelector(".menu-toggle");

if(mobileMenu && menuBtn){

    function openMobileMenu(){

        mobileMenu.classList.add("active");
        menuBtn.innerHTML = '<span aria-hidden="true">✕</span>';
        menuBtn.setAttribute("aria-expanded","true");

    }

    function closeMobileMenu(){

        mobileMenu.classList.remove("active");
        menuBtn.innerHTML = '<span aria-hidden="true">☰</span>';
        menuBtn.setAttribute("aria-expanded","false");

    }

    window.addEventListener("resize",()=>{

        if(window.innerWidth>1024 && mobileMenu.classList.contains("active")){

            closeMobileMenu();

        }

    });

    // Click support. Native <button> elements already fire a "click"
    // event on Enter and Space, so this also covers keyboard use —
    // no separate keydown handler is required for basic activation.
    menuBtn.addEventListener("click",()=>{

        if(mobileMenu.classList.contains("active")){

            closeMobileMenu();

        } else {

            openMobileMenu();

        }

    });

    // Close menu when user scrolls
    window.addEventListener("scroll", () => {

        if (mobileMenu.classList.contains("active")) {

            closeMobileMenu();

        }

    });

    // Close on Escape, and return focus to the toggle button for
    // keyboard users
    document.addEventListener("keydown",(e)=>{

        if(e.key === "Escape" && mobileMenu.classList.contains("active")){

            closeMobileMenu();

            menuBtn.focus();

        }

    });

    /*=========================================
            CLOSE MOBILE MENU
    =========================================*/

    document.querySelectorAll(".mobile-menu a").forEach(link=>{

        link.addEventListener("click",()=>{

            closeMobileMenu();

        });

    });

}


/*=========================================
        GALLERY LIGHTBOX (gallery page only)
=========================================*/

const lightbox = document.getElementById("lightbox");

const galleryItems = document.querySelectorAll(".full-gallery-grid .gallery-item");

if(lightbox && galleryItems.length){

    const lightboxImg = document.getElementById("lightbox-img");

    const lightboxCaption = document.getElementById("lightbox-caption");

    const lightboxClose = document.querySelector(".lightbox-close");

    function openLightbox(item){

        const img = item.querySelector("img");

        if(!img) return;

        lightboxImg.src = img.getAttribute("src");

        lightboxImg.alt = img.getAttribute("alt") || "";

        lightboxCaption.textContent = item.getAttribute("data-caption") || "";

        lightbox.classList.add("active");

        document.body.style.overflow = "hidden";

    }

    function closeLightbox(){

        lightbox.classList.remove("active");

        document.body.style.overflow = "";

    }

    galleryItems.forEach(item=>{

        item.addEventListener("click",()=>{

            openLightbox(item);

        });

        item.setAttribute("tabindex","0");

        item.addEventListener("keydown",(e)=>{

            if(e.key === "Enter" || e.key === " "){

                e.preventDefault();

                openLightbox(item);

            }

        });

    });

    if(lightboxClose){

        lightboxClose.addEventListener("click", closeLightbox);

    }

    lightbox.addEventListener("click",(e)=>{

        if(e.target === lightbox){

            closeLightbox();

        }

    });

    document.addEventListener("keydown",(e)=>{

        if(e.key === "Escape"){

            closeLightbox();

        }

    });

}
