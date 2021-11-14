import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, TextInput, Text, Image } from 'react-native'
import _ from 'lodash'

import post from '../../post'
import Touchable from 'Touchable'
import EmailIcon from '../../img/email_subscribe.png'
import { moderateScale, pickStyle } from 'scale'
import { sans, serif } from 'fonts'

const commonStyle = {
}

const desktopStyle = {
  container: {
    width: '620px',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  wrapper: {
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#608FAB',
    shadowRadius: 30,
    shadowOpacity: 0.4,

    width: '620px',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: '80px',
    paddingLeft: 32,
    paddingRight: 32,
  },
  icon: {
    width: 30,
    height: 25,
    marginRight: 32,
  },
  separator: {
    marginRight: 39,
    width: 2,
    height: 48,
    borderLeftStyle: 'solid',
    borderLeftColor: '#e5ebef',
    borderLeftWidth: 1,
  },
  input: {
    width: '100%',
    height: '80px',
    backgroundColor: 'white',
    borderRadius: 10,
    ...sans({
      fontSize: 24,
      fontWeight: '300',
      lineHeight: '80px',
    }),
    textAlign: 'left',
    outline: 'none',
  },
  invalidEmail: {
    position: 'absolute',
    right: 10,
    ...sans({
      fontSize: 18,
      color: '#FF6F45',
    }),
  },
  enterButton: {
    marginTop: 60,
    backgroundColor: '#DCBF76',
    borderRadius: 33,
    width: '157px',
    height: '66px',
    boxShadow: '0 0 30px 0 rgba(220, 191, 118, 0.2)',
    outline: 'none',
  },
  enterButtonText: {
    width: '100%',
    marginTop: 15,
    ...sans({
      fontSize: 24,
      color: 'white',
    }),
    textAlign: 'center',
  },

  finishedWrapper: {
    position: 'relative',
    width: '620px',
    height: '80px',
  },
  finishedHeader: {
    ...serif({
      fontSize: 36,
      fontWeight: '600',
    }),
    textAlign: 'center',
    marginBottom: 30,
  },
  finishedSubheader: {
    ...sans({
      fontSize: 32,
      fontWeight: '300',
    }),
    textAlign: 'center',
  },

}

const mobileStyle = {
}
const styles = StyleSheet.create(pickStyle(mobileStyle, desktopStyle))


class SubscribeInput extends React.PureComponent {

  static propTypes = {
  }

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      userSubscribed: 'none',
    }
    this.sendEmail = this.sendEmail.bind(this)
    this.checkEmail = this.checkEmail.bind(this)
  }

  checkEmail(email) {
    if (email.match(/^\S+@\S+\.\S+$/g)) {
      this.setState({ email })
    }
  }

  sendEmail() {
    if (this.state.email.match(/^\S+@\S+\.\S+$/g)) {
      post(this.state.email)
      this.setState({
        userSubscribed: 'done',
      })
    } else {
      this.setState({
        userSubscribed: 'error',
      })
    }
  }

  render() {
    const error = this.state.userSubscribed === 'error' ? (
      <Text style={styles.invalidEmail}>Invalid Email</Text>
    ) : null
    if (this.state.userSubscribed === 'done') {
      return (
        <View style={styles.finishedWrapper}>
          <Text style={styles.finishedHeader}>Thank you</Text>
          <Text style={styles.finishedSubheader}>
            We will notify you when Menumend app goes live.
          </Text>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <View>
          <View style={styles.wrapper}>
            <Image
              resizeMode="contain"
              style={styles.icon}
              source={EmailIcon}
            />
            <View style={styles.separator} />
            <TextInput
              onChangeText={this.checkEmail}
              style={styles.input}
              placeholder="Email"
            />
          </View>
        </View>
        {error}
        <Touchable onPress={this.sendEmail}>
          <View style={styles.enterButton}>
            <Text style={styles.enterButtonText}>Enter</Text>
          </View>
        </Touchable>
      </View>
    )
  }

}

export default SubscribeInput
