import React from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import PropTypes from 'prop-types'
import ShareModal from '../../components/sharing/ShareModal'
import NavigationBar from './NavigationBar'
import MainContentContainer from './MainContentContainer'
import Touchable from 'Touchable'

import { BrowserRouter, Redirect, Route } from 'react-router-dom'
import InfoBar from './InfoBar'
import Footer from '../../components/helpers/Footer'


const styles = StyleSheet.create({
  container: {
    minWidth: '300px',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
  },
})
class ProfileRootContainer extends React.PureComponent {

    static propTypes = {
    }

    componentDidMount() {
    }

    render() {
      return (
        <BrowserRouter basename="/tc">
          <View>
            <View style={styles.container}>
              <NavigationBar />
              <InfoBar />
              <MainContentContainer />
              <Footer isUserLogined={this.props.auth.length !== 0} />
            </View>
            <ShareModal shareModalShown={this.props.shareModalShown} copyLink={this.props.copyLink} linkCopied={this.props.linkCopied} onClose={this.props.toggleModal} />

          </View>


        </BrowserRouter>
      )
    }
}

import { connect } from 'react-redux'
import { toggleModal, copyLink } from '../../components/sharing/reducer'

const mapStateToProps = (state) => ({
  shareModalShown: state.shareModal.isShown,
  linkCopied: state.shareModal.linkCopied,
  auth: state.auth.firstName,
})

const mapDispatchToProps = {
  toggleModal,
  copyLink,
}

export const ProfileRootContainerContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileRootContainer)
export default ProfileRootContainerContainer
