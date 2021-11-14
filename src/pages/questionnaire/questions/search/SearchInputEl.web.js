import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, TextInput } from 'react-native'

import { moderateScale, pickStyle } from 'scale'

const commonStyle = {
  input: {
    fontFamily: '"Source Sans Pro", sans-serif',
    fontWeight: '300',
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
  componentDidMount() {
    if (this.searchInputEl) {
      this.searchInputEl.focus()
    }
  }

  reset() {
    this.searchInputEl.value = ''
  }

  render() {
    return (
      <input
        ref={(input) => { this.searchInputEl = input }}
        style={styles.input}
        {...this.props}
      />
    )
  }

}
