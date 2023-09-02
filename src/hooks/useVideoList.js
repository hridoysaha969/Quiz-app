import {
    get,
    getDatabase,
    limitToFirst,
    orderByKey,
    query,
    ref,
    startAt
} from 'firebase/database';
import {
    useEffect,
    useState
} from 'react';

function useVideoList(page) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [videos, setVideos] = useState([])
    const [hasMore, setHasMore] = useState([])

    useEffect(() => {
        async function fetchVideos() {
            // database related work
            const db = getDatabase();
            const videoRef = ref(db, 'videos')
            const videosQuery = query(videoRef, orderByKey(), startAt('' + page), limitToFirst(8));

            try {
                setError(false)
                setLoading(true)
                // requset firebase database
                const snapShot = await get(videosQuery)
                setLoading(false)

                if (snapShot.exists()) {
                    setVideos((prevVideos) => {
                        return [...prevVideos, ...Object.values(snapShot.val())]
                    });
                } else {
                    setHasMore(false)
                }
            } catch (err) {
                console.log(err)
                setLoading(false);
                setError(true)
            }

        }

        fetchVideos();
    }, [page])

    return {
        loading,
        error,
        videos,
        hasMore
    }
}

export default useVideoList;