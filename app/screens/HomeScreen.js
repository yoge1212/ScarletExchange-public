import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, TextInput, TouchableOpacity,} from 'react-native';
//import firestore from '@react-native-firebase/firestore';
import { getProducts } from '../api/ProductAPI';
import OfferBar from '../components/offerBar'; 
import Navbar from '../components/Navbar';

const HomeScreen = ({ route }) => {
    return (
        <SafeAreaView style={styles.container}> 
        <View style={styles.topBar}>
                <View style={styles.searchContainer}>
                    <TextInput style={styles.searchInput} placeholder="Search..." />
                    <TouchableOpacity style={styles.filterButton}>
                        <Text style={styles.filterButtonText}>Filter</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView contentContainerStyle={[styles.scrollViewContent]}>
                <OfferBar /> 
                <OfferBar cost={15} itemName={"test"}/>
                <OfferBar cost={100.50} itemName={"battle cats"}/>
                {/* Add more OfferBar components as needed */}
            </ScrollView> 

            <View style={styles.navbarContainer}>
                <Navbar />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }, 
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '100%',
    },
    logo: {
        width: 100,
        height: 30,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchInput: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginRight: 10,
    },
    filterButton: {
        backgroundColor: 'blue',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    filterButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    header: {
        fontSize: 30,
        paddingBottom: 20,
    },
    subheader: {
        paddingBottom: 10,
    },
    scrollViewContent: {
        padding: 20,
        width: '100%',
    },
    navbarContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
})

export default HomeScreen;