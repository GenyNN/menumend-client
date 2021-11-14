import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Image } from 'react-native'

import Touchable from 'Touchable'
import ArrowTopImage from '../../../img/arrow_top.png'


const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'black',

    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

  },
  image: {
    width: 20,
    height: 17,
  },
})

const threshold = window.innerHeight / 2

function scrollToTop() {
  window.scrollTo(0, 0)
}


export default class ScrollTopButton extends React.PureComponent {

  static propTypes = {
    style: PropTypes.any,
  }

  constructor(props) {
    super(props)
    this.state = { display: false }
  }

  componentDidMount() {
    window.onscroll = () => {
      if (document.body.scrollTop > threshold || document.documentElement.scrollTop > threshold) {
        if (!this.state.display) {
          this.setState({ display: true })
        }
      } else if (this.state.display) {
        this.setState({ display: false })
      }
    }
  }

  render() {
    return this.state.display ? (
      <Touchable onPress={scrollToTop}>
        <View style={[styles.container, this.props.style]} >
          <Image
            style={styles.image}
            resizeMode="contain"
            source={ArrowTopImage}
          />
        </View>
      </Touchable>
    ) : null
  }

}
