import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View } from 'react-native'

import { sans } from 'fonts'
import LocationButton from './LocationButton'
import { moderateScale, pickStyle } from 'scale'


export const commonStyle = {
  container: {
    width: '100%',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(83,163,106,0.2)',
  },
  wrapper: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    ...sans({
      color: 'black',
    }),
  },
  error: {
    color: '#FF6F45',
  },
}

export const desktopStyle = {
  ...commonStyle,
  container: {
    ...commonStyle.container,
    minHeight: 88,
    paddingLeft: 32,
    paddingRight: 32,
    paddingTop: 16,
    paddingBottom: 16,
  },
  header: {
    ...commonStyle.header,
    fontSize: 18,
    lineHeight: 23,
  },
  error: {
    ...commonStyle.error,
    fontSize: 18,
    lineHeight: 23,
  },
}
export const mobileStyle = {
  ...commonStyle,
  container: {
    ...commonStyle.container,
    minHeight: moderateScale(66),
    paddingLeft: moderateScale(16),
    paddingRight: moderateScale(16),
    paddingTop: moderateScale(18),
    paddingBottom: moderateScale(18),
  },
  header: {
    ...commonStyle.header,
    width: moderateScale(220),
    fontSize: moderateScale(12),
    lineHeight: moderateScale(15),
  },
  error: {
    ...commonStyle.error,
    marginTop: moderateScale(18), // same as container's padding bottom
    fontSize: moderateScale(12),
    lineHeight: moderateScale(15),
  },
}
export const styles = StyleSheet.create(pickStyle(mobileStyle, desktopStyle))


function isObjEmpty(location, callback) {
  return location && Object.keys(location).length < 1
}


class LocationBarRequest extends React.Component {

  static propTypes = {
    location: PropTypes.object,
    locationError: PropTypes.string,
    //
    locationPending: PropTypes.bool,
    requestPosition: PropTypes.func.isRequired,
  }

  componentDidMount() {
    if (!this.props.locationPending && isObjEmpty(this.props.location)) {
      this.props.requestPosition()
    }
  }

  render() {
    // temporarily disable geo confirmation message, and do request straight away
    const { location } = this.props
       if (location && Object.keys(location).length) {
         return null
      }
       const error = this.props.locationError ? (
         <Text style={styles.error}>
           {this.props.locationError}
         </Text>
       ) : null
       return (
         <View style={styles.container}>
           <View style={styles.wrapper}>
             <Text style={styles.header}>
               Enable geolocation to improve the accuracy and enjoy the feature to the fullest extent
             </Text>
             <LocationButton />
           </View>
           {error}
         </View>
       )
     }
  }

  /* render() {
   *
   */

/* export default LocationBarRequest */

import { connect } from 'react-redux'
import { getCurrentPosition } from './actions/location'

const mapStateToProps = (state) => ({
  locationPending: state.location.pending,
})
const mapDispatchToProps = {
  requestPosition: getCurrentPosition,
}

export const LocationBarRequestContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LocationBarRequest)
export default LocationBarRequestContainer
