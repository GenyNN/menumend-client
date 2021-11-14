import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text } from 'react-native'
import HeaderContainer from '../../components/helpers/HeaderContainer'
import ChapterContainer from '../../components/helpers/ChapterContainer'
import JsonResponse from './JsonDataBundle'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingBottom: '30px',
    backgroundColor: '#FFFFFF',
  },
})
export default class MainContentContainer extends React.PureComponent {

    static propTypes = {
    }
    render() {
      const listChapters = JsonResponse.chapters.map((item) => (<ChapterContainer style={styles.contentText} key={item.headerText} headerText={item.headerText} contentStrings={item.contentStrings} />))
      return (
        <View style={styles.container}>
          <HeaderContainer headerText={JsonResponse.header.headerText} contentStrings={JsonResponse.header.contentHeader} />
          {listChapters}
        </View>
      )
    }
}
