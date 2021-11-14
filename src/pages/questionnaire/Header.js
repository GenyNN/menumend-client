import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  header: {
    color: '#000000',
    fontFamily: '"Source Serif Pro", serif',
    fontSize: '64px',
    fontWeight: 'bold',
    lineHeight: '80px',
    textAlign: 'center',
  },
  subheader: {
    marginTop: '28px',
    fontFamily: '"Source Sans Pro", sans-serif',
    fontSize: '24px',
    fontWeight: '100',
    lineHeight: '31px',
    textAlign: 'center',
  },
})

class Header extends React.Component {

  static propTypes = {
    text: PropTypes.string,
    subtitleVisible: PropTypes.bool,
  }

  render() {
    return (
      <View>
        <Text style={styles.header}>
          {this.props.text}
        </Text>
        {this.props.subtitleVisible &&
          <Text style={styles.subheader}>
            Take this short survey and we will personlize menus for you
          </Text>
        }
      </View>
    )
  }

}

export default Header
