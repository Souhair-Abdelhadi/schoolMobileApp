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

import React from 'react'
import {
    SafeAreaView, View, Text, ScrollView, StyleSheet,Modal,
    Image, Alert, TextInput, TouchableOpacity,
    TouchableWithoutFeedback, Keyboard, Button, Dimensions,
} from 'react-native'
import {database} from 'react-native-firebase'
import LinearGradient from 'react-native-linear-gradient'
import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage'
import Spinner from 'react-native-spinkit'






export default class StudentLogin extends React.Component {


    state = {
        SchoolRef: "",
        zone: "",
        errorMessage : "",
        showModal : false ,
        resetPassword: "",
        resetPasswordError: "",
    }




    handleLogin = () => {

        this.setState({showModal : true})

        if (this.state.SchoolRef.length < 4) {
            this.setState({
                errorMessage: 'please insert your data in the input (school reference > 4 characters) ',
                showModal: false
            });
        }

        else {

            fetch("https://www.google.com")
                .then((e) => {
                    console.log("status :",e.status)
                    if (e.status == 200) {



                        database().ref("/ecoles/" + this.state.SchoolRef)
                            .once('value', async (snap) => {
                                if (snap.val() !== null) {

                                    if (snap.val().ActiveState === true) {

                                        const data = JSON.stringify({
                                            schoolRef: this.state.SchoolRef
                                        })
                                        await RNSecureStorage.set("schoolRef", data, { accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY })
                                            .then((e) => {
                                                console.log(e, "data set with success")
                                            })
                                            .catch(e => console.log(e))
                                        this.setState({ showModal: true })
                                        this.props.navigation.navigate("StudentHome", {
                                            schoolRef: this.state.SchoolRef,
                                        });
                                    }
                                    else {

                                        this.setState({ errorMessage: '', showModal: false });

                                        Alert.alert('error',
                                            "there is no school with this reference ",
                                            [{ text: 'UNDERSTOOD', onPress: () => console.log('user pressed understood for verified account case') }]);


                                    }
                                }
                                else {
                                    this.setState({ errorMessage: '', showModal: false });

                                    Alert.alert('error',
                                        "there is no school with this reference ",
                                        [{ text: 'UNDERSTOOD', onPress: () => console.log('user pressed understood for verified account case') }]);

                                }
                            })
                            .catch(e => {
                                console.log(e)
                                this.setState({ errorMessage: e, showModal: false })
                            });

                    }
                    else {
                        this.setState({
                            errorMessage: 'can\'t link you to school because of connection problem, try to resolve it and try later.',
                            showModal: false
                        });
                    }
                })
                .catch(e => {
                    console.log(e)
                    this.setState({
                        errorMessage: 'can\'t link you to school because of connection problem, try to resolve it and try later.',
                        showModal: false
                    });
                })


        }

    }





    componentWillUnmount() {


        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state, callback) => {
            return;
        };
    }

    render() {


        return (


            <TouchableWithoutFeedback onPress={() => {
                console.log('you just get out from the input');
                Keyboard.dismiss();
            }

            }   >
                
                <ScrollView keyboardShouldPersistTaps='handled' >
                    <LinearGradient colors={['#292c31', '#34ebb7', '#292c31']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ flex: 1, height: Dimensions.get('window').height }}  >

                        <Modal visible={this.state.showModal} transparent={true}    >
                            <View style={styles.modal} >
                                <View style={{
                                    justifyContent: "center",
                                    alignItems: "center",
                                }} >
                                    <Text style={{
                                        fontSize: 21,
                                        fontWeight: "bold",
                                        color: "white",
                                        marginBottom: "5%",
                                    }} >Linking to your school...</Text>
                                    <Spinner style={styles.spinner} isVisible={true} size={60} type={"Pulse"} color={"white"} />
                                </View>
                            </View>
                        </Modal>

                        <View >

                            <View style={styles.image} >
                                <Image source={require('../assets/VT_logo2r.jpg')} style={styles.circle} />
                                <Text style={styles.logo} > School Time  </Text>
                            </View>


                            <Text style={styles.error} > {this.state.errorMessage} </Text>




                            <View style={styles.inputboxs}>
                                <TextInput placeholder='Enter school reference' placeholderTextColor='#05036D' keyboardType={'default'}
                                    style={styles.input} onChangeText={SchoolRef => this.setState({ SchoolRef : SchoolRef.trim() })}
                                    value={this.state.SchoolRef}
                                    autoCapitalize={'none'}
                                />
                            </View>


                            <View style={styles.button}>
                                <Button title='Login'
                                    color='#05036D'
                                    onPress={this.handleLogin}

                                />
                            </View>


  

                            <View style={styles.note} >


                                <Text style={{ fontSize: 16, fontWeight: "bold", color: 'white' }} > Are you a bus driver ?  </Text>

                                <TouchableOpacity onPress={() => this.props.navigation.navigate("DriverLogin")}>
                                    <Text style={styles.signUp}>Driver login</Text>
                                </TouchableOpacity>


                            </View>



                        </View>

                    </LinearGradient>

                </ScrollView>


            </TouchableWithoutFeedback>








        )


    }


}


const styles = StyleSheet.create({

    container: {
        //flex:1,
        //backgroundColor: '#607aec',
        margin: 0,
    },
    image: {
        marginTop: 0,
        alignItems: 'center',
        marginLeft: 0,
        marginBottom: '5%',

    },
    inputboxs: {
        paddingTop: 10,
        paddingBottom: 26,
    },
    input: {
        borderColor: '#05036D',
        fontSize: 15,
        fontWeight: 'bold',
        color: '#05036D',
        borderWidth: 3,
        textAlign: 'center',
        width: '90%',
        height: 40,
        marginLeft: 20,
        paddingLeft: 15,
    },
    button: {
        width: '60%',
        alignContent: 'center',
        marginLeft: 80,
        marginTop: 10,
        marginBottom: 10,
    },
    error: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 30,

    },
    note: {
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 10,
        flexDirection: "row",
    },
    signUp: {
        fontSize: 16,
        fontWeight: "bold",
        color: '#05036D',
    },
    Redirect: {
        fontSize: 15,
        fontWeight: "bold",
        color: 'yellow',
        marginRight: 10,
        marginLeft: 10,


    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#607aec',
    },
    close: {
        marginLeft: '90%',
        marginTop: '2%',

    },
    logo: {
        marginTop: -18,
        fontWeight: 'bold',
        fontSize: 30,
        color: '#05036D',
    },
    circle: {
        width: 250,
        height: 250,
        borderRadius: 250 / 2,
        marginBottom: "8%",
        marginTop: "8%",
    },
    spinner: {
        marginBottom: 10,
        alignSelf : "center",
        justifyContent : "center",
        alignItems : "center",
        marginTop : "5%"
      },
      modal : {
          height : "50%",
          width : "80%",
          backgroundColor : "rgba(8, 10, 10, 0.7)",
          justifyContent : "center",
          alignSelf : "center",
          marginVertical : "40%",
          borderRadius : 18,

      }
});

