import AsyncStorage from '@react-native-async-storage/async-storage';

export const setItemStorage = async (key: string, value: string) => {
    try {
        await AsyncStorage.setItem(key, value)
    } catch (error) {
        console.log(`Error al guardar ${ key }: ${ error }`);
    }
};


export const getItemStorage = async (key: string) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) { //Si existe el valor lo devolvemos
            return value;
        }
        return null;
    } catch (error) {
        console.log(`Error al recuperar ${ key }: ${ error }`);
        return null;
    }
};


export const setObjectStorage = async (key: string, value: any) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.log(`Error al guardar ${ key }: ${ error }`);
    }
};


export const getObjectStorage = async (key: string) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return JSON.parse(value);
        }
        return null;
    } catch (error) {
        console.log(`Error al recuperar ${ key }: ${ error }`);
        return null;
    }
};

export const removeItem = async (key: string) => {
    try {
        await AsyncStorage.removeItem(key)
    } catch (e) {
        console.log(`Error al borrar la key: ${ key }`);
    }

    console.log('Done.')
}