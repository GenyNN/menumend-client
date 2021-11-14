import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import _ from 'lodash'
import SearchItemRestaurant from './SearchItemRestaurant'
import SearchItemCity from './SearchItemCity'


class SearchItemList extends React.Component {

  static propTypes = {
    restaurants: PropTypes.array,
    cities: PropTypes.array,
    selectedIndex: PropTypes.number,
    onHover: PropTypes.func,
    updateCity: PropTypes.func,
    justCloseRestaurants: PropTypes.bool,
  }

  render() {
    const restaurants = this.props.restaurants.slice(0, 4)
    const cities = this.props.cities.slice(0, 2)
    let suggestions = cities.concat(restaurants)
    suggestions = suggestions.map((s, index) => (
      !(_.isUndefined(s.name)) ? <SearchItemRestaurant
        index={index}
        onHover={this.props.onHover}
        selected={this.props.selectedIndex === index}
        key={`si-${s.id}`} data={s}
        justCloseRestaurants={this.props.justCloseRestaurants}
      /> :
      <SearchItemCity
        index={index}
        onHover={this.props.onHover}
        selected={this.props.selectedIndex === index}
        key={`si-${s}`} data={s}
        updateCity={this.props.updateCity}
      />
    ))
    return (
      <View>
        {suggestions}
      </View>
    )
  }

}

export default SearchItemList
