export function isHealthy(dish) {
  return dish && dish.tags && dish.tags.indexOf('healthy-choice') !== -1
}


export default function flatten(menus) {
  const dishes = []
  menus.forEach(menu => {
    if (menu.sections) {
      menu.sections.forEach((s) => {
        if (!s.dishes) {
          return
        }
        s.dishes.forEach(dish => {
          const enabled = isHealthy(dish)
          if (!enabled) {
            return
          }
          dishes.push(dish)
        })
      })
    }
  })
  return dishes.sort((a, b) => {
    const scoreA = a.scores['healthy-choice']
    const scoreB = b.scores['healthy-choice']
    return scoreB - scoreA
  })
}
