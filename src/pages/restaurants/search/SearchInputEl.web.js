import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, TextInput } from 'react-native'

import { sans } from 'fonts'
import { moderateScale, pickStyle } from 'scale'


const commonStyle = {
  input: {
    ...sans({
      fontWeight: '300',
    }),
    outline: 'none',
    border: 0,
    padding: 0,
    margin: 0,
  },
}

const desktopStyle = {
  input: {
    ...commonStyle.input,
    fontSize: '24px',
    lineHeight: '31px',
  },
}

const mobileStyle = {
  input: {
    ...commonStyle.input,
    fontSize: `${moderateScale(14)}px`,
    lineHeight: `${moderateScale(18)}px`,
  },
}
const styles = pickStyle(mobileStyle, desktopStyle)


export default class SearchInputEl extends React.PureComponent {

  render() {
    return (
      <input
        type='text'
        ref={(input) => { this.searchInputEl = input }}
        style={styles.input}
        {...this.props}
      />
    )
  }

}
