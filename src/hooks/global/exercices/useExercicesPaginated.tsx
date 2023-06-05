import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import { exercicePreview } from '../../../interfaces/exerciceInterface';

export const useExercicesPaginated = () => {

    const exercicesCollection = firestore().collection('exercices');
    const musclesCollection = firestore().collection('muscle');

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
                    rel_number: documento.data().rel_number,
                    type: documento.data().type
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

    const routineDayGenerate = async (muscles: string[], level: string) => {
        const lvl = getFieldNameByLevel(level);

        try {
            const querySnapshot = await Promise.all(
                muscles.map(async (value) => {
                    try {
                        const doc = await musclesCollection.doc(value).get();

                        if (doc.exists) {
                            const sets: number = doc.data()?.[lvl];
                            const selectedExercises = getExercicesByMuscle(value, sets);
                            return selectedExercises;
                        } else {
                            console.log('Documento no encontrado');
                            return [];
                        }
                    } catch (error) {
                        console.log('Error al obtener documentos:', error);
                        return [];
                    }
                })
            );

            const combinedExercises = querySnapshot.flat();
            setroutineDayExercices(combinedExercises);

            setIsGenerating(false);
        } catch (error) {
            console.log('Error al obtener documentos:', error);
        }

    };

    function getExercicesByMuscle (muscle: string, sets: number) {
        const filteredExercises = simpleExerciceList.filter((exercice) => exercice.muscle === muscle);
        const selectedExercises: exercicePreview[] = [];
        const subvalues: string[] = getSubvalues(muscle)
        let subvalueIndex = 0;

        while (sets > 0 && filteredExercises.length > 0) {
            const subvalue = subvalues[subvalueIndex];
            const matchingExercises = matchExercices(filteredExercises, subvalue);
            const randomIndex = Math.floor(Math.random() * matchingExercises.length);

            const selectedExercise = matchingExercises[randomIndex];
            selectedExercises.push(selectedExercise);
            filteredExercises.splice(filteredExercises.indexOf(selectedExercise), 1);

            sets -= 3;

            subvalueIndex++;
            if (subvalueIndex >= subvalues.length) {
                subvalueIndex = 0;
            }

        }
        console.log(selectedExercises)
        return selectedExercises;
    }

    function matchExercices (filteredExercises: exercicePreview[], subvalue: string) {
        let matchingExercises: exercicePreview[] = [];
        //Busca basic
        matchingExercises = filteredExercises.filter((exercise) =>
            exercise.rel_number === Number(subvalue) &&
            (exercise.type === "basic")
        );
        //Si no middle
        if (matchingExercises.length === 0) {
            matchingExercises = filteredExercises.filter((exercise) =>
                exercise.rel_number === Number(subvalue) &&
                (exercise.type === "middle")
            );
            //Si no accesory
            if (matchingExercises.length === 0) {
                matchingExercises = filteredExercises.filter((exercise) =>
                    exercise.rel_number === Number(subvalue) &&
                    (exercise.type === "accessory")
                );
            }
        }
        return matchingExercises
    }

    function getFieldNameByLevel (level: string) {
        if (level === 'beginner') {
            return 'daySetsPrin';
        } else if (level === 'middle') {
            return 'daySetsInt';
        } else if (level === 'advanced') {
            return 'daySetsAva';
        }
        return 'daySetsAva'; // Valor predeterminado si el nivel no coincide con los casos anteriores
    }

    function getSubvalues (muscle: string) {
        switch (muscle) {
            case 'pectoral':
                return ["1.1", "1.2", "1.3", "1.4"];
            case 'espalda':
                return ["2.1", "2.11", "2.2", "2.22", "2.3", "2.33", "2.4", "2.5"];
            case 'trapecio':
                return ["3.1"];
            case 'hombro':
                return ["4.1", "4.2", "4.3"];
            case 'triceps':
                return ["5.1", "5.2", "5.3"];
            case 'biceps':
                return ["6.1", "6.2", "6.3", "6.4"];
            default:
                console.log("Musculo no definido en: getSubvalues")
                return [];
                break;
        }
    }


    useEffect(() => {
        loadExercices();
    }, [])

    return {
        isFetching,
        simpleExerciceList,
        searchExercice,
        exerciceFiltered,
        routineDayGenerate,
        routineDayExercices,
        isGenerating
    }
}