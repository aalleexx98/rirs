import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import { exercicePreview, routineExercices } from '../../../interfaces/exerciceInterface';

export const useExercicesPaginated = () => {

    const exercicesCollection = firestore().collection('exercices');
    const musclesCollection = firestore().collection('muscle');

    const [isFetching, setIsFetching] = useState(true);
    const [isGenerating, setIsGenerating] = useState(true);

    const [simpleExerciceList, setSimpleExerciceList] = useState<exercicePreview[]>([]);
    const [exerciceFiltered, setExerciceFiltered] = useState<exercicePreview[]>([]);
    const [routineDayExercices, setRoutineDayExercices] = useState<routineExercices[]>([]);

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
            setRoutineDayExercices(combinedExercises);

            setIsGenerating(false);
        } catch (error) {
            console.log('Error al obtener documentos:', error);
        }

    };

    const addRoutineExercise = (exerciseId: string) => {
        console.log("Antes de empezar a añadir:" + routineDayExercices)
        const exerciseToAdd = simpleExerciceList.find(exercise => exercise.ref.id === exerciseId);
        if (exerciseToAdd) {
            console.log("Existe")
            const newExercise = {
                exercise: exerciseToAdd,
                sets: 3,
                repetitions: "8",
                restTime: 90,
            };
            setRoutineDayExercices(prevExercises => [...prevExercises, newExercise]);
        }
    };

    const removeRoutineExercise = (exerciseId: string) => {
        console.log("Antes de empezar a borrar:" + routineDayExercices)

        const updatedExercices = routineDayExercices.filter(exercise => exercise.exercise.ref.id !== exerciseId);
        setRoutineDayExercices(updatedExercices);
    };

    const editRoutineExercise = (exerciseId: string, sets: number, repetitions: string, restTime: number) => {
        const updatedExercises = routineDayExercices.map((exercise) => {
            if (exercise.exercise.ref.id === exerciseId) {
                return {
                    ...exercise,
                    sets,
                    repetitions,
                    restTime,
                };
            }
            return exercise;
        });

        setRoutineDayExercices(updatedExercises);
    };


    // HACIA ABAJO EXTRAS
    function getExercicesByMuscle (muscle: string, sets: number) {
        const filteredExercises = simpleExerciceList.filter((exercice) => exercice.muscle === muscle);
        const selectedExercises: routineExercices[] = [];
        const subvalues: string[] = getSubvalues(muscle)
        let subvalueIndex = 0;
        const initialSets = sets;

        while (sets > 0 && filteredExercises.length > 0) {
            const subvalue = subvalues[subvalueIndex];
            const matchingExercises = matchExercices(filteredExercises, subvalue); //busco ejercicios posibles
            const randomIndex = Math.floor(Math.random() * matchingExercises.length);

            const selectedExercise = matchingExercises[randomIndex];
            filteredExercises.splice(filteredExercises.indexOf(selectedExercise), 1);

            const exerciseObject = {
                exercise: selectedExercise,
                sets: (initialSets >= sets) ? 3 : sets,
                repetitions: initialSets === sets ? "6-8" : sets <= 3 ? "12-15" : "8-10",
                restTime: initialSets === sets ? 120 : sets <= 3 ? 60 : 90
            };
            selectedExercises.push(exerciseObject);

            sets -= 3;

            subvalueIndex++;
            if (subvalueIndex >= subvalues.length) {
                subvalueIndex = 0;
            }

        }
        //console.log(selectedExercises)
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

    // useEffect(() => {
    //     console.log("Se cambiaron" + routineDayExercices);
    // }, [routineDayExercices])


    return {
        //Loadings
        isFetching,
        isGenerating,

        //Funciones
        searchExercice,
        routineDayGenerate,
        removeRoutineExercise,
        editRoutineExercise,
        addRoutineExercise,

        //Variables
        simpleExerciceList,
        exerciceFiltered,
        routineDayExercices,

    }
}