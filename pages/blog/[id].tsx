import MarkdownIt from 'markdown-it'
// next
import type { GetServerSideProps } from 'next'
import { getBlogById } from '../../apis/blog'
import { Blog } from '../../typings/blog'

interface Props {
  blog: Blog | null
}

const Blog = (props: Props) => {
  const md = new MarkdownIt()
  const content = md.render(props.blog?.content || '')

  return <div dangerouslySetInnerHTML={{ __html: content }} />
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
