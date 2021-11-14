import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text, Image, Button } from 'react-native'
import Touchable from 'Touchable'
// import OneSelectorImage from '../../pages/profile/img/selectorImage.png'
import ListViewSelect from './ListViewSelect'
import TickDownImage from '../img/tick_down.png'
import TickUpImage from '../img/tick_up.png'

const styles = StyleSheet.create({
  dropdown: {
    // position: 'relative',
    display: 'inline-block',
    zIndex: 100,
    top: '72px',
    left: '800px',
    position: 'absolute',
    width: '400px',
  },

  itemContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '350px',
  },

  itemContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline',
  },

  dropdownContent: {
    display: 'none',
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    minWidth: '160px',
    height: '250px',
    // boxShadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    zIndex: 1,
  },

  text: {
    color: '#000000',
    fontFamily: '"Source Sans Pro", sans-serif',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 20,
    marginRight: '16px',
  },

  dropdownContentItem: {
    // color: 'black',
    // display: 'block',
  },
})


class SelectSorting extends React.PureComponent {
    static propTypes = {
    }

    constructor(props) {
      super(props)
      {
        const vals = [{ code: 'createdAt', name: 'Most recent' }, {
          code: 'distance',
          name: 'Nearest',
        }, { code: 'name', name: 'A-Z' }]

        this.state = {
          values: vals,
          item: vals[0],
          isVisible: false,
        }
      }
    }

    showPopover() {
      this.setState({ isVisible: true })
    }

    closePopover() {
      this.setState({ isVisible: false })
    }

    setItem(item) {
      if (item.code === 'createdAt') {
        this.props.onSelectSortingDate()
      }
      if (item.code === 'distance') {
        this.props.onSelectSortingDistance()
      }
      if (item.code === 'name') {
        this.props.onSelectSortingName()
      }
      this.setState({ item })
    }

    render() {
      return (
        <View style={styles.dropdown} >
          <Touchable onPress={() => this.showPopover()}>
            <View style={styles.itemContainer}>
              <View style={styles.itemContent}>
                <Text style={styles.text}>{this.state.item.name}</Text>
                <Image style={[this.state.isVisible === false ? { display: 'block', top: '-2px' } : { display: 'none' }]} resizeMode="contain" source={TickDownImage} />
                <Image style={[this.state.isVisible === true ? { display: 'block', top: '-2px' } : { display: 'none' }]} resizeMode="contain" source={TickUpImage} />
              </View>
            </View>
          </Touchable>
          <ListViewSelect
            list={this.state.values}
            selected={this.state.item}
            isVisible={this.state.isVisible}
            onClick={(i) => this.setItem(i)}
            onClose={() => this.closePopover()}
          />
        </View>
      )
    }
}

import { connect } from 'react-redux'
import { selectSortingDate, selectSortingDistance, selectSortingName } from './actions/sorting'

const mapStateToProps = (state) => ({
})
const mapDispatchToProps = {
  onSelectSortingDate: selectSortingDate,
  onSelectSortingDistance: selectSortingDistance,
  onSelectSortingName: selectSortingName,
}

export const SorterSwitcherContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectSorting)
export default SorterSwitcherContainer
