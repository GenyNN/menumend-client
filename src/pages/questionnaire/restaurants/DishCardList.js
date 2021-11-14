import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text, Image } from 'react-native'
import Touchable from 'Touchable';
import Carousel from 'nuka-carousel';
import DishCard from './DishCard'
import SliderPins from './SliderPins'

import RightArrowImage from './img/arrow_right.png'
import LeftArrowImage from './img/arrow_left.png'
import RightInactiveArrowImage from './img/arrow_inactive_right.png'
import LeftInactiveArrowImage from './img/arrow_inactive_left.png'


const styles = StyleSheet.create({
  container: {
    paddingTop: '84px'
  },
  list: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    minWidth: '1140px',
    minHeight: '400px',
    marginTop: '40px',
    paddingLeft: '40px',
    paddingRight: '40px',
  },
  sliderButton: {
    width: '14px',
    height: '25px'
  }

})


class DishCardList extends React.Component {

  static propTypes = {
    dishes: PropTypes.array
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
    if (!this.props.dishes.length) {
      return null
    }

    const dishes = this.props.dishes
    const chunk = 3
    let dishChunks = []

    for (let i = 0, j = dishes.length; i < j; i += chunk) {
      dishChunks.push(dishes.slice(i, i + chunk))
    }

    const slides = dishChunks.map((dishes, i) => {
      return (
        <View key={`slide-${i}`} style={styles.list}>
          {dishes.map(dish => <DishCard key={`dish-${dish.id}`} dish={dish} />)}
        </View>
      )
    })

    return (
      <View style={styles.container}>
        <Carousel
          width="1140px"
          renderBottomCenterControls={null}
          renderTopCenterControls={DishCardList.renderSliderPins}
          renderCenterRightControls={DishCardList.renderNextSliderButton}
          renderCenterLeftControls={DishCardList.renderPrevSliderButton}
        >
          {slides}
        </Carousel>
      </View>
    )
  }
}

export default DishCardList
