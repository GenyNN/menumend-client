/* global AOS */
import bindLocationModal from './location'
import bindMainEmailForm from './subscribe'
import bindComingSoonEmailForm from './comingSoon'


function ready(fn) {
  if (document.readyState !== 'loading') {
    fn()
  } else {
    document.addEventListener('DOMContentLoaded', fn)
  }
}

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
const animationSettings = isMobile ? {
  once: true,
  delay: 0,
  duration: 300,
} : {
  once: true,
}

function setAnimation() {
  const card1 = document.getElementById('hc-card')
  if (!isMobile) {
    card1.setAttribute('data-aos-delay', 100)
    card1.setAttribute('data-aos-duration', 800)
    const card2 = document.getElementById('fy-card')
    card2.setAttribute('data-aos-delay', 300)
    card2.setAttribute('data-aos-duration', 1100)
    const card3 = document.getElementById('fl-card')
    card3.setAttribute('data-aos-delay', 600)
    card3.setAttribute('data-aos-duration', 1400)
  } else {
    card1.setAttribute('data-aos-delay', 100)
    card1.setAttribute('data-aos-anchor', 'body')
  }
  AOS.init(animationSettings)
}


ready(() => {
  // bindLocationModal()
  bindMainEmailForm()
  bindComingSoonEmailForm()
  setAnimation()
})
