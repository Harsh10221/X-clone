import React, { useCallback, useEffect, useRef, useState } from "react";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import TweetCard from "../../../components/TweetCard";
import axios, { Axios } from "axios";
import { useParams } from "react-router-dom";

function PostFeed({ setIsFollowedByYou, handleGetFollowStatusFromChild }) {
  // const [latestTweets, setlatestTweets] = useState(null);

  const [posts, sestPosts] = useState([]);
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

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      let apiUrl = `http://localhost:8000/api/v1/users/get-latest-tweets`;
      // For subsequent requests, add the cursor to the URL
      if (nextCursor) {
        apiUrl += `?cursor=${nextCursor}`;
      }
      const response = await axios.get(apiUrl, { withCredentials: true });
      // console.log("this is response",response)
      const { posts: newPosts, nextCursor: newNextCursor } = response.data;
      console.log("Fetched new posts:", newPosts);
      console.log("Received next cursor:", newNextCursor);

      // console.log("this is newposts",posts)
      // Append the new posts to our existing list
      sestPosts((prevPosts) => [...prevPosts, ...newPosts]);
      // Save the new cursor for the next fetch
      setNextCursor(newNextCursor);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
    setLoading(false);
    setInitialLoad(false);
  }, [nextCursor]);

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
  // console.log("this is ", userPosts);

  // const {
  //   data,
  //   fetchNextPage,
  //   hasNextPage,
  //   isFetchingNextPage,
  //   status,
  //   isPending,
  //   error,
  // } = useInfiniteQuery({
  //   // } = useQuery({
  //   queryKey: ["tweets"],
  //   queryFn: handleUsequeryfetching,
  //   initialPageParam: null,
  //   getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
  //   enabled: !userNameFromUrl,
  // });

  // console.log("this is ");

  // const { data, isPending, error } = useQuery({
  //   queryKey: ,
  //   queryFn: ,
  // });

  const observer = useRef();
  // console.log("This is observer ref", observer);

  const lastPostElementRef = useCallback(
    (node) => {
      console.log("this is node ",node)
        if (loading) return;
        
        // ✅ FIXED: disconnect (with a 'c')
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver((entries) => {
            console.log(
                "Observer triggered. Is intersecting?",
                entries[0].isIntersecting
            );
            console.log("Is there a next cursor?", !!nextCursor);
            if (entries[0].isIntersecting && nextCursor) {
                console.log("✅ Conditions met! Fetching more posts.");
                fetchPosts();
            }
        });

        // ✅ FIXED: observe (with an 'e')
        if (node) observer.current.observe(node);
    },
    [loading, nextCursor, fetchPosts]
);

  useEffect(() => {
    // Fetch the first page of posts when the component mounts
    fetchPosts();
  }, []);

  // return (
  //   <div className="pb-12">
  //     {userNameFromUrl
  //       ? userPosts?.result?.map((card) =>
  //           card.parentTweetId ? null : <TweetCard tweetData={card} />
  //         )
  //       : // data?.posts?.map((page, i) => (
  //         // console.log("i am from page",page)
  //         // <React.Fragment key={i}>
  //         data?.pages.map((page, i) => (
  //           <React.Fragment key={i}>
  //             {page.posts.map((post, index) => {
  //               // Check if this is the last post of the last page
  //               const isLastPost =
  //                 i === data.pages.length - 1 &&
  //                 index === page.posts.length - 1;

  //               if (isLastPost) {
  //                 // Attach the ref to the last element
  //                 return (
  //                   <TweetCard
  //                     ref={lastPostElementRef}
  //                     key={post._id}
  //                     tweetData={post}
  //                   />
  //                 );
  //               } else {
  //                 return <TweetCard key={post._id} tweetData={post} />;
  //               }
  //             })}
  //           </React.Fragment>
  //         ))}
  //     {/* // </React.Fragment> */}
  //     {/* // ))} */}
  //     {/* // : data?.latestTweets?.map((card) =>
  //       //     card.parentTweetId ? null : <TweetCard tweetData={card} />
  //       //   )} */}
  //   </div>
  // );

  return (
    <div>
      {posts.map((post, index) => {
        // Attach the ref to the last post
        if (posts.length === index + 1) {
          return (
            <div
              ref={lastPostElementRef}
            >

            <TweetCard
              key={post._id}
              tweetData={post}
              />
              </div>
          );
        } else {
          return <TweetCard key={post._id} tweetData={post} />;
        }
      })}

      {/* Show a spinner at the bottom while fetching the next page */}
      {/* {loading && !initialLoad && <LoadingSpinner />} */}

      {/* Show a message when all posts are loaded */}
      {!loading && !nextCursor && (
        <div className="feed-end-message">You've reached the end!</div>
      )}
    </div>
  );
}

export default PostFeed;
