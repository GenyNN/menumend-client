import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import CustomScroll from 'react-custom-scroll'

import MenuSection from '../MenuSection'


const styles = StyleSheet.create({
  container: {
    width: 708 + 8, // container width + scrollbar width
  },
})


class MenuSectionList extends React.Component {

  static propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    data: PropTypes.array.isRequired,
  }

  render() {
    const { data } = this.props
    const sections = []
    if (!data) {
      return null
    }
    data.forEach((s) => {
      if (!s.dishes) {
        return
      }
      sections.push(
        <MenuSection
          key={`section-${s.id}`}
          data={s}
          onShare={this.props.onShare}
          token={this.props.token}
          toggleFavourite={this.props.toggleFavourite}
        />
      )
    })
    return (
      <View className="scroll-container" style={[styles.container, this.props.style]}>
        {sections}
      </View>
    )
  }

}

export default MenuSectionList
