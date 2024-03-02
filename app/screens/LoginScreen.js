import { React, useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { auth } from "../config/firebaseSetup";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { useNavigation } from '@react-navigation/core'; 
import baseStyle from "../styles/baseStyle";


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
                // console.log(prodcucts);
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
            signInWithEmailAndPassword(fbauth, email, password).then((userCredential) => {
                const user = userCredential.user;
                console.log("User Logged In");
            })
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
            <View style = {{padding: 10}}> 
                <Text
                    style={{
                        fontSize: 25,
                        paddingBottom: 20,
                        marginLeft: 10
                    }}
                >Login
                </Text>
                <View style={baseStyle.emailField}>
                    <MaterialIcons name="alternate-email" size={20} color="black" style={{ marginRight: 5 }} />
                    <TextInput placeholder="email address" value={email} onChangeText={text => setEmail(text)} autoCapitalize="none"/> 
                </View>
                <View style={baseStyle.passwordField}>
                <MaterialIcons name="lock" size={20} color="black" style={{ marginRight: 5 }} />
                    <TextInput placeholder="password" secureTextEntry={true} value={password} onChangeText={text => setPassword(text)} autoCapitalize="none"/>
                </View>
                <TouchableOpacity
                    onPress={signInHandler}
                    style={baseStyle.signInButton}
                >
                    <Text style={{ textAlign: 'center', color: 'white', fontSize: 20 }}>Sign In</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', marginTop: 25  }}>
                    <Text style={{ fontSize: 20, marginLeft: 40 }}>Don't have an account yet? </Text>
                    <TouchableOpacity
                        onPress={signUpHandler}
                    >
                        <Text style={{ textAlign: 'center', color: '#e04502', fontSize: 20 }}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </SafeAreaView>
    )
}

export default LoginScreen;