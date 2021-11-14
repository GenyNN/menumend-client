import React from 'react'
import PropTypes from 'prop-types'

import LocationBarRequest from './LocationBarRequest'
import LocationBarUnavailable from './LocationBarUnavailable'


class LocationBar extends React.PureComponent {

  static propTypes = {
    initialized: PropTypes.bool,
    location: PropTypes.object,
    locationError: PropTypes.string,
    locationSupported: PropTypes.bool,
  }

  render() {
    return null
    /* if (!this.props.initialized) {
      return null
    }
    const { locationSupported, ...restProps } = this.props
    return locationSupported ? (
      <LocationBarRequest {...restProps} />
    ) : (
      <LocationBarUnavailable />
    )
  } */

}
}


import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
  initialized: state.location.initialized,
  location: state.location.position,
  locationError: state.location.error,
  locationSupported: state.location.supported,
})
const mapDispatchToProps = null

export const LocationBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LocationBar)
export default LocationBarContainer
