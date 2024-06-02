"use client";

import { fetchData } from "@/lib/api";
import { useEffect, useState } from "react";
import { Article } from "@/Models/ArticleModel";
import Image from "next/image";
import { useAuth } from "@/store/AuthContext";

export default function ArticleList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const auth = useAuth();
  const limit = auth.user.data?.membership?.articles;
  const isLoading = auth.isLoading;
  const isLoginMembership = auth.user.isMembership;
  const isAuthenticated = auth.user.isAuthenticated;

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const articles = await fetchData(`/content/articles?limit=${limit}`);
        setArticles(articles);
      } catch (error) {
        console.error(error);
      }
    };
    if (!isLoading && limit !== undefined) fetchArticles();
  }, [isLoading, limit]);

  if (!isAuthenticated || !isLoginMembership) return <div className="flex justify-center w-full h-screen items-center">401 | Unauthorized</div>;
  return (
    <>
      <div className="flex flex-col w-full h-auto pt-[120px] px-16">
        <h2 className="text-2xl font-semibold mb-5">Articles</h2>
        <div id="article-container" className="flex flex-wrap w-full justify-center">
          {articles.map((article, id) => {
            return (
              <div id="article" key={id} className="flex m-4 w-[360px] shadow-md h-auto rounded-md">
                <div className="relative w-1/4 h-[80px]">
                  <Image src={"/article.jpg"} className="rounded-l-md object-cover object-center" fill alt="article" />
                </div>
                <div className="flex flex-col pl-3 py-2">
                  <div className="text-xl font-semibold">{article.title}</div>
                  <div className="truncate w-[230px]">{article.content}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
