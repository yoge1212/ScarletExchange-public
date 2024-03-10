
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image} from 'react-native';
import offerStyle from '../styles/offerStyle';
//import firestore from '@react-native-firebase/firestore';

// this will hold our offers 
// no code in it right now 
// three parameters, image src, name of item and cost
const OfferBar = ({itemName="NULL", cost=0}) => {
    return (
        <SafeAreaView style={offerStyle}>
        <Text style={offerStyle.border}>
            Name: {itemName} {"\n"}
            Cost: ${cost}
        </Text>

        </SafeAreaView>
        
    );
}


export default OfferBar;