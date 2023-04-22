import React, {useCallback, useState} from 'react';
import {
  Button,
  Text,
  TouchableWithoutFeedback,
  Vibration,
  View,
} from 'react-native';
import {Task} from '../types/task.type';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {useAtom} from 'jotai';
import {TaskListAtom} from '../atom';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface PropTaskCard {
  task: Task;
}

export const TaskCard: React.FC<PropTaskCard> = ({task}) => {
  const [taskList, setTaskList] = useAtom(TaskListAtom);
  const [showDescription, setShowDescription] = useState<boolean>(false);

  const onTaskClick = useCallback(() => {
    Vibration.vibrate(20);
    setTaskList(prev =>
      prev.map(item => {
        if (item.id === task.id) {
          item.isDone = !item.isDone;
          return item;
        }
        return item;
      }),
    );
  }, []);

  const onDelete = useCallback(() => {
    setTaskList(prev => prev.filter(item => item.id !== task.id));
    AsyncStorage.setItem('TASKS', JSON.stringify(taskList));
  }, []);

  const onShowDescripionClick = useCallback(() => {
    setShowDescription(prev => !prev);
  }, []);

  return (
    <View className="flex flex-col mx-2 my-3 border-b-[1px] border-white">
      <View className="flex fex-row justify-between">
        <View className="w-full flex flex-row justify-between">
          <BouncyCheckbox
            size={25}
            unfillColor="#1111"
            innerIconStyle={{borderWidth: 2, borderColor: 'orange'}}
            text={task.text}
            isChecked={task.isDone}
            onPress={onTaskClick}
            textStyle={{color: 'white', fontSize: 20}}
          />
          <TouchableWithoutFeedback onPress={onShowDescripionClick}>
            <View>
              <Text className="text-white w-28 h-10"></Text>
            </View>
          </TouchableWithoutFeedback>

          <View className="w-fit m-1 opacity-30">
            <Button title="❌" onPress={onDelete} />
          </View>
        </View>
      </View>
      <View>
        <Text className="text-white text-sm ml-auto">{task.createAt}</Text>
        {showDescription ? (
          <Text className="text-white text-xl">{task.description}</Text>
        ) : null}
      </View>
    </View>
  );
};
