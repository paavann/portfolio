import type { NotionBlock, RichText } from "../../types/blog";

function TextRenderer({ textArray }: { textArray: RichText[] }) {
    if (!textArray || textArray.length === 0) return null;

    return (
        <>
            {textArray.map((text, idx) => {
                let className = "";
                if (text.annotations.bold) className += " font-bold";
                if (text.annotations.italic) className += " italic";
                if (text.annotations.strikethrough) className += " line-through";
                if (text.annotations.underline) className += " underline";
                if (text.annotations.code) className += " font-mono bg-gray-800 text-[rgb(53_211_153)] px-1.5 py-0.5 rounded text-sm";

                if (text.href) {
                    return (
                        <a key={idx} href={text.href} target="_blank" rel="noopener noreferrer" className={`text-[rgb(53_211_153)] hover:text-white underline ${className}`}>
                            {text.plain_text}
                        </a>
                    );
                }

                return (
                    <span key={idx} className={className}>
                        {text.plain_text}
                    </span>
                );
            })}
        </>
    );
}

export function BlockRenderer({ block }: { block: NotionBlock }) {
    switch (block.type) {
        case "heading_1":
            return <h1 className="text-4xl font-extrabold text-white mt-12 mb-6"><TextRenderer textArray={block.heading_1?.rich_text || []} /></h1>;
        case "heading_2":
            return <h2 className="text-3xl font-extrabold text-white mt-10 mb-4"><TextRenderer textArray={block.heading_2?.rich_text || []} /></h2>;
        case "heading_3":
            return <h3 className="text-2xl font-bold text-white mt-8 mb-3"><TextRenderer textArray={block.heading_3?.rich_text || []} /></h3>;
        case "paragraph":
            return <p className="text-lg text-gray-200 leading-relaxed mb-6 font-medium"><TextRenderer textArray={block.paragraph?.rich_text || []} /></p>;
        case "bulleted_list_item":
            return <li className="text-lg text-gray-200 ml-6 list-disc mb-2 font-medium"><TextRenderer textArray={block.bulleted_list_item?.rich_text || []} /></li>;
        case "numbered_list_item":
            return <li className="text-lg text-gray-200 ml-6 list-decimal mb-2 font-medium"><TextRenderer textArray={block.numbered_list_item?.rich_text || []} /></li>;
        case "image":
            const imageUrl = block.image?.type === 'external' ? block.image.external?.url : block.image?.file?.url;
            return imageUrl ? (
                <div className="my-10 w-full flex flex-col items-center">
                    <img src={imageUrl} alt="Blog image" className="rounded-xl w-full object-cover max-h-[600px] border border-gray-800" />
                    {block.image?.caption && block.image.caption.length > 0 && (
                        <p className="text-center text-sm text-gray-400 mt-3 italic">
                            <TextRenderer textArray={block.image.caption} />
                        </p>
                    )}
                </div>
            ) : null;
        case "child_page":
            if (block.child_page?.title === "Original Draft Archive") return null;
            return <div className="p-5 bg-gray-900 rounded-lg my-6 text-[rgb(53_211_153)] font-semibold border border-gray-800 flex items-center gap-3">
                <span className="text-xl">↳</span> {block.child_page?.title}
            </div>;
        default:
            return null;
    }
}
