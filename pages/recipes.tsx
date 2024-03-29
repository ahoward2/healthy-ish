import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import { PageSEO } from '@/components/SEO'
import { getAllPostsFrontMatter } from '@/lib/notion/operations'
import { databaseId } from '@/lib/notion/client'
import { PageMetaData } from '@/lib/recipes/interfaces/recipe-metadata.interface'

export const POSTS_PER_PAGE = 5

type Props = {
  posts: PageMetaData[]
  initialDisplayPosts: PageMetaData[]
  pagination: {
    currentPage: number
    totalPages: number
  }
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ res }) => {
  res.setHeader('Cache-Control', 'public, s-maxage=3300, stale-while-revalidate=3300')
  const posts = await getAllPostsFrontMatter(databaseId)
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return { props: { initialDisplayPosts, posts, pagination } }
}

export default function Recipes({
  posts,
  initialDisplayPosts,
  pagination,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <PageSEO title={`Recipes - ${siteMetadata.author}`} description={siteMetadata.description} />
      <ListLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="All Recipes"
      />
    </>
  )
}
