import React, { useCallback, useEffect, useRef, useState } from "react";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import TweetCard from "../../../components/TweetCard";
import axios, { Axios } from "axios";
import { useParams } from "react-router-dom";
import LoadingAnimation from "../../../utils/LoadingAnimation";

function PostFeed({
  setUserPosts,
  setIsFollowedByYou,
  handleGetFollowStatusFromChild,
}) {
  // const [latestTweets, setlatestTweets] = useState(null);

  const [posts, setPosts] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);

  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  // Using useMutation (Post / Update Data)3
  const userNameFromUrl = useParams()?.username;

  const handleUserProfilePosts = async () => {
    // console.log("hello from handleuserprofile", userNameFromUrl);
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/users/getuser-posts/${userNameFromUrl}`,
        {
          withCredentials: true,
        }
      );
      if (response?.data?.result[0]?.isFollowedByYou) {
        handleGetFollowStatusFromChild(true);
      }
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPosts = async ({ pageParam = null } = {}) => {
    try {
      // console.log("THis is pageproma",pageParam)

      let apiUrl = `http://localhost:8000/api/v1/users/get-latest-tweets`;

      if (pageParam) {
        apiUrl += `?cursor=${pageParam}`;
      }

      const { data } = await axios.get(apiUrl, { withCredentials: true });
      return data;
    } catch (error) {
      console.error("There is a error while fetching, Feed Posts", error);
      throw error;
    }
  };

  const {
    fetchNextPage,
    isError,
    isLoading,
    error,
    isFetchingNextPage,
    hasNextPage,
    data,
  } = useInfiniteQuery({
    queryKey: ["tweets"],
    queryFn: fetchPosts,
    initialPageParam: null,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.nextCursor ?? undefined;
    },
  });

  // console.log("there is a error on homw feed ",error)

  const observer = useRef();

  const lastPostElementRef = useCallback((node) => {
    if (isFetchingNextPage) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      // console.log(entries);
      if (entries[0].isIntersecting) {
        fetchNextPage();
      }
    });
    if (node) observer.current.observe(node);
  }, []);

  const {
    data: userPosts,
    isLoading: userProfileLoading,
    isPending: postsPending,
    error: postsError,
  } = useQuery({
    queryKey: ["userPosts", userNameFromUrl],
    queryFn: handleUserProfilePosts,
    enabled: !!userNameFromUrl,
  });

  useEffect(() => {
    if (userPosts) {
      setUserPosts(userPosts?.result?.length);
    }
  }, [userPosts]);

  return (
    <div className="pb-12">
      {userNameFromUrl ? (
        userProfileLoading ? (
          <div className="w-full h-60  ">
            <LoadingAnimation />
          </div>
        ) : (
          userPosts?.result?.map((card) =>
            card.parentTweetId ? null : <TweetCard tweetData={card} />
          )
        )
      ) : isLoading ? (
        <div className="w-full h-screen bg-black ">
          <LoadingAnimation />
        </div>
      ) : (
        <div>
          {data?.pages?.map((page, pageIndex) => (
            <React.Fragment key={pageIndex}>
              {page?.posts?.map((post, postIndex) => {
                // Check if this is the last post on the last page
                const isLastPost =
                  pageIndex === data.pages.length - 1 &&
                  postIndex === page.posts.length - 1;

                if (isLastPost) {
                  return (
                    <div ref={lastPostElementRef} key={post._id}>
                      <TweetCard tweetData={post} />
                    </div>
                  );
                }

                return <TweetCard key={post._id} tweetData={post} />;
              })}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );

  // return (
  //   <div>
  //     {data?.pages?.map((page, pageIndex) => (
  //       <React.Fragment key={pageIndex}>
  //         {page.posts.map((post, postIndex) => {
  //           // Check if this is the last post on the last page
  //           const isLastPost =
  //             pageIndex === data.pages.length - 1 &&
  //             postIndex === page.posts.length - 1;

  //           if (isLastPost) {
  //             return (
  //               <div ref={lastPostElementRef} key={post._id}>
  //                 <TweetCard tweetData={post} />
  //               </div>
  //             );
  //           }

  //           return <TweetCard key={post._id} tweetData={post} />;
  //         })}
  //       </React.Fragment>
  //     ))}
  //     {/* Show a spinner at the bottom while fetching the next page */}
  //     {/* {loading && !initialLoad && <LoadingSpinner />} */}

  //     {/* Show a message when all posts are loaded */}
  //     {!loading && !nextCursor && (
  //       <div className="feed-end-message">You've reached the end!</div>
  //     )}
  //   </div>
  // );
}

export default PostFeed;
