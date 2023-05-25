import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export interface exercicePreview {
    ref: FirebaseFirestoreTypes.DocumentReference<FirebaseFirestoreTypes.DocumentData>,
    name: string;
    muscle: string,
    img: string,
}