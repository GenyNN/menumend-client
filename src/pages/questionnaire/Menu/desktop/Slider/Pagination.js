import React from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'

import Touchable from 'Touchable'
import { range, concat } from 'lodash'


const commonTextStyle = {
  marginLeft: '8px',
  marginRight: '8px',
  fontFamily: '"Source Serif Pro", serif',
  fontSize: '18px',
  fontWeight: '600',
  lineHeight: '24px',
  textAlign: 'center',
  width: '30px',
  userSelect: 'none',
}

const styles = {
  container: {
    position: 'relative',
    margin: 0,
    padding: 0,

    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '360px',
  },
  text: {
    color: '#A8AEB1',
    ...commonTextStyle,
  },
  textSelected: {
    color: '#000000',
    ...commonTextStyle,
  },
}

export default class Pagination extends React.Component {
  static propTypes = {
    slideCount: PropTypes.number,
    slidesToScroll: PropTypes.number,
    currentSlide: PropTypes.number,
    goToSlide: PropTypes.func,
  }

  render() {
    const DELIMITER = '…'
    const lastPage = this.props.slideCount
    const currentPage = this.props.currentSlide + 1
    let pages = range(1, lastPage + 1)

    if (this.props.slideCount.length < 2) {
      return null
    }

    if (pages.length > 10) {
      if (currentPage <= 4) {
        pages = concat([1, 2, 3, 4, 5], DELIMITER, lastPage)
      } else if (currentPage >= (lastPage - 3)) {
        pages = concat(1, DELIMITER, range(lastPage - 4, lastPage + 1))
      } else {
        pages = concat(1, DELIMITER, currentPage - 1, currentPage, currentPage + 1, DELIMITER, lastPage)
      }
    }

    let delimiterCounter = 0

    pages = pages.map(index => {
      const active = currentPage === index
      const textStyle = active ? styles.textSelected : styles.text
      const goToSlide = this.props.goToSlide.bind(null, index - 1)

      if (typeof index !== 'number') {
        return (
          <View key={`delimiter-${delimiterCounter++}`}>
            <Text style={styles.text}>{index}</Text>
          </View>
        )
      }

      return (
        <Touchable key={`index-${index}`} onPress={goToSlide}>
          <View><Text style={textStyle}>{index}</Text></View>
        </Touchable>
      )
    })

    if (pages.length === 1) {
      return null
    }
    return (
      <View style={styles.container}>
        {pages}
      </View>
    )
  }
}
