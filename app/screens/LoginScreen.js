import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/core'; 
import { auth } from "../config/firebaseSetup";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import baseStyle from "../styles/baseStyle";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { ScrollView } from "react-native";
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
    <View style={{ flexDirection: 'row', borderColor: 'black', borderWidth: 1, borderRadius: 10, width: 321, height: 49, padding: 10, marginBottom: 25 }}>
    
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

// Separate component for Password Input
const PasswordInput = ({ password, setPassword }) => {
    const [showPassword, setShowPassword] = useState(false);
  
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
  
    return (
      <View style={{ position: "relative", marginBottom: 20 }}>
        <View style={{ flexDirection: "row", alignItems: "center", borderColor: "black", borderWidth: 1, borderRadius: 10, width: 321, height: 49, padding: 10 }}>
          <TextInput
            placeholder="Password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={(text) => setPassword(text)}
            autoCapitalize="none"
            style={{ flex: 1, fontFamily: "ralewaylight", color: "black" }}
          />
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={{ position: "absolute", right: 20, top: 15 }}
          >
            <Image
              source={showPassword ? require("../assets/Show.png") : require("../assets/Hide.png")}
              style={{ width: 18, height: 18 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

// Separate component for Login Button
const LoginButton = ({ signInHandler }) => {

const navigation = useNavigation();

const handleSignIn = () => {
    signInHandler(); 
    navigation.navigate('HomeScreen'); 

  };

  return (
    <TouchableOpacity
      onPress={handleSignIn}
      style={{
        fontFamily: 'ralewaylight',
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        padding: 10,
        borderRadius: 10,
        marginTop: 30,
        borderColor: '#000000',
        borderWidth: 1,
        width: 227,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Text style={{ textAlign: 'center', color: 'black', fontSize: 15 }}>Log In</Text>
    </TouchableOpacity>
  );
};

// Separate component for Sign Up Text
const SignUpText = ({ signUpHandler }) => {
  return (
    <View style={{ flexDirection: 'row', marginTop: 25 }}>
      <Text style={{fontFamily: 'ralewaylight', fontSize: 15, marginLeft: 10, marginTop: 20 }}>Don't have an account? </Text>
      <TouchableOpacity onPress={signUpHandler}>
        <Text style={{fontFamily: 'ralewaybold', textAlign: 'center', color: '#000000', fontSize: 15, marginTop: 20, marginBottom: 100  }}>Sign up here</Text>
      </TouchableOpacity>
    </View>
  );
};

const ForgotPasswordText = ({ onPress }) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <Text style={{ fontFamily: 'ralewaylight', fontSize: 10, marginTop: -5, paddingLeft: 230, color: 'black' }}>Forgot Password?</Text>
      </TouchableOpacity>
    );
  };

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation(); 


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
  };


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

  const forgotPasswordHandler = () => {
    // Implement forgot password functionality
  };

  const hidePasswordHandler = () => {

  };
  
    
    

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
     <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>

      <Logo />
      <Text style={{ fontFamily: 'ralewaybold', fontSize: 40, paddingBottom: 30, paddingTop: 30, fontWeight: '900'}}>Welcome</Text>
      <EmailInput email={email} setEmail={setEmail} />
      <PasswordInput password={password} setPassword={setPassword} />
      <ForgotPasswordText onPress={forgotPasswordHandler} />
      <LoginButton signInHandler={signInHandler} />
      <SignUpText signUpHandler={signUpHandler} />

      </ScrollView>
      

    </SafeAreaView>
  );
};


export default LoginScreen;
