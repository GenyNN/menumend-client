import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text } from 'react-native'
import Item from './Item'

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    minHeight: '100%',
    backgroundColor: '#FFF',
  },
})

class ItemsContainer extends React.Component {

  static propTypes = {
    items: PropTypes.array,
    activeItem: PropTypes.number
  }

  render() {
    if (!this.props.items) {
      return null;
    }

    let activeItem = this.props.items[this.props.activeItem];

    let activeItemComponent = null
    if (activeItem) {
      activeItemComponent = (
        <Item data={activeItem} />
      )
    }

    return (
      <View style={styles.container}>
        {activeItemComponent}
      </View>
    )
  }

}


export default ItemsContainer
