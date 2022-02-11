// react
import { useState } from "react";
import type { ChangeEvent } from "react";
// mui
import { Box, Container, Grid, Typography, Divider, Card, CardMedia, CardContent, Pagination } from "@mui/material";
// project
import Tags from "../Tags";
import Signature from "../Signature";
import { blogTitleStyle, onFetchLatest } from "../assets";
import type { Tag } from "../../../typings/tag";
import type { Props } from "./assets";

const Latest = (props: Props) => {
    const [blogs, setBlogs] = useState(props.blogs)
    const [totalPages, setTotalPages] = useState(props.totalPages)

    const onPageChange = async (event: ChangeEvent<unknown>, page: number) => {
        const result = await onFetchLatest(page)
        setBlogs(result.blogs)
        setTotalPages(result.totalPages)
    }

    return (
        <Box className={props.className}>
            <Container>
                <Grid container spacing={4}>
                    <Grid item xs={8}>
                        <Typography>最近发布的博客</Typography>
                        <Divider className='mt-2.5' />

                        {/* 博客列表 */}
                        {blogs.map((blog) => {
                            const tags = blog.tags as Tag[]

                            return (
                                <Card className='flex mt-7 bg-gray-50' key={blog._id} elevation={0}>
                                    <CardMedia
                                        className='rounded-r'
                                        component='img'
                                        height={150}
                                        image={blog.cover || tags[0]?.cover}
                                        alt='Paella dish'
                                        sx={{
                                            flex: 1
                                        }}
                                    />
                                    <CardContent
                                        className='px-4 self-center'
                                        sx={{
                                            flex: 2
                                        }}
                                    >
                                        <Tags className='mb-3' tags={tags} />
                                        <Typography style={blogTitleStyle}>{blog.title}</Typography>

                                        {/* 博客署名 */}
                                        <Signature className='mt-5' blog={blog} />
                                    </CardContent>
                                </Card>
                            )
                        })}

                        {/* 分页 */}
                        <Pagination className='mt-7' count={totalPages} color='primary' onChange={onPageChange} />
                    </Grid>

                    <Grid item xs={4}>
                        <Typography>最新的评论</Typography>
                        <Divider className='mt-2.5' />

                        {/* 评论列表 */}
                    </Grid>
                    <Grid item xs={4}></Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default Latest