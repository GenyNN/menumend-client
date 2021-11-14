import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'


const desktopStyle = {
  stretched: {
    width: '100%',
    height: 368,
  },
  squeezed: {
    width: '100%',
    height: 140,
  },
}
const styles = StyleSheet.create(desktopStyle)


class MenuSignUPSpacer extends React.PureComponent {

  static propTypes = {
    auth: PropTypes.string,
  }

  render() {
    const isAuthenticated = this.props.auth.length !== 0
    return (
      <View style={isAuthenticated ? styles.squeezed : styles.stretched} />
    )
  }

}

import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
  auth: state.auth.firstName,
})

export const MenuSignUPSpacerContainer = connect(
  mapStateToProps,
)(MenuSignUPSpacer)
export default MenuSignUPSpacerContainer
