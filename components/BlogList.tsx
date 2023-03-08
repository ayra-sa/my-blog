import Image from "next/image";
import urlFor from "../lib/urlFor";
import ClientSideRoute from "./ClientSideRoute";
// import type { Post } from ''

type BlogListProps = {
  posts: Post[];
};

const BlogList = ({ posts }: BlogListProps) => {
  return (
    <div className="mt-5 pb-10">
      <hr className="py-4" />

      <div className="px-5 md:px-0 flex gap-8 flex-col md:grid md:grid-cols-2">
        {posts.map((post) => (
          <ClientSideRoute key={post._id} route={`post/${post.slug.current}`}>
            <div className="flex flex-col group cursor-pointer">
              <div className="relative h-80 w-full transform-gpu drop-shadow-xl transition-transform duration-200 ease-out group-hover:scale-105">
                <Image
                  className="object-cover object-left lg:object-center"
                  src={urlFor(post.mainImage).url()}
                  alt={post.author.name}
                  fill
                />

                <div className="absolute bottom-0 p-5 flex items-center justify-between bg-neutral-900  backdrop-blur-lg w-full bg-opacity-20 text-white drop-shadow-lg">
                  <div className="w-3/4">
                    <p className="font-bold">{post.title}</p>
                    <p>
                      {new Date(post._createdAt).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex gap-x-2 text-black">
                    {post.categories.map((category) => (
                      <div key={category._id} className="text-white font-bold px-3 py-1 rounded-xl border-2 border-neutral-200">
                        <p>{category.title}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="my-3">
                <p className="font-bold group-hover:underline">{post.title}</p>
                <p className="mt-1">{post.description}</p>
              </div>

              <p className="font-bold underline-offset-1 group-hover:underline">Read post</p>
            </div>
          </ClientSideRoute>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
