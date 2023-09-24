import React, { useState, useEffect, useCallback } from 'react';
import Realm from 'realm';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native';
import Navigator from './navigators';
import * as SplashScreen from 'expo-splash-screen';
import { View } from 'react-native';

const FeelingSchema = {
  name: "Feeling",
  properties: {
    _id: "int",
    emotion: "string",
    message: "string"
  },
  primaryKey: "_id"
}

export default function App() {
  const [ready, setReady] = useState(false);

  async function prepare() {
    try {
      const realm = await Realm.open({
        path: "simpleDiaryDB",
        schema : [FeelingSchema]
      })
      console.log(realm);
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
    <NavigationContainer onLayout={onLayoutRootView}>
      <Navigator />
    </NavigationContainer>
  )
}
