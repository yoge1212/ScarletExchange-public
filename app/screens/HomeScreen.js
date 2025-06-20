
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import ProductCard from '../components/ProductCard'; 
import Navbar from '../components/Navbar'; 
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';

const HomeScreen = ({ route }) => { 

    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [noProductsFound, setNoProductsFound] = useState(false);


    console.log()
    const dummyList = [
        { name: 'Textbook', price: 50, Image:require('../assets/textbook.png') },
        { name: 'Shower Caddy', price: 15, imageURI: 'https://example.com/product1.jpg'},
        { name: 'Shoe Rack', price: 40, imageURI: "https://example.com/product3.jpg"},
        { name: "Biology Textbook", price: 40,  imageUri: "https://example.com/product4.jpg"},
        { name: 'Desk Organizer', price: 30, imageURI: 'https://example.com/product3.jpg'},
        { name: 'T-Shirt', price: 15, imageURI: 'https://example.com/product4.jpg'},
        { name: 'Textbook', price: 50, imageURI: 'https://example.com/product1.jpg'},
        { name: 'Shower Caddy', price: 15, imageURI: 'https://example.com/product1.jpg'},
        { name: 'Shoe Rack', price: 40, imageURI: "https://example.com/product3.jpg"},
        { name: "Biology Textbook", price: 40,  imageUri: "https://example.com/product4.jpg"},
        { name: 'Desk Organizer', price: 30, imageURI: 'https://example.com/product3.jpg'},
        { name: 'T-Shirt', price: 15, imageURI: 'https://example.com/product4.jpg'},
        { name: 'Textbook', price: 50, imageURI: 'https://example.com/product1.jpg'},
        { name: 'Shower Caddy', price: 15, imageURI: 'https://example.com/product1.jpg'},
        { name: 'Shoe Rack', price: 40, imageURI: "https://example.com/product3.jpg"},
        { name: "Biology Textbook", price: 40,  imageUri: "https://example.com/product4.jpg"},
        { name: 'Desk Organizer', price: 30, imageURI: 'https://example.com/product3.jpg'},
        { name: 'T-Shirt', price: 15, imageURI: 'https://example.com/product4.jpg'},
        // ...more items
    ];

    const handleSearchInputChange = (text) => {
        setSearchQuery(text); // set the text as paramter for sQuery
        // now within the product items that we have, filter using sQuery
        const filtered = dummyList.filter(item =>
            item.name.toLowerCase().includes(text.toLowerCase())
            //sets to lower case
        );
        setFilteredProducts(filtered); // shows the filtered products based on Squery
            //edge case if no products are found for the search
        if (filtered.length === 0) {
            // if no products: message to the user
            setNoProductsFound(true);
        } else {
            // if products: reset it
            setNoProductsFound(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}> 
        <View style={styles.headerContainer}>
            <Image 
                source={require('../assets/logosmall.png')} // Replace with your image path
                style={styles.smallHeaderImage}
                resizeMode="cover"
            />
            <Image 
                source={require('../assets/scarletexchange.png')} // Replace with your image path
                style={styles.headerImage}
                resizeMode="cover"
            />

            <TouchableOpacity stype = {styles.favoriteButton}> 
                    <Image 
                        source={require('../assets/filledheart.png')} // Replace with your image path
                        resizeMode="cover"
                        style={styles.favoriteButton}
                    />
                    </TouchableOpacity>
        </View>
            <View style={styles.topBar}>
                <View style={styles.searchContainer}> 
                <Image 
                source={require('../assets/search.png')} // Replace with your search icon image path
                style={styles.searchIcon}
                resizeMode="contain"
            />
                    <TextInput style={styles.searchInput} 
                    placeholder="Search..."
                    value={searchQuery} 
                    onChangeText={handleSearchInputChange}
                    />
                    <TouchableOpacity style = {styles.sortButton}> 
                    <Image 
                        source={require('../assets/sort.png')} // Replace with your image path
                        resizeMode="cover"
                        style = {styles.sortButton}
                    />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.filterButton}>
                    <Image 
                        source={require('../assets/filter.png')} // Replace with your image path
                        resizeMode="cover"
                    />
                    </TouchableOpacity>
                    
                </View>
            </View>

            <View>
    {noProductsFound && <Text>No Products Found</Text>}
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.offerBarContainer}>
            <View style={styles.row}>
                {searchQuery === '' ? (
                    dummyList.map((item, index) => (
                        <ProductCard
                            key={index}
                            name={item.name}
                            price={item.price}
                            imageUri={item.imageUri}
                            onPress={() => navigation.navigate('ProductDetailScreen', { productId: item.id })}
                        />
                    ))
                ) : (
                    filteredProducts.map((item, index) => (
                        <ProductCard
                            key={index}
                            name={item.name}
                            price={item.price}
                            imageUri={item.imageUri}
                            onPress={() => navigation.navigate('ProductDetailScreen', { productId: item.id })}
                        />
                    ))
                )}
            </View>
        </View>
    </ScrollView>
</View>


            <Navbar />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 21,
        marginTop: 20,
        marginBottom: 5,
    },
    smallHeaderImage: {
        marginRight: 10,

    },

    favoriteButton: {
        marginLeft: 122
    },
    headerImage: {
     
    }, 
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 5,
        width: '100%',

    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: '#000000'




        
    },
    searchIcon: {
        position: 'absolute',
        left: 15,
        zIndex: 1,
    },
    searchInput: {
        flex: 1,
        height: 35,
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 10,
        paddingHorizontal: 35,
        marginRight: 10,
        fontFamily: 'ralewaylight',
        paddingRight: 10

    },
    sortButton: {
        marginLeft: 10

    },
    filterButton: {
        paddingVertical: 10,
        paddingHorizontal: 7,
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