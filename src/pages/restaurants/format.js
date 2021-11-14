export function formatRestaurantAddress(address1, city, state) {
  return [
    address1, city, state,
  ].filter((x) => (x && x.length !== 0 && x.trim())).join(', ')
}
