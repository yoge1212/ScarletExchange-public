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
        const { condition, description, images, name, price, tags } =  updatedData;
        // checks if there is at least one image
        if(!Array.isArray(images) || images.length  == 0 ) throw new Error('Must upload at least one image');
        // ensures name is not null
        if(!name) throw new Error('Name cannot be empty');

        await updateDoc(product, updatedData);

        return{message: 'Successfully updated'};
        
    }catch(err){
            return err;
        }  
    
}