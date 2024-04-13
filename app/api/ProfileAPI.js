import { fdb } from "../config/firebaseSetup";
import { doc,collection, getDoc, updateDoc } from "firebase/firestore";
import React, { useState } from 'react';

export async function editProfile(userId, editedData){
    try{
        const profile = doc(fdb, "users", userId);
        //fetches user info with userId
        const profileSnapShot = await getDoc(profile);
        if(!profileSnapShot.exists()) throw new Error('User not found');
        //checks if the user exists

        const { email, fname, lname, userImg } = editedData;
        //stores the new data in updatedData

        await updateDoc(profile, editedData);
        //updates profile with new data

        return{message: 'Profile successfully edited'}

    }catch(error){
        return error;
    }

}