import { fdb } from "../config/firebaseSetup";
import { doc,collection, getDoc, updateDoc } from "firebase/firestore";
import React, { useState } from 'react';

export async function editProfile(userId, editedData){
    try{
        const profile = doc(fdb, "users", userId);
        const profileSnapShot = await getDoc(profile);
        if(!profileSnapShot.exists()) throw new Error('User not found');

        const { email, fname, lname, userImg } = editedData;

        await updateDoc(profile, editedData);

        return{message: 'Profile successfully edited'}

    }catch(error){
        return error;
    }

}