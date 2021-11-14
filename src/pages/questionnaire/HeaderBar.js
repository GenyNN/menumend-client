import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import PropTypes from 'prop-types';
import SignUpButton from './SignUpButton'
import SignInButton from './SignInButton'
import Progress from './questions/progress/Progress'

const styles = StyleSheet.create({
  headerTab: {
    height: '88px',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: '60px',
    paddingRight: '38px',
  },
  logo: {
  },
  logoText: {
    color: '#000000',
    fontFamily: '"Source Serif Pro", serif',
    fontSize: '24px',
    fontWeight: 'bold',
    lineHeight: '30px',
    textAlign: 'center',
  },
  login: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  }
})

class Header extends React.Component {

  static propTypes = {
    marks: PropTypes.number,
    active: PropTypes.number
  }

  render() {
    return (
      <View style={styles.headerTab}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>Menumend</Text>
        </View>
        <Progress marks={this.props.marks} active={this.props.active} />
        <View style={styles.login}>
          <SignInButton/>
          <SignUpButton/>
        </View>
      </View>
    )
  }

}

export default Header
