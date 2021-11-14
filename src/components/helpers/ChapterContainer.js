import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text } from 'react-native'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 70,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  containerWrapper: {
    width: '75%',
    marginLeft: '5%',
  },
  headerText: {
    color: '#000000',
    fontFamily: '"Source Sans Pro", serif',
    fontWeight: '600',
    textAlign: 'left',
    fontSize: 36,
  },
  contentTextWrapper: {
    marginTop: 15,
  },
  contentText: {
    color: '#000000',
    fontFamily: '"Source Sans Pro", serif',
    textAlign: 'left',
    whiteSpace: 'initial',
    fontSize: 24,
  },
})
export default class HeaderContainer extends React.PureComponent {

    static propTypes = {
      contentStrings: PropTypes.array,
      headerText: PropTypes.string,
    }
    render() {
      const { headerText, contentStrings } = this.props
      const listRowsContent = contentStrings.map((item) => (<Text style={styles.contentText} key={item}> {item} </Text>))
      return (
        <View style={styles.container}>
          <View style={styles.containerWrapper}>
            <View>
              <Text style={styles.headerText}>{headerText}</Text>
            </View>
            <View style={styles.contentTextWrapper}>
              {listRowsContent}
            </View>
          </View>
        </View>

      )
    }
}
