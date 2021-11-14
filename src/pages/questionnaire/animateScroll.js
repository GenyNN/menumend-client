/**
 * @author Vladimir
 */

function easeInOutQuad(t, b, c, d) {
  // t = current time
  // b = start value
  // c = change in value
  // d = duration
  t /= d/2
  if (t < 1) {
    return c/2*t*t + b
  }

  t--
  return -c/2 * (t*(t-2) - 1) + b
}

export default function animatedScrollTo(element, to, duration) {
  const start = element.scrollTop
  const change = to - start
  const startDate = +new Date()
  const animateScroll = () => {
    const currentDate = +new Date()
    const currentTime = currentDate - startDate
    element.scrollTop = parseInt(easeInOutQuad(currentTime, start, change, duration))

    if (currentTime < duration) {
      requestAnimationFrame(animateScroll)
    } else {
      element.scrollTop = to
    }
  }

  animateScroll()
}
