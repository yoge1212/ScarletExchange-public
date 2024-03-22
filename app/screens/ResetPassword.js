import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/core'; 
import { auth } from "../config/firebaseSetup";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import baseStyle from "../styles/baseStyle";
import loginStyles from "../styles/LoginStyles";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
// Separate component for Logo
const Logo = () => {
  return (
    <Image
      source={require('../assets/Logo.jpg')}
      style={{ justifyContent: 'center', alignItems: 'center', width: 176, height: 220, marginTop: 5, zIndex:1 }}
    />
  );
};

// Separate component for Email Input
const EmailInput = ({ email, setEmail }) => {
  return (
    <View style={loginStyles.EmailInput}>
    
      <TextInput
        placeholder="Email address"
        value={email}
        onChangeText={text => setEmail(text)}
        autoCapitalize="none"
        style={[{ fontFamily: 'ralewaylight' }, { color: 'black' }]}
        /> 
    </View>
  );
};

// Separate component for Login Button
const ResetPasswordButton = ({ passwordResetHandler }) => {

    const navigation = useNavigation();

    const handleReset = () => {
        passwordResetHandler(); 
        alert("hello world");
        //navigation.navigate('HomeScreen'); 
    };

  return (
    <TouchableOpacity
      onPress={handleReset}
      style={loginStyles.button}
    >
      <Text style={{ textAlign: 'center', color: 'black', fontSize: 15 }}>Send Password Reset</Text>
    </TouchableOpacity>
  );
};

// Separate component for Sign Up Text

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [emailConfirm, setEmailConfirm] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation(); 


    const [showPassword,setShowPassword] = useState('')
    const fbauth = auth;

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

    //Handles Password Reset Requests
    const passwordResetHandler = async () => {  
        try {  
            //if (email.endsWith('@scarletmail.rutgers.edu')) {
                // If the email address is allowed, proceed with sending
                if (emailConfirm === email)
                {
                    //*some cool backend stuff like sending the email*

                    navigation.navigate("PasswordResetConfirm")
                    
                } else {
                    console.log("Email doesn't match");
                }
            //}
        } catch (error) {
            console.log(error); 
            alert("Sign in Failed:" + error.message)
        }
    }

    return (
        <SafeAreaView style={loginStyles.safeArea}>
        <ScrollView contentContainerStyle={loginStyles.safeArea}>

        <Logo />
        <Text style={loginStyles.titleText}>Reset Password</Text>
        <EmailInput email={email} setEmail={setEmail} />
        <EmailInput email={emailConfirm} setEmail={setEmailConfirm} />
        <ResetPasswordButton passwordResetHandler={passwordResetHandler} />
        </ScrollView>
        </SafeAreaView>
    );
};


export default ResetPassword;
