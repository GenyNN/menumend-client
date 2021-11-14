import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { StyleSheet, View, Text, Image } from 'react-native'
import Touchable from 'Touchable'
import Carousel from 'nuka-carousel'
import DishCard from './DishCard'
import SliderPins from './SliderPins'


// We need to place this button at center of dish slide.
// By default this button is located at 50% from the top of carousel slide window
//
// 311px - carousel slide window height
// 230px - dish slide height
// 311/2 = 155 - middle of carousel
// 230/2 = 115 - middle of dish slide
// 155 - 115 = 40 - required offset
//
//

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
  },
  list: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    minWidth: '1140px',
    paddingLeft: '40px',
    paddingRight: '40px',
  },
  nextButton: {
    ...borderStyle,
    transform: [{ rotate: '-315deg' }],
    marginTop: -40,
  },
  prevButton: {
    ...borderStyle,
    transform: [{ rotate: '225deg' }],
    marginTop: -40,
  },
})


class DishCardList extends React.Component {

  static propTypes = {
    keyPrefix: PropTypes.string,
  }

  static defaultProps = {
    keyPrefix: '',
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
    }
    const { keyPrefix } = this.props
    const slides = _.chunk(this.props.data, 3)
    const slidesToShow = slides.map((item, index) => {
      const dishesToShow = item.map((dish) => (
        <DishCard
          key={`${keyPrefix}dish-${dish.id}`}
          data={dish}
          onShare={this.props.onShare}
          toggleFavourite={this.props.toggleFavourite}
          token={this.props.token}
        />
      ))
      return (
        <View
          style={styles.list}
          key={`${keyPrefix}slide-${index}`}
        >
          {dishesToShow}
        </View>
      )
    })
    return (
      <View style={styles.container}>
        <Carousel
          wrapAround
          width="1140px"
          framePadding="132px 0 0 0"
          renderTopCenterControls={DishCardList.renderSliderPins}
          renderBottomCenterControls={null}
          renderCenterRightControls={DishCardList.renderNextSliderButton}
          renderCenterLeftControls={DishCardList.renderPrevSliderButton}
        >
          {slidesToShow}
        </Carousel>
      </View>
    )
  }
}

export default DishCardList
