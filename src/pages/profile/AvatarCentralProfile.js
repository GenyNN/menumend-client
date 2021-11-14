import React from 'react'
import PropTypes from 'prop-types'
import { pickStyle, moderateScale } from 'scale'
import { StyleSheet, Text, View, Image } from 'react-native'

const commonStyle = {
  container: {
    width: '100%',
    flexDirection: 'column',
    marginTop: '38px',
  },
  containerImage: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  image: {
    borderRadius: '50%',
  },
  userText: {
    color: '#000000',
    fontFamily: '"Source Serif Pro", serif',
    fontWeight: 'normal',
    textAlign: 'center',
  },
  userName: {
    marginTop: 16,
  },
}
const desktopStyle = {
  ...commonStyle,
  image: {
    ...commonStyle.image,
    width: 120,
    height: 120,
  },
  userText: {
    ...commonStyle.userText,
    fontSize: 36,
    lineHeight: 50,
    marginTop: 20,
  },
}

const mobileStyle = {
  ...commonStyle,
  image: {
    ...commonStyle.image,
    width: moderateScale(72),
    height: moderateScale(72),
  },

  userText: {
    ...commonStyle.userText,
    fontSize: moderateScale(27),
    lineHeight: moderateScale(49),
  },
}

const styles = StyleSheet.create(pickStyle(mobileStyle, desktopStyle))

class AvatarCentralProfile extends React.Component {
    static propTypes = {
      pictureUrl: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
    }

    constructor(props) {
      super(props)
      this.handlePress = this.handlePress.bind(this)
    }

    handlePress() {
    }

    render() {
      return (
        <View style={styles.container}>
          <View style={styles.containerImage}>
            <Image style={styles.image} resizeMode="cover" source={this.props.pictureUrl} />
          </View>
          <View style={styles.userName}>
            <Text style={styles.userText}>{this.props.firstName} {this.props.lastName}</Text>
          </View>
        </View>
      )
    }
}

import { connect } from 'react-redux'
// import { selectProfileShow, selectProfileHide } from './actions/popup'

const mapStateToProps = (state) => ({
  pictureUrl: state.auth.pictureUrl,
  firstName: state.auth.firstName,
  lastName: state.auth.lastName,
})
const mapDispatchToProps = {
}

export const AvatarCentralProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AvatarCentralProfile)
export default AvatarCentralProfileContainer
