import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchBlog } from "../lib/api";
import type { Blog } from "../types/blog";
import Header from "../components/header";
import { BlockRenderer } from "../components/blog/block-renderer";

export default function BlogPost() {
    const { slug } = useParams<{ slug: string }>();
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (!slug) return;
        
        fetchBlog(slug).then(res => {
            setBlog(res.blog);
            setLoading(false);
        }).catch(err => {
            console.error(err);
            setLoading(false);
        });
    }, [slug]);

    return (
        <div className="w-screen min-h-screen bg-[rgb(0_21_36)] flex flex-col pt-[15vh] overflow-x-hidden">
            <Header isBlogPage={true} />
            
            <div className="w-full max-w-4xl mx-auto px-4 sm:px-5 md:px-10 py-5 sm:py-10 flex flex-col">
                {loading ? (
                    <div className="text-white text-lg sm:text-xl font-extrabold animate-pulse">Loading...</div>
                ) : !blog ? (
                    <div className="text-white text-lg sm:text-xl font-extrabold">Blog not found.</div>
                ) : (
                    <article className="flex flex-col w-full pb-10 sm:pb-20">
                        {blog.cover && (
                            <img src={blog.cover} alt="Cover" className="w-full h-48 sm:h-64 md:h-96 object-cover rounded-xl sm:rounded-2xl mb-6 sm:mb-10 shadow-lg border border-gray-800" />
                        )}
                        
                        <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
                            {blog.tags?.map(tag => (
                                <span key={tag} className="bg-[rgb(53_211_153)] text-[rgb(0_21_36)] rounded-md px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-extrabold">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-extrabold mb-5 sm:mb-8 leading-tight tracking-tight">
                            {blog.title}
                        </h1>

                        <div className="text-gray-400 font-bold mb-8 sm:mb-12 pb-5 sm:pb-8 border-b border-gray-800 flex items-center gap-4 text-sm sm:text-base">
                            <span>Published on {new Date(blog.publishedAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}</span>
                        </div>

                        <div className="flex flex-col w-full font-sans">
                            {blog.blocks?.map(block => (
                                <BlockRenderer key={block.id} block={block} />
                            ))}
                        </div>
                    </article>
                )}
            </div>
        </div>
    );
}
