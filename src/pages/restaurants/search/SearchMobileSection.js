import React from 'react'
import { StyleSheet, View, Text, TextInput, Image } from 'react-native'

import { sans, serif } from 'fonts'
import { moderateScale, pickStyle } from 'scale'
import mobileImage from '../../../../static/img/landing/explore.png'

const commonStyle = {
  container: {
    position: 'relative',
    minHeight: '835px',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  wrapper: {
    minHeight: '835px',
    width: 884,
  },
  header: {
    ...serif({
      color: 'black',
      fontSize: 48,
      fontWeight: '700',
    }),
    textAlign: 'left',
    marginLeft: -27,
    marginTop: 140,
    width: 529,
    height: 60,
  },
  text: {
    ...sans({
      color: 'black',
      fontSize: 24,
      fontWeight: '300',
    }),
    textAlign: 'left',
    marginLeft: -27,
    marginTop: 32,
    width: '500px',
    height: '190px',
  },
  image: {
    width: '678px',
    height: '615px',
    resizeMode: 'contain',
    marginRight: -30,
    zIndex: -10,
  },

  background: {
    position: 'absolute',
    zIndex: -100,
    right: -330,
    top: 160,
    width: '100%',
  },

}
const desktopStyle = {
  ...commonStyle,
}
const mobileStyle = {
  ...commonStyle,
}
const styles = StyleSheet.create(pickStyle(mobileStyle, desktopStyle))


class SearchMobileSection extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Text style={styles.header}>Mobile App</Text>
          <Text style={styles.text}>
            Menumend revolutionizes restaurant menus with interactive tools,
            elevates your dining experience with personalized recommendations
            and help you find the perfect dishes anywhere you are.
          </Text>
          <View style={styles.background}>
            <Image style={styles.image} resizeMode="contain" source={mobileImage} />
          </View>
        </View>
      </View>
    )
  }
}

export default SearchMobileSection
