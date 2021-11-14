import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text, Linking } from 'react-native'
import CloseButton from '../restaurant/Menu/CloseButton'
import { moderateScale, pickStyle } from 'scale'
import FaceBookButton from './FaceBookButton'
import EmailField from './EmailField'

const commonStyle = {
  modal: {
    position: 'fixed',
    zIndex: 1000,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    overflow: 'auto',
    backgroundColor: 'rgba(115,136,147,0.2)',
  },
  modalContentBox: {
    marginTop: '5%',
    marginRight: 'auto',
    marginBottom: '5%',
    marginLeft: 'auto',
    padding: 40,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    boxShadow: '0 0 30px 0 rgba(96,143,171,0.2)',
    display: 'flex',
    flexDirection: 'column',
  },
  closeContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  fbContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
  },
  text: {
    color: '#000000',
    fontFamily: '"Source Sans Pro", sans-serif',
    fontWeight: 'bold',
    textAlign: 'center',
  },

}
const desktopStyle = {
  ...commonStyle,
  modalContentBox: {
    ...commonStyle.modalContentBox,
    width: 560,
  },
  text: {
    ...commonStyle.text,
    marginTop: -2.5,
    minWidth: 106,
    fontSize: 24,
    lineHeight: 31,
  },
}
const mobileStyle = {
  ...commonStyle,
  modalContentBox: {
    ...commonStyle.modalContentBox,
    width: '100%',
    bottom: 0,
    opacity: 1,
    position: 'absolute',
    height: '95%',
    marginBottom: 0,
    marginTop: 0,
    marginLeft: 0,
    marginRight: 0,
  },
  text: {
    ...commonStyle.text,
    fontSize: moderateScale(24),
    lineHeight: moderateScale(20),
  },
}
const styles = StyleSheet.create(pickStyle(mobileStyle, desktopStyle))

class PopupModal extends React.Component {

    static propTypes = {
      actionName: PropTypes.string,
      unSelect: PropTypes.func,
      authenticated: PropTypes.string,
    }

    constructor(props) {
      super(props)
      this.handleClosePress = this.handlePress.bind(this)
    }

    handlePress() {
      this.props.unSelect()
    }


    render() {
      const selectedAction = this.props.actionName
      const auth = this.props.authenticated

      const isAuthenticated = !!(auth && auth.length > 0)


      let displayAction = ''
      if (selectedAction === 'SIGN_UP' || selectedAction === 'SIGN_IN') {

        if (selectedAction === 'SIGN_UP') displayAction = 'Sign Up'
        else displayAction = 'Sign in'
      }
      const isActionSelected = !!(selectedAction && selectedAction.length > 0)

      if (isActionSelected && !isAuthenticated) {
        return (
          <View style={styles.modal}>
            <View style={styles.modalContentBox}>
              <View style={styles.closeContainer}>
                <CloseButton onPress={this.handlePress} />
              </View>
              <View>
                <Text style={styles.text}>
                  {displayAction}
                </Text>
              </View>

              <View>
                <EmailField />
              </View>
              <View style={styles.fbContainer}>
                <FaceBookButton selectedAction={selectedAction} />
              </View>
            </View>
          </View>
        )
      }
      return null
    }

}

import { connect } from 'react-redux'
import { unSelect } from '../auth/actions/popup'

const mapStateToProps = (state) => ({
  actionName: state.auth.actionName,
  authenticated: state.auth.token,
})
const mapDispatchToProps = {
  unSelect,
}


export const PopupModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PopupModal)
export default PopupModalContainer
