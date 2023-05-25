import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import { exercicePreview } from '../../../interfaces/exerciceInterface';

export const useExercicesPaginated = () => {

    const exercicesCollection = firestore().collection('exercices');
    const [isFetching, setIsFetching] = useState(true);
    const [simpleExerciceList, setSimpleExerciceList] = useState<exercicePreview[]>([]);


    const loadExercices = async () => {
        console.log("--------------------------------------------------------");
        try {
            const querySnapshot = await exercicesCollection.orderBy('rel_number').limit(20).get();

            const exerciceList: exercicePreview[] = querySnapshot.docs.map((documento) => {
                return {
                    ref: documento.ref,
                    name: documento.data().name,
                    muscle: documento.data().primaryMuscle,
                    img: documento.data().image,
                };
            });

            setSimpleExerciceList(exerciceList);
            setIsFetching(false);
        } catch (error) {
            console.log('Error al obtener documentos:', error);
        }
    }

    useEffect(() => {
        loadExercices();
    }, [])

    return {
        isFetching,
        simpleExerciceList
    }
}