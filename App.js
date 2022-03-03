import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Text,
  ScrollView
} from 'react-native';
import AnimatedCard from './src/Components/AnimatedCard';
import { vh, vw } from './src/Units';
const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
var array = new Array(12)

const generatePairs = (numbers) => {
  var theRandomNumber = Math.floor(Math.random() * 100) + 1;
  if (numbers.includes(theRandomNumber)) {
    return generatePairs(numbers)
  }
  return theRandomNumber;
}
const generateNumbers = () => {
  array = new Array(12)
  var numbers = [];
  for (let i = 0; i < 7; i++) {
    numbers.push(generatePairs(numbers));
  }
  return numbers;
}
const getIndex = array => {
  var index = Math.floor(Math.random() * 12)
  const res = array.filter(item => item != undefined)
  if (res.length == 12) {
    return
  }
  if (array[index] != undefined) {
    return getIndex(array)
  }
  return index
}
const App = () => {

  const [count, setCount] = useState(0)
  const [selection, setSelection] = useState(null)
  const [completedSet, setCompletedSet] = useState([])
  const generateCards = () => {
    const numbers = generateNumbers()
    numbers.forEach(item => {
      array[getIndex(array)] = item
      array[getIndex(array)] = item
    })
    setNumbers(array)
    setCount(0)
    setSelection(null)
    setCompletedSet([])
  }
  const reset = () => {
    generateCards()
  }
  useEffect(() => {
    generateCards()
  }, [])
  const [numbers, setNumbers] = useState(new Array(12))
  const renderItems = () => {
    return numbers.map((item, index) => {
      return (
        <AnimatedCard
          isCompleted={completedSet.includes(item)}
          key={new String(item) + '___' + new String(index)}
          onSelect={() => {
            const c = count + 1
            setCount(c)
            if(selection == null){
              setSelection(item)
              return
            }
            if(selection == item){
              setCompletedSet([...completedSet, item])
              setSelection(null)
              return
            }

          }} number={item} />
      )
    })
  }
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent={true} backgroundColor='transparent' />
      <View style={styles.infoContainer}>
        <TouchableOpacity onPress={reset}>
          <Text style={styles.buttonText}>
            Restart
          </Text>
        </TouchableOpacity>
        <Text style={styles.infoText}>Steps : {count}</Text>
      </View>
      {/* <ScrollView> */}
        <View style={styles.cardContainer}>
          {renderItems()}
        </View>
      {/* </ScrollView> */}
    </View>
  );
};

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
});

export default App;
