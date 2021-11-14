import React, { Component } from 'react'
import {
  ListView,
  StyleSheet,
  Text,
  Dimensions,
  View, Image,
} from 'react-native'
import PropTypes from 'prop-types'
import Touchable from 'Touchable'
import CheckmarkYellow from '../img/checkmarkYellow.png'

const SCREEN_HEIGHT = Dimensions.get('window').height
const noop = () => {}
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => (r1 !== r2) })


const styles = StyleSheet.create({
  container: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    marginTop: '150px',
  },
  popover: {
    margin: 10,
    marginLeft: '120px',
    marginTop: '40px',
    padding: 3,
    backgroundColor: '#ffffff',
    height: 225,
    width: 240,

    paddingTop: '25px',
    paddingLeft: '25px',
    paddingRight: '25px',
    paddingBottom: '23px',
    boxShadow: '0 4px 26px 0 rgba(139,158,170,0.20)',
    borderRadius: '10px',
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowWrapper: {
    borderStyle: 'solid',
    borderBottomWidth: '1px',
    borderBottomColor: '#e5ebef',
    height: '60px',
    justifyContent: 'center',
  },
  rowWrapperLast: {
    // borderStyle: 'none',
    height: '70px',
    justifyContent: 'center',
  },
  rowText: {
    padding: 10,
    color: '#000000',
    fontFamily: '"Source Sans Pro", sans-serif',
    fontWeight: '400',
    textAlign: 'center',
    fontSize: 18,
  },
  rowSelectedText: {
    padding: 10,
    color: '#a8aeb1',
    fontFamily: '"Source Sans Pro", sans-serif',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 18,
  },
  rowTextContainer: {
    justifyContent: 'center',
  },

  separator: {
    height: 0.5,
    marginHorizontal: 8,
    backgroundColor: '#CCC',
  },
})

export default class ListViewSelect extends Component {

    static propTypes = {
      list: PropTypes.array.isRequired,
      isVisible: PropTypes.bool,
      onClick: PropTypes.func,
      onClose: PropTypes.func,
    }

    /*
    static defaultProps: {
        list: [''],
        isVisible: false,
        onClick: noop,
        onClose: noop
    }
*/
    constructor(props) {
      super(props)
      this.state = {
        dataSource: ds.cloneWithRows(this.props.list),
        selected: this.props.selected,
      }
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.list !== this.props.list) {
        this.setState({ dataSource: ds.cloneWithRows(nextProps.list) })
      }
    }

    handleClick(data) {
      this.props.onClick(data)
      this.props.onClose()
      this.setState({ selected: data })
    }

    renderSeparator(data) {
      const separatorStyle = this.props.separatorStyle || styles.separator

      if (data === this.props.list[0]) {
        return null
      }

      return <View style={styles.separatorStyle} />
    }

    renderRow(rowData, sectionID, rowID, highlightRow) {
      const rowTextStyle = this.props.rowText || styles.rowText
      const val = {
        rowData, sectionID, rowID, highlightRow,
      }
      let row = (
        <View style={styles.rowContainer}>
          <View style={styles.rowTextContainer}><Text style={[rowData.code === this.state.selected.code ? styles.rowSelectedText : styles.rowText]}>{rowData.name}</Text></View>
          <Image style={[rowData.code === this.state.selected.code ? { display: 'block', height: 'auto' } : { display: 'none' }]} resizeMode="contain" source={CheckmarkYellow} />
        </View>
      )
      if (this.props.renderRow) {
        row = this.props.renderRow(rowData)
      }
      // {this.renderSeparator(rowData)}
      return (
        <View>

          <Touchable onPress={() => this.handleClick(rowData)}>
            <View style={styles.rowWrapper}>
              {row}
            </View>
          </Touchable>
        </View>
      )
    }

    renderList() {
      /* let maxHeight = { height: this.props.listHeight }
      if (this.props.list.length > 12 && !this.props.height) {
        maxHeight = { height: SCREEN_HEIGHT * 3 / 4 }
      } */
      // style={maxHeight}
      return (
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData, sectionID, rowID, highlightRow) => this.renderRow(rowData, sectionID, rowID, highlightRow)}
          automaticallyAdjustContentInsets={false}
        />
      )
    }

    render() {
      const containerStyle = this.props.containerStyle || styles.container
      const popoverStyle = this.props.popoverStyle || styles.popover

      if (this.props.isVisible) {
        return (
          <Touchable onPress={this.props.onClose}>
            <View style={containerStyle}>
              <View style={popoverStyle}>
                {this.renderList()}
              </View>
            </View>
          </Touchable>
        )
      }

      return <View />
    }
}

