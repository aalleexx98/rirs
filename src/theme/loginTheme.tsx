import { StyleSheet } from "react-native";

export const loginStyles = StyleSheet.create({
    formContainer: {
        flex: 1,
        paddingHorizontal: 30,
        justifyContent: 'center',
        height: 600, //Para mover el bloque para el scroll
        marginBottom: 50
    },
    title: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    inputArea: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        borderBottomColor: 'white',
        borderBottomWidth: 2,
        paddingHorizontal: 8,
    },
    inputField: {
        color: 'white',
        fontSize: 16,
        flex: 1,
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 50
    },
    button: {
        borderWidth: 2,
        borderColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 100
    },
    buttonText: {
        fontSize: 18,
        color: 'white'
    },
    newUserContainer: {
        alignItems: 'center',
        marginTop: 30
    },
});