import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export interface exercicePreview {
    ref?: FirebaseFirestoreTypes.DocumentReference<FirebaseFirestoreTypes.DocumentData>, //TODO: Quitar el ?
    name: string;
    muscle: string,
    img: string,
    equipment: string,
}