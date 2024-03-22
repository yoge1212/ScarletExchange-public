import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/core'; 
import { auth } from "../config/firebaseSetup";
import loginStyles from "../styles/LoginStyles";
import Logo from "../components/logo";
import EmailInput from "../components/emailInput";

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
    const navigation = useNavigation(); 

    const fbauth = auth;

    //Handles Password Reset Requests
    const passwordResetHandler = async () => {  
        try {  // you can comment and uncomment the email.endsWith part for debugging
            if (email.endsWith('@scarletmail.rutgers.edu')) {
                // If the email address is allowed, proceed with sending
                if (emailConfirm === email)
                {
                    /* *cool backend stuff like sending the email* */

                    navigation.navigate("PasswordResetConfirm")
                } else {
                    console.log("Email doesn't match");
                }
            }
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