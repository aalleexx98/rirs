import { useEffect, useState } from "react"

export const useDebouncedValue = (input: string = '', time: number = 500) => {

    const [debouncedValue, setDebouncedValue] = useState(input);

    useEffect(() => {

        const timeout = setTimeout(() => {
            setDebouncedValue(input);
        }, time);

        return () => {
            clearTimeout(timeout)
        }
    }, [input]) //Es para indicar que se dispare cada vez que le input cambie


    return debouncedValue;
}
