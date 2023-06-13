import React, { useEffect, useState } from 'react'
import { getItemStorage } from "../../helpers/helperStorage";
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { ExerciceHistorial, ExerciceSetsData, HistorialRoutine } from '../../interfaces/exerciceInterface';


export const useExecuteRoutine = () => {
    const historialRoutineCollection = firestore().collection('historial_routine');
    const historialExerciceCollection = firestore().collection('historial_exercice');


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

    return {
        saveHistorialRoutine
    }

}