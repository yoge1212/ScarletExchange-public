import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
//import firestore from '@react-native-firebase/firestore';
import { getProducts } from '../api/ProductAPI';
import OfferBar from '../components/offerBar';

const HomeScreen = ({ route }) => {
    return (
        <SafeAreaView style={styles.Home}>
            <Text style={{
                fontSize: 30,
                paddingBottom: 20
            }}>Active Deals Nearby</Text>
            <ScrollView style={styles.ScrollView}>
                <Text> Products to be populated</Text>
                <OfferBar/> 
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
        height: 750
    }
})

export default HomeScreen;
