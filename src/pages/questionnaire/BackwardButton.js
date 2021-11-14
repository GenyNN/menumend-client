import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import PropTypes from 'prop-types'

import Touchable from 'Touchable'

import ArrowImage from './img/back_arrow.png'



const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    left: 0,
    top: '38px',
    zIndex: 10,
  },
  buttonShifted: {
    position: 'absolute',
    left: '-156px',
    top: '-50px',
    zIndex: 10,
  },
  image: {
    width: '22px',
    height: '20px',
  },
})


class BackwardButton extends React.Component {

  static propTypes = {
    onPress: PropTypes.func.isRequired,
    onForYouPage: PropTypes.bool,
  }

  constructor(props) {
    super(props)

    this.handlePress = this.handlePress.bind(this)
  }

  handlePress() {
    this.props.onPress()
  }

  render() {
    const buttonStyle = this.props.onForYouPage ? styles.buttonShifted : styles.button
    return (
      <Touchable onPress={this.handlePress}>
        <View style={buttonStyle}>
          <Image style={styles.image} resizeMode="contain" source={ArrowImage} />
        </View>
      </Touchable>
    )
  }

}

export default BackwardButton
