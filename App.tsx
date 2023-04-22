import React, {useCallback, useEffect, useState} from 'react';
import {Alert, View} from 'react-native';
import {Header} from './src/components/Header';
import {AddTask} from './src/components/AddTask';
import {TaskList} from './src/components/TaskList';
import {useAtom} from 'jotai';
import {TaskListAtom} from './src/atom';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Task} from './src/types/task.type';

function App(): JSX.Element {
  const [, setTaskList] = useAtom(TaskListAtom);

  useEffect(() => {
    AsyncStorage.getItem('TASKS')
      .then(result => {
        if (result) {
          setTaskList(JSON.parse(result) as Array<Task>);
        }
        console.log(result);
      })
      .catch(err => {
        console.log(err);
        Alert.alert('Error', 'Somethitg wwent wrong', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
      });
  }, []);

  return (
    <View className=" bg-black min-h-screen max-h-auto">
      <Header />
      <AddTask />
      <TaskList />
    </View>
  );
}

export default App;
