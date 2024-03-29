import { GetStaticProps, InferGetStaticPropsType } from 'next'
import path from 'path'
import { readFileSync } from 'fs'
import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { Author } from '@/lib/author/interfaces/author.interface'
import { processContent } from '@/lib/mdx'

const DEFAULT_LAYOUT = 'AuthorLayout'

type Props = {
  frontMatter: Author
  mdxSource: string
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const filePath = path.join(process.cwd(), 'data', 'authors', 'default.md')
  const source = readFileSync(filePath, 'utf-8').toString()
  const { mdxSource, frontMatter } = (await processContent(source)) as {
    mdxSource: string
    frontMatter: Author
  }
  return {
    props: { frontMatter, mdxSource },
  }
}

export default function About({
  frontMatter,
  mdxSource,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <MDXLayoutRenderer layout={DEFAULT_LAYOUT} mdxSource={mdxSource} authorDetails={frontMatter} />
  )
}
