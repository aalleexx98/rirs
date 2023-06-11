import { createContext, useEffect, useState } from "react";
import { Routine, RoutineExercise, exercicePreview, routineExercices } from '../../interfaces/exerciceInterface';
import { getItemStorage } from "../../helpers/helperStorage";
import firestore from '@react-native-firebase/firestore';


type ExercicesContextType = {
    isFetching: boolean;
    isGenerating: boolean;

    numberOfActiveRoutines: number;
    simpleExerciceList: exercicePreview[];
    exerciceFiltered: exercicePreview[];
    routineExercices: routineExercices[];
    activeRoutines: Routine[];

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
    loadActiveRoutines: () => void;
    removeRoutine: (id: string) => void;
    setActiveRoutine: (id: string) => void;
};


export const RoutineContext = createContext({} as ExercicesContextType);


export const RoutineProvider = ({ children }: any) => {

    const exercicesCollection = firestore().collection('exercices');
    const musclesCollection = firestore().collection('muscle');
    const routinesCollection = firestore().collection('routines');
    const usersCollection = firestore().collection('users');

    const [isFetching, setIsFetching] = useState(true);
    const [isGenerating, setIsGenerating] = useState(true);

    const [numberOfActiveRoutines, setnumberOfActiveRoutines] = useState<number>(0);

    const [simpleExerciceList, setSimpleExerciceList] = useState<exercicePreview[]>([]);
    const [exerciceFiltered, setExerciceFiltered] = useState<exercicePreview[]>([]);
    const [routineExercices, setRoutineExercices] = useState<routineExercices[]>([]);
    const [activeRoutines, setActiveRoutines] = useState<Routine[]>([]);
    const [selectedRoutine, setSelectedRoutine] = useState<Routine>();


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
                const documentSnapshot = await usersCollection.doc(userUid).get();
                if (documentSnapshot.exists) {
                    const activeRoutinesCount = documentSnapshot.data()?.activeRoutines;
                    setnumberOfActiveRoutines(activeRoutinesCount);
                    await showActiveRoutines(userUid, activeRoutinesCount);
                }
            }
        } catch (error) {
            console.log('No se pudo obtener la cantidad de rutinas activas', error);
        }
    };

    const showActiveRoutines = async (userUid: string, activeRoutinesCount: number) => {
        try {
            if (userUid && activeRoutinesCount > 0) {
                const querySnapshot = await routinesCollection
                    .where('userUid', '==', userUid)
                    .orderBy('title')
                    .limit(activeRoutinesCount)
                    .get();
                const routines: Routine[] = [];
                querySnapshot.forEach(documentSnapshot => {
                    if (documentSnapshot.exists) {
                        const routineData = documentSnapshot.data();
                        const routineExercises: RoutineExercise[] = routineData?.exercices || [];
                        const routine: Routine = {
                            id: documentSnapshot.id,
                            exercises: routineExercises,
                            title: routineData?.title || '',
                            userUid: routineData?.userUid || ''
                        };
                        routines.push(routine);
                    }
                });
                setActiveRoutines(routines);
            }

        } catch (error) {
            console.log('No se pudo obtener la cantidad de rutinas activas', error);
        }
    };

    const removeRoutine = async (id: string) => {
        try {
            await routinesCollection
                .doc(id)
                .delete()
                .then(async () => {
                    const updatedRoutines = activeRoutines.filter(routine => routine.id !== id);
                    setActiveRoutines(updatedRoutines);
                    await updateUserActiveRoutines(false);
                })
        } catch (error) {
            console.log('No se pudo obtener la cantidad de rutinas activas', error);
        }
    };

    const setActiveRoutine = async (id: string) => { //TODO: Hacer que esto devuelva algo o que coño?
        const routine = activeRoutines.find((routine) => routine.id === id);
        setSelectedRoutine(routine)

        if (routine) {
            const convertedExercises: routineExercices[] = routine.exercises.map((exercise) => {
                const matchingExercice = simpleExerciceList.find((ex) => ex.ref.isEqual(exercise.exercise));
                const convertedExercise: routineExercices = {
                    exercise: matchingExercice!,
                    sets: exercise.sets,
                    repetitions: exercise.repetitions,
                    restTime: exercise.restTime,
                    position: exercise.position
                };
                return convertedExercise;
            });
            //console.log(convertedExercises)
            setRoutineExercices(convertedExercises);
            //console.log(routineExercices);
        }
        setIsGenerating(false);
    }

    // useEffect(() => {
    //     routineExercices.forEach(obj => {
    //         console.log(obj);
    //         console.log("EYY")
    //     });
    // }, [routineExercices])



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
        setSelectedRoutine(undefined);
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
            setRoutineExercices(orderExercices);

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
                position: routineExercices.length,
            };
            setRoutineExercices(prevExercises => [...prevExercises, newExercise]);
        }

    };

    const removeRoutineExercise = (exerciseId: string) => {
        const updatedExercices = routineExercices.filter(exercise => exercise.exercise.ref.id !== exerciseId);
        setRoutineExercices(updatedExercices);
    };

    const editRoutineExercise = (exerciseId: string, sets: number, repetitions: string, restTime: number) => {
        const updatedExercises = routineExercices.map((exercise) => {
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

        setRoutineExercices(updatedExercises);
    };

    const moveExerciseUp = (exerciseId: string) => {
        const index = routineExercices.findIndex(exercise => exercise.exercise.ref.id === exerciseId);

        if (index > 0) {
            const updatedExercices = [...routineExercices];
            const exerciseToMove = updatedExercices[index];
            const exerciseToReplace = updatedExercices[index - 1];

            exerciseToMove.position = exerciseToReplace.position;
            exerciseToReplace.position = index;

            updatedExercices.splice(index, 1);
            updatedExercices.splice(index - 1, 0, exerciseToMove);
            setRoutineExercices(updatedExercices);
        }

        routineExercices.forEach(obj => {
            console.log(obj);
        });
    };

    const moveExerciseDown = (exerciseId: string) => {
        const index = routineExercices.findIndex(exercise => exercise.exercise.ref.id === exerciseId);

        if (index < routineExercices.length - 1) {
            const updatedExercices = [...routineExercices];
            const exerciseToMove = updatedExercices[index];
            const exerciseToReplace = updatedExercices[index + 1];

            exerciseToMove.position = exerciseToReplace.position;
            exerciseToReplace.position = index;

            updatedExercices.splice(index, 1);
            updatedExercices.splice(index + 1, 0, exerciseToMove);
            setRoutineExercices(updatedExercices);
        }

        routineExercices.forEach(obj => {
            console.log(obj);
        });
    };

    const saveRoutine = async (title: string) => {
        try {
            const userUid = await getItemStorage('uid');

            const exercicesArray = routineExercices.map((routineExercice) => ({
                exercise: routineExercice.exercise.ref,
                sets: routineExercice.sets,
                repetitions: routineExercice.repetitions,
                restTime: routineExercice.restTime,
                position: routineExercice.position
            }));

            if (selectedRoutine) { //TODO: seleccionar selected routine.
                console.log("Existente")
                console.log(selectedRoutine)
                await routinesCollection
                    .doc(selectedRoutine.id)
                    .update({
                        userUid: userUid,
                        title: title,
                        exercices: exercicesArray
                    })
                showActiveRoutines(userUid!, numberOfActiveRoutines);//TODO ES QUE NO ES NI TRUE NI FALSE, PERO TENDRE DE OBTENER EL NUMERO ACTUAL
            } else {
                console.log("Nueva")
                await routinesCollection
                    .add({
                        userUid: userUid,
                        title: title,
                        exercices: exercicesArray
                    });
                const numRoutines = await updateUserActiveRoutines(true);
                showActiveRoutines(userUid!, numRoutines!);
            }

            //RESET DE LA ACTUAL
            setSelectedRoutine(undefined);
        } catch (error) {
            console.log('No se pudo guardar la rutina', error);
        }
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
                const updatedActiveRoutines = shouldIncrement ? numberOfActiveRoutines + 1 : numberOfActiveRoutines - 1;
                await usersCollection
                    .doc(userUid)
                    .update({
                        activeRoutines: updatedActiveRoutines,
                    })
                    .then(() => {
                        console.log("User" + userUid + "Actualizada sus rutinas actuales: " + updatedActiveRoutines);
                    });
                setnumberOfActiveRoutines(updatedActiveRoutines);
                return updatedActiveRoutines;
            }

        } catch (error) {
            console.log('No se pudo obtener la cantidad de rutinas activas', error);
            return 0;
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
            routineExercices,
            loadActiveRoutines,
            numberOfActiveRoutines,
            activeRoutines,
            removeRoutine,
            setActiveRoutine
        } }>
            { children }
        </RoutineContext.Provider >
    )
}