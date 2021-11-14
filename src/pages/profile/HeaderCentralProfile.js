import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View, Image } from 'react-native'
import { isEmpty } from 'lodash'
import AvatarCentralProfile from './AvatarCentralProfile'

import { moderateScale, pickStyle } from 'scale'
import Touchable from 'Touchable'
import BackArrowImage from './img/back_arrow.png'
import SectionSwitcherTab from '../../components/cards/SectionSwitcherTab'

const commonStyle = {
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
  },
  userText: {
    color: '#000000',
    fontFamily: '"Source Serif Pro", serif',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  wrapperBack: {
    height: 80,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: -14 - 20,
  },
  imageBack: {
    width: 20,
    height: 17,
  },
}
const desktopStyle = {
  ...commonStyle,
  container: {
    ...commonStyle.container,
    height: 400,
  },
  userText: {
    ...commonStyle.userText,
    fontSize: 64,
    lineHeight: 80,
  },
}
const mobileStyle = {
  ...commonStyle,
  container: {
    ...commonStyle.container,
    height: moderateScale(200),
  },
  imageBack: {
    display: 'none',
  },
  userText: {
    ...commonStyle.userText,
    marginTop: moderateScale(30),
    fontSize: moderateScale(36),
    lineHeight: moderateScale(49),
  },
}
const styles = StyleSheet.create(pickStyle(mobileStyle, desktopStyle))


class HeaderCentralProfile extends React.PureComponent {

    static propTypes = {
      /* onPress: PropTypes.func.isRequired,
      history: PropTypes.any.isRequired,
      selected: PropTypes.object.isRequired, */
    }

    constructor(props) {
      super(props)
      this.handlePress = this.handlePress.bind(this)
    }

    handlePress() {
    }

    render() {
      const back = (5) ? (
        <View style={styles.wrapperBack}>
          <Touchable onPress={this.handlePress}>
            <Image
              style={styles.imageBack}
              resizeMode="contain"
              source={BackArrowImage}
            />
          </Touchable>
        </View>
      ) : null


      return (
        <View style={styles.container}>
          {back}

          <AvatarCentralProfile />
          <Text style={styles.userText} />
          <SectionSwitcherTab />
        </View>
      )
    }

}


import { connect } from 'react-redux'
// import { resetRestaurant } from './restaurant/actions/reset'

const mapStateToProps = (state) => ({
  /* selected: state.restaurant.selected, */
})
const mapDispatchToProps = {
  /* onPress: resetRestaurant, */
}

export const HeaderCentralProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HeaderCentralProfile)
export default (HeaderCentralProfileContainer)
