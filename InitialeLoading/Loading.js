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
import { View, Text, StyleSheet, ActivityIndicator,Alert,LogBox,Image,Animated } from 'react-native';
import {auth,database} from 'react-native-firebase';
import RNSecureStorage from 'rn-secure-storage'
import Global from '../GlobalData/Global'

export default class LoadingScreen extends React.Component {


    // componentDidMount() {
        
    //     RNSecureStorage.get("schoolRef").then((schoolRef) => {
    //         Alert.alert('alert',
    //             "rn executed ",
    //             [{ text: 'UNDERSTOOD', onPress: () => console.log('user pressed understood for verified account case') }]);

    //         console.log("schoolRef :", schoolRef)
    //         if (schoolRef !== null) {
    //             console.log("schoolRef :", schoolRef)
    //             database().ref("/ecoles/" + JSON.parse(schoolRef).schoolRef)
    //                 .once('value', (snap) => {
    //                     console.log("snap.value :", snap.val())
    //                     if (snap.val() !== null) {
    //                         this.props.navigation.navigate("StudentMainScreen", {
    //                             schoolRef: schoolRef
    //                         })
    //                     }
    //                     else {
    //                         this.props.navigation.navigate("DriverLogin")
    //                     }
    //                 })
    //                 .catch(e => {
    //                     console.log(e, "dozej")
    //                     this.props.navigation.navigate("DriverLogin")

    //                 })
    //         }

    //         else {

    //             auth().onAuthStateChanged(async user => {

    //                 if (user) {


    //                     if (user) {

    //                         var userUid = user.uid;

    //                         database().ref("/drivers/" + user.uid)
    //                             .once('value', (snap) => {
    //                                 Global.driverId = userUid;
    //                                 Global.schoolRef = snap.val().ecole;
    //                                 this.props.navigation.navigate("DriverMainScreen", {
    //                                     driverId: userUid,
    //                                     schoolRef: snap.val().ecole,
    //                                 });
    //                             })
    //                             .catch(e => {
    //                                 console.log(e);
    //                                 this.props.navigation.navigate("DriverLogin");

    //                             });


    //                     }


    //                     else {
    //                         this.props.navigation.navigate("DriverLogin");


    //                     }
    //                 }

    //                 else {
    //                     this.props.navigation.navigate("DriverLogin");
    //                 }

    //             });

    //             //this.props.navigation.navigate("DriverLogin");

    //         }
    //     })
    //         .catch(e => {
    //             console.log(e, "fhoeho");

    //             auth().onAuthStateChanged(async user => {

    //                 if (user) {


    //                     if (user) {

    //                         var userUid = user.uid;

    //                         database().ref("/drivers/" + user.uid)
    //                             .once('value', (snap) => {
    //                                 Global.driverId = userUid;
    //                                 Global.schoolRef = snap.val().ecole;
    //                                 this.props.navigation.navigate("DriverMainScreen", {
    //                                     driverId: userUid,
    //                                     schoolRef: snap.val().ecole,
    //                                 });
    //                             })
    //                             .catch(e => {
    //                                 console.log(e);
    //                                 this.props.navigation.navigate("DriverLogin");

    //                             });


    //                     }


    //                     else {
    //                         this.props.navigation.navigate("DriverLogin");


    //                     }
    //                 }

    //                 else {
    //                     this.props.navigation.navigate("DriverLogin");
    //                 }

    //             });


    //         })


    // }

    state = {
        fadeAnim: new Animated.Value(0),
    }


    componentDidMount() {

        LogBox.ignoreAllLogs(true)

        Animated.timing(
            this.state.fadeAnim,
            {
                toValue: 1,
                duration: 2000,
                useNativeDriver: false,
            }
        ).start();



           this.timer = setTimeout(() => {
                    this.props.navigation.navigate("DriverLogin")
            }, 10000);

                
                console.log("Connection exist");

                auth().onAuthStateChanged(async (user) => {


                    if (user) {
                        var userUid = user.uid;

                        RNSecureStorage.get("schoolRef").then((data) => {

                            if (data != null) {

                                database().ref("/ecoles/" + JSON.parse(data).schoolRef + "/ActiveState/")
                                    .once('value', (snap) => {

                                        if (snap.val() == true) {

                                            database().ref("/drivers/" + user.uid)
                                                .once('value', (snap) => {
                                                    Global.driverId = userUid;
                                                    Global.schoolRef = snap.val().ecole;

                                                    if (snap.val() != null) {
                                                        clearTimeout(this.timer)
                                                        this.props.navigation.navigate("DriverMainScreen", {
                                                            driverId: userUid,
                                                            schoolRef: snap.val().ecole,
                                                        });
                                                    }
                                                    else {
                                                        // Alert.alert('error',
                                                        //     "something went wrong, try later ",
                                                        //     [{ text: 'UNDERSTOOD', onPress: () => console.log('user pressed understood for verified account case') }]);

                                                        this.props.navigation.navigate("DriverLogin");

                                                    }
                                                })
                                                .catch(e => {
                                                    console.log(e);
                                                    Alert.alert('error',
                                                        "there is no school with this reference ",
                                                        [{ text: 'UNDERSTOOD', onPress: () => console.log('user pressed understood for verified account case') }]);

                                                    this.props.navigation.navigate("DriverLogin");

                                                });
                                        }
                                        else {
                                            Alert.alert('error',
                                                "there is no school with this reference ",
                                                [{ text: 'UNDERSTOOD', onPress: () => console.log('user pressed understood for verified account case') }]);

                                            this.props.navigation.navigate('DriverLogin');
                                        }

                                    })

                            }

                        })
                            .catch(e => {
                                // Alert.alert('error',
                                //     "something went wrong , please try later",
                                //     [{ text: 'UNDERSTOOD', onPress: () => console.log('user pressed understood for verified account case') }]);

                                this.props.navigation.navigate('DriverLogin');

                            })
                    }
                    else {

                        RNSecureStorage.get("schoolRef").then((data) => {
                            console.log(data)

                            if (data != null) {
                                console.log(JSON.parse(data).schoolRef)

                                // this.props.navigation.navigate("StudentMainScreen", {
                                //     schoolRef: data
                                // })

                                database().ref("/ecoles/" + JSON.parse(data).schoolRef)
                                    .once('value', (snap) => {

                                        console.log("snap.value :", snap.val())
                                        if (snap.val() != null) {

                                            if (snap.val().ActiveState === true) {
                                                clearTimeout(this.timer)
                                                this.props.navigation.navigate("StudentMainScreen", {
                                                    schoolRef: data
                                                })

                                            }
                                            else {

                                                Alert.alert('error',
                                                    "there is no school with this reference ",
                                                    [{ text: 'UNDERSTOOD', onPress: () => console.log('user pressed understood for verified account case') }]);

                                                this.props.navigation.navigate("DriverLogin")

                                            }

                                        }
                                        else {
                                            this.props.navigation.navigate("DriverLogin")
                                        }

                                    })
                                    .catch(e => {

                                        console.log(e, "dozej")
                                        this.props.navigation.navigate("DriverLogin")

                                    })



                            }
                            else {
                                this.props.navigation.navigate("DriverLogin")
                            }

                        })
                            .catch(e => {

                                this.props.navigation.navigate("DriverLogin")

                            })


                    }



                })




//-----------------------------------------------------------------------






    }


    componentWillUnmount(){

        clearTimeout(this.timer)


    }


    render() {

        return (
            <View style={styles.container}>
                {/* <Text style={styles.text}> Loading ... </Text>
                <ActivityIndicator size="large" color="red" /> */}

                <Animated.View style={{ opacity: this.state.fadeAnim }} >

                    <Image source={require('../assets/VT_logo2r.jpg')} style={styles.circle} />
                    <View style={{alignSelf : "center",marginTop : "2%"}} >
                        <Text style={styles.title} > SCHOOLTIME </Text>
                    </View>
                </Animated.View>

            </View>
        );
    }



}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor : "#292c31",
    },
    text: {
        fontSize: 26,
        fontWeight: "bold",
        padding: 80,
    },
    circle: {

        width: 150,
        height: 150,
        borderRadius: 150 / 2,

    },
    title : {
        color : "white",
        fontSize : 24,
    }
})