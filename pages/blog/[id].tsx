// next
import type { GetServerSideProps } from 'next'
import { getBlogById } from '../../apis/blog'
import { Blog } from '../../typings/blog'
// third
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

interface Props {
  blog: Blog | null
}

const Blog = (props: Props) => {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
      {props.blog?.content || ''}
    </ReactMarkdown>
  )
}

export default Blog

export const getServerSideProps: GetServerSideProps<Props> = async ({ query }) => {
  const res = await getBlogById(query.id as string)

  return {
    props: {
      blog: res.data
    }
  }
}
