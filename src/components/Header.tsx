import React from 'react';
import {Text, View} from 'react-native';

export const Header = () => {
  return (
    <View className=" sticky top-0 h-16 flex flex-row p-4 justify-center bg-black border-b-[1px] border-white">
      <Text className="text-white text-2xl font-bold">To</Text>
      <Text className="bg-amber-500 text-black font-bold text-2xl rounded-md px-2 mx-1">
        Do
      </Text>
    </View>
  );
};
