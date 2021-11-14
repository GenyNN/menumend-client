import React from 'react'
import PropTypes from 'prop-types'
import { pickStyle, moderateScale } from 'scale'
import { StyleSheet, Text, View, Image } from 'react-native'
import Touchable from 'Touchable'

const desktopStyle = StyleSheet.create({
  container: {
    height: 35,
  },
  image: {
    width: 32,
    height: 32,
    borderRadius: 33,
  },
})
const mobileStyle = StyleSheet.create({
  container: {
    height: 35,
  },
  image: {
    width: moderateScale(32),
    height: moderateScale(32),
    borderRadius: moderateScale(33),
  },
})
const styles = StyleSheet.create(pickStyle(mobileStyle, desktopStyle))

class Logged extends React.Component {
    static propTypes = {
      authenticated: PropTypes.string,
      pictureUrl: PropTypes.string,
      profileShow: PropTypes.bool,
      selectProfileShow: PropTypes.func,
      selectProfileHide: PropTypes.func,
    }

    constructor(props) {
      super(props)
      this.handlePress = this.handlePress.bind(this)
    }

    handlePress() {
      if (!this.props.profileShow) {
        this.props.selectProfileShow()
      } else {
        this.props.selectProfileHide()
      }
    }

    render() {
      const auth = this.props.authenticated
      if (auth) {
        return (
          <Touchable onPress={this.handlePress}>
            <View style={styles.container}>
              <Image
                style={styles.image}
                resizeMode="cover"
                source={this.props.pictureUrl}
              />
            </View>
          </Touchable>
        )
      }
      return null
    }
}

import { connect } from 'react-redux'
import { selectProfileShow, selectProfileHide } from './actions/popup'

const mapStateToProps = (state) => ({
  authenticated: state.auth.token,
  pictureUrl: state.auth.pictureUrl,
  profileShow: state.auth.profileShow,
})
const mapDispatchToProps = {
  selectProfileShow,
  selectProfileHide,
}

export const LoggedContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Logged)
export default LoggedContainer
