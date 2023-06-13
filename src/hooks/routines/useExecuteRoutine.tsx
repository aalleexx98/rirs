import React, { useEffect, useState } from 'react'
import { getItemStorage } from "../../helpers/helperStorage";
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { ExerciceHistorial, ExerciceSetsData, HistorialRoutine } from '../../interfaces/exerciceInterface';


export const useExecuteRoutine = () => {

    const historialRoutineCollection = firestore().collection('historial_routine');
    const historialExerciceCollection = firestore().collection('historial_exercice');

    const [historialExercice, setHistorialExercice] = useState<ExerciceHistorial[]>([]);


    const saveHistorialRoutine = async (historialData: ExerciceSetsData[], totalTime: number, title: string) => {
        try {
            const userUid = await getItemStorage('uid');
            const date = new Date();

            const historialRoutine: HistorialRoutine = {
                userUid: userUid!,
                totalTime: totalTime,
                date: date,
                exercices: historialData,
                name: title,
            };

            await historialRoutineCollection
                .doc()
                .set(historialRoutine)

            // Guardar información en la colección historialExerciceCollection
            historialData.forEach(async (exerciceData) => {
                const exerciceHistorial: ExerciceHistorial = {
                    exercice_id: exerciceData.exercice_id,
                    name: exerciceData.name,
                    setsData: exerciceData.setsData,
                    userUid: userUid!,
                    date,
                    rutineName: title
                };
                const querySnapshot = await historialExerciceCollection
                    .where('userUid', '==', userUid)
                    .where('name', '==', exerciceData.name)
                    .orderBy('date', 'desc')
                    .get();
                console.log(querySnapshot.size)
                if (querySnapshot.size >= 5) {
                    const lastDocument = querySnapshot.docs[querySnapshot.size - 1];
                    await lastDocument.ref.set(exerciceHistorial);
                } else {
                    console.log("Menor de 5");
                    await historialExerciceCollection
                        .doc()
                        .set(exerciceHistorial)
                }
            });


        } catch (error) {
            console.log(error)
        }
    }

    const getHistorialExerice = async (name: string) => {

        try {
            const userUid = await getItemStorage('uid');
            const exerciceHistorialArray: ExerciceHistorial[] = [];

            const querySnapshot = await historialExerciceCollection
                .where('userUid', '==', userUid)
                .where('name', '==', name)
                .orderBy('date', 'desc')
                .get();

            querySnapshot.forEach((document) => {
                const data = document.data();

                const exerciceHistorial: ExerciceHistorial = {
                    exercice_id: data.exercice_id,
                    name: data.name,
                    setsData: data.setsData,
                    userUid: data.userUid,
                    date: data.date.toDate(), // Si 'date' es un objeto Timestamp de Firestore
                    rutineName: data.rutineName,
                    formattedDate: '',
                };

                exerciceHistorialArray.push(formatExerciceHistorial(exerciceHistorial));
            });


            // console.log(exerciceHistorialArray.reverse());
            // exerciceHistorialArray.forEach(obj => {
            //     console.log(obj.setsData);
            // });
            return exerciceHistorialArray;

        } catch (error) {
            console.log(error);
        }

    }

    const formatExerciceHistorial = (exerciceHistorial: ExerciceHistorial): ExerciceHistorial => {
        const day = exerciceHistorial.date.getDate();
        const month = exerciceHistorial.date.getMonth() + 1; // Los meses en JavaScript son base 0, por eso se suma 1
        const year = exerciceHistorial.date.getFullYear();

        // Formatear la fecha en el formato "dd/mm/yyyy"
        const formattedDate = `${ day.toString().padStart(2, '0') }/${ month.toString().padStart(2, '0') }/${ year }`;

        // Utilizar el valor formateado de la fecha
        return { ...exerciceHistorial, formattedDate };
    };

    return {
        saveHistorialRoutine,
        getHistorialExerice
    }

}