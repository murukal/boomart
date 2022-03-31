This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# 减少 HTTP 请求
+ 一个完整的 HTTP 请求需要经历 DNS 查找，TCP 握手，浏览器发出 HTTP 请求，服务器接收请求，服务器处理请求并发回响应，浏览器接收响应等过程
# 使用 HTTP2
+ HTTP2 的优势
# 静态资源使用 CDN
# 使用字体图标 iconfont 代替图片图标
# 善用缓存，不重复加载相同的资源
# 压缩文件
+ JavaScript：UglifyPlugin
+ CSS ：MiniCssExtractPlugin
+ HTML：HtmlWebpackPlugin
# 图片优化
+ 图片懒加载
+ 尽可能利用 CSS3 效果代替图片
# 减少重绘重排
## 浏览器渲染过程
1. 解析HTML生成DOM树
2. 解析CSS生成CSSOM规则树
3. 解析JS，操作 DOM 树和 CSSOM 规则树
4. 将DOM树与CSSOM规则树合并在一起生成渲染树
5. 遍历渲染树开始布局，计算每个节点的位置大小信息
6. 浏览器将所有图层的数据发送给GPU，GPU将图层合成并显示在屏幕上
# 不要覆盖原生方法
1. 无论你的 JavaScript 代码如何优化，都比不上原生方法。因为原生方法是用低级语言写的（C/C++），并且被编译成机器码，成为浏览器的一部分。当原生方法可用时，尽量使用它们，特别是数学运算和 DOM 操作
# 使用 flexbox 而不是较早的布局模型
