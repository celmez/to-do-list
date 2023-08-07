import * as React from 'react';
import { useEffect, useState } from 'react';
import { Text, View, SafeAreaView, TextInput, TouchableOpacity, StyleSheet, StatusBar, Alert, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

function App() {
  const [text, setText] = useState('');
  const [tasks, setTasks] = useState([]);

  const handleToDo = () => {
    if( text !== '' ) {
      setTasks([...tasks, text]);
      setText("");
    }

    else {
      Alert.alert('Lütfen bir şeyler giriniz!!!')
    }
  }

  const handleDeleteToDo = ( index ) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logo}>
        <Text style={styles.logoText}>
          To Do List
        </Text>
      </View>
      <View style={styles.toDoForm}>
        <TextInput
          style={styles.toDoFormInput}
          placeholder= { 'Bir şeyler yazınız...' }
          onChangeText={ (value) => {
            setText(value)
          }}
          value={text}
        />
        <TouchableOpacity style={styles.toDoFormInputBtn} onPress={() => {
          handleToDo()
        }}>
          <Text style={styles.toDoFormBtnText}>
            Ekle
          </Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <FlatList
          data={tasks}
          renderItem={({item, index}) => (
            <View style={styles.tasksContainer}>
              <Text style={styles.tasksText}>{ item }</Text>
                <TouchableOpacity style={styles.tasksBtn}
                  onPress={() => {
                    handleDeleteToDo(index)
                  }}
                >
                <Text style={styles.tasksBtnText}>
                  <Ionicons name='trash-outline' color={'white'}></Ionicons>
                </Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={item => item + Date.now() + Math.random()}
        />
      </View>
    </SafeAreaView>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    alignItems: 'center',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: '#f3f4f5'
  },
  toDoForm: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoText: {
    fontSize: 30,
    color: '#c80b30'
  },
  toDoFormInput: {
    marginTop: 15,
    color: '#c80b30',
    height: 45,
    width: 300,
    borderWidth: 1,
    padding: 10,
    borderColor: '#c80b30',
  },
  toDoFormInputBtn: {
    marginTop: 10,
    borderWidth: 2,
    borderColor: '#c80b30',
    padding: 10,
    textAlign: 'center',
    alignItems: 'center',
    height: 45,
    width: 300,
    backgroundColor: '#c80b30',
    borderRadius: 3
  },
  toDoFormBtnText: {
    color: '#f3f4f5',
    fontSize: 18
  },
  divider: {
    height: 1,
    width: 420,
    backgroundColor: '#323232',
    marginVertical: 16
  },
  tasksContainer: {
    padding: 5,
    borderBottomWidth: 1,
    borderColor: '#323232',
    width: 300,
    textAlign: 'center',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12
  },
  tasksText: {
    fontSize: 18
  },
  tasksBtn: {
    width: 23,
    height: 23,
    borderRadius: 13,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white'
  },
  tasksBtnText: {
    fontSize: 20
  }
});
