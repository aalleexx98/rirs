import { StyleSheet } from "react-native";

export const loginStyles = StyleSheet.create({
    formContainer: {
        flex: 1,
        paddingHorizontal: 30,
        justifyContent: 'center',
        height: 650, //Para mover el bloque para el scroll
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
    inputAreaReset: {
        borderBottomWidth: 2,
        borderBottomColor: 'rgba(175, 175, 175, 0.6)',
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 8,
    },
    inputFieldReset: {
        color: 'black',
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
    buttonReturn: {
        position: 'absolute',
        top: 20,
        left: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    resetContainer: {
        position: 'absolute',
        bottom: 0,
        right: 20,
    },
    textReset: {
        fontSize: 15,
        color: 'white',
        opacity: 0.8,
    },
    modalBgOut: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textResetSend: {
        fontSize: 18,
    },
    modalContent: {
        padding: 20,
        backgroundColor: 'white',
        width: 250,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        elevation: 10,
        borderRadius: 10,
    },
});