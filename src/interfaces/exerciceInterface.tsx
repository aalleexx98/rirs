import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export interface exercicePreview {
    ref: FirebaseFirestoreTypes.DocumentReference<FirebaseFirestoreTypes.DocumentData>,
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

export interface RoutineExercise {
    exercise: FirebaseFirestoreTypes.DocumentReference<FirebaseFirestoreTypes.DocumentData>;
    position: number;
    repetitions: string;
    restTime: number;
    sets: number;
}

export interface Routine {
    id: string,
    exercises: RoutineExercise[];
    title: string;
    userUid: string;
}


//EXECUTE ROUTINE
export interface HistorialRoutine {
    userUid: string,
    name: string,
    totalTime: number,
    date: Date,
    exercices: ExerciceSetsData[]
}

export interface ExerciceHistorial {
    exercice_id: string,
    name: string,
    setsData: setsData[],
    userUid: string,
    date: Date,
    rutineName: string
}

export interface ExerciceSetsData {
    exercice_id: string,
    name: string,
    restTime: number,
    reps_planned: string,
    sets_planned: number,
    setsData: setsData[],
}

export interface setsData {
    set_number: number,
    reps: number,
    kg: number,
}


