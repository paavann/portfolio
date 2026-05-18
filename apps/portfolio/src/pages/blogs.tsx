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
            setBlogs(res.blogs.slice(0, 6));
            setLoading(false);
        }).catch(err => {
            console.error(err);
            setLoading(false);
        });
    }, []);

    return (
        <div className="w-full bg-[rgb(0_21_36)] p-10 flex flex-col gap-10">
            <div className="p-5 h-fit w-full gap-7 flex flex-col">
                <h1 className="text-5xl text-white font-extrabold">blogs.</h1>
                <h2 className="text-3xl text-white font-extrabold">
                    Sharing my thoughts, experiences, and technical insights.
                </h2>
            </div>

            {loading ? (
                <div className="text-white px-5 text-xl font-extrabold">Loading...</div>
            ) : (
                <div className="w-full flex flex-wrap gap-10 mt-5 px-5">
                    {blogs.map((blog) => (
                        <Link to={`/blogs/${blog.slug}`} key={blog.id} className="w-full md:w-[45%] lg:w-[30%]">
                            <Card className="h-full border-[#F2F2F2] border-5 cursor-pointer transition-all duration-300 ease-in-out hover:scale-105 hover:border-[#35D399] py-0 bg-transparent group flex flex-col justify-between">
                                <div>
                                    <CardHeader className="flex flex-col gap-2 p-5">
                                        <h2 className="text-2xl font-extrabold text-white group-hover:text-[rgb(53_211_153)] transition-colors">
                                            {blog.title}
                                        </h2>
                                        <span className="text-sm text-gray-300 font-bold">
                                            {new Date(blog.publishedAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </span>
                                    </CardHeader>
                                    
                                    <CardContent className="flex flex-col pl-5 pr-5 pb-5">
                                        <p className="text-md font-medium text-gray-200 line-clamp-3">
                                            {blog.summary}
                                        </p>
                                    </CardContent>
                                </div>

                                <CardContent className="h-fit flex bg-white group-hover:bg-[rgb(53_211_153)] transition-colors duration-300 p-3 mb-0 flex-row flex-wrap gap-2 mt-auto rounded-b-[calc(var(--radius)-4px)]">
                                    {blog.tags?.map((tag) => (
                                        <div key={tag} className="bg-[rgb(0_21_36)] rounded-md p-1 px-3 w-fit">
                                            <h3 className="self-center text-white text-xs font-extrabold">{tag}</h3>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            )}

            <div className="w-full flex justify-center mt-5">
                {blogs.length > 3 && (
                    <Link to="/blogs" className="group flex items-center gap-2 bg-[rgb(53_211_153)] text-[rgb(0_21_36)] px-8 py-4 rounded-full font-extrabold text-xl transition-colors duration-300">
                        Explore more <ArrowRight size={24} weight="bold" className="group-hover:translate-x-2 transition-transform" />
                    </Link>
                )}
            </div>
        </div>
    )
}