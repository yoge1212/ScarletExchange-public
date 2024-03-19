import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
//import firestore from '@react-native-firebase/firestore';
import { getProducts } from '../api/ProductAPI';
import OfferBar from '../components/offerBar';

const HomeScreen = ({ route }) => {
    return (
        <SafeAreaView style={[styles.Home]}>
            <Text style={{
                fontSize: 30,
                paddingBottom: 20
            }}>Active Deals Nearby</Text>
            <Text> Products to be populated</Text>

            <ScrollView contentContainerStyle={[styles.border, styles.ScrollView, styles.row]}>
                <OfferBar /> 
                <OfferBar cost={15} itemName={"test"}/>
                <OfferBar cost={100.50} itemName = {"battle cats"}/>
                <OfferBar /> 
                <OfferBar cost={15} itemName={"test"}/>
                <OfferBar cost={100.50} itemName = {"battle cats"}/>
                <OfferBar /> 
                <OfferBar cost={15} itemName={"test"}/>
                <OfferBar cost={100.50} itemName = {"battle cats"}/>
                <OfferBar /> 
                <OfferBar cost={15} itemName={"test"}/>
                <OfferBar cost={100.50} itemName = {"battle cats"}/>
                <OfferBar cost={15} itemName={"test"}/>
                <OfferBar cost={100.50} itemName = {"battle cats"}/>
                <OfferBar /> 
                <OfferBar cost={15} itemName={"test"}/>
                <OfferBar cost={100.50} itemName = {"battle cats"}/>
                <OfferBar cost={15} itemName={"test"}/>
                <OfferBar cost={100.50} itemName = {"battle cats"}/>
                <OfferBar /> 
                <OfferBar cost={15} itemName={"test"}/>
                <OfferBar cost={100.50} itemName = {"battle cats"}/>
                <OfferBar cost={15} itemName={"test"}/>
                <OfferBar cost={100.50} itemName = {"battle cats"}/>
                <OfferBar /> 
                <OfferBar cost={15} itemName={"test"}/>
                <OfferBar cost={100.50} itemName = {"battle cats"}/>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    Home: {
        alignItems:  'center',
    },
    ScrollView: {
        padding: 20,
        width: 350,
        flexGrow: 1,
        justifyContent: 'center',
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    border: {
        padding:10,
        borderWidth: 2,
        borderColor: "black",
    }
})

export default HomeScreen;
