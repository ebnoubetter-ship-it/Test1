// Language Management
const translations = {
  fr: {
    Accueil: "Accueil",
    "À propos": "À propos",
    Services: "Services",
    Galerie: "Galerie",
    Réservation: "Réservation",
    Contact: "Contact",
    "Rendez-vous": "Rendez-vous",
    "Depuis 2017": "Depuis 2017",
    "Coiffure & Spa": "Coiffure & Spa",
    "Votre beauté, notre passion depuis 2017": "Votre beauté, notre passion depuis 2017",
    "Prendre rendez-vous": "Prendre rendez-vous",
  },
  ar: {
    Accueil: "الرئيسية",
    "À propos": "من نحن",
    Services: "خدماتنا",
    Galerie: "المعرض",
    Réservation: "الحجز",
    Contact: "اتصل بنا",
    "Rendez-vous": "احجز الآن",
    "Depuis 2017": "منذ 2017",
    "Coiffure & Spa": "تصفيف الشعر والسبا",
    "Votre beauté, notre passion depuis 2017": "جمالك، شغفنا منذ 2017",
    "Prendre rendez-vous": "احجز موعدك",
  },
}

let currentLang = "fr"

// Language Toggle
const langToggle = document.getElementById("langToggle")
langToggle.addEventListener("click", () => {
  currentLang = currentLang === "fr" ? "ar" : "fr"
  document.documentElement.lang = currentLang
  document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr"
  updateLanguage()
  localStorage.setItem("preferredLanguage", currentLang)
})

function updateLanguage() {
  document.querySelectorAll("[data-fr][data-ar]").forEach((element) => {
    const text = currentLang === "fr" ? element.dataset.fr : element.dataset.ar
    if (element.tagName === "A" || element.tagName === "BUTTON") {
      element.textContent = text
    } else {
      element.innerHTML = text
    }
  })
}

// Load saved language preference
window.addEventListener("load", () => {
  const saved = localStorage.getItem("preferredLanguage")
  if (saved && saved !== "fr") {
    currentLang = saved
    document.documentElement.lang = currentLang
    document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr"
    updateLanguage()
  }
})

// Mobile Menu Toggle
const menuToggle = document.getElementById("menuToggle")
const navMenu = document.getElementById("navMenu")

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active")
})

// Close menu when link is clicked
document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active")
  })
})

// Lightbox Functionality
const galleryItems = document.querySelectorAll(".gallery-item")
const lightbox = document.getElementById("lightbox")
const lightboxImage = document.getElementById("lightboxImage")
const lightboxClose = document.getElementById("lightboxClose")
const lightboxPrev = document.getElementById("lightboxPrev")
const lightboxNext = document.getElementById("lightboxNext")

let currentImageIndex = 0
let allImages = []

// Initialize gallery
function initGallery() {
  allImages = Array.from(galleryItems)
  galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      currentImageIndex = index
      openLightbox()
    })
  })
}

function openLightbox() {
  const imageSrc = allImages[currentImageIndex].dataset.image
  lightboxImage.src = imageSrc
  lightbox.classList.add("active")
  document.body.style.overflow = "hidden"
}

function closeLightbox() {
  lightbox.classList.remove("active")
  document.body.style.overflow = "auto"
}

function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % allImages.length
  openLightbox()
}

function prevImage() {
  currentImageIndex = (currentImageIndex - 1 + allImages.length) % allImages.length
  openLightbox()
}

lightboxClose.addEventListener("click", closeLightbox)
lightboxNext.addEventListener("click", nextImage)
lightboxPrev.addEventListener("click", prevImage)

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    closeLightbox()
  }
})

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (lightbox.classList.contains("active")) {
    if (e.key === "ArrowRight") nextImage()
    if (e.key === "ArrowLeft") prevImage()
    if (e.key === "Escape") closeLightbox()
  }
})

// Initialize
initGallery()

// Smooth scroll offset for sticky header
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href")
    if (href !== "#") {
      e.preventDefault()
      const element = document.querySelector(href)
      if (element) {
        const headerHeight = document.querySelector(".header").offsetHeight
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - headerHeight
        window.scrollTo({
          top: elementPosition,
          behavior: "smooth",
        })
      }
    }
  })
})
