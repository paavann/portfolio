import { useEffect, useState } from "react";
import { fetchBlogs } from "../lib/api";
import type { Blog } from "../types/blog";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ArrowRight } from "phosphor-react";

export default function Blogs() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBlogs().then(res => {
            setBlogs(res.blogs.slice(0, 3));
            setLoading(false);
        }).catch(err => {
            console.error(err);
            setLoading(false);
        });
    }, []);

    return (
        <div className="w-full bg-[rgb(0_21_36)] p-5 sm:p-7 lg:p-10 flex flex-col gap-7 sm:gap-10">
            <div className="p-3 sm:p-5 h-fit w-full gap-4 sm:gap-7 flex flex-col">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl text-white font-extrabold">blogs.</h1>
                <h2 className="text-lg sm:text-2xl lg:text-3xl text-white font-extrabold">
                    Sharing my thoughts, experiences, and technical insights.
                </h2>
            </div>

            {loading ? (
                <div className="text-white px-3 sm:px-5 text-lg sm:text-xl font-extrabold">Loading...</div>
            ) : (
                <div className="w-full flex flex-wrap gap-5 sm:gap-7 lg:gap-10 mt-2 sm:mt-5 px-2 sm:px-5">
                    {blogs.map((blog) => (
                        <Link to={`/blogs/${blog.slug}`} key={blog.id} className="w-full md:w-[45%] lg:w-[30%]">
                            <Card className="h-full border-[#F2F2F2] border-4 sm:border-5 cursor-pointer transition-all duration-300 ease-in-out hover:scale-105 hover:border-[#35D399] py-0 bg-transparent group flex flex-col justify-between">
                                <div>
                                    <CardHeader className="flex flex-col gap-2 p-4 sm:p-5">
                                        <h2 className="text-xl sm:text-2xl font-extrabold text-white group-hover:text-[rgb(53_211_153)] transition-colors">
                                            {blog.title}
                                        </h2>
                                        <span className="text-xs sm:text-sm text-gray-300 font-bold">
                                            {new Date(blog.publishedAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </span>
                                    </CardHeader>

                                    <CardContent className="flex flex-col pl-4 pr-4 pb-4 sm:pl-5 sm:pr-5 sm:pb-5">
                                        <p className="text-sm sm:text-md font-medium text-gray-200 line-clamp-3">
                                            {blog.summary}
                                        </p>
                                    </CardContent>
                                </div>

                                <CardContent className="h-fit flex bg-white group-hover:bg-[rgb(53_211_153)] transition-colors duration-300 p-2 sm:p-3 mb-0 flex-row flex-wrap gap-2 mt-auto rounded-b-[calc(var(--radius)-4px)]">
                                    {blog.tags?.map((tag) => (
                                        <div key={tag} className="bg-[rgb(0_21_36)] rounded-md p-1 px-2 sm:px-3 w-fit">
                                            <h3 className="self-center text-white text-xs font-extrabold">{tag}</h3>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            )}

            <div className="w-full flex justify-center mt-3 sm:mt-5">
                {blogs.length > 3 && (
                    <Link to="/blogs" className="group flex items-center gap-2 bg-[rgb(53_211_153)] text-[rgb(0_21_36)] px-5 py-3 sm:px-8 sm:py-4 rounded-full font-extrabold text-lg sm:text-xl transition-colors duration-300">
                        Explore more <ArrowRight size={20} weight="bold" className="sm:!w-6 sm:!h-6 group-hover:translate-x-2 transition-transform" />
                    </Link>
                )}
            </div>
        </div>
    )
}