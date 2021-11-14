import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text } from 'react-native'

import { sans, serif } from 'fonts'
import { moderateScale, pickStyle } from 'scale'
import MenuDish from './MenuDish'


const commonStyle = {
  container: {
  },
  header: {
  },
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20, // additional 20px comes from dish margin top, total 40
  },
}
const desktopStyle = {
  ...commonStyle,
  container: {
    ...commonStyle.container,
    marginBottom: 40,
  },
  dishes: {
  },
  header: {
    ...serif({
      fontSize: 24,
      lineHeight: 33,
    }),
    textAlign: 'center',
  },
  description: {
    marginTop: 8,
    ...sans({
      fontWeight: '300',
      fontSize: 16,
      lineHeight: 20,
    }),
    width: 580,
    textAlign: 'center',
  },
}
const mobileStyle = {
  ...commonStyle,
  container: {
    marginBottom: moderateScale(40),
  },
  header: {
    ...serif({
      fontSize: moderateScale(24),
      lineHeight: moderateScale(30),
    }),
    textAlign: 'center',
  },
  description: {
    marginTop: moderateScale(10),
    ...sans({
      fontWeight: '300',
      fontSize: moderateScale(14),
      lineHeight: moderateScale(18),
    }),
    width: moderateScale(331),
    textAlign: 'center',
  },

}
const styles = StyleSheet.create(pickStyle(mobileStyle, desktopStyle))


class MenuSection extends React.Component {

  static propTypes = {
    data: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      dishes: PropTypes.array.isRequired,
    }).isRequired,
  }

  render() {
    const dishes = this.props.data.dishes.map(d => (
      <MenuDish key={`dish-${d.id}`} data={d} onShare={this.props.onShare} token={this.props.token} toggleFavourite={this.props.toggleFavourite}/>
    ))
    const description = this.props.data.description ? (
      <Text style={styles.description}>
        {this.props.data.description}
      </Text>
    ) : null
    return (
      <View style={styles.container} className="menu-section">
        <View style={styles.wrapper}>
          <Text style={styles.header}>
            {this.props.data.name}
          </Text>
          {description}
        </View>
        <View style={styles.dishes}>
          {dishes}
        </View>
      </View>
    )
  }

}

export default MenuSection
