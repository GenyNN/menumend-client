import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text, TextInput, Image } from 'react-native'
import Touchable from 'Touchable'
import MailImage from '../img/mailEnvelope.png'
import { sans } from 'fonts'
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
    ...sans({
      color: '#000000',
      fontWeight: '500',
    }),
      textAlign: 'left',
    fontSize: 20,
    fontWeight: '300',
    marginLeft: 16,
    width: '85%',
    outline: 'none',
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
    fontSize: 20,
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
      emailError: PropTypes.bool,
      setEmail: PropTypes.func,
    }


    render() {
      return (
        <View style={[styles.container, this.props.emailError === true ? { borderWidth: 2 } : { borderWidth: 0 }]} >
          <View style={styles.contentContainer}>
            <TextInput
              style={styles.text}
              onChangeText={value => this.props.setEmail(value)}
              placeholder="Email"
              onSubmitEditing={(e) => {
                if (e.key === 'Enter') {
                  this.props.onEnter()
                }
              }
              }
            />
            <Image style={styles.image} resizeMode="contain" source={MailImage} />
          </View>
        </View>
      )
    }
}


import { connect } from 'react-redux'
import { requestFbAuth } from './sagas/auth'

const mapStateToProps = (state) => ({
  emailError: state.auth.emailError,
})
const mapDispatchToProps = {

}

export const EmailFieldContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EmailField)
export default EmailFieldContainer
