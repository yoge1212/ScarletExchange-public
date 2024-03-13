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
    const [showPassword,setShowPassword] = useState('')
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
            const response = await signInWithEmailAndPassword(fbauth, email, password); 
            //check if the user trying to sign in has verified their email(Yes-Home,No-Resend Verification)
            if(fbauth.currentUser.emailVerified){
                navigation.navigate('HomeScreen')
            }else{ 
                sendEmailVerification(fbauth.currentUser)
                alert('Please check your email and verify your email')
            }
            console.log(response);
        } catch (error) {
            console.log(error); 
            alert("Sign in Failed:" + error.message)

        }
    }

//Handles Sign up Requests
    const signUpHandler = async () => {
        try {  
            if (email.endsWith('@scarletmail.rutgers.edu')) {
                // If the email address is allowed, proceed with sign-up
                const response = await createUserWithEmailAndPassword(fbauth, email, password);
                sendEmailVerification(fbauth.currentUser);
                console.log(response); 
                alert("Please check your email and verify your email")
            } else {
                // If the email address is not allowed, display an error message
                alert('Only @scarletmail.rutgers.edu email addresses can sign-up.'); 
            }
        } catch (error) {
            console.log(error); 
            alert("Registration Failed:" + error.message)
        }
    } 
//Shows password when eye icon is toggled
    const toggleShowPassword = () => { 
        setShowPassword(!showPassword); 
    }; 


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
