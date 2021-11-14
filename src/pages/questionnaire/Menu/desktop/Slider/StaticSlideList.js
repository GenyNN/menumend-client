import React from 'react'
import PropTypes from 'prop-types'

import Pager from './Pager'
import StaticSlide from './StaticSlide'


export default class StaticSlideList extends React.Component {

  static propTypes = {
    slideSizes: PropTypes.array,
    children: PropTypes.array,
  }

  render() {
    const results = []
    const r = this.props.slideSizes.reduce((previousValue, currentValue, index, array) => {
      const nextValue = previousValue + currentValue
      const children = this.props.children.slice(previousValue, nextValue)
      const slide = (
        <StaticSlide key={`static-slide-${index}`}>
          {children}
        </StaticSlide>
      )
      results.push(slide)
      return nextValue
    }, 0)
    return (
      <Pager>
        {results}
      </Pager>
    )
  }
}
