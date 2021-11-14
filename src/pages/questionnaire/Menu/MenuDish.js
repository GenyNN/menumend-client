import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet, Image } from 'react-native'
import { moderateScale, pickStyle } from 'scale'

import HealthyLeafImage from '../img/healthy_dish_leaf.png'


const desktopFontSize = {
  fontSize: 16,
  lineHeight: 20,
}

const mobileFontSize = {
  fontSize: moderateScale(14),
  lineHeight: moderateScale(18),
}

const commonStyle = {
  container: {
    paddingTop: '20px',
  },
  wrapper: {
  },
  name: {
    fontFamily: '"Source Sans Pro", sans-serif',
    color: 'black',
  },
  description: {
    marginTop: 8,
    fontFamily: '"Source Sans Pro", sans-serif',
    fontWeight: '300',
    color: 'black',
  },
}

const desktopStyle = {
  ...commonStyle,
  name: {
    ...commonStyle.name,
    ...desktopFontSize,
  },
  description: {
    ...commonStyle.description,
    ...desktopFontSize,
  },
  image: {
    marginLeft: 8,
    width: 14,
    height: 14,
  },
}

const mobileStyle = {
  ...commonStyle,
  name: {
    ...commonStyle.name,
    ...mobileFontSize,
  },
  description: {
    ...commonStyle.description,
    ...mobileFontSize,
  },
  image: {
    marginLeft: 8,
    width: 12,
    height: 12,
  },
}
const styles = StyleSheet.create(pickStyle(mobileStyle, desktopStyle))


class MenuDish extends React.Component {

  static propTypes = {
    data: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      tags: PropTypes.array.isRequired,
    }).isRequired,
  }

  render() {
    const { id, name, description, tags } = this.props.data
    const healthy = tags.indexOf('healthy-choice') !== -1
    const healthyTag = healthy ? (
      <Image
        style={styles.image}
        resizeMode="contain"
        source={HealthyLeafImage}
      />
    ) : null
    return (
      <View id={`dish-${id}`} style={styles.container}>
        <Text style={styles.name}>
          {name}
          {healthyTag}
        </Text>
        <Text style={styles.description}>
          {description}
        </Text>
      </View>
    )
  }

}

export default MenuDish
