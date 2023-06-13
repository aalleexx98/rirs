import React, { useEffect, useState } from 'react'
import { getItemStorage } from "../../helpers/helperStorage";
import firestore from '@react-native-firebase/firestore';
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

            historialData.forEach(async (exerciceData) => {
                const exerciceHistorial: ExerciceHistorial = {
                    exercice_id: exerciceData.exercice_id,
                    name: exerciceData.name,
                    setsData: exerciceData.setsData,
                    userUid: userUid!,
                    date: date,
                    rutineName: title,
                };
                await historialExerciceCollection
                    .doc()
                    .set(exerciceHistorial)
            });

        } catch (error) {

        }
    }

    return {
        saveHistorialRoutine
    }

}