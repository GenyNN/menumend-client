import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Image, Text } from 'react-native'

import Touchable from 'Touchable'
import { pickStyle } from 'scale'
import { sans, serif } from 'fonts'
import TakeSurveyBackgroundImage from './img/surveybg.png'

const commonStyle = {
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    zIndex: -100,
    left: 0,
    top: 0,
    height: 426,
    width: 620,
    borderRadius: 20,
    backgroundColor: '#2c3234',
    boxShadow: '0 10px 40px 0 rgba(96, 143, 171, 0.15), 0 0 30px 0 rgba(96, 143, 171, 0.2)',
  },
  backgroundWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  image: {
    width: 620,
    height: 426,
  },
  text: {
    width: 477,
    height: 140,
    marginTop: 80,
    ...serif({
      fontSize: 36,
      fontWeight: '700',
      color: '#fff',
    }),
    textAlign: 'center',
  },
  buttonWrapper: {
    width: 212,
    height: 66,
    marginTop: 60,
    borderRadius: 35,
  },
  buttonActive: {
    backgroundColor: '#fff',
    color: '#000',
  },
  buttonInactive: {
    backgroundColor: '#dcbf76',
    color: '#fff',
  },
  buttonText: {
    height: 31,
    marginTop: 15,
    ...sans({
      fontSize: 24,
      fontWeight: '600',
    }),
    textAlign: 'center',
  },
}

const mobileStyle = ({
  ...commonStyle,
  container: {
  },
})

const desktopStyle = ({
  ...commonStyle,
})

const styles = StyleSheet.create(pickStyle(mobileStyle, desktopStyle))


class TakeSurveyBlock extends React.PureComponent {

  static propTypes = {
    style: PropTypes.any,
  }

  constructor(props) {
    super(props)
    this.state = {
      hovered: false,
    }
    this.onMouseEnter = this.onMouseEnter.bind(this)
    this.onMouseLeave = this.onMouseLeave.bind(this)
  }

  onMouseEnter() {
    this.setState({ hovered: true })
  }

  onMouseLeave() {
    this.setState({ hovered: false })
  }

  goToQuestionnaire() {
    return
    window.open(`${window.location.href}/questionnaire.html`, '_self')
  }

  render() {
    const buttonStyle = this.state.hovered ? styles.buttonActive : styles.buttonInactive
    return (
      <View style={this.props.style}>
        <Touchable onPress={this.goToQuestionnaire} >
          <View
            style={styles.container}
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
          >
            <Text style={styles.text}>
              Take this survey and we will personalize menus and find top restaurants for you
            </Text>
            <View style={[ styles.buttonWrapper, buttonStyle ]}>
              <Text style={styles.buttonText}>
                Take survey!
              </Text>
            </View>

            <View style={styles.background}>
              <View style={styles.wrapper}>
                <Image style={styles.image} resizeMode="contain" source={TakeSurveyBackgroundImage} />
              </View>
            </View>
          </View>
        </Touchable>
      </View>
    )
  }
}

export default TakeSurveyBlock
