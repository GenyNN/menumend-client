import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text } from 'react-native'

import { sans } from 'fonts'
import { moderateScale, pickStyle } from 'scale'
import Touchable from 'Touchable'
import Blink from './Blink'


const commonStyle = {
  container: {
    marginLeft: '24px',
    borderRadius: '33px',
    backgroundColor: 'white',
  },
  text: {
    cursor: 'pointer',
    outline: 'none',
    ...sans({
      color: '#53A36A',
      fontWeight: '600',
    }),
    textAlign: 'center',
  },
}
const desktopStyle = {
  ...commonStyle,
  container: {
    ...commonStyle.container,
    height: 56,
    paddingTop: 11,
    paddingBottom: 14,
    paddingLeft: 27,
    paddingRight: 27,
  },
  text: {
    ...commonStyle.text,
    fontSize: 24,
    lineHeight: 31,
  },
}
const mobileStyle = {
  ...commonStyle,
  container: {
    ...commonStyle.container,
    height: moderateScale(40),
    paddingTop: moderateScale(9),
    paddingBottom: moderateScale(11),
    paddingLeft: moderateScale(17),
    paddingRight: moderateScale(17),
  },
  text: {
    ...commonStyle.text,
    fontSize: moderateScale(16),
    lineHeight: moderateScale(20),
  },
}
const styles = StyleSheet.create(pickStyle(mobileStyle, desktopStyle))


class LocationButton extends React.PureComponent {

  static propTypes = {
    onPress: PropTypes.func.isRequired,
    locationPending: PropTypes.bool,
  }

  render() {
    const { locationPending } = this.props
    const text = locationPending ? 'Locating' : 'Enable'
    const onClick = locationPending ? null : this.props.onPress
    return (
      <Blink active={this.props.locationPending}>
        <Touchable onPress={onClick}>
          <View style={styles.container}>
            <Text style={styles.text} onClick={onClick}>
              {text}
            </Text>
          </View>
        </Touchable>
      </Blink>
    )
  }

}


import { connect } from 'react-redux'
import { getCurrentPosition } from './actions/location'

const mapStateToProps = (state) => ({
  locationPending: state.location.pending,
})
const mapDispatchToProps = {
  onPress: getCurrentPosition,
}

export const LocationButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LocationButton)
export default LocationButtonContainer
