import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text, TextInput, Image } from 'react-native'
import { isEmpty } from 'lodash'
import scrollToComponent from 'react-scroll-to-component'
import Menu from './Menu'
import RestaurantHeader from './RestaurantHeader'
import CuisineTag from './CuisineTag'
import { moderateScale, pickStyle } from 'scale'
import { formatRestaurantAddress } from 'pages/restaurants/format'
import LikeImage from '../img/like_nofill.png'
import LikeImageFull from '../img/like_fill.png'
import SelectedMenuImage from '../img/selectedTile.png'
import OneSelectorImage from '../img/selectorImage.png'
import RestaurantToscana from './RestaurantToscana'
import MenuShareButton from './Menu/ShareButton'
import Touchable from '../../../Touchable'
import DishFeed from './dishFeed'
import { sans, serif } from 'fonts'

const commonStyle = {
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  wrapper: {
  },
  header: {
    ...sans({
      fontWeight: '300',
    }),
    textAlign: 'center',
  },
}

const desktopStyle = {
  ...commonStyle,
  container: {
    ...commonStyle.container,
    width: '80%',
    position: 'relative',
  },
  wrapper: {
  },
  header: {
    ...commonStyle.header,
    fontSize: 20,
    lineHeight: 25,
  },
  likeImage: {
    width: 24,
    height: 20,
    resizeMode: 'contain',
    marginRight: 24,
  },
  flexRowWrapper: {
    marginTop: 66,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  columnContainer: {
  },
  columnWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selectorWrapper: {
    height: 59,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    zIndex: 5000,
    marginTop: 57,
  },
  oneSelectorWrapper: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '60px',
    marginRight: 50,
  },
  oneSelectorTextInactive: {
    ...sans({
      fontSize: '20px',
      color: '#A8AEB1'
    }),
  },
  oneSelectorTextActive: {
    ...sans({
      fontSize: '20px',
      color: 'black',
    }),
  },
  oneSelectorImage: {
    width: 19,
    height: 10,
    resizeMode: 'contain',
  },

  recommended: {
      zIndex: -2,
      minHeight: '850px',
      marginLeft: '-15%',
      marginRight: '-15%',
      alignItems: 'center',
      backgroundColor: 'rgba(247,249,250,0.5)',
      // todo this is missing top shadow
    },
  recommendedHeader: {
    marginTop: 100,
    marginBottom: 60,
    ...serif({
      fontSize: 36,
      lineHeight: 36,
      color: '#000000',
    }),
  },
  healthyHeader: {
    marginTop: 100,
    marginBottom: 80,
    ...serif({
      fontWeight: '700',
      fontSize: '48px',
      color: '#000000',
    }),
  },
  healthySubheader: {
    marginBottom: 60,
    ...serif({
      fontSize: '36px',
      color: '#000000',
      /* mixBlendMode: 'multiply', */ // not supported
    }),
  },
  menuHeader: {
    width: '129px',
    height: '60px',
    marginTop: 100,
    marginBottom: 60,
    ...serif({
      fontWeight: '700',
      fontSize: '48px',
      color: '#000000',
    }),
  },

  healthyChoices: {
      minHeight: '850px',
      marginLeft: '-15%',
      marginRight: '-15%',
      alignItems: 'center',
      backgroundColor: 'rgba(234,240,236,1)',
    },

    menu: {
      minHeight: '850px',
      marginLeft: '-15%',
      marginRight: '-15%',
      alignItems: 'center',
      backgroundColor: 'rgba(247,249,250,0.5)',
    },

    menuTilesWrapper: {
      position: 'fixed',
      top: 0,
      left: 0,
      bottom: 0,
      height: '80px',
      width: '100%',
      paddingLeft: '220px',
      backgroundColor: 'black',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      zIndex: 5000,
    },
    menuTilesText: {
      ...sans({
        color: '#A8AEB1',
        fontWeight: 'regular',
        fontSize: '16',
      }),
      textAlign: 'center',
    },
    menuTilesButton: {
      flexDirection: 'column',
      marginRight: 15,
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 55,
      position: 'relative',
      bottom: -16,
    },
    menuTilesActiveImage: {
      height: 7,
      width: 13.3,
      resizeMode: 'contain',
    },
}

const mobileStyle = {
  ...commonStyle,
  container: {
    ...commonStyle.container,
    width: '100%',
    /* minWidth: 375, */
  },
  wrapper: {
    marginTop: moderateScale(40),
  },
  header: {
    ...commonStyle.header,
    fontSize: moderateScale(12),
    lineHeight: moderateScale(15),
  },
  image: {
    width: moderateScale(7),
    height: moderateScale(9),
    marginRight: 5,
  },
}
const styles = StyleSheet.create(pickStyle(mobileStyle, desktopStyle))


const RestaurantRoot = (props) => (
  <View id="restaurant_page" style={styles.container}>
    {props.children}
  </View>
)

class Restaurant extends React.Component {

  static propTypes = {
    data: PropTypes.shape({
      type: PropTypes.string,
      distance: PropTypes.number,
    }),
    handleFetch: PropTypes.func,
    handleReset: PropTypes.func,
    handleModal: PropTypes.func,
    copyLink: PropTypes.func,

    menus: PropTypes.array.isRequired,
    match: PropTypes.any.isRequired,
    history: PropTypes.any.isRequired,
    shareModalShown: PropTypes.bool.isRequired,
    linkCopied: PropTypes.bool.isRequired,
  }

  constructor() {
    super()
    this.state = {
      selectedItem: 'recommended',
      isFavorite: false,
      selectedMenu: {}
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    const restaurantId = this.props.match.params.id

    if ((isEmpty(this.props.menus) && restaurantId) ||
      (!isEmpty(this.props.data) && restaurantId !== this.props.data.location_id)) {
      this.props.handleReset()
      this.props.handleFetch(restaurantId)
    }

    window.onpopstate = (e) => {
      if (this.props.match.url.indexOf('/r/') === -1) {
        this.props.history.push('/')
      }
    }
  }

  handleSectors(option) {
    this.setState({ selectedItem: option })
    scrollToComponent(this[option], { offset: 0, align: 'top'})
  }

  handleMenu(menu) {
    this.setState({ selectedMenu: menu })
  }

  onFavourite() {
    this.setState({ isFavorite: !this.state.isFavorite })
    this.props.toggleFavourite(this.state.isFavorite ? 'DELETE' : 'POST', this.props.token, 'HC', 'Restaurant', this.props.data.id)
  }

  // TODO FIXME: reformat!
  render() {
    if (isEmpty(this.props.data)) {
      // show any loading gif here?
      return <RestaurantRoot />
    }
    const menus = this.props.menus.map((menu) => menu.name)
    return (
      <RestaurantRoot>

        <View>
        <View style={styles.columnWrapper}>
        <RestaurantToscana>
        <View style={styles.wrapper}>
          <RestaurantHeader />

          <View style={styles.buttonWrapper}>
          <Touchable onPress={() => this.onFavourite() }><Image style={styles.likeImage} source={this.state.isFavorite ? LikeImage : LikeImageFull} /></Touchable>
          <MenuShareButton onPress={this.props.handleModal} copyLink={this.props.copyLink} linkCopied={this.props.linkCopied} shareModalShown={this.props.shareModalShown} />
          </View>
        </View>

        <View style={styles.flexRowWrapper}>
          <View style={styles.selectorWrapper}>
          <Touchable onPress={() => this.handleSectors('recommended')}>
          <View  style={styles.oneSelectorWrapper}>
            <Text style={this.state.selectedItem === 'recommended' ? styles.oneSelectorTextActive : styles.oneSelectorTextInactive}>FOR YOU</Text>
            <Image style={[styles.oneSelectorImage, this.state.selectedItem === 'recommended' ? { opacity: 1 } : { opacity: 0 }]} source={OneSelectorImage} />
          </View>
          </Touchable>
          <Touchable onPress={() => this.handleSectors('healthy')}>
          <View style={styles.oneSelectorWrapper}>
            <Text style={this.state.selectedItem === 'healthy' ? styles.oneSelectorTextActive : styles.oneSelectorTextInactive}>HEALTHY CHOICES</Text>
            <Image style={[styles.oneSelectorImage, this.state.selectedItem === 'healthy' ? { opacity: 1 } : { opacity: 0 }]} source={OneSelectorImage} />
          </View>
        </Touchable>
        <Touchable onPress={() => this.handleSectors('menu')}>
          <View style={styles.oneSelectorWrapper}>
            <Text style={this.state.selectedItem === 'menu' ? styles.oneSelectorTextActive : styles.oneSelectorTextInactive}>MENU</Text>
            <Image style={[styles.oneSelectorImage, this.state.selectedItem === 'menu' ? { opacity: 1 } : { opacity: 0 }]} source={OneSelectorImage} />
          </View>
        </Touchable>
        </View>
        <CuisineTag />
        </View>

        </RestaurantToscana>
        </View>
        </View>

        <View ref={(section) => { this.recommended = section }} style={styles.recommended}>
          {/* TODO: Different style and text when logged in: 'Recommended For You' */}
          <Text style={styles.recommendedHeader}>Recommended</Text>
          <DishFeed recommended={true} />
        </View>

        <View ref={(section) => { this.healthy = section }} style={styles.healthyChoices}>
          <Text style={styles.healthyHeader}>Healthy Choices</Text>
          <Text style={styles.healthySubheader}>Top Healthy Picks</Text>

          <DishFeed recommended={false} />
        </View>

        <View ref={(section) => { this.menu = section }} style={styles.menu}>
          <Text style={styles.menuHeader}>Menu</Text>
          <Menu />
        </View>

      </RestaurantRoot>
    )
  }
}

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { resetRestaurant } from './actions/reset'
import { toggleModal, copyLink } from './sharing/reducer'
import { requestFetchRestaurant } from './sagas/fetch'
import { toggleFavourite } from '../favourite/actions'

const mapStateToProps = (state) => ({
  auth: state.auth,
  data: state.restaurant.selected,
  menus: state.restaurant.menus,
  shareModalShown: state.shareModal.isShown,
  linkCopied: state.shareModal.linkCopied,
  token: state.auth.token,
})
const mapDispatchToProps = {
  handleFetch: requestFetchRestaurant,
  handleReset: resetRestaurant,
  handleModal: toggleModal,
  copyLink,
  toggleFavourite,
}

export const RestaurantContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Restaurant)

export default withRouter(RestaurantContainer)
