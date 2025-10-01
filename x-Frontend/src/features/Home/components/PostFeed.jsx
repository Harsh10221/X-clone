import React, { useCallback, useEffect, useRef, useState } from "react";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import TweetCard from "../../../components/TweetCard";
import axios, { Axios } from "axios";
import { useParams } from "react-router-dom";

function PostFeed({ setIsFollowedByYou, handleGetFollowStatusFromChild }) {
  // const [latestTweets, setlatestTweets] = useState(null);

  const [posts, setPosts] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);

  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  // Using useMutation (Post / Update Data)3
  const userNameFromUrl = useParams()?.username;
  // console.log("THis is param ", userNameFromUrl);

  // const handleUsequeryfetching = async ({ pageParam }) => {
  //   let apiUrl = `http://localhost:8000/api/v1/users/get-latest-tweets`;

  //   if (pageParam) {
  //     apiUrl += `?cursor=${pageParam}`;
  //   }
  //   const response = await axios.get(apiUrl, { withCredentials: true });

  //   //  axios.get(
  //   //   "http://localhost:8000/api/v1/users/get-latest-tweets",
  //   //   {
  //   //     withCredentials: true,
  //   //   }
  //   // );
  //   // console.log("from api ", response);
  //   // const {}

  //   // setPosts(prevpost => [...prevpost,...])
  //   return response.data;
  // };

  {
    // this was normal fetchpost
    // const fetchPosts = useCallback(async () => {
    //   setLoading(true);
    //   try {
    //     let apiUrl = `http://localhost:8000/api/v1/users/get-latest-tweets`;
    //     // console.log("this is next cursor ",nextCursor)
    //     if (nextCursor) {
    //       apiUrl += `?cursor=${nextCursor}`;
    //     }
    //     const response = await axios.get(apiUrl, { withCredentials: true });
    //     const { posts: newPosts, nextCursor: newNextCursor } = response.data;
    //     setPosts((prevPosts) => [...prevPosts, ...newPosts]);
    //     // console.log("this is new  next cursor ",newNextCursor)
    //     // console.log("this is next cursor ",nextCursor)
    //     setNextCursor(newNextCursor);
    //   } catch (error) {
    //     console.log("Failed to fetch posts", error);
    //   }
    //   setLoading(false);
    //   setInitialLoad(false);
    // }, [nextCursor]);
    // console.log("this is next cursor outside of the function ",nextCursor)
  }

  // const fetchPosts = async ({ pageParam = null }) => {
  //   try {
  //     let apiUrl = `http://localhost:8000/api/v1/users/get-latest-tweets`;

  //     if (pageParam) {
  //       apiUrl += `?cursor=${pageParam}`;
  //     }
  //     const { data } = await axios.get(apiUrl, { withCredentials: true });
  //     return data;
  //   } catch (error) {
  //     console.log("There was a error while fetching post", error);
  //   }
  // };

  // const observer = useRef();

  // const lastPostElementRef = useCallback(
  //   (node) => {
  //     if (isFetchingNextPage) return;

  //     if (observer.current) observer.current.disconnect();

  //     observer.current = new IntersectionObserver((entries) => {
  //       if (entries[0].isIntersecting && hasNextPage) {
  //         fetchNextPage();
  //       }
  //     });
  //     if (node) observer.current.observe(node);
  //   },
  //   [isFetchingNextPage, hasNextPage, fetchNextPage]
  // );

  // useEffect(() => {
  //   fetchPosts();
  // }, []);

  // console.log("Fetched new posts:", newPosts);
  // console.log("Received next cursor:", newNextCursor);

  // console.log("this is newposts",posts)
  // Append the new posts to our existing list

  const handleUserProfilePosts = async () => {
    // console.log("hello from handleuserprofile", userNameFromUrl);
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/users/getuser-posts/${userNameFromUrl}`,
        {
          withCredentials: true,
        }
      );
      //  console.log("from api ", response);
      //  console.log("from api ", response.data.result[0].isFollowedByYou);
      if (response.data.result[0].isFollowedByYou) {
        handleGetFollowStatusFromChild(true);
      }
      //  handleGetFollowStatusFromChild()
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
    }
  };

  const { fetchNextPage, isFetchingNextPage, hasNextPage, data } =
    useInfiniteQuery({
      queryKey: ["tweets"],
      queryFn: fetchPosts,
      initialPageParam: null,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.nextCursor ?? undefined;
      },
    });

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

  // const [isFollowedByYou, setIsFollowedByYou] = useState(null)

  const {
    data: userPosts,
    isPending: postsPending,
    error: postsError,
  } = useQuery({
    queryKey: ["userPosts", userNameFromUrl],
    queryFn: handleUserProfilePosts,
    enabled: !!userNameFromUrl,
  });

  return (
    <div className="pb-12">
      {userNameFromUrl ? (
        userPosts?.result?.map((card) =>
          card.parentTweetId ? null : <TweetCard tweetData={card} />
        )
      ) : (
        <div>
          {data?.pages?.map((page, pageIndex) => (
            <React.Fragment key={pageIndex}>
              {page.posts.map((post, postIndex) => {
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
