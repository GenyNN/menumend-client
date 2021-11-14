import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text } from 'react-native'

import CardsFilterContainer from './CardsFilterContainer'
import CardsContentContainer from './CardsContentContainer'
import SorterSwitcher from '../../components/cards/SelectSorting'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    marginBottom: '150px',
    minHeight: '500px',
  },
})
export default class CardsContainer extends React.PureComponent {

    static propTypes = {
    }
    render() {
      return (
        <View style={styles.container}>
          <SorterSwitcher />
          <CardsFilterContainer />
          <CardsContentContainer />
        </View>
      )
    }
}
