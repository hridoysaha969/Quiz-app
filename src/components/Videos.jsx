import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { NavLink } from "react-router-dom";
import useVideoList from "../hooks/useVideoList";
import Video from "./Video";

function Videos() {
  const [page, setPage] = useState(1);
  const { loading, error, videos, hasMore } = useVideoList(page);

  return (
    <div>
      {videos.length > 0 && (
        <InfiniteScroll
          dataLength={videos.length}
          hasMore={hasMore}
          next={() => setPage(page + 8)}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center", color: "#f00" }}>
              <b>No more video</b>
            </p>
          }
        >
          {videos.map((video, ind) => (
            <NavLink
              to={{
                pathname: `/quiz/${video.youtubeID}`,
                state: {
                  videoTitle: video.title,
                },
              }}
              key={ind}
            >
              <Video title={video.title} id={video.youtubeID} noq={video.noq} />
            </NavLink>
          ))}
        </InfiniteScroll>
      )}

      {!loading && videos.length === 0 && <div>No data found!</div>}
      {error && <div>Something went wrong</div>}
      {loading && <div>Loading...</div>}
    </div>
  );
}

// (`/quiz/${video.youtubeID}`,
// {
//   state: {
//     videoTitle: video.title,
//   },
// })

export default Videos;
