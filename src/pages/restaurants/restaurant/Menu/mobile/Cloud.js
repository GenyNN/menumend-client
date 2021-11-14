import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'

import { moderateScale } from 'scale'
import flatten from '../flatten'
import CloudItem from '../CloudItem'
import StartOverButton from '../StartOverButton'


const styles = StyleSheet.create({
  container: {
    width: '100%',
    minWidth: moderateScale(331),
    overflow: 'hidden',

    minHeight: 431,
    marginTop: 50,
    paddingLeft: 24,
    paddingRight: 20,
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  buttonWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    marginTop: 60,
    marginBottom: 40 + 54, // + See full menu button
  },
})


class Cloud extends React.PureComponent {

  static propTypes = {
    menus: PropTypes.array,
    onPress: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const el = document.getElementById('restaurant_page')
    if (el && el.scrollIntoView) {
      el.scrollIntoView()
    }
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
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          {dishes}
        </View>
        <View style={styles.buttonWrapper}>
          <StartOverButton />
        </View>
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
