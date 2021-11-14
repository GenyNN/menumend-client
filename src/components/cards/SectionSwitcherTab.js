import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text, Image } from 'react-native'
import Touchable from 'Touchable'
import OneSelectorImage from '../../pages/profile/img/selectorImage.png'
import { moderateScale, pickStyle } from 'scale'

const commonStyle = {
  selectorWrapper: {
    position: 'absolute',
    top: 255, /* 310 */
    left: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5000,
    marginTop: 100,
    marginLeft: '20%',
  },
  oneSelectorWrapper: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '60px',
    marginRight: 55,
  },
  oneSelectorTextInactive: {
    fontFamily: 'Source Sans Pro',
    fontWeight: 'regular',
    fontSize: '20px',
    color: '#A8AEB1',
  },
  oneSelectorTextActive: {
    fontFamily: 'Source Sans Pro',
    fontWeight: 'regular',
    fontSize: '20px',
    color: '#000',
  },
  oneSelectorImage: {
    width: 19,
    height: 10,
    resizeMode: 'contain',
  },
}

const desktopStyle = {
  ...commonStyle,
}

const mobileStyle = {
  ...commonStyle,
  selectorWrapper: {
    ...commonStyle.selectorWrapper,
    top: moderateScale(55),
    marginLeft: '15%',
  },
  oneSelectorWrapper: {
    ...commonStyle.oneSelectorWrapper,
    maxWidth: moderateScale(90),
    marginRight: moderateScale(35),
  },
  oneSelectorTextInactive: {
    ...commonStyle.oneSelectorTextInactive,
    fontSize: moderateScale(18),
  },
  oneSelectorTextActive: {
    ...commonStyle.oneSelectorTextActive,
    fontSize: moderateScale(18),
  },
}

const styles = StyleSheet.create(pickStyle(mobileStyle, desktopStyle))


class SectionSwitcherTab extends React.PureComponent {

    static propTypes = {
      onSelectFY: PropTypes.func,
      onSelectHC: PropTypes.func,
      onSelectALL: PropTypes.func,
    }

    constructor(props) {
      super(props)
    }

    handleSectors(option) {
      // this.setState({ selectedItem: option })
      if (option === 'FY') { this.props.onSelectFY() }
      if (option === 'HC') { this.props.onSelectHC() }
      if (option === 'ALL') { this.props.onSelectALL() }
    }

    render() {
      return (
        <View style={styles.selectorWrapper}>
          <Touchable onPress={() => this.handleSectors('ALL')}>
            <View style={styles.oneSelectorWrapper}>
              <Text style={this.props.sectionSelected === 'ALL' ? styles.oneSelectorTextActive : styles.oneSelectorTextInactive}>SHOW ALL</Text>
              <Image style={[styles.oneSelectorImage, this.props.sectionSelected === 'ALL' ? { opacity: 1 } : { opacity: 0 }]} source={OneSelectorImage} />
            </View>
          </Touchable>
          <Touchable onPress={() => this.handleSectors('FY')}>
            <View style={styles.oneSelectorWrapper}>
              <Text style={this.props.sectionSelected === 'FY' ? styles.oneSelectorTextActive : styles.oneSelectorTextInactive}>FOR YOU</Text>
              <Image style={[styles.oneSelectorImage, this.props.sectionSelected === 'FY' ? { opacity: 1 } : { opacity: 0 }]} source={OneSelectorImage} />
            </View>
          </Touchable>
          <Touchable onPress={() => this.handleSectors('HC')}>
            <View style={styles.oneSelectorWrapper}>
              <Text style={this.props.sectionSelected === 'HC' ? styles.oneSelectorTextActive : styles.oneSelectorTextInactive}>HEALTHY CHOICES</Text>
              <Image style={[styles.oneSelectorImage, this.props.sectionSelected === 'HC' ? { opacity: 1 } : { opacity: 0 }]} source={OneSelectorImage} />
            </View>
          </Touchable>

        </View>
      )
    }
}

import { connect } from 'react-redux'
import { selectSectionFY, selectSectionHC, selectSectionALL } from './actions/switcherTab'

const mapStateToProps = (state) => ({
  sectionSelected: state.cards.sectionSelected,
})
const mapDispatchToProps = {
  onSelectFY: selectSectionFY,
  onSelectHC: selectSectionHC,
  onSelectALL: selectSectionALL,
}

export const SectionSwitcherTabContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SectionSwitcherTab)
export default SectionSwitcherTabContainer
