import { fdb } from "../config/firebaseSetup";
import { collection, getDocs } from "firebase/firestore";

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