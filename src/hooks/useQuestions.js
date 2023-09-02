import {
    get,
    getDatabase,
    orderByKey,
    query,
    ref
} from 'firebase/database';
import {
    useEffect,
    useState
} from 'react';

function useQuestions(videoId) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [questions, setQuestions] = useState([])

    useEffect(() => {
        async function fetchQuestions() {
            // database related work
            const db = getDatabase();
            const quizRef = ref(db, "quiz/" + videoId + "/questions")
            const quizQuery = query(quizRef, orderByKey());

            try {
                setError(false)
                setLoading(true)
                // requset firebase database
                const snapShot = await get(quizQuery)
                setLoading(false)

                if (snapShot.exists()) {
                    setQuestions((prevQuestions) => {
                        return [...prevQuestions, ...Object.values(snapShot.val())];
                    });
                }
            } catch (err) {
                console.log(err)
                setLoading(false);
                setError(true)
            }

        }

        fetchQuestions();
    }, [videoId])

    return {
        loading,
        error,
        questions,
    }
}

export default useQuestions;