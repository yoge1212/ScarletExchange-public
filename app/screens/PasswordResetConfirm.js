import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/core'; 
import { auth } from "../config/firebaseSetup";
import loginStyles from "../styles/LoginStyles";
// Separate component for Logo
const Logo = () => {
  return (
    <Image
      source={require('../assets/Logo.jpg')}
      style={{ justifyContent: 'center', alignItems: 'center', width: 176, height: 220, marginTop: 5, zIndex:1 }}
    />
  );
};


// Separate component for Sign Up Text

const PasswordResetConfirm = () => {
    const navigation = useNavigation(); 
    const fbauth = auth;

    return (
        <SafeAreaView style={loginStyles.safeArea}>
        <ScrollView contentContainerStyle={loginStyles.safeArea}>

        <Logo />
        <Text style={[loginStyles.titleText, {paddingBottom: 10}]}> Password Reset</Text>
        <Text style={[loginStyles.titleText, {paddingTop: 0}]}> Sent </Text>
        </ScrollView>
        </SafeAreaView>
    );
};


export default PasswordResetConfirm;
