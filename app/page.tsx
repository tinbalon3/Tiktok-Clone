"use client";
import { text } from "stream/consumers";
import ClientOnly from "./components/ClientOnly";
import MainLayout from "./layouts/MainLayout";

import PostMain from "./components/PostMain";
import { usePostStore } from "./store/post";
import { useEffect } from "react";


export default function Home() {

  let {allPosts, setAllPosts} = usePostStore();

  useEffect(() => {
    setAllPosts();
  }, []);

  return (
    <>
      <MainLayout>
        <div className="mt-[80px] w-[calc(100% - 90px)] max-w-[690px] ml-[40%]">
          <ClientOnly>
            {allPosts.length > 0 && allPosts.map((post, index) => (
              <PostMain
                key={index}
                post={post}
              />
            ))}

          </ClientOnly>
        </div>
      </MainLayout>

    </>
  );
}
