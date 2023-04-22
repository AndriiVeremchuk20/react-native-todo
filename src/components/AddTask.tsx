import React, {useCallback, useState} from 'react';
import {Button, TextInput, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Task} from '../types/task.type';
import {useAtom} from 'jotai';
import {TaskListAtom} from '../atom';
import uuid from 'react-native-uuid';

export const AddTask = () => {
  const [taskText, setTaskText] = useState<string>('');
  const [taskDescription, setTaskDescription] = useState<string>('');
  const [taskList, setTaskList] = useAtom(TaskListAtom);
  const [disabledButton, setDisabledButton] = useState<boolean>(true);

  const onAddTask = useCallback(() => {
    const newTask: Task = {
      id: uuid.v4() as string,
      isDone: false,
      text: taskText,
      description: taskDescription,
      createAt: new Date().toDateString(),
    };

    setTaskList(prev => [newTask, ...prev]);
    setTaskText('');
    setTaskDescription('');
    setDisabledButton(true);

    AsyncStorage.setItem('TASKS', JSON.stringify(taskList));
  }, [taskDescription, taskText]);

  return (
    <View className="sticy top-1 w-full flex flex-row justify-between border-b-[1px] border-white p-5">
      <View className="w-full flex flex-col gap-4">
        <TextInput
          onChangeText={text => {
            if (text.length < 1) {
              setDisabledButton(true);
            } else {
              setDisabledButton(false);
            }

            setTaskText(text);
          }}
          value={taskText}
          className="placeholder:text-xl placeholder:text-neutral-400 w-full bg-zinc-400 px-3 text-white"
          placeholder="Add task..."
        />
        <TextInput
          editable
          multiline
          numberOfLines={2}
          maxLength={400}
          placeholder="Add description..."
          className="placeholder:text-xl placeholder:text-neutral-400 w-full bg-zinc-400 px-3 text-white"
          onChangeText={setTaskDescription}
          value={taskDescription}
        />
        <View className="w-full">
          <Button disabled={disabledButton} title="Add +" onPress={onAddTask} />
        </View>
      </View>
    </View>
  );
};
