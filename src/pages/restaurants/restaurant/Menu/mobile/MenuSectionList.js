import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'

import MenuSection from '../MenuSection'


const styles = StyleSheet.create({
  container: {
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
        <MenuSection key={`section-${s.id}`} data={s} onShare={this.props.onShare}/>
      )
    })
    return (
      <View className="menu-section-list" style={[styles.container, this.props.style]}>
        {sections}
      </View>
    )
  }
}

export default MenuSectionList
