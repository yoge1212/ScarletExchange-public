import { fdb } from "../config/firebaseSetup";
import { collection, getDocs, updateDoc } from "firebase/firestore";
import React, { useState } from 'react';
export async function getProducts() { 
    const querySnapshot = await getDocs(collection(fdb, "Products"));
    const records = querySnapshot.docs
    // console.log("Internal function returning the following: ");
    // console.log(records)
    for (let i = 0; i < records.length; i++) {
        const doc = records[i];
        console.log(JSON.stringify(doc.data()));
    }
    return records;
    // console.log(records[0].data());

    // for (let i = 0; i < querySnapshot.docs.length; i++) {
    //     const doc = querySnapshot.docs[i];
    //     console.log(JSON.stringify(doc.data()));
    // }

}
export async function updateProduct(productId, updatedData){
    try{
        //fetches product by userId
        const product = doc(fdb, "Products", productId);
        //checks if the product being fetched exists
        if (!(await getDoc(product)).exists()) throw new Error('Product not found');

        //updates product with new data
        await updateDoc(product, updatedData);
        return{message: 'Successfully updated'};
        
    }catch(err){
            return err;
        }  
    
}