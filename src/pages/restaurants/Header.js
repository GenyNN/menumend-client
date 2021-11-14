import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View, Image } from 'react-native'
import { isEmpty } from 'lodash'

import { serif } from 'fonts'
import { moderateScale, pickStyle } from 'scale'
import Touchable from 'Touchable'
import BackArrowImage from './img/back_arrow.png'


const commonStyle = {
  header: {
    ...serif({
      color: '#000000',
      fontWeight: 'normal',
    }),
    textAlign: 'center',
  },
  wrapper: {
    height: 80,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: -14 - 20,
  },
  image: {
    width: 20,
    height: 17,
  },
}
const desktopStyle = {
  ...commonStyle,
  container: {
    zIndex: 20,
    width: '100%',
  },
  header: {
    ...commonStyle.header,
    marginTop: 74,
    fontSize: 36,
  },
  restaurantHeader: {
    ...commonStyle.header,
    marginTop: 100,
    fontSize: 48,
    lineHeight: 45,
    fontWeight: '500',
  },
}
const mobileStyle = {
  ...commonStyle,
  container: {
    marginTop: 12,
  },
  image: {
    display: 'none',
  },
  header: {
    ...commonStyle.header,
    marginTop: moderateScale(100),
    fontSize: moderateScale(18),
    lineHeight: moderateScale(23),
  },
  restaurantHeader: {
    ...commonStyle.header,
    marginTop: moderateScale(100),
    fontSize: moderateScale(18),
    lineHeight: moderateScale(23),
  },
}
const styles = StyleSheet.create(pickStyle(mobileStyle, desktopStyle))


class Header extends React.PureComponent {

  static propTypes = {
    onPress: PropTypes.func.isRequired,
    history: PropTypes.any.isRequired,
  }

  constructor(props) {
    super(props)
    this.handlePress = this.handlePress.bind(this)
  }

  handlePress() {
    this.props.onPress()
    this.props.history.push('/')
  }

  render() {
    const back = (!isEmpty(this.props.selected)) ? (
      <View style={styles.wrapper}>
        <Touchable onPress={this.handlePress}>
          <Image
            style={styles.image}
            resizeMode="contain"
            source={BackArrowImage}
          />
        </Touchable>
      </View>
    ) : null
    return (
      <View style={styles.container}>
        {back}
        <Text style={styles.header}>Get personalized menu recommendations based <br /> on your tastes and preferences</Text>
      </View>
    )
  }

}


import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { resetRestaurant } from './restaurant/actions/reset'

const mapStateToProps = (state) => ({
  selected: state.restaurant.selected,
})
const mapDispatchToProps = {
  onPress: resetRestaurant,
}

export const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header)
export default withRouter(HeaderContainer)
