import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'

import flatten from '../flatten'
import CloudItem from '../CloudItem'
import Slider from './Slider'


const styles = StyleSheet.create({
  container: {
    height: 262,
    width: 895,
    marginBottom: 52,
  },
})


class Cloud extends React.PureComponent {

  static propTypes = {
    menus: PropTypes.array,
    onPress: PropTypes.func.isRequired,
  }

  render() {
    const dishes = flatten(this.props.menus).map(dish => (
      <CloudItem
        enabled
        data={dish}
        key={`ci-${dish.id}`}
        onPress={this.props.onPress}
      />
    ))
    const slider = dishes.length ? (
      <Slider>
        {dishes}
      </Slider>
    ) : null
    return (
      <View style={styles.container}>
        {slider}
      </View>
    )
  }
}


import { connect } from 'react-redux'
import { selectDish } from '../actions/dishes'

const mapStateToProps = (state) => ({
  menus: state.restaurant.menus,
})
const mapDispatchToProps = {
  onPress: selectDish,
}

export const CloudContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Cloud)
export default CloudContainer
