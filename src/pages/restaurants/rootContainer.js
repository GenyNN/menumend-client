import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet, Image, TextInput } from 'react-native'
import { BrowserRouter, Redirect, Route } from 'react-router-dom'

import SignUP from './SignUP'
import LocationBar from './location/LocationBar'
import NavigationBar from './NavigationBar'
import SearchContainer from './search/SearchContainer'
import { RestaurantContainer } from './restaurant/RestaurantContainer'
import Touchable from '../../Touchable'
import PopupModal from './auth/PopupModal'
import UserProfile from './auth/UserProfile'
import ShareModal from './restaurant/sharing/ShareModal'
import Footer from '../../components/helpers/Footer'

import { sans, serif } from 'fonts'

const styles = StyleSheet.create({
  container: {
    minHeight: '100vh',
  },
  wrapper: {
    height: '100%',
    minWidth: '300px',
    width: '100%',
    minHeight: '529px',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    shadowRadius: 30,
  },

  header: {
    ...serif({
      fontSize: '36px',
      color: '#000000',
      letterSpacing: '0',
    }),
  },

  subheader: {
    ...sans({
      fontSize: '24px',
      fontWeight: '300',
      color: '#000000',
      letterSpacing: '0',
    }),
    marginTop: '30px',
    width: '650px',
    textAlign: 'center',
  },
})

class RootContainer extends React.PureComponent {
  static propTypes = {
    selected: PropTypes.object,
    menu: PropTypes.object,
    onMount: PropTypes.func,
    getAllFavourites: PropTypes.func,
    healthyChoices: PropTypes.object,
    token: PropTypes.any,
  }

  componentDidMount() {
    const { onMount } = this.props
    if (onMount) {
      onMount()
    }
    this.props.getAllFavourites(this.props.token, 'HC')
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selected !== nextProps.selected) {
      const { body } = window.document
      if (!body.classList.contains('mobileMenuVisible')) {
        body.classList.add('mobileMenuVisible')
      } else {
        while (body.classList.contains('mobileMenuVisible')) {
          body.classList.remove('mobileMenuVisible')
        }
      }
    }
    if (this.props.token !== nextProps.token) {
      nextProps.getAllFavourites(this.props.token, 'HC')
    }
  }

  render() {
    const isUserLogined = this.props.auth.length !== 0;

    return (
      <BrowserRouter basename="/">
        <View style={styles.container}>
          <View style={styles.wrapper}>
            <LocationBar />
            <NavigationBar />
            <UserProfile />
            <PopupModal />
            <Route exact path="/" component={SearchContainer} />
            <Route path="/r/:id" component={RestaurantContainer} />
            <Footer isUserLogined={isUserLogined}>
              <SignUP />
            </Footer>
          </View>
          <ShareModal url={this.props.shareUrl} shareModalShown={this.props.shareModalShown} copyLink={this.props.copyLink} linkCopied={this.props.linkCopied} onClose={this.props.toggleModal} />
        </View>
      </BrowserRouter>
    )
  }
}

import { connect } from 'react-redux'
import { initLocation } from './location/actions/init'
import { selectSignUp } from './auth/actions/popup'
import { toggleModal, copyLink } from './restaurant/sharing/reducer'
import { getAllFavourites } from './favourite/actions'

const mapStateToProps = (state) => ({
  menu: state.restaurant.menu,
  selected: state.restaurant.selected,
  auth: state.auth.firstName,
  token: state.auth.token,
  shareModalShown: state.shareModal.isShown,
  linkCopied: state.shareModal.linkCopied,
  shareUrl: state.shareModal.url,
})

const mapDispatchToProps = {
  onMount: initLocation,
  onSignUp: selectSignUp,
  toggleModal,
  copyLink,
  getAllFavourites,
}

export const RootContainerContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RootContainer)
export default RootContainerContainer
