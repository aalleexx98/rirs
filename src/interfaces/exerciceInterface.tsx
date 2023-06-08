import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export interface exercicePreview {
    ref: FirebaseFirestoreTypes.DocumentReference<FirebaseFirestoreTypes.DocumentData>, //TODO: Quitar el ?
    name: string;
    muscle: string,
    img: string,
    equipment: string,
    rel_number: number,
    type: string,
}

export enum muscles {
    abdomen,
    abductores,
    aductores,
    antebrazo,
    biceps,
    cuadriceps,
    espalda,
    gluteos,
    hombro,
    isquiosurales,
    pectoral,
    trapecio,
    triceps
}

export interface routineExercices {
    exercise: exercicePreview;
    sets: number;
    repetitions: string;
    restTime: number;
    position?: number;
}
