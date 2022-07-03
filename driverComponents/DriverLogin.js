/* eslint-disable jsx-quotes */
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
    SafeAreaView, View, Text, ScrollView, StyleSheet,
    Image, Modal, Alert, TextInput, TouchableOpacity,
    TouchableWithoutFeedback, Keyboard, Button, Dimensions
} from 'react-native'
import {database,auth} from 'react-native-firebase'
import Spinner from "react-native-spinkit"

import LinearGradient from 'react-native-linear-gradient'
import Global from '../GlobalData/Global'





export default class DriverLogin extends React.Component {


    state = {
        email: "",
        password: "",
        errorMessage: "",
        modal: false,
        resetPassword: "",
        resetPasswordError: "",
        showModal : false,
        showPassword : false,

    }




    forgotPassword = () => {

        if (this.state.resetPassword.length === 0) {
            this.setState({
                resetPasswordError: 'please insert your data in the input ',
            });
        }

        else {

            auth().sendPasswordResetEmail(this.state.resetPassword)
                .then(user => {


                    this.setState({ resetPasswordError: 'password reset successfully, check your e-mail' });

                })
                .catch(error => this.setState({ resetPasswordError: error.message }));

        }

    }

    handleModal = () => {

        this.setState({ modal: false });
        this.setState({ resetPasswordError: '' });

    }

    openModal = () => {

        this.setState({ modal: true });
        this.setState({ resetPasswordError: '' });

    }


    handleLogin = () => {



        if (this.state.password.length === 0 || this.state.email.length === 0) {
            this.setState({
                errorMessage: 'please insert your data in the input ',
            });
        }

        else {
            this.setState({ showModal: true })
            const { email, password } = this.state;
            var user;
            auth().signInWithEmailAndPassword(email, password)
                .then(async snapshot => {
                    console.log('user has logging');
                   
                    user = snapshot.user;
                    if (user ) {
                        
                        Global.driverId = user.uid;
                        var userUid = user.uid;
                    
                        database().ref("/drivers/"+userUid+"/")
                        .once('value',(snap)=>{

                            database().ref("/ecoles/"+snap.val().ecole+"/ActiveState/")
                            .once('value',(snap)=>{

                                if (snap.val() == true) {

                                    database().ref("/drivers/" + user.uid)
                                        .once('value', (snap) => {
                                            Global.schoolRef = snap.val().ecole;
                                            this.setState({ showModal: false })
                                            this.props.navigation.navigate("DriverHome", {
                                                driverId: userUid,
                                                schoolRef: snap.val().ecole,
                                            });
                                        })
                                        .catch(e => console.log(e));
                                        this.setState({ showModal: false })
                                }
                                else {
                                    this.setState({ showModal: false })
                                    Alert.alert('error',
                                        'you can not access, because the service is blocked for your school',
                                        [{ text: 'UNDERSTOOD', onPress: () => console.log('user pressed understood for verified account case') }]);

                                    this.props.navigation.navigate('DriverLogin');
                                }

                            })


                        })
                    }
                    else if (user && user.emailVerified == false) {
                        this.setState({ showModal: false })
                        this.setState({ errorMessage: '' });
                        auth().signOut()
                            .catch(err => console.log(err.message));
                        Alert.alert('Attention',
                            'Your account is not yet verified , please go check your email and verify your account to use it  ',
                            [{ text: 'UNDERSTOOD', onPress: () => console.log('user pressed understood for verified account case') }]);
                        console.log('user signed out from login screen');
                        
                    }
                })
                .catch(error => {
                    this.setState({ showModal: false })
                    console.log(error.message);

                    this.setState({ errorMessage: error.message });

                });


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

            <LinearGradient colors={['#ebc034', '#34ebb7', '#ebc034']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ flex: 1, height: Dimensions.get('window').height }}  >


            <TouchableWithoutFeedback onPress={() => {
                console.log('you just get out from the input');
                Keyboard.dismiss();
            }

            }   >

                

                <ScrollView keyboardShouldPersistTaps='handled' >

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
                                    }} >Login to your account...</Text>
                                    <Spinner style={styles.spinner} isVisible={true} size={60} type={"Pulse"} color={"white"} />

                                </View>

                            </View>


                        </Modal>
                        <View >


                            <Modal visible={this.state.modal} >
                                <TouchableWithoutFeedback onPress={() => {
                                    console.log('you just get out from the input');
                                    Keyboard.dismiss();
                                }
                                } >
                                <LinearGradient colors={['#292c31', '#34ebb7', '#292c31']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ flex: 1, height: Dimensions.get('window').height }} >
                                    
                                    <ScrollView  >

                                    <View  style={{flex : 1 }} >

                                        <View style={[styles.close, { height: 32, width: 32 }]}>
                                            <TouchableOpacity onPress={this.handleModal}  >

                                                <Image source={require('../assets/close32.png')} />


                                            </TouchableOpacity>
                                        </View>

                                        <View style={styles.image} >

                                            <Image source={require('../assets/VT_logo2r.jpg')} style={styles.circle} />
                                            <Text style={styles.logo} >   School Time  </Text>

                                        </View>
                                        <Text style={styles.error} > {this.state.resetPasswordError}  </Text>

                                        <View style={styles.inputboxs}>
                                            <TextInput placeholder='Enter your email' placeholderTextColor='#05036D' keyboardType={'email-address'}
                                                style={styles.input} onChangeText={resetPassword => this.setState({ resetPassword : resetPassword.trim() })}
                                                value={this.state.resetPassword}
                                                autoCapitalize={'none'}

                                            />
                                        </View>

                                        <View style={styles.button}>
                                            <Button title='reset password'
                                                color='#05036D'
                                                onPress={this.forgotPassword}

                                            />
                                        </View>

                                    </View>
                                    
                                    </ScrollView>

                                </LinearGradient>
                                </TouchableWithoutFeedback>

                            </Modal>




                            <View style={styles.image} >
                                <Image source={require('../assets/VT_logo2r.jpg')} style={styles.circle} />
                                <Text style={styles.logo} > School Time  </Text>
                            </View>


                            <Text style={styles.error} > {this.state.errorMessage} </Text>




                            <View style={styles.inputboxs}>
                                <TextInput placeholder='Enter your email' placeholderTextColor='#05036D' keyboardType={'email-address'}
                                    style={styles.input} onChangeText={email => this.setState({ email : email.trim() })}
                                    value={this.state.email}
                                    autoCapitalize={'none'}
                                />
                            </View>

                            <View style={styles.inputboxs,{flexDirection : 'row'}}>
                                <TextInput placeholder='Enter your password' placeholderTextColor='#05036D'
                                    style={styles.input}
                                    secureTextEntry={!this.state.showPassword} onChangeText={password => this.setState({ password })}
                                    value={this.state.password}
                                    autoCapitalize="none"
                                />
                                <TouchableOpacity onPress={()=>{
                                    this.setState({ showPassword : !this.state.showPassword})
                                }} 
                                    style={styles.eyeIcon}
                                 >
                                    {!this.state.showPassword ?  (<Image source={require('../assets/show_eye.png')} />) 
                                        : <Image source={require('../assets/dont_show_eye.png')} /> }
                                </TouchableOpacity>
                            </View>

                            <View style={styles.button}>
                                <Button title='Login'
                                    color='#05036D'
                                    onPress={this.handleLogin}

                                />
                            </View>


                            <View style={styles.note} >


                                <Text style={{ fontSize: 16, fontWeight: "bold", color: 'white' }} > Forgot your password ?  </Text>

                                <TouchableOpacity onPress={this.openModal}>
                                    <Text style={styles.signUp}>Reset Password</Text>
                                </TouchableOpacity>


                            </View>


                            <View style={styles.note} >


                                <Text style={{ fontSize: 16, fontWeight: "bold", color: 'white' }} > Are you a student ?  </Text>

                                <TouchableOpacity onPress={() => this.props.navigation.navigate("StudentLogin")}>
                                    <Text style={styles.signUp}>Student login</Text>
                                </TouchableOpacity>


                            </View>



                        </View>


                </ScrollView>



            </TouchableWithoutFeedback>

            </LinearGradient>







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
        borderWidth: 3,
        borderColor: '#05036D',
        fontSize: 15,
        fontWeight: 'bold',
        color: '#05036D',
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
        fontSize: 16,
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

      },
      eyeIcon : {
          position : 'absolute',
          top : "10%",
          left : "83%",
      }
});

