import { fdb } from "../config/firebaseSetup";
import { doc,collection, getDoc, updateDoc } from "firebase/firestore";
import React, { useState } from 'react';
import * as ImagePicker from "expo-image-picker";
export async function editProfile(userId, editedData){
    try{
        const profile = doc(fdb, "users", userId);
        //fetches user info with userId
        const profileSnapShot = await getDoc(profile);
        if(!profileSnapShot.exists()) throw new Error('User not found');
        //checks if the user exists

        const { email, fname, lname, userImg } = editedData;
        //stores the new data in updatedData

        const resp = await updateDoc(profile, editedData);
        //updates profile with new data

        return{message: 'Profile successfully edited'}

    }catch(error){
        return error;
    }

}
export async function uploadProfileImg(userId, Img){
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        console.log(status);
        if (status != "granted"){
            alert("Permission denied");
        } else {
            const result = await ImagePicker.launchImageLibraryAsync({mediaTypes: ImagePicker.MediaTypeOptions.Images});

            if(!result.cancelled) {
                Img = result.uri;
                console.log("Successfully set image to uploaded image");
            }
            else{
                alert("Image launch unsuccessful");
            }
        }
    try{
            const profile = doc(fdb, "users", userId);
            const profileSnapShot = await getDoc(profile);
            if(!profileSnapShot.exists()) throw new Error('User not found');

            await updateDoc(profile, Img);

            return{message: 'Profile successfully edited'}

        }catch(error){
            return error;
        }
}