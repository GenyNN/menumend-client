import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text } from 'react-native'

import { sans } from 'fonts'
import { moderateScale, pickStyle } from 'scale'

const commonStyle = {
  popup: {
    position: 'absolute',
    zIndex: 10,
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'column',

    boxShadow: '0 4px 46px 0 rgba(139,158,170,0.20)',
    borderRadius: '10px',
  },
  popupArrowContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: '-14px',
  },
  popupArrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 14,
    borderLeftStyle: 'solid',
    borderLeftColor: 'transparent',

    borderRightWidth: 14,
    borderRightStyle: 'solid',
    borderRightColor: 'transparent',

    borderBottomWidth: 14,
    borderBottomStyle: 'solid',
    borderBottomColor: '#FFFFFF',
  },
  popupContentBox: {
    width: 210,
    minHeight: 150,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 24,
    shadowColor: 'rgba(96,143,171,0.2)',

  },
  text: {
    color: '#000000',
    fontFamily: '"Source Sans Pro", sans-serif',
    fontWeight: '300',
    textAlign: 'center',
  },
  textName: {
    color: '#a8aeb1',
    fontFamily: '"Source Serif Pro", serif',
    fontWeight: '300',
    textAlign: 'center',
  },
  singoutContainer: {
  },
}
const desktopStyle = {
  ...commonStyle,
  popup: {
    ...commonStyle.popup,
    top: 88,
    right: 50,
  },
  popupArrowContainer: {
    ...commonStyle.popupArrowContainer,
    paddingRight: 14,
  },
  popupContentBox: {
    ...commonStyle.popupContentBox,
    padding: 25,
  },

  textName: {
    ...commonStyle.textName,
    fontSize: 18,
  },
  textSignout: {
    ...commonStyle.text,
    fontSize: 20,
  },
  singoutContainer: {
    ...commonStyle.singoutContainer,
    paddingTop: 50,
  },
}
const mobileStyle = {
  ...commonStyle,
  popup: {
    ...commonStyle.popup,
    top: moderateScale(70),
    right: moderateScale(20),
  },
  textName: {
    ...commonStyle.textName,
    fontSize: moderateScale(23),
  },
  textSignout: {
    ...commonStyle.text,
    fontSize: moderateScale(25),
  },
  popupArrow: {
    ...commonStyle.popupArrow,
    display: 'none',
  },
}
const styles = StyleSheet.create(pickStyle(mobileStyle, desktopStyle))
class UserProfile extends React.Component {

    static propTypes = {
      actionName: PropTypes.string,
      authenticated: PropTypes.string,
      handleLogout: PropTypes.func,
      profileShow: PropTypes.bool,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      pictureUrl: PropTypes.string,
    }

    constructor(props) {
      super(props)
      this.handlePress = this.handlePress.bind(this)
    }

    handlePress() {
      this.props.handleLogout(this.props.authenticated)
    }

    render() {
      if (this.props.profileShow) {
        return (
          <View style={styles.popup}>
            <View style={styles.popupArrowContainer}>
              <View style={styles.popupArrow} />
            </View>
            <View style={styles.popupContentBox}>
              <View>
                <Text style={styles.textName} href="/profile.html" accessibilityRole="link">{this.props.firstName} {this.props.lastName}</Text>
              </View>
              <View style={styles.singoutContainer}>
                <Text onPress={this.handlePress} style={styles.textSignout}>Sign Out</Text>
              </View>
            </View>
          </View>
        )
      }
      return null
    }

}

import { connect } from 'react-redux'
import { logout } from './sagas/logout'

const mapStateToProps = (state) => ({
  authenticated: state.auth.token,
  firstName: state.auth.firstName,
  lastName: state.auth.lastName,
  profileShow: state.auth.profileShow,
})
const mapDispatchToProps = {
  handleLogout: logout,
}


export const UserProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserProfile)
export default UserProfileContainer
