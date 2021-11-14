import React from 'react'
import { View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import ProfilePage from './ProfilePage'
import ShareModal from '../../components/sharing/ShareModal'
import Footer from '../../components/helpers/Footer'
import UserProfile from './auth/UserProfile'

import { BrowserRouter, Redirect, Route } from 'react-router-dom'
// import RestaurantContainer from "../restaurants/restaurant/RestaurantContainer";

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
        <BrowserRouter basename="/profile">
          <View>
            <View style={styles.container}>
              <ProfilePage />
              <UserProfile />
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
