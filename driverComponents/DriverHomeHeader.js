/* eslint-disable eol-last */
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
import { Text, StyleSheet, Image, View, TouchableOpacity } from 'react-native';


export default function Header({ navigation }) {

    const openMenu = () => {

        navigation.openDrawer();

    };


    return (

        <View style={styles.Header} >
            <TouchableOpacity onPress={openMenu}>

                <Image style={{tintColor : "white"}} source={require('../assets/menu32.png')} />

            </TouchableOpacity>
            <Text style={styles.text}>  Home </Text>
            <TouchableOpacity style={styles.logout}
                onPress={()=> navigation.navigate("DriverLogin")}
             >
                <Text style={styles.logoutText} >Logout</Text>
            </TouchableOpacity>

        </View>

    );

}


const styles = StyleSheet.create({

    Header: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#0ae6a4',
        letterSpacing: 1,

    },
    text: {
        paddingLeft: '30%',
        fontSize: 22,
        fontWeight: "bold",
        color: 'white',


    },
    logout : {
        position : "absolute",
        left : "90%",
    },
    logoutText : {
        fontSize : 16,
        color : "white",
        
    }


});
