"use client";

import { createData, fetchData } from "@/lib/api";
import { useEffect, useState } from "react";
import { Video } from "@/Models/VideoModel";
import Image from "next/image";
import { useAuth } from "@/store/AuthContext";

export default function VideoList() {
  const [videos, setVideos] = useState<Video[]>([]);
  const auth = useAuth();
  const limit = auth.user.data?.membership?.articles;
  const isLoading = auth.isLoading;
  const isLoginMembership = auth.user.isMembership;
  const isAuthenticated = auth.user.isAuthenticated;
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const videos = await fetchData(`/content/videos?limit=${limit}`);
        setVideos(videos);
      } catch (error) {
        console.error(error);
      }
    };
    if (!isLoading && limit !== undefined) fetchVideos();
  }, [limit, isLoading]);
  if (!isAuthenticated || !isLoginMembership) return <div className="flex justify-center w-full h-screen items-center">401 | Unauthorized</div>;
  return (
    <>
      <div className="flex flex-col w-full h-auto pt-[120px] px-16">
        <h2 className="text-2xl font-semibold mb-5">Videos</h2>
        <div id="video-container" className="flex flex-wrap w-full justify-center">
          {videos.map((video, id) => {
            return (
              <div id="video" key={id} className="flex flex-col m-4 w-[200px] shadow-md h-[200px] rounded-md">
                <div className="relative w-full h-[120px]">
                  <Image src={"/video.jpg"} className="rounded-t-md object-cover object-center" fill alt="video" />
                </div>
                <div className="flex flex-col pl-3 py-2">
                  <div className="text-lg font-semibold">{video.title}</div>
                  <div className="truncate w-full">{video.url}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
