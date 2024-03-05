import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
//import firestore from '@react-native-firebase/firestore';
import { getProducts } from '../api/ProductAPI';

const HomeScreen = ({ route }) => {
    return (
        <SafeAreaView style={styles.Home}>
            <Text style={{
                fontSize: 30,
                paddingBottom: 20
            }}>Active Deals Nearby</Text>
            <ScrollView style={styles.ScrollView}>
                <Text> Products to be populated</Text>
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
