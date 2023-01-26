import { StyleSheet } from "react-native";


const navButtonStyles = StyleSheet.create({
    buttonUnpressed: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        borderColor: 'black',
        borderWidth: 2,
        backgroundColor: 'rgb(135, 31, 31)',
    },
    buttonPressed: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        borderColor: 'black',
        borderWidth: 2,
        backgroundColor: 'rgb(82, 3, 3)',
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
});

export default navButtonStyles;