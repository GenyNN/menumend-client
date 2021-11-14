/* eslint-disable import/prefer-default-export */
import { toggleModal } from './reducer'

let shareModalShown = false

export function shareRestaurant(restaurantName, restaurantAddress, service) {
  shareModalShown = !shareModalShown
}

export function shareFacebook(url) {
  FB.ui({
    method: 'share_open_graph',
    action_type: 'restaurant.wants_to_visit',
    action_properties: JSON.stringify({
      restaurant: {
        'og:url': url,
        'og:title': 'Check this out! Menumend shows healthy choices on restaurant menus!',
        'og:description': 'Menumend makes it easier to choose the perfect food in restaurants. Explore interactive menus and discover best recommendations for you!',
        'og:image:width': '1400',
        'og:image:height': '766',
        'og:image': 'https://testing2.menumend.com/static/img/shares/main1.png',
      },
    }),
  })
}

export function shareTwitter(url) {
  const base = 'https://twitter.com/intent/tweet?='
  const query = 'text=Check+this+out!+Menumend+shows+healthy+choices+on+restaurant menus!&via=menumend'
  window.open(base + query + " " + url)
}

export function shareEmail(url) {
  const base = 'mailto:?subject=Check this out! Menumend shows healthy choices on restaurant menus!&body=Click this link: ' + url
  window.open(base, '_blank')
}
