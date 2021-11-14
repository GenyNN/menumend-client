import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text, TextInput, Image } from 'react-native'
import { moderateScale, pickStyle } from 'scale'
import Modal from 'react-native-web-modal'
import CloseImage from '../img/close.png'
import Touchable from 'Touchable'
import FacebookPic from '../img/facebook.png'
import TwitterPic from '../img/twitter.png'
import EmailPic from '../img/email.png'
import CopyLinkPic from '../img/copylink.png'
import { shareFacebook, shareTwitter, shareEmail, shareCopyLink } from './shareFunctions'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const commonStyle = {
  shareModal: {
    zIndex: 10,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareModalWrapper: {
    position: 'relative',
    flex: 1,
    display: 'block',
    margin: 'auto',
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: 'rgba(96, 143, 171, 0.2)',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
    elevation: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeImage: {
    position: 'absolute',
    right: 40,
    top: 40,
    height: 16,
    width: 16,
  },
  shareModalHeader: {
    flex: 1,
    fontFamily: '"Source Serif Pro", serif',
    fontWeight: '400',
    textAlign: 'center',
    position: 'relative',
    display: 'block',
    margin: 'auto',
  },
  shareModalSubheader: {
    fontFamily: '"Source Sans Pro", sans-serif',
    fontWeight: '300',
    textAlign: 'center',
    display: 'block',
  },
  servicesWrapper: {
    flex: 1,
    width: 314,
    borderTopWidth: 1,
    borderTopColor: '#E5EBEF',
    display: 'block',
    margin: 'auto',
    marginTop: 60,
  },
  oneServiceWrapper: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5EBEF',
    cursor: 'pointer',
  },
  serviceImage: {
    flex: 1,
    height: 21,
    maxWidth: 40,
    alignSelf: 'center',
  },
  serviceTitle: {
    flex: 2,
    fontFamily: '"Source Sans Pro", sans-serif',
    fontWeight: '500',
    marginLeft: 32,
    textAlign: 'left',
    display: 'block',
    color: '#DCBF76',
  },
}

const desktopStyle = {
  ...commonStyle,
  container: {
    ...commonStyle.container,
  },
  shareModalWrapper: {
    ...commonStyle.shareModalWrapper,
    width: 560,
    maxHeight: 657,
  },
  shareModalHeader: {
    ...commonStyle.shareModalHeader,
    fontSize: 40,
    lineHeight: 50,
    marginTop: 84,
    marginBottom: 58,
  },
  shareModalSubheader: {
    ...commonStyle.shareModalSubheader,
    fontSize: 24,
    lineHeight: 25,
    marginRight: 80,
    marginLeft: 80,
  },
  image: {
    width: 12,
    height: 16,
    marginRight: 8,
  },
  serviceTitle: {
    ...commonStyle.serviceTitle,
    fontSize: 20,
  },
}

const mobileStyle = {
  ...commonStyle,
  container: {
    ...commonStyle.container,
    width: '100%',
    /* minWidth: 375, */
  },
  shareModalWrapper: {
    ...commonStyle.shareModalWrapper,
    width: '100%',
    maxHeight: '90%',
  },
  shareModalHeader: {
    ...commonStyle.shareModalHeader,
    fontSize: moderateScale(30),
    lineHeight: moderateScale(30),
    marginTop: moderateScale(50),
    marginBottom: moderateScale(30),
  },
  shareModalSubheader: {
    ...commonStyle.shareModalSubheader,
    fontSize: moderateScale(20),
    lineHeight: moderateScale(25),
  },
  image: {
    width: moderateScale(12),
    height: moderateScale(16),
    marginRight: 8,
  },
  serviceTitle: {
    ...commonStyle.serviceTitle,
    fontSize: moderateScale(20),
  },
}
const styles = StyleSheet.create(pickStyle(mobileStyle, desktopStyle))


class ShareModal extends React.Component {

  static propTypes = {
    shareModalShown: PropTypes.bool,
    linkCopied: PropTypes.bool,
    onClose: PropTypes.func,
    copyLink: PropTypes.func,
  }

  handleClickOutside() {
    if (this.props.shareModalShown) {
      this.props.onClose()
    }
  }

  render() {
    const services = ['Facebook', 'Twitter', 'Email']
    const images = [FacebookPic, TwitterPic, EmailPic]
    const functions = [shareFacebook, shareTwitter, shareEmail]
    return (
      <Modal
        style={styles.shareModal}
        animationType="slide"
        transparent
        visible={this.props.shareModalShown}
      >
        <View style={styles.shareModalWrapper}>
          <Touchable onPress={() => this.props.onClose()}>
            <Image style={styles.closeImage} resizeMode="contain" source={CloseImage} />
          </Touchable>
          <Text style={styles.shareModalHeader}>Share</Text>
          <Text style={styles.shareModalSubheader}>Check this out! Menumend shows healthy choices on restaurant menus!</Text>
          <View style={styles.servicesWrapper}>
            {services.map((item, index, array) => <View key={item} onClick={() => functions[index](window.location.href)} style={styles.oneServiceWrapper}><Image style={styles.serviceImage} resizeMode="contain" source={images[index]} /><Text style={styles.serviceTitle} >{item}</Text></View>)}
            <View onClick={() => this.props.copyLink()} style={styles.oneServiceWrapper}><Image style={styles.serviceImage} resizeMode="contain" source={CopyLinkPic} /><CopyToClipboard text={window.location.href}><Text style={styles.serviceTitle}>{this.props.linkCopied ? 'Link copied' : 'Copy Link'}</Text></CopyToClipboard></View>
          </View>
        </View>
      </Modal>
    )
  }
}

export default ShareModal
