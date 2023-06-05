import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import { exercicePreview } from '../../../interfaces/exerciceInterface';

export const useExercicesPaginated = () => {

    const exercicesCollection = firestore().collection('exercices');


    const [isFetching, setIsFetching] = useState(true);
    const [isGenerating, setIsGenerating] = useState(true);
    const [simpleExerciceList, setSimpleExerciceList] = useState<exercicePreview[]>([]);

    const [exerciceFiltered, setExerciceFiltered] = useState<exercicePreview[]>([]);
    const [routineDayExercices, setroutineDayExercices] = useState<exercicePreview[]>([]);

    const loadExercices = async () => {
        try {
            const querySnapshot = await exercicesCollection.orderBy('rel_number').get();

            const exerciceList: exercicePreview[] = querySnapshot.docs.map((documento) => {
                return {
                    ref: documento.ref,
                    name: documento.data().name,
                    muscle: documento.data().primaryMuscle,
                    img: documento.data().image,
                    equipment: documento.data().equipment,
                };
            });

            setSimpleExerciceList(exerciceList);
            setExerciceFiltered(exerciceList);

            setIsFetching(false);
        } catch (error) {
            console.log('Error al obtener documentos:', error);
        }
    }

    const searchExercice = (name: string, equipment: string, muscle: string) => {

        setExerciceFiltered(
            simpleExerciceList.filter(exercice => {
                const normalizedSearch = name ? name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") : "";
                const normalizedName = exercice.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                const normalizedMuscle = muscle ? muscle.toLowerCase() : "";
                const normalizedEquipment = equipment ? equipment.toLowerCase() : "";

                return (!name || normalizedName.includes(normalizedSearch)) &&
                    (!muscle || normalizedMuscle === 'todos' || exercice.muscle.toLowerCase().includes(normalizedMuscle)) &&
                    (!equipment || normalizedEquipment === 'todos' || exercice.equipment.toLowerCase().includes(normalizedEquipment));
            })
        );

    }

    const routineDayGenerate = (muscles: string[]) => {

    }

    useEffect(() => {
        loadExercices();
    }, [])

    return {
        isFetching,
        simpleExerciceList,
        searchExercice,
        exerciceFiltered,
        routineDayExercices
    }
}