import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Button } from 'react-native'

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row'
  },
})


class SliderPins extends React.Component {

  static propTypes = {
    slider: PropTypes.object
  }

  render() {
    const { slider } = this.props;
    let pins = []
    const pinStyle = {
      width: '32px',
      height: '2px',
      borderRadius: '100px',
      backgroundColor: '#E5EBEF'
    }

    for (let i = 0; i < slider.slideCount; i++) {
      let style = { ...pinStyle }
      if (i === slider.currentSlide) {
        style['backgroundColor'] = '#DCBF76'
      }

      pins.push(
        <View key={i} style={{ display: 'inline-block', width: '32px', height: '2px', marginRight: '5px' }}>
          <div style={style} />
        </View>
      )
    }

    return (
      <View style={styles.container}>
        {pins}
      </View>
    )
  }
}

export default SliderPins
