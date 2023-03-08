import { PortableText } from "@portabletext/react";
import { groq } from "next-sanity";
import Image from "next/image";
import { RichTextComponent } from "../../../../components/RichTextComponent";
import { client } from "../../../../lib/sanity.client";
import urlFor from "../../../../lib/urlFor";

type Props = {
  params: {
    slug: string;
  };
};

export const revalidate = 30

export async function generateStaticParams() {
    const query = groq`*[_type=='post']
    {
        slug
    }`

    const slugs: Post[] = await client.fetch(query)
    const slugRoutes = slugs.map(slug => slug.slug.current)

    return slugRoutes.map(slug => ({
        slug,
    }))
}

async function Post({ params: { slug } }: Props) {
  const query = groq`
        *[_type=='post' && slug.current == $slug][0]
        {
            ...,
            author->,
            categories[]->
        }
    `;

  const post: Post = await client.fetch(query, { slug });

  return (
    <article className="mt-4 pb-10">
      <hr className="py-4" />
      <div className="relative">
        <Image
          // className="object-cover object-left lg:object-center"
          src={urlFor(post.mainImage).url()}
          alt={post.author.name}
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-full"
          priority
        />
      </div>

      <section className="mt-3">
        <h1 className="font-bold text-3xl">{post.title}</h1>

        <div className="flex items-center justify-between my-4">
          <div className="flex items-center gap-x-3">
            <Image
              className="rounded-full"
              src={urlFor(post.author.image).url()}
              alt={post.author.name}
              height={35}
              width={35}
            />

            <div>
              <h3>{post.author.name}</h3>
            </div>
          </div>

          <p>
            {new Date(post._createdAt).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>

        <div className="max-w-4xl">
          <h2>{post.description}</h2>
          <div className="mt-3">
            {post.categories.map((category) => (
              <p className="font-semibold border-2 border-neutral-600 px-4 inline">{category.title}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-4xl mt-5">
        <PortableText value={post.body} components={RichTextComponent} />
      </section>
    </article>
  );
}

export default Post;
