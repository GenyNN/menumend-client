import React from 'react'
import PropTypes from 'prop-types'
import { pickStyle, moderateScale } from 'scale'
import { StyleSheet, View } from 'react-native'
import SearchItemList from './SearchItemList'
import SearchInputEl from './SearchInputEl'

const searchWrapperStyle = {
  width: '100%',
  backgroundColor: '#FFFFFF',
  boxShadow: '0 0 30px 0 rgba(96,143,171,0.2)',
}

const commonStyle = {
  container: {
  },
  searchWrapper: {
    ...searchWrapperStyle,
    borderRadius: '10px',
  },
  searchWrapperOpened: {
    ...searchWrapperStyle,
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
  },
  inputWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
}

const desktopStyle = {
  container: {
    marginTop: 284,
    width: '100%',
    zIndex: 10,
  },
  searchWrapper: {
    ...commonStyle.searchWrapper,
  },
  searchWrapperOpened: {
    ...commonStyle.searchWrapperOpened,
  },
  inputWrapper: {
    ...commonStyle.inputWrapper,
    paddingTop: 23,
    paddingBottom: 26,
    paddingLeft: 44,
    paddingRight: 44,
  },
}

const mobileStyle = {
  container: {
    marginTop: 110,
  },
  searchWrapper: {
    ...commonStyle.searchWrapper,
  },
  searchWrapperOpened: {
    ...commonStyle.searchWrapperOpened,
  },
  inputWrapper: {
    ...commonStyle.inputWrapper,
    height: moderateScale(60),
    minHeight: moderateScale(60),
    paddingLeft: moderateScale(20),
    paddingRight: moderateScale(20),
  },
}
const styles = StyleSheet.create(pickStyle(mobileStyle, desktopStyle))

class SearchInput extends React.Component {
  static propTypes = {
    placeholder: PropTypes.string,
    suggestions: PropTypes.array,
    isForQuestionnaire: PropTypes.bool,
    /*handleReset: PropTypes.func,
    handleChange: PropTypes.func,*/
  }

  constructor(props) {
    super(props)
    this.state = {
      selectedResultIndex: -1,
    }
    this.input = null

    this.setInputRef = this.setInputRef.bind(this)
    this.onKeyDown = this.onKeyDown.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleHover = this.handleHover.bind(this)
  }

  onKeyDown(ev) {
    if (!this.props.suggestions || !this.props.suggestions.length) {
      return
    }
    const { length } = this.props.suggestions
    const { selectedResultIndex } = this.state
    switch (ev.keyCode) {
      case 13:
        ev.preventDefault()
        ev.stopPropagation()
        if (selectedResultIndex < 0) {
          return
        }

        const data = this.props.suggestions[selectedResultIndex]
        this.props.handleSelect(data)
        this.input.reset()
        this.setState({ selectedResultIndex: -1 })
        break
      case 40: { // down
        let nextSelectedResultIndex = selectedResultIndex + 1
        if (nextSelectedResultIndex >= length) {
          nextSelectedResultIndex = 0
        }
        this.setState({ selectedResultIndex: nextSelectedResultIndex })
      }
        break
      case 38: { // up
        let nextSelectedResultIndex = selectedResultIndex - 1
        if (nextSelectedResultIndex < 0) {
          nextSelectedResultIndex = length - 1
        }
        this.setState({ selectedResultIndex: nextSelectedResultIndex })
      }
        break
      default:
        break
    }
  }

  handleChange(event) {
    const { value } = event.target

    if (!value) {
      this.setState({ selectedResultIndex: -1 })
      // this.props.handleReset()
    } else {
      this.props.handleChange(value)
    }
  }

  handleHover(index) {
    this.setState({ selectedResultIndex: index })
  }

  setInputRef(element) {
    this.input = element;
  };

  render() {
    const searchStyle = !this.props.suggestions || !this.props.suggestions.length
      ? styles.searchWrapper
      : styles.searchWrapperOpened

    return (
      <View style={styles.container}>
        <View style={searchStyle}>
          <View style={styles.inputWrapper}>
            <SearchInputEl
              ref={this.setInputRef}
              onChange={this.handleChange}
              placeholder={this.props.placeholder || 'Enter restaurant name'}
              onKeyDown={this.onKeyDown}
            />
          </View>
          <SearchItemList
            handlePress={(data) => {
              this.props.handleSelect(data)
              this.input.reset()
              this.setState({ selectedResultIndex: -1 })
            }}
            values={this.props.suggestions}
            selectedIndex={this.state.selectedResultIndex}
          />
        </View>
      </View>
    )
  }
}

import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
})
const mapDispatchToProps = {
}

export const SearchInputContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchInput)
export default SearchInputContainer
