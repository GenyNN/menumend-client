import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text, Image } from 'react-native'
import Touchable from 'Touchable'

import LeafSmallImage from '../../img/leaf_small.png'
import { moderateScale, pickStyle } from 'scale'

const textTrimmer = {
  display: 'inline-block',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}

const commonStyle = {
  containerActive: {
    backgroundColor: '#FFFFFF',
  },
  containerInactive: {
    backgroundColor: '#EAF0EC',
    borderWidth: '1px',
    borderColor: '#A8AEB1',
  },
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textActive: {
    color: '#000000',
    ...textTrimmer,
  },
  textInactive: {
    color: '#A8AEB1',
    ...textTrimmer,
  },
  image: {
    width: '24px',
    height: '35px',
    position: 'absolute',
    top: '-12px',
    left: '-6px',
  },
}

const containerDesktop = {
  height: 'auto',
  minHeight: '66px',
  borderRadius: '40px',
  marginLeft: '10px',
  marginRight: '10px',
  marginTop: '16px',
  marginBottom: '8px',
  paddingVertical: '8px',
}
const textDesktop = {
  maxWidth: 431 - (24 * 2),
  marginTop: -3,
  fontFamily: '"Source Sans Pro", sans-serif',
  fontSize: 20,
  lineHeight: 25,
  minHeight: 25,
  textAlign: 'center',
}

const containerMobile = {
  minHeight: moderateScale(46),
  borderRadius: moderateScale(23),
  marginLeft: moderateScale(8),
  marginRight: moderateScale(8),
  marginTop: moderateScale(16),
}
const textMobile = {
  maxWidth: moderateScale(300) - (moderateScale(16) * 2),
  fontFamily: '"Source Sans Pro", sans-serif',
  fontSize: moderateScale(14),
  lineHeight: moderateScale(18),
  textAlign: 'center',
  marginVertical: moderateScale(7),
}

const desktopStyle = {
  ...commonStyle,
  containerActive: {
    ...commonStyle.containerActive,
    ...containerDesktop,
  },
  containerInactive: {
    ...commonStyle.containerInactive,
    ...containerDesktop,
  },
  textActive: {
    ...commonStyle.textActive,
    ...textDesktop,
  },
  textInactive: {
    ...commonStyle.textInactive,
    ...textDesktop,
  },
  image: {
    ...commonStyle.image,
    width: 24,
    height: 35,
  },
  wrapper: {
    ...commonStyle.wrapper,
    paddingLeft: 24,
    paddingRight: 24,
  },
}

const mobileStyle = {
  ...commonStyle,
  containerActive: {
    ...commonStyle.containerActive,
    ...containerMobile,
  },
  containerInactive: {
    ...commonStyle.containerInactive,
    ...containerMobile,
  },
  textActive: {
    ...commonStyle.textActive,
    ...textMobile,
  },
  textInactive: {
    ...commonStyle.textInactive,
    ...textMobile,
  },
  image: {
    ...commonStyle.image,
    width: 21,
  },
  wrapper: {
    ...commonStyle.wrapper,
    paddingLeft: moderateScale(16),
    paddingRight: moderateScale(16),
  },
}
const styles = StyleSheet.create(pickStyle(mobileStyle, desktopStyle))

export function isHealthy(dish) {
  return dish && dish.tags && dish.tags.indexOf('healthy-choice') !== -1
}


class CloudItem extends React.PureComponent {

  static propTypes = {
    enabled: PropTypes.bool.isRequired,
    data: PropTypes.shape({
      id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]).isRequired,
      name: PropTypes.string.isRequired,
      tags: PropTypes.array.isRequired,
    }).isRequired,
  }

  constructor(props) {
    super(props)

    this.handlePress = this.handlePress.bind(this)
  }

  handlePress() {
    this.props.onItemPress(this.props.data.id)
  }

  render() {
    const { name, tags } = this.props.data

    let leafImage = null
    let textStyle = styles.textInactive
    let containerStyle = styles.containerInactive

    if (this.props.enabled) {
      textStyle = styles.textActive
      containerStyle = styles.containerActive
      leafImage = (
        <Image
          resizeMode="contain"
          style={styles.image}
          source={LeafSmallImage}
        />
      )
    }
    return (
      <Touchable onPress={this.handlePress}>
        <View style={containerStyle}>
          <View style={styles.wrapper}>
            {leafImage}
            <Text style={textStyle}>
              {name}
            </Text>
          </View>
        </View>
      </Touchable>
    )
  }
}

import { connect } from 'react-redux'
import { selectDish } from './actions/dishes'

const mapStateToProps = (state) => ({
})
const mapDispatchToProps = {
  onItemPress: selectDish,
}

export const CloudItemContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CloudItem)
export default CloudItemContainer
