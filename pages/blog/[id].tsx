import MarkdownIt from 'markdown-it'

const Blog = (props: any) => {
  const md = new MarkdownIt()
  const res = md.render(`# markdown-it rulezz!
## sssss`)

  return <div dangerouslySetInnerHTML={{ __html: res }} />
}
export default Blog
