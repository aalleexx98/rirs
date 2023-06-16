import React, { useEffect, useState } from 'react';
import { getItemStorage } from '../../helpers/helperStorage';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { ExerciceHistorial, ExerciceSetsData, HistorialRoutine } from '../../interfaces/exerciceInterface';

export const useHistorial = () => {
    const [isFetching, setIsFetching] = useState(true);
    const [historialData, setHistorialData] = useState<HistorialRoutine[]>([]);
    const [lastDocument, setLastDocument] = useState<FirebaseFirestoreTypes.QueryDocumentSnapshot | null>(null);
    const [hasMore, setHasMore] = useState(true);
    const pageSize = 7;

    useEffect(() => {
        loadHistorial();
    }, []);

    const loadHistorial = async () => {
        setIsFetching(true);

        try {
            const userId = await getItemStorage('uid');
            let query = firestore()
                .collection('historial_routine')
                .where('userUid', '==', userId)
                .orderBy('date', 'desc')
                .limit(pageSize);

            if (lastDocument) {
                query = query.startAfter(lastDocument);
            }

            const snapshot = await query.get();

            if (snapshot.size < pageSize) {
                setHasMore(false);
            }

            const historialDataArr: HistorialRoutine[] = [];

            if (hasMore) {
                snapshot.forEach((doc) => {
                    const data = doc.data();
                    const hisot: HistorialRoutine = {
                        date: data.date.toDate(),
                        exercices: data.exercices,
                        name: data.name,
                        totalTime: data.totalTime,
                        userUid: data.userUid
                    }
                    if (!historialData.find((data) => data.date === hisot.date)) historialDataArr.push(hisot)
                });
            }

            setHistorialData((prevData) => [...prevData, ...historialDataArr]);
            setLastDocument(snapshot.docs[snapshot.docs.length - 1]);
        } catch (error) {
            console.log('Error fetching historial:', error);
        }

        setIsFetching(false);
    };

    const loadMoreHistorial = () => {
        if (!isFetching && hasMore) {
            loadHistorial();
        }
    };

    return {
        isFetching,
        historialData,
        loadMoreHistorial,
        hasMore,
    };
};
