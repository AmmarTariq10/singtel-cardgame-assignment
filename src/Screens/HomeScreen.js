import React, { useEffect } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useCards, useHasWon, useMoves } from '../StateManagement/hooks'
import AnimatedCard from '../Components/AnimatedCard'
import { vh, vw } from '../Units'
import actionTypes from '../StateManagement/actionTypes'

const HomeScreen = props => {
  const cards = useCards()
  const moves = useMoves()
  const hasWon = useHasWon()
  const dispatch = useDispatch()
  useEffect(()=>{
    if(hasWon === true){
      Alert.alert('You won!','You completed all the cards in the set in '+moves+' moves!',[{text:'RESTART',onPress:reset}],{cancelable:false})
    }
  },[hasWon])
  const renderItems = () => {
    return cards?.map((item, index) => {
      return (
        <AnimatedCard key={item.id} card={item} />
      )
    })
  }
  const reset = () => {
    dispatch({type:actionTypes.reset})
  }
  const renderHeader = () => {
    return (
      <View style={styles.infoContainer}>
        <TouchableOpacity onPress={reset}>
          <Text style={styles.buttonText}>
            Restart
          </Text>
        </TouchableOpacity>
        <Text style={styles.infoText}>Steps : {moves}</Text>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      {renderHeader()}
      <View style={styles.cardContainer}>
        {renderItems()}
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#403e43'
  },
  cardContainer: {
    width: 100 * vw,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    height: 90 * vh
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 3 * vw,
    paddingTop: 2 * vh,
    width: 100 * vw,
    height: 10 * vh,
  },
  buttonText: {
    color: '#186ccb'
  },
  infoText: {
    color: '#fff',
  }
})
export default HomeScreen