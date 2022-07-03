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
import {
    SafeAreaView, View, Text, ScrollView, StyleSheet,Image,TouchableOpacity,Modal,
} from 'react-native'
import firebase, { database } from 'react-native-firebase'
import Global from '../GlobalData/Global';
const ImagePicker = require("react-native-image-picker");
import Spinner from "react-native-spinkit"



export default class DriverProfile extends React.Component {


    state = {

        driverName: null,
        driverAge: null,
        driverId: Global.driverId,
        schoolName: Global.schoolRef,
        driverImage : null,
        percentage : 0,
        showModal : false,
    }

    messageIdGenerator() {
        // generates uuid.
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
            let r = (Math.random() * 16) | 0,
                v = c == "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }

    async  handleAddPicture() {
        const options = {
            title: "Select Picture",
            mediaType: "photo",
            takePhotoButtonTitle: "Take a Photo",
            maxWidth: 2000,
            maxHeight: 2000,
            allowsEditing: true,
            noData: true,
            storageOptions: {
                skipBackup: true,
                path: 'images'
            },
            

        };
        ImagePicker.launchImageLibrary( options, response => {
            console.log("Response = ", response);
            if (response.didCancel) {
                // do nothing
            } else if (response.error) {
                // alert error
                console.log(response.error)
            } else {
                
                console.log("path of the image selected : " + response.uri)
                const { uri } = response;
                console.log(uri)
                const extensionIndex = uri.lastIndexOf(".");
                const extension = uri.slice(extensionIndex + 1);
                const allowedExtensions = ["jpg", "jpeg", "png"];
                const correspondingMime = ["image/jpg", "image/jpeg", "image/png"];
                const source = { uri: response.uri };
                
                const file = {
                    uri,
                    name: `${this.messageIdGenerator()}.${extension}`,
                    type: correspondingMime[allowedExtensions.indexOf(extension)]
                };

                // const filename = uri.substring(uri.lastIndexOf('/') + 1);
                const filename = this.state.driverId+"_"+new Date().getTime() +"."+ uri.substring(uri.lastIndexOf('.') + 1);
                const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
                this.setState({
                    showModal : true
                })
                
                const task = firebase.storage()
                .ref(filename)
                .putFile(uploadUri)

                try {
                    task.on('state_changed',snapshot=>{
                        if(snapshot.bytesTransferred == snapshot.totalBytes){
                            this.setState({
                                percentage : 0,
                                driverImage : snapshot.downloadURL,
                                showModal : false
                            })
                            firebase.database().ref("/drivers/"+this.state.driverId)
                                .update({
                                    driverImage : snapshot.downloadURL
                                })
                        }
                        else{
                            this.setState({
                                percentage : Math.floor((snapshot.bytesTransferred/snapshot.totalBytes)*100)
                            })
                        }
                    })
                } catch (error) {
                    console.log(error)
                    alert("An error happend while uploading the image")
                }

                    // .then( async snapshot =>{
                        
                    //     firebase.database().ref("/drivers/"+this.state.driverId)
                    //      .update({
                    //          driverImage : snapshot.downloadURL
                    //      })
                         
                    //  })
                
                if (!allowedExtensions.includes(extension)) {
                    return alert("That file type is not allowed.");
                }
            }
        });

        
    };


    componentDidMount() {


        database().ref("/drivers/"+this.state.driverId)
            .once('value', (snap) => {
                console.log(snap.val());
                if (snap.val() != null) {

                    this.setState({
                        driverName: snap.val().driverName,
                        driverAge: snap.val().driverAge,
                    })
                    
                    if(snap.child("driverImage").exists()){
                        this.setState({
                            driverImage : snap.val().driverImage
                        })
                        console.log("image url : "+snap.child("driverImage").val())
                    }
                }
                else {

                    this.setState({
                        driverName: null,
                        driverAge: null,
                    })

                }
            })
            .catch(e=>console.log(e));




    }


    componentWillUnmount() {


        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state, callback) => {
            return;
        };
    }



    render() {

        return (

            <SafeAreaView style={styles.container}>
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
                            }} >Uploading image : {this.state.percentage} % </Text>
                            <Spinner style={styles.spinner} isVisible={true} size={60} type={"Pulse"} color={"white"} />

                        </View>

                    </View>


                </Modal>
                <ScrollView>

                        <View style={styles.card} >

                            <View style={styles.imageAndName} >
                                
                                <View>
                                    {this.state.driverImage == null ? <Image
                                        source={{ uri: "https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425_960_720.png" }}
                                            style={styles.image}
                                        /> : 
                                        <Image
                                            source={{ uri: this.state.driverImage }}
                                            style={styles.image}
                                        />
                                    }
                                    <TouchableOpacity style={styles.pressCamera} onPress={()=> this.handleAddPicture()}  >
                                        <Image 
                                            source={require("../assets/camera.png")}
                                            style={{height : 32, width : 32,tintColor : "white"}}
                                        />
                                    </TouchableOpacity>
                                </View>
                                
                                <View style={styles.Name} >
                                    <Text style={styles.NameStyle} >{this.state.driverName}</Text>

                                </View>

                            </View>
                            <View style={styles.otherInformation} >
                                <View style={styles.information} >
                                    <Text style={styles.informationStyle} > Driver Age : <Text style={{ color: "gray" }} > {this.state.driverAge} years  </Text> </Text>
                                </View>
                                <View style={styles.information} >
                                    <Text style={styles.informationStyle} > School Name : <Text style={{ color: "gray" }} > {this.state.schoolName}   </Text> </Text>
                                </View>

                            </View>


                        </View>

                </ScrollView>

            </SafeAreaView>

        )
    }

}



const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    card : {
        backgroundColor : "#292c31",
        height : 300,
        width : "90%",
        marginTop : "5%",
        alignSelf : 'center',
        borderWidth : 2,
        borderColor : "gray",
        borderBottomLeftRadius : 30,
        borderBottomRightRadius : 30
    },
    imageAndName : {
        position : 'absolute',
        marginTop : "4%",
        width : "90%",
        alignSelf : "center",
        flexDirection : 'row',
    },
    image : {
        width : 90,
        height : 90,
        borderRadius : 90/2,
        borderWidth : 3,
        borderColor : "white",
        
    },
    Name : {
        position : 'absolute',
        marginLeft : "45%",
        marginTop : "6%",
    },
    NameStyle : {
        fontSize : 18,
        color : "#fbfbfb",

    },
    otherInformation  : {
        position : 'absolute',
        top : "45%",
        width : "90%",
        alignSelf : "center"
    },
    information : {
        marginTop : "5%",
    },
    informationStyle : {
        color : "#fbfbfb",
        fontSize : 18,

    },
    pressCamera : {
        position : "absolute",
        top : "70%",
        left : "90%",
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
          backgroundColor : "rgba(126, 131, 138, 0.7)",
          justifyContent : "center",
          alignSelf : "center",
          marginVertical : "40%",
          borderRadius : 18,
  
      }


})