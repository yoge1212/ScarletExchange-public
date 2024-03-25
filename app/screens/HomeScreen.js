import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import ProductCard from '../components/ProductCard'; 
import Navbar from '../components/Navbar';

const HomeScreen = ({ route }) => {


    const dummyList = [
        { name: 'Textbook', price: 50, imageURI: 'https://example.com/product1.jpg'},
        { name: 'Shower Caddy', price: 15, imageURI: ''},
        { name: 'Shoe Rack', price: 40, imageURI: "https://example.com/product3.jpg"},
        { name: "Biology Textbook", price: 40,  imageUri: "https://example.com/product4.jpg"},
        { name: 'Desk Organizer', price: 30, imageURI: 'https://example.com/product3.jpg'},
        { name: 'T-Shirt', price: 15, imageURI: 'https://example.com/product4.jpg'},
        // ...more items
    ];


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

            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.offerBarContainer}>
                    <View style={styles.row}>
                        {dummyList.map((item) => (
                            <ProductCard name={item.name} price={item.price} imageUri={item.imageURI} />
                        ))}
                    </View>
                    {/* Add more rows of ProductCard components as needed */}
                </View>
            </ScrollView>

            <Navbar />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    scrollViewContent: {
        padding: 10,
    },
    offerBarContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        flexWrap: 'wrap',
    },
    navbarContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
});

export default HomeScreen;
