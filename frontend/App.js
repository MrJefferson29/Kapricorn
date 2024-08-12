import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Home from './Home';
import Chatbot from './Chatbot';
import Map from './Map';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Chat') {
                iconName = focused ? 'chatbubble' : 'chatbubble-outline';
              } else if (route.name === 'Map') {
                iconName = focused ? 'map' : 'map-outline';
              }

              return <Icon name={iconName} size={size} color={color} />;
            },
            tabBarLabelPosition: 'below-icon',
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Chat" component={Chatbot} />
          <Tab.Screen name="Map" component={Map} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
