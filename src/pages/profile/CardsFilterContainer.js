import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text } from 'react-native'

import FilterButtonAllTypes from '../../components/cards/FilterButtonAllTypes'
import FilterButtonRestaurant from '../../components/cards/FilterButtonRestaurant'
import FilterButtonDish from '../../components/cards/FilterButtonDish'


import { moderateScale, pickStyle } from 'scale'

const commonStyle = {
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    marginTop: '60px',
    justifyContent: 'center',
  },

  containerButtons: {
    display: 'flex',
    flexDirection: 'row',
    width: '880px',
  },

  containerSelect: {
    justifyContent: 'center',
  },
}

const desktopStyle = {
  ...commonStyle,
}

const mobileStyle = {
  ...commonStyle,
  container: {
    ...commonStyle.container,
    marginTop: moderateScale(20),
    paddingLeft: moderateScale(10),
  },
  containerButtons: {
    ...commonStyle.containerButtons,
    width: moderateScale(375),
  },
}
const styles = StyleSheet.create(pickStyle(mobileStyle, desktopStyle))

export default class CardsFilterContainer extends React.PureComponent {

    static propTypes = {
    }

    constructor(props) {
      super(props)
    }


    render() {
      return (
        <View style={styles.container}>
          <View style={styles.containerButtons} >
            <FilterButtonAllTypes />
            <FilterButtonRestaurant />
            <FilterButtonDish />
          </View>
        </View>
      )
    }
}
