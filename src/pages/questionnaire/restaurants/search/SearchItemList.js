import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'

import SearchItem from './SearchItem'

const styles = StyleSheet.create({
  list: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '80px',
    backgroundColor: '#FFFFFF',
    boxShadow: '0 6px 30px 0 rgba(96,143,171,0.2)',
    borderBottomRightRadius: '10px',
    borderBottomLeftRadius: '10px',
  },
})

class SearchItemList extends React.Component {

  static propTypes = {
    values: PropTypes.array,
    selectedIndex: PropTypes.number,
    handlePress: PropTypes.func,
  }

  render() {
    const suggestions = this.props.values.map((s, index) => (
      <SearchItem
        index={index}
        handlePress={this.props.handlePress}
        selected={this.props.selectedIndex === index}
        key={`si-${s.id}`} data={s}
      />
    ))
    return (
      <View style={styles.list}>
        {suggestions}
      </View>
    )
  }

}

export default SearchItemList
