import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text, Image } from 'react-native'
import Touchable from 'Touchable'
import MailImage from '../img/mailEnvelope.png'
import { moderateScale, pickStyle } from 'scale'

const commonStyle = {
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(168,174,177,0.1)',
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
  },
  text: {
    color: '#000000',
    fontFamily: '"Source Sans Pro", sans-serif',
    fontWeight: '500',
    textAlign: 'center',
    marginLeft: 25,
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
    }

    constructor(props) {
      super(props)
    }

    render() {
      return (
        <Touchable>
          <View style={styles.container} >
            <View style={styles.contentContainer}>
              <Text style={styles.text}>
                      Your email
              </Text>
              <Image style={styles.image} resizeMode="contain" source={MailImage} />
            </View>
          </View>
        </Touchable>
      )
    }
}


import { connect } from 'react-redux'
import { requestFbAuth } from './sagas/auth'

const mapStateToProps = (state) => ({
})
const mapDispatchToProps = {
}

export const EmailFieldContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EmailField)
export default EmailFieldContainer
