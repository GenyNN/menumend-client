import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text } from 'react-native'
import Touchable from 'Touchable'
import { moderateScale, pickStyle } from 'scale'


const commonStyle = {
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginRight: '20px',
  },
  text: {
    color: '#FFFFFF',
    fontFamily: '"Source Sans Pro", sans-serif',
    fontWeight: '600',
    textAlign: 'center',
  },
}
const desktopStyle = {
  ...commonStyle,
  container: {
    ...commonStyle.container,
    width: 169,
    minWidth: 169,
    height: 56,
    minHeight: 56,
    borderRadius: 33,
  },
  text: {
    ...commonStyle.text,
    marginTop: -2.5,
    minWidth: 106,
    fontSize: 20,
    lineHeight: 31,
  },
}
const mobileStyle = {
  ...commonStyle,
  container: {
    ...commonStyle.container,
    borderRadius: 23,
    width: moderateScale(109),
    minWidth: moderateScale(109),
    height: moderateScale(46),
    minHeight: moderateScale(46),
    maxHeight: moderateScale(46),
  },
  text: {
    ...commonStyle.text,
    fontSize: moderateScale(16),
    lineHeight: moderateScale(20),
  },
}
const styles = StyleSheet.create(pickStyle(mobileStyle, desktopStyle))


class FilterButtonRestaurant extends React.Component {

    static propTypes = {
      onPress: PropTypes.func.isRequired,
      restaurantsSelected: PropTypes.bool,
      authenticated: PropTypes.string,
      allTypesSelected: PropTypes.bool,
      dishesSelected: PropTypes.bool,
      handleCardFiltering: PropTypes.func,
      sectionSelected: PropTypes.string,
      sorting: PropTypes.string,
    }

    constructor(props) {
      super(props)

      this.handlePress = this.handlePress.bind(this)
      // const location = JSON.parse(localStorage.getItem('locationCache'))
      this.state = {
        styleInActive: { backgroundColor: 'transparent' },
        styleActive: { backgroundColor: '#DCBF76' },
      }

    }

    componentDidMount() {

      if (this.props.restaurantsSelected) {
        this.fetchFilteredCards()
      }
    }

    componentDidUpdate() {
      if (this.props.restaurantsSelected) {
        this.fetchFilteredCards()
      }
    }

    handlePress() {
      this.props.onPress()
    }

    async fetchFilteredCards() {

      let position = JSON.parse(localStorage.getItem('positionProfile'))
      if (position === null) {
        await this.fillLocation()
        position = JSON.parse(localStorage.getItem('positionProfile'))
      }

      const localState = {
        authenticated: this.props.authenticated,
        allTypesSelected: this.props.allTypesSelected,
        restaurantsSelected: this.props.restaurantsSelected,
        dishesSelected: this.props.dishesSelected,
        latitude: position.latitude,
        longitude: position.longitude,
        sectionSelected: this.props.sectionSelected,
        sorting: this.props.sorting,
      }
      this.props.handleCardFiltering(localState)

    }

    async fillLocation() {

      const location = async function getLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(await showPosition)
        } else {
          console.log('Geolocation is not supported by this browser.')
        }
      }
      function showPosition(position) {
        const positionProfile = { latitude: position.coords.latitude, longitude: position.coords.longitude }
        localStorage.setItem('positionProfile', JSON.stringify(positionProfile))
      }
      await location()
    }

    render() {

      const containerInActiveStyle = {
        backgroundColor: 'transparent', borderStyle: 'solid', borderColor: 'rgb( 212, 215, 216)', borderWidth: '1px',
      }
      const containerActiveStyle = { backgroundColor: '#DCBF76' }
      const textInActiveStyle = { color: '#000000' }
      const textActiveStyle = { color: '#FFFFFF' }

      let containerActual = {}
      let textActual = {}
      if (this.props.restaurantsSelected === true) {
        containerActual = containerActiveStyle
        textActual = textActiveStyle
      } else {
        containerActual = containerInActiveStyle
        textActual = textInActiveStyle
      }
      return (
        <Touchable onPress={this.handlePress}>
          <View style={[styles.container, containerActual]} >
            <Text style={[styles.text, textActual]}>
                       Restaurants
            </Text>
          </View>
        </Touchable>
      )
    }
}

import { connect } from 'react-redux'
import { selectTypeRestaurants } from './actions/buttons'
import { requestCardFiltering } from './sagas/filter'

const mapStateToProps = (state) => ({
  sectionSelected: state.cards.sectionSelected,
  authenticated: state.auth.token,
  allTypesSelected: state.cards.allTypesSelected,
  restaurantsSelected: state.cards.restaurantsSelected,
  dishesSelected: state.cards.dishesSelected,
  sorting: state.cards.sorting,
})
const mapDispatchToProps = {
  onPress: selectTypeRestaurants, /* selectSignUp, */
  handleCardFiltering: requestCardFiltering,
}

export const FilterButtonRestaurantContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FilterButtonRestaurant)
export default FilterButtonRestaurantContainer
