import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text, Image } from 'react-native'
import Touchable from 'Touchable'
import Carousel from 'nuka-carousel'
import RestaurantCard from './RestaurantCard'
import DishCardList from './DishCardList'
import SliderPins from './SliderPins'

import RightArrowImage from './img/arrow_right.png'
import LeftArrowImage from './img/arrow_left.png'
import RightInactiveArrowImage from './img/arrow_inactive_right.png'
import LeftInactiveArrowImage from './img/arrow_inactive_left.png'

const styles = StyleSheet.create({
  container: {
    width: '960px',
    marginTop: '40px',
    minHeight: '700px'
  },
})

class RestaurantList extends React.Component {
  static propTypes = {
    restaurants: PropTypes.array,
    handleShowMenu: PropTypes.func,
    handleAfterSlide: PropTypes.func,
  }

  static renderNextSliderButton(slider) {
    const source = (slider.currentSlide < slider.slideCount - 1) ?
      RightArrowImage : RightInactiveArrowImage

    return (
      <Touchable onPress={slider.nextSlide}>
        <Image style={styles.sliderButton} resizeMode="contain" source={source} />
      </Touchable>
    )
  }

  static renderPrevSliderButton(slider) {
    const source = slider.currentSlide ? LeftArrowImage : LeftInactiveArrowImage

    return (
      <Touchable onPress={slider.previousSlide}>
        <Image style={styles.sliderButton} resizeMode="contain" source={source} />
      </Touchable>
    )
  }

  static renderSliderPins(slider) {
    return <SliderPins slider={slider} />
  }

  render() {
    if (!this.props.restaurants.length) {
      return null
    }

    const restaurants = this.props.restaurants.map(restaurant =>
      <RestaurantCard key={`restaurant-${restaurant.id}`} restaurant={restaurant} handleShowMenu={this.props.handleShowMenu} />)

    return (
      <View style={styles.container}>
        <Carousel
          width="960px"
          framePadding="0 0 70px 0"
          renderBottomCenterControls={DishCardList.renderSliderPins}
          renderCenterRightControls={DishCardList.renderNextSliderButton}
          renderCenterLeftControls={DishCardList.renderPrevSliderButton}
          afterSlide={this.props.handleAfterSlide}
        >
          {restaurants}
        </Carousel>
      </View>
    )
  }
}

export default RestaurantList
