import { groq } from "next-sanity"
import { PreviewSuspense } from "next-sanity/preview"
import { previewData } from "next/headers"
import BlogList from "../../components/BlogList"
import PreviewBlogList from "../../components/PreviewBlogList"
import { client } from "../../lib/sanity.client"


const query = groq`
  *[_type == 'post'] {
    ...,
    author->,
    categories[]->
  } | order(_createdAt desc)
`

async function HomePage() {
  if (previewData()) {
    return (
      <PreviewSuspense 
        fallback={
          <div role="status">
            Loading Preview Data...
          </div>
        }>
          <PreviewBlogList query={query} />
      </PreviewSuspense>  
    )
  }

  const posts = await client.fetch(query)

  return (
    <BlogList posts={posts} />
    // <h1 className="text-4xl">not preview mode</h1>
  )
}

export default HomePage