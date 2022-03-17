import {
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    orderBy,
    query,
    setDoc,
  } from "@firebase/firestore";
  import {
    ChartBarIcon,
    ChatIcon,
    DotsHorizontalIcon,
    HeartIcon,
    ShareIcon,
    SwitchHorizontalIcon,
    TrashIcon,
  } from "@heroicons/react/outline";
  import {
    HeartIcon as HeartIconFilled,
    ChatIcon as ChatIconFilled,
  } from "@heroicons/react/solid";
  import { useSession } from "next-auth/react";
  import { useRouter } from "next/router";
  import { useEffect, useState } from "react";
  import Moment from "react-moment";
  import { useRecoilState } from "recoil";
  import { modalState, postIdState } from "../atoms/modalAtom";
  import { db } from "../firebase";

  function Tweet({id,tweet,tweetPage}){
       const {data:session} = useSession();

       const [isOpen, setIsOpen] = useRecoilState(modalState);
       const [postId, setPostId] = useRecoilState(postIdState);
       const [comments, setComments] = useState([]);
       const [likes, setLikes] = useState([]);
       const [liked, setLiked] = useState(false);

       const router = useRouter();

       useEffect(
        () =>
          onSnapshot(
            query(
              collection(db, "tweets", id, "comments"),
              orderBy("timestamp", "desc")
            ),
            (snapshot) => setComments(snapshot.docs)
          ),
        [db, id]
      );
    
      useEffect(
        () =>
          onSnapshot(collection(db, "tweets", id, "likes"), (snapshot) =>
            setLikes(snapshot.docs)
          ),
        [db, id]
      );
    
      useEffect(
        () =>
          setLiked(
            likes.findIndex((like) => like.id === session?.user?.uid) !== -1
          ),
        [likes]
      );

      const likePost = async() => {
          if(liked){
              await deleteDoc(doc(db,"tweets",id,"likes",session.user.uid))
          }else{
              await setDoc(doc(db,"tweets",id,"likes",session.user.uid),{
                  username:session.user.name
              })
          }
      }

      return(
          <div className="p-3 flex cursor-pointer border-b border-gray-700" onClick={() => router.push(`/${id}`)}>
              {/* Tweet Top */}
              {
                !tweetPage && (
                  <img src={tweet?.userImg} alt="" className="h-11 w-11 rounded-full mr-4"/>
                )
              } 
              <div className="flex flex-col space-y-2 w-full">
                <div className={`flex ${!tweetPage && "justify-between"}`}>
                  {tweetPage && (
                    <img src={tweet?.userImg} alt="" className="h-11 w-11 rounded-full mr-4" />                  
                  )}

                  <div className="text-[#6e767d]">
                    <div className="inline-block group">
                      <h4 className={`font-bold text-[15px] sm:text-base text-[#d9d9d9] group-hover:underline ${
                        !tweetPage && "inline-block"
                      }`}>
                        {tweet?.username}
                      </h4>
                      <span className={`text-sm sm:text-[15px] ${!tweetPage && "ml-1.5"}`}>
                        @{tweet?.tag}
                      </span>
                    </div>
                    .{" "}
                    <span className="hover:underline text-sm sm:text-[15px]">
                      <Moment fromNow>{tweet?.timestamp?.toDate()}</Moment>
                    </span>
                    {
                      !tweetPage && (
                        <p className="text-[#d9d9d9] text-[15px] sm:text-base mt-0.5">
                          {tweet?.text}
                        </p>
                      )
                    }
                  </div>
                  <div className="icon group flex-shrink-0 ml-auto">
                    <DotsHorizontalIcon className="h-5 text-[#6e767d] group-hover:text-[#1d9bf0]" />
                  </div>
                </div>

                {/* Tweet Body */}
                {
                  tweetPage && (
                    <p className="text-[#d9d9d9] mt-0.5 text-xl">{tweet?.text}</p>
                  )
                }
                <img 
                src={tweet?.image}
                alt=""
                className="rounded-2xl max-h-[700px] object-cover mr-2"
                />

                {/* Tweet Bottom */}
                <div className={`text-[#6e767d] flex justify-between w-10/12 ${
                  tweetPage && "mx-auto"
                }`}>
                  <div className="flex items-center space-x-1 group" onClick={(e) => {
                  e.stopPropagation();
                  setPostId(id);
                  setIsOpen(true);
                }}>
                  <div className="icon group-hover:bg-[#1d9bf0] group-hover:bg-opacity-10">
                    <ChatIcon className="h-5 group-hover:text-[#1d9bf0]" />
                  </div>
                 {
                   comments.length > 0 && (
                     <span className="group-hover:text-[#1d9bf0] text-sm">
                       {comments.length}
                     </span>
                   )
                 }

                 </div>

                {/* Delete */}
                 {
                   session.user.uid === tweet?.id?(
                    <div className="flex items-center space-x-1 group" 
                     onClick={(e) => {
                      e.stopPropagation();
                      deleteDoc(doc(db, "posts", id));
                      router.push("/");
                    }}>
                       <div className="icon group-hover:bg-red-600/10">
                        <TrashIcon className="h-5 group-hover:text-red-600" />
                      </div>
                    </div>
                   ):(
                    <div className="flex items-center space-x-1 group">
                    <div className="icon group-hover:bg-green-500/10">
                      <SwitchHorizontalIcon className="h-5 group-hover:text-green-500" />
                    </div>
                  </div>
                   )
                 }
                  {/* Like */}
                <div className="flex items-center space-x-1 group"  onClick={(e) => {
                  e.stopPropagation();
                  likePost();
                }}>
                      <div className="icon group-hover:bg-pink-600/10">
                        {liked ? (
                          <HeartIconFilled className="h-5 text-pink-600" />
                        ) : (
                          <HeartIcon className="h-5 group-hover:text-pink-600" />
                        )}
                      </div>
                      {
                        likes.length > 0 && (
                          <span
                          className={`group-hover:text-pink-600 text-sm ${
                            liked && "text-pink-600"
                          }`}
                        >
                          {likes.length}
                        </span>
                        )
                      }
                </div>

                {/* Share */}
                <div className="icon group">
                  <ShareIcon className="h-5 group-hover:text-[#1d9bf0]"/>
                </div>
                <div className="icon group">
                  <ChartBarIcon className="h-5 group-hover:text-[#1d9bf0]" />
                </div>

                </div>
              </div>
          </div>
      )

  }

  export default Tweet;