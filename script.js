// ========================
// LANGUAGE SWITCHING
// ========================

const translations = {
  fr: {
    navItems: {
      accueil: "Accueil",
      apropos: "À propos",
      services: "Services",
      galerie: "Galerie",
      contact: "Contact",
    },
  },
  ar: {
    navItems: {
      accueil: "الصفحة الرئيسية",
      apropos: "من نحن",
      services: "الخدمات",
      galerie: "المعرض",
      contact: "اتصل بنا",
    },
  },
}

const langBtn = document.getElementById("langBtn")
const html = document.documentElement
let currentLang = "fr"

// Load saved language preference
const savedLang = localStorage.getItem("language")
if (savedLang) {
  currentLang = savedLang
  setLanguage(currentLang)
}

langBtn.addEventListener("click", () => {
  currentLang = currentLang === "fr" ? "ar" : "fr"
  setLanguage(currentLang)
  localStorage.setItem("language", currentLang)
})

function setLanguage(lang) {
  const dir = lang === "ar" ? "rtl" : "ltr"
  html.setAttribute("lang", lang)
  html.setAttribute("dir", dir)

  // Update lang button text
  langBtn.textContent = lang === "fr" ? "AR" : "FR"

  // Update all data-* elements
  document.querySelectorAll("[data-fr][data-ar]").forEach((element) => {
    const text = lang === "fr" ? element.getAttribute("data-fr") : element.getAttribute("data-ar")
    if (element.tagName === "IMG" || element.tagName === "IFRAME") {
      element.setAttribute("alt", text)
    } else {
      element.textContent = text
    }
  })

  // Update all elements with data-caption for lightbox
  document.querySelectorAll("[data-caption]").forEach((element) => {
    const caption = element.getAttribute("data-caption")
    if (lang === "ar") {
      element.setAttribute("data-caption-ar", caption)
    } else {
      element.setAttribute("data-caption-fr", caption)
    }
  })

  // Reload Calendly widget if it exists
  if (window.Calendly) {
    window.Calendly.destroyBadgeWidget()
    window.Calendly.initBadgeWidget({
      url: "https://calendly.com/ebnoubetter/30min",
      text: lang === "fr" ? "Réserver" : "احجز",
      color: "#d4af9b",
    })
  }
}

// ========================
// HAMBURGER MENU
// ========================

const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("navMenu")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close menu when a link is clicked
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  })
})

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (!e.target.closest(".nav-container")) {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  }
})

// ========================
// GALLERY LIGHTBOX
// ========================

const lightbox = document.getElementById("lightbox")
const lightboxImg = document.getElementById("lightboxImg")
const lightboxCaption = document.getElementById("lightboxCaption")
const closeBtn = document.getElementById("closeLightbox")
const galleryItems = document.querySelectorAll(".gallery-item")

galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    const img = item.querySelector("img")
    const caption = item.getAttribute("data-caption")

    lightboxImg.src = img.src
    lightboxImg.alt = img.alt
    lightboxCaption.textContent = caption

    lightbox.style.display = "block"
    document.body.style.overflow = "hidden"
  })
})

closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none"
  document.body.style.overflow = "auto"
})

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = "none"
    document.body.style.overflow = "auto"
  }
})

// Close lightbox with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lightbox.style.display === "block") {
    lightbox.style.display = "none"
    document.body.style.overflow = "auto"
  }
})

// ========================
// SCROLL ANIMATIONS
// ========================

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = entry.target.dataset.animation || "fadeInUp 0.8s ease-out"
      observer.unobserve(entry.target)
    }
  })
}, observerOptions)

// Observe all animatable elements
document.querySelectorAll(".service-card, .gallery-item, .contact-card").forEach((el) => {
  observer.observe(el)
})

// ========================
// SMOOTH SCROLL BEHAVIOR
// ========================

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href")
    if (href !== "#") {
      e.preventDefault()
      const target = document.querySelector(href)
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    }
  })
})
