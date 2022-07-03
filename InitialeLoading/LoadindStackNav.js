/* eslint-disable react-native/no-inline-styles */
/* eslint-disable space-infix-ops */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable keyword-spacing */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-shadow */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable semi */
/* eslint-disable prettier/prettier */
import React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import DriverLogin from '../driverComponents/DriverLogin'
import StudentLogin from '../studentComponents/StudentLogin'
import DriverHome from '../driverComponents/DriverHome'
import StudentHome from '../studentComponents/StudentHome'
import StudentMainScreen from '../studentComponents/MainStackNav'
import DriverMainScreen from '../driverComponents/MainStackNav'
import Loading from './Loading'



const Login = createStackNavigator({
  Loading : Loading,  
},
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  }
);



export default createAppContainer(
  createSwitchNavigator({
      Login: Login,
  },

    {
      initialRouteName: "Login",
      backBehavior : "history"
    }

  )
)