import { View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, TextInput, Button } from 'react-native'
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from "@expo/vector-icons"
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
// import DateTimePicker from "@react-native-community/datetimepicker";
// import Voice from '@react-native-voice/voice';






const CustomButton = ({ title, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonContent}>
          <AntDesign name="left" size={20} color="black" />
          <Text style={styles.buttonText}>{title}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const AddTask = () => {
  // let [started, setStarted] = useState(false);
  // let [results, setResults] = useState([]);
  

  // useEffect(() => {
  //   Voice.onSpeechError = onSpeechError;
  //   Voice.onSpeechResults = onSpeechResults;

  //   return () => {
  //     Voice.destroy().then(Voice.removeAllListeners)
  //   }
  // }, [])

  // const startSpeechToText = async () => {
  //   try {
  //     await Voice.start("en-US");
  //     setStarted(true);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // const stopSpeechToText = async() => {
  //   await Voice.stop()
  //   setStarted(false)
  // }

  // const onSpeechResults = (result) => {
  //   setResults(result.value)
  // };

  // const onSpeechError = (error) => {
  //   console.log(error)
  // }

  const navigation = useNavigation()

  

  return (
    <View style={styles.container}>
      <View>
        <CustomButton title="Add Task" onPress={() => navigation.goBack()} />
      </View>
      <View style={styles.taskContainer}>
        <Text style={styles.label}>Assignee:</Text>
        <TextInput
          style={styles.input}
          placeholder='Enter Assignee'
        />
        <Text style={styles.label}>Enter Task:</Text>
        <TextInput
          multiline
          numberOfLines={4}
          style={styles.taskInput}
          placeholder='Enter Task Details'
        />
        <Text style={styles.label}>Voice Text:</Text>
        <TextInput
          multiline
          numberOfLines={4}
          style={styles.taskInput}
          placeholder='Voice Text'
      
        />
  <View style={styles.button}></View>
{/* 
  {!started ? <Button title='Start Speech to Text' onPress={startSpeechToText} /> : undefined}
      {started ? <Button title='Stop Speech to Text' onPress={stopSpeechToText} /> : undefined}
      {results.map((result, index) => <Text key={index}>{result}</Text>)} */}


        <View style={styles.alignRight}>
          <TouchableOpacity>
           
              <FontAwesome name="stop-circle" size={24} color="black" />
              <MaterialIcons name="keyboard-voice" size={24} color="black" />
          
          </TouchableOpacity>

        </View>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    backgroundColor: "#ffa600",
  },
  buttonContent: {
    flexDirection: "row",
    marginLeft: 10,
    marginBottom: 12,
    alignItems: "center"
  },

  buttonText: {
    marginLeft: 34,
    fontSize: 17,
    color: "white"
  },
  label: {
    color: "#ffa600",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 2,
    marginVertical: 15
  },
  input: {
    borderWidth: 0.9,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 18,
    borderRadius: 6,
    fontSize: 13,
    color: "black",
    fontWeight: "600",
    borderLeftWidth: 1.5,
    borderLeftColor: "#ffa600",

  },
  taskContainer: {
    padding: 15

  },
  taskInput: {
    borderWidth: 0.9,
    paddingHorizontal: 10,
    // paddingVertical: 15,
    paddingTop: 0,
    padding: 30,
    fontSize: 18,
    borderRadius: 6,
    fontSize: 13,
    color: "black",
    fontWeight: "600",
    borderRightWidth: 2.5,
    borderRightColor: "#ffa600",
    // marginVertical: 20
  },
  alignRight: {
    marginVertical: 5,
    alignSelf: "flex-end"
  },
  datePicker: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    flex: 1,
    alignItems:"center"
  }


})

export default AddTask