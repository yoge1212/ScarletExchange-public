import { StyleSheet } from "react-native";
const baseStyle = StyleSheet.create({
    safeArea: {
        flex:1, 
        justifyContent: 'center'
    },
    emailField: {
        flexDirection: 'row',
        borderBottomColor: 'black',
        borderBottomWidth: 1
    },
    passwordField: {
        flexDirection: 'row',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        paddingTop: 30
    },
    signInButton: {
        backgroundColor: '#e04502',
        padding: 20,
        borderRadius: 10,
        marginTop: 30
    },
});

export default baseStyle;