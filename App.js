import React, { useState, useEffect, useCallback } from 'react';
import Realm from 'realm';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native';
import Navigator from './navigators';
import * as SplashScreen from 'expo-splash-screen';
import { View } from 'react-native';
import { DBContext } from './context';

const FeelingSchema = {
  name: "Feeling",
  properties: {
    _id: "int",
    emotion: "string",
    message: "string"
  },
  primaryKey: "_id"
};

export default function App() {
  const [ready, setReady] = useState(false);
  const [realm, setRealm] = useState(null);

  async function prepare() {
    try {
      const connection = await Realm.open({
        path: "simpleDiaryDB",
        schema : [FeelingSchema]
      })
      setRealm(connection);
      console.log(connection)
    } catch (e) {
      console.warn(e);
    } finally {
      setReady(true);
    }
  }

  useEffect(() => {
    prepare();

  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (ready) {
      await SplashScreen.hideAsync();
    }
  }, [ready]);

  if (!ready) {
    return <View style={{flex: 1, backgroundColor: "red"}}></View>;
  }

  return(
    <DBContext.Provider value={realm}>
      <NavigationContainer onLayout={onLayoutRootView}>
        <Navigator />
      </NavigationContainer>
    </DBContext.Provider>
  )
}
