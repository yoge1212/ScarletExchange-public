import { React, useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { auth } from "../config/firebaseSetup";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { useNavigation } from '@react-navigation/core';
import baseStyle from "../styles/baseStyle";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { ScrollView } from "react-native";

const LoginScreen = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const fbauth = auth;

    const navigation = useNavigation(); 

     //UseEffect that will redirect us to the home page whenever there is a AuthStateChange and passes in the product props to populate home page 
     useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async user => {
            if (user) {
                const allProductData = []
                const products = await getProducts();
                // console.log(products);
                for (let i = 0; i < products.length; i++) {
                    const doc = products[i];
                    console.log(JSON.stringify(doc.data()));
                    allProductData.push(doc.data());
                }
                console.log(allProductData);
                navigation.navigate('HomeScreen', { allProductData: allProductData });
            }
        })

        return unsubscribe;
    }, [])

//Handles Sign in Requests
    const signInHandler = async () => {  
        try {
            const userCredential = await signInWithEmailAndPassword(fbauth, email, password);
            const user = userCredential.user;
            if(user.emailVerified){
                console.log("User Logged In");
                navigation.navigate('HomeScreen');
            }
            else{
                alert("Please verify your email before signing in.");
            }
        } catch (error) {
            console.log(error)
            alert("Sign-in Failed: " + error.message);
            
        }
    }

//Handles Sign up Requests
    const signUpHandler = async () => {
        try {
            const response = await createUserWithEmailAndPassword(fbauth, email, password)
            .then(()=>{ 
                sendEmailVerification(fbauth.currentUser)
            })
            console.log(response);
        } catch (error) {
            console.log(error); 
            alert("Registration Failed:" + error.message)
        }
    }


    return (
        <SafeAreaView style={baseStyle.safeArea}>
            <ScrollView style={baseStyle.scrollView}>
                {/* This is ugly, but necessary for making the login page scrollable without error*/}
                <View style={{marginTop: 100}}> 
                    <View style={baseStyle.container}>
                        <Image style={baseStyle.logo} source={require("../assets/logopng.png")}></Image>
                    </View>
                    <View style = {{padding: 10}}> 
                        <View style = {baseStyle.container}>
                            <Text style={{ fontWeight: 'bold', fontSize: 40, paddingBottom: 20, marginLeft: 10 }} >
                                Welcome
                            </Text>
                        </View>
                        <View style={{marginRight: 20, marginLeft: 20}}>
                            <View style={baseStyle.emailField && baseStyle.field}>
                                {/*<MaterialIcons name="alternate-email" size={20} color="black" style={{ marginRight: 5 }} />*/}
                                <TextInput placeholder="email address" value={email} onChangeText={text => setEmail(text)} autoCapitalize="none"/> 
                            </View>
                            <View style={ baseStyle.passwordField && baseStyle.field}>
                                {/*<MaterialIcons name="lock" size={20} color="black" style={{ marginRight: 5 }} />*/}
                                <TextInput placeholder="password" secureTextEntry={true} value={password} onChangeText={text => setPassword(text)} autoCapitalize="none"/>
                            </View>

                            <TouchableOpacity onPress={signInHandler} style={baseStyle.signInButton } >
                                <Text style={{ textAlign: 'center', fontSize: 20 }}>Log In</Text>
                            </TouchableOpacity>
                        </View>

                        
                        <View style={baseStyle.container && { flexDirection: 'row', marginTop: 40  }}>
                            <Text style={{ fontSize: 15, marginLeft: 40 }}>Don't have an account? </Text>
                            <TouchableOpacity onPress={signUpHandler} >
                                <Text style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 15 }}>Sign Up Here. </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}

export default LoginScreen;
