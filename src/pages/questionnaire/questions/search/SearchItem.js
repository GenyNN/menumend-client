import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Image, Text, TextInput } from 'react-native'

import Touchable from 'Touchable'
import { moderateScale, pickStyle } from 'scale'

const commonStyle = {
  container: {
    width: '100%',
    borderTopWidth: '1px',
    borderColor: '#E5EBEF',
  },
  containerActive: {
    backgroundColor: '#EEEEEE',
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  icon: {
  },
  name: {
    fontFamily: '"Source Serif Pro", sans-serif',
    fontWeight: '300',
  },
  address: {
    fontFamily: '"Source Sans Pro", sans-serif',
    fontWeight: '300',
  },
}

const desktopStyle = {
  ...commonStyle,
  wrapper: {
    ...commonStyle.wrapper,
    height: 76,
    paddingTop: 16,
    paddingBottom: 16,
  },
  icon: {
    marginLeft: '36px',
    marginRight: '32px',
    width: '23px',
    height: '24px',
  },
  name: {
    ...commonStyle.name,
    fontSize: 18,
    lineHeight: 23,
    paddingHorizontal: '36px',
  },
  address: {
    ...commonStyle.address,
    fontSize: 16,
    lineHeight: 20,
  },
}

const mobileStyle = {
  ...commonStyle,
  wrapper: {
    ...commonStyle.wrapper,
    height: moderateScale(61),
    paddingTop: moderateScale(14),
    paddingBottom: moderateScale(14),
  },
  icon: {
    marginLeft: moderateScale(18),
    marginRight: moderateScale(21),
    width: moderateScale(17),
    height: moderateScale(18),
  },
  name: {
    ...commonStyle.name,
    fontSize: moderateScale(12),
    lineHeight: moderateScale(16),
  },
  address: {
    ...commonStyle.address,
    fontSize: moderateScale(10),
    lineHeight: moderateScale(13),
  },
}

const styles = StyleSheet.create(pickStyle(mobileStyle, desktopStyle))


class SearchItem extends React.PureComponent {

  static propTypes = {
    index: PropTypes.number.isRequired,
    selected: PropTypes.bool,
    data: PropTypes.shape({
      name: PropTypes.string.isRequired,
      /*location: PropTypes.shape({
        address1: PropTypes.string.isRequired,
        city: PropTypes.string,
        state: PropTypes.string,
      }).isRequired,*/
    }).isRequired,
    handlePress: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.handlePress = () => {
      this.props.handlePress(this.props.data)
    }
    this.handleMouseEnter = () => {
    }
    this.handleMouseLeave = () => {
    }
  }

  render() {
    /*const { location } = this.props.data
    const address = formatRestaurantAddress(location.address1, location.city, location.state)
    const containerStyle = this.props.selected ? [
      styles.container, styles.containerActive,
    ] : styles.container*/

    const containerStyle = this.props.selected ? [
      styles.container, styles.containerActive,
    ] : styles.container

    return (
      <Touchable
        onPress={this.handlePress}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <View style={containerStyle}>
          <View style={styles.wrapper}>
            <View style={styles.textWrapper}>
              <Text style={styles.name}>
                {this.props.data.name.toUpperCase()}
              </Text>
            </View>
          </View>
        </View>
      </Touchable>
    )
  }
}


import { connect } from 'react-redux'

const mapStateToProps = null
const mapDispatchToProps = {
}

export const SearchItemContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchItem)

export default SearchItemContainer
