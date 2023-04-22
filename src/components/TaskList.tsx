import {useAtom} from 'jotai';
import React from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import {TaskListAtom} from '../atom';
import {TaskCard} from './TaskCard';

export const TaskList = () => {
  const [taskList] = useAtom(TaskListAtom);
  return (
    <SafeAreaView className="flex-1 my-5">
      <FlatList
        data={taskList}
        keyExtractor={item => item.id}
        renderItem={({item}) => <TaskCard task={item} />}
      />
    </SafeAreaView>
  );
};
