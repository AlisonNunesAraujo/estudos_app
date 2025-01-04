import { View,Text, } from 'react-native';

import { useContext } from 'react';

import { AuthContext } from '../../contextxApi';

export default function Home() {

    const {user} = useContext(AuthContext)

 return (
   <View>
    <Text>{user?.email}</Text>
   </View>
  );
}