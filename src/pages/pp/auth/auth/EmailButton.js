import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text, Image } from 'react-native'
import Touchable from 'Touchable'

import { moderateScale, pickStyle } from 'scale'

const commonStyle = {
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCBF76',
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
  },
  text: {
    color: '#FFFFFF',
    fontFamily: '"Source Sans Pro", sans-serif',
    fontWeight: '500',
    textAlign: 'center',
    marginLeft: 5,
  },
  image: {
    width: 25,
    height: 25,
  },
}
const desktopStyle = {
  ...commonStyle,
  container: {
    ...commonStyle.container,
    width: 315,
    minWidth: 115,
    height: 56,
    minHeight: 56,
    borderRadius: 33,
  },
  text: {
    ...commonStyle.text,
    marginTop: -2.5,
    minWidth: 106,
    fontSize: 25,
    lineHeight: 31,
  },
}
const mobileStyle = {
  ...commonStyle,
  container: {
    ...commonStyle.container,
    borderRadius: 23,
    width: moderateScale(279),
    minWidth: moderateScale(279),
    height: moderateScale(46),
    minHeight: moderateScale(46),
    maxHeight: moderateScale(46),
  },
  text: {
    ...commonStyle.text,
    fontSize: moderateScale(16),
    lineHeight: moderateScale(20),
  },
  image: {
    ...commonStyle.image,
    marginLeft: moderateScale(-30),
  },
}
const styles = StyleSheet.create(pickStyle(mobileStyle, desktopStyle))

class EmailButton extends React.Component {

    static propTypes = {
      selectedAction: PropTypes.string,
    }

    constructor(props) {
      super(props)

      this.emailLogin = this.emailLogin.bind(this)
    }

    emailLogin = () => {

    }

    render() {
      let actionButtonDisplay = ''
      if (this.props.selectedAction === 'SIGN_UP') { actionButtonDisplay = 'Sign up' }
      if (this.props.selectedAction === 'SIGN_IN') { actionButtonDisplay = 'Sign in' }
      return (
        <Touchable onClick={this.emailLogin}>
          <View style={styles.container} >

            <Text style={styles.text}>
              {actionButtonDisplay}
            </Text>
          </View>
        </Touchable>
      )
    }
}


import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
})
const mapDispatchToProps = {
}

export const EmailButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EmailButton)
export default EmailButtonContainer

