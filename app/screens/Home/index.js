import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Center, Image, useTheme } from 'native-base';

import PasswordsList from '../PasswordsList';
import AppDrawerContent from './components/AppDrawerContent';


const Drawer = createDrawerNavigator();

function Home({ navigation }) {

  const theme = useTheme()

  return (
    <Drawer.Navigator
      initialRouteName="PasswordsList"
      screenOptions={{
        headerTitle: (props) => <Center {...props}><Image source={require("../../assets/favicon.png")} alt="Password Vault" size="25px" /></Center>,
        headerTitleAlign: "center",
        headerTintColor: theme.colors.secondary[600],
        headerStyle: { shadowColor: theme.colors.tertiary[700] },
        drawerActiveTintColor: theme.colors.primary[800],
        drawerInactiveTintColor: "yellow",
        // drawerActiveBackgroundColor: theme.colors.secondary[600],
        sceneContainerStyle: { backgroundColor: "white" },
      }}
      drawerContent={(props) => <AppDrawerContent {...props} />}
    >
      <Drawer.Screen name="PasswordsList" component={PasswordsList} />
    </Drawer.Navigator>
  );
}

export default Home;