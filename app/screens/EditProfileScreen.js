import React from 'react' 
import { View, Text, StyleSheet,SafeAreaView } from 'react-native'; 
import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';
import { fetch } from 'node-fetch';
import { useNavigation, useRoute } from '@react-navigation/native';
import { editProfile } from '../api/ProfileAPI';
import { TouchableOpacity } from 'react-native';
const EditProfileScreen = () => {
    const navigation = useNavigation();
    console.log(navigation);
    const route = useRoute();
    const userId = route.params?.userId;
    //retrieves the userId parameter passed through to this screen from navigate

    const editedData = {
        email: 'new_email@gmail.com',
        fname: 'firstname',
        lname: 'lastname',
        userImg: null,
    };
    //hardcoded data with edited information
    const handleEditProfileScreen = async () => {
        try{
            const resp = await editProfile(userId, editedData);
            //calls api method
            if (resp.success){
                alert('Profile successfully edited');
                //alerts if method response is successful
            } else{
                console.log(resp.message);
                //returns error in executing api endpoint
            }
        } catch (error) {
            alert('error');
            console.error(error);
        }
    };
    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text>This is to edit an account </Text>
          <TouchableOpacity style={styles.actionButton} onPress={handleEditProfileScreen}>
              <Text style={styles.actionButtonText}>Handle edit profile</Text>
          </TouchableOpacity>
        </View>
        <Navbar />
      </SafeAreaView>
    )
}  

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default EditProfileScreen;