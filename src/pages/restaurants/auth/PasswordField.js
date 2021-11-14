import React from 'react'
import PropTypes from 'prop-types'
<<<<<<< HEAD
import { StyleSheet, View, Text, Image } from 'react-native'

import { sans } from 'fonts'
=======
import { StyleSheet, View, Text, Image, TextInput } from 'react-native'
>>>>>>> feature/398/email_sign_up
import Touchable from 'Touchable'
import KeyImage from '../img/keyNormal.png'
import { moderateScale, pickStyle } from 'scale'

const commonStyle = {
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(168,174,177,0.1)',
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    borderColor: '#FF6F45',
    borderStyle: 'solid',
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
  },
  text: {
<<<<<<< HEAD
    ...sans({
      color: '#000000',
      fontWeight: '500',
    }),
    textAlign: 'center',
    marginLeft: 25,
=======
    color: '#000000',
    textAlign: 'left',
    fontFamily: 'Source Sans Pro',
    fontSize: 20,
    fontWeight: '300',
    marginLeft: 16,
    outline: 'none',
    width: '85%',
>>>>>>> feature/398/email_sign_up
  },
  image: {
    width: 25,
    height: 25,
    marginRight: 8,
  },
}
const desktopStyle = {
  ...commonStyle,
  container: {
    ...commonStyle.container,
    width: 480,
    minWidth: 480,
    height: 72,
    minHeight: 72,
    borderRadius: 8,
  },
  text: {
    ...commonStyle.text,
    marginTop: -2.5,
    minWidth: 86,
    lineHeight: 31,
  },
}
const mobileStyle = {
  ...commonStyle,
  container: {
    ...commonStyle.container,
    borderRadius: moderateScale(8),
    width: moderateScale(329),
    minWidth: moderateScale(329),
    marginLeft: moderateScale(-15),
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

class EmailField extends React.Component {

    static propTypes = {
      onEnter: PropTypes.func,
      passwordError: PropTypes.bool,
      setPassword: PropTypes.func,
    }

    constructor(props) {
      super(props)
    }

    render() {
      return (
        <View style={[styles.container, this.props.passwordError === true ? { borderWidth: 2 } : { borderWidth: 0 }]} >
          <View style={styles.contentContainer}>
            <TextInput
              style={styles.text}
              secureTextEntry
              onChangeText={value => this.props.setPassword(value)}
              placeholder="Password"
              onSubmitEditing={(e) => {
                if (e.key === 'Enter') {
                  this.props.onEnter()
                }
              }}
            />
            <Image style={styles.image} resizeMode="contain" source={KeyImage} />
          </View>
        </View>
      )
    }
}


import { connect } from 'react-redux'
import { requestFbAuth } from './sagas/auth'

const mapStateToProps = (state) => ({
  passwordError: state.auth.passwordError,
})
const mapDispatchToProps = {
}

export const EmailFieldContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EmailField)
export default EmailFieldContainer
