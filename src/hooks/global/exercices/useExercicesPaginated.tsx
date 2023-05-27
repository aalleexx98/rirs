import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import { exercicePreview } from '../../../interfaces/exerciceInterface';

export const useExercicesPaginated = () => {

    const exercicesCollection = firestore().collection('exercices');
    const [isFetching, setIsFetching] = useState(true);
    const [simpleExerciceList, setSimpleExerciceList] = useState<exercicePreview[]>([]);

    const [exerciceFiltered, setExerciceFiltered] = useState<exercicePreview[]>([]);

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

    const searchExercice = (name: string) => { //TODO:
        console.log(name);
        if (name.length === 0) { //Si la busqueda no contiene nada
            setExerciceFiltered(simpleExerciceList);
        }

        if (isNaN(Number(name))) { //Si no es numero para asi buscar por id o name
            setExerciceFiltered( //Busca pokemons x name y los setea para mostrar
                simpleExerciceList.filter(poke => {
                    const normalizedSearch = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                    const normalizedName = poke.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                    return normalizedName.includes(normalizedSearch);
                })
            );
        }

        console.log(simpleExerciceList);
    }

    useEffect(() => {
        loadExercices();
    }, [])

    return {
        isFetching,
        simpleExerciceList,
        searchExercice,
        exerciceFiltered//TODO:
    }
}