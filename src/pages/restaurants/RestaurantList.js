import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text, Image } from 'react-native'
import Touchable from 'Touchable'
import Carousel from 'nuka-carousel'
import RestaurantCard from './RestaurantCard'
import DishCardList from './DishCardList'
import SliderPins from './SliderPins'

import _ from 'lodash'

const borderStyle = {
  width: '16px',
  height: '16px',
  borderTopWidth: 4,
  borderTopStyle: 'solid',
  borderTopColor: '#000',
  borderRightWidth: 4,
  borderRightStyle: 'solid',
  borderRightColor: '#000',
}

const styles = StyleSheet.create({
  container: {
    width: '960px',
    marginTop: '40px',
  },
  nextButton: {
    ...borderStyle,
    transform: [{ rotate: '-315deg' }],
  },
  prevButton: {
    ...borderStyle,
    transform: [{ rotate: '225deg' }],
  },
})


class RestaurantList extends React.Component {

  static propTypes = {
    data: PropTypes.array,
  }

  static renderNextSliderButton(slider) {
    return (
      <Touchable onPress={slider.nextSlide}>
        <View style={styles.nextButton} />
      </Touchable>
    )
  }

  static renderPrevSliderButton(slider) {
    return (
      <Touchable onPress={slider.previousSlide}>
        <View style={styles.prevButton} />
      </Touchable>
    )
  }

  static renderSliderPins(slider) {
    return <SliderPins slider={slider} />
  }

  render() {
    if (!this.props.data) {
      return (<Text>Loading...</Text>)
    } else {
      const restaurantsToShow = this.props.data.map((restaurant, index) => (
        <RestaurantCard
          key={`restaurant-card-${restaurant.id}`}
          data={restaurant}
          onShare={this.props.onShare}
          toggleFavourite={this.props.toggleFavourite}
          token={this.props.token}
          requestSelectRestaurant={this.props.requestSelectRestaurant}/>)
      )
      return (
      <View style={styles.container}>
        <Carousel
          width="960px"
          framePadding="0 0 70px 0"
          renderBottomCenterControls={null}
          renderCenterRightControls={DishCardList.renderNextSliderButton}
          renderCenterLeftControls={DishCardList.renderPrevSliderButton}
        >
          {restaurantsToShow}
        </Carousel>
      </View>
    )
  }
  }
}

export default RestaurantList
