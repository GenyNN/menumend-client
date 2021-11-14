import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text, Image } from 'react-native'
import { isEmpty } from 'lodash'

import {
  SmallCuisineBadge, MediumCuisineBadge,
  LargeCuisineBadge, ExtraLargeCuisineBadge,
} from './CuisineBadge'
import CuisineType from './CuisineType'


class CuisineTag extends React.PureComponent {

  static propTypes = {
    data: PropTypes.shape({
      type: PropTypes.string,
      distance: PropTypes.number,
    }),
  }

  render() {
    let restaurantDistance = null
    let cuisines = []
    if (!isEmpty(this.props.data)) {
      restaurantDistance = this.props.data.distance
      const { type, distance } = this.props.data
      if (type) {
        cuisines = type.split(',')
      }
    }
    cuisines = cuisines.slice(0, 3)
    // in case you'll want to manually test appearance
    // cuisines = [...cuisines, ...cuisines]
    // cuisines = []
    let Container
    switch (cuisines.length) {
    case 0:
      Container = SmallCuisineBadge
      break
    case 1:
      Container = MediumCuisineBadge
      break
    case 2:
      Container = LargeCuisineBadge
      break
    default:
      Container = ExtraLargeCuisineBadge
      break
    }

    return (
      <Container cuisines={cuisines} distance={restaurantDistance} />
    )
  }
}


import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
  data: state.restaurant.selected,
})
const mapDispatchToProps = null

export const CuisineTagContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CuisineTag)

export default CuisineTagContainer
