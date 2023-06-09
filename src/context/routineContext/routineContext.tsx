import { createContext, useEffect, useState } from "react";
import { exercicePreview, routineExercices } from "../../interfaces/exerciceInterface";
import { getItemStorage } from "../../helpers/helperStorage";
import firestore from '@react-native-firebase/firestore';


type ExercicesContextType = {
    isFetching: boolean;
    isGenerating: boolean;
    activeRoutines: number;
    simpleExerciceList: exercicePreview[];
    exerciceFiltered: exercicePreview[];
    routineDayExercices: routineExercices[];

    searchExercice: (name: string, equipment: string, muscle: string) => void;
    routineDayGenerate: (muscles: string[], level: string) => void;
    removeRoutineExercise: (exerciseId: string) => void;
    editRoutineExercise: (
        exerciseId: string,
        sets: number,
        repetitions: string,
        restTime: number
    ) => void;
    addRoutineExercise: (exerciseId: string) => void;
    moveExerciseUp: (exerciseId: string) => void;
    moveExerciseDown: (exerciseId: string) => void;
    saveRoutine: (title: string) => void;
    cleanRoutineDayExercices: () => void;
    loadActiveRoutines: () => void;
};


export const RoutineContext = createContext({} as ExercicesContextType);


export const RoutineProvider = ({ children }: any) => {

    const exercicesCollection = firestore().collection('exercices');
    const musclesCollection = firestore().collection('muscle');
    const routinesCollection = firestore().collection('routines');
    const usersCollection = firestore().collection('users');

    const [isFetching, setIsFetching] = useState(true);
    const [isGenerating, setIsGenerating] = useState(true);

    const [activeRoutines, setActiveRoutines] = useState<number>(0);

    const [simpleExerciceList, setSimpleExerciceList] = useState<exercicePreview[]>([]);
    const [exerciceFiltered, setExerciceFiltered] = useState<exercicePreview[]>([]);
    const [routineDayExercices, setRoutineDayExercices] = useState<routineExercices[]>([]);

    useEffect(() => {
        setIsFetching(true);
        loadExercices();
    }, [])

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

    const loadActiveRoutines = async () => {
        try {
            const userUid = await getItemStorage('uid');

            if (userUid) {
                await usersCollection
                    .doc(userUid)
                    .get()
                    .then(documentSnapshot => {
                        if (documentSnapshot.exists) {
                            setActiveRoutines(documentSnapshot.data()?.activeRoutines);
                        }
                    })
            }

        } catch (error) {
            console.log('No se pudo obtener la cantidad de rutinas activas', error);
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
        setIsGenerating(true);
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
            const orderExercices = assignPositions(combinedExercises);
            setRoutineDayExercices(orderExercices);

            setIsGenerating(false);
        } catch (error) {
            console.log('Error al obtener documentos:', error);
        }

    };

    const assignPositions = (exercises: routineExercices[]): routineExercices[] => {
        return exercises.map((exercise, index) => ({
            ...exercise,
            position: index,
        }));
    };

    const addRoutineExercise = (exerciseId: string) => {
        const exerciseToAdd = simpleExerciceList.find(exercise => exercise.ref.id === exerciseId);
        if (exerciseToAdd) {
            console.log("Existe")
            const newExercise = {
                exercise: exerciseToAdd,
                sets: 3,
                repetitions: "8",
                restTime: 90,
                position: routineDayExercices.length,
            };
            setRoutineDayExercices(prevExercises => [...prevExercises, newExercise]);
            console.log(newExercise)
        }

    };

    const removeRoutineExercise = (exerciseId: string) => {
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

    const moveExerciseUp = (exerciseId: string) => {
        const index = routineDayExercices.findIndex(exercise => exercise.exercise.ref.id === exerciseId);

        if (index > 0) {
            const updatedExercices = [...routineDayExercices];
            const exerciseToMove = updatedExercices[index];
            const exerciseToReplace = updatedExercices[index - 1];

            exerciseToMove.position = exerciseToReplace.position;
            exerciseToReplace.position = index;

            updatedExercices.splice(index, 1);
            updatedExercices.splice(index - 1, 0, exerciseToMove);
            setRoutineDayExercices(updatedExercices);
        }

        routineDayExercices.forEach(obj => {
            console.log(obj);
        });
    };

    const moveExerciseDown = (exerciseId: string) => {
        const index = routineDayExercices.findIndex(exercise => exercise.exercise.ref.id === exerciseId);

        if (index < routineDayExercices.length - 1) {
            const updatedExercices = [...routineDayExercices];
            const exerciseToMove = updatedExercices[index];
            const exerciseToReplace = updatedExercices[index + 1];

            exerciseToMove.position = exerciseToReplace.position;
            exerciseToReplace.position = index;

            updatedExercices.splice(index, 1);
            updatedExercices.splice(index + 1, 0, exerciseToMove);
            setRoutineDayExercices(updatedExercices);
        }

        routineDayExercices.forEach(obj => {
            console.log(obj);
        });
    };

    const saveRoutine = async (title: string) => {
        try {
            const userUid = await getItemStorage('uid');
            const exercicesArray = routineDayExercices.map((routineExercice) => ({
                exercise: routineExercice.exercise.ref,
                sets: routineExercice.sets,
                repetitions: routineExercice.repetitions,
                restTime: routineExercice.restTime,
                position: routineExercice.position
            }));

            await routinesCollection
                .add({
                    userUid: userUid,
                    title: title,
                    exercices: exercicesArray
                });

            updateUserActiveRoutines(true);

        } catch (error) {
            console.log('No se pudo guardar la rutina', error);
        }
    }

    const cleanRoutineDayExercices = async () => {
        setRoutineDayExercices([]);
    }


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

    const updateUserActiveRoutines = async (shouldIncrement: boolean) => {
        try {
            const userUid = await getItemStorage('uid');
            if (userUid) {
                const updatedActiveRoutines = shouldIncrement ? activeRoutines + 1 : activeRoutines - 1;
                await usersCollection
                    .doc(userUid)
                    .update({
                        activeRoutines: updatedActiveRoutines,
                    })
                    .then(() => {
                        console.log("User" + userUid + "Actualizada sus rutinas actuales: " + updatedActiveRoutines);
                    });
                setActiveRoutines(updatedActiveRoutines);
            }

        } catch (error) {
            console.log('No se pudo obtener la cantidad de rutinas activas', error);
        }
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

    return (
        <RoutineContext.Provider value={ {
            isFetching,
            isGenerating,
            searchExercice,
            routineDayGenerate,
            removeRoutineExercise,
            editRoutineExercise,
            addRoutineExercise,
            moveExerciseUp,
            moveExerciseDown,
            saveRoutine,
            simpleExerciceList,
            exerciceFiltered,
            routineDayExercices,
            cleanRoutineDayExercices,
            loadActiveRoutines,
            activeRoutines,
        } }>
            { children }
        </RoutineContext.Provider >
    )
}