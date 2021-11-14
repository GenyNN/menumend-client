import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text } from 'react-native'
import HeaderTabProfile from './HeaderTabProfile'
import HeaderCentralProfile from './HeaderCentralProfile'
import CardsContainer from './CardsContainer'

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
})
export default class ProfilePage extends React.PureComponent {

    static propTypes = {
    }

    render() {

      return (
        <View style={styles.wrapper}>
          <HeaderTabProfile />
          <HeaderCentralProfile />
          <CardsContainer />
        </View>
      )
    }
}
