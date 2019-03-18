## http

## cookie
## session
## locastroage
## http1和http2
## tcp三次握手
- 建立连接前，客户端和服务端需要通过握手来确认对方
- 客户端发送 => 服务端接收并确认=>客户端接收并发送
## TCP四次挥手
客户端=>服务端=>客户端=>服务端
## 缓存
## 从输入 URL 到页面展现中间发生了什么？
- DNS 查询 DNS 缓存
- 建立 TCP 连接（三次握手）连接复用
- 发送 HTTP 请求（请求的四部分）
- 后台处理请求
- 监听 80 端口
- 路由
- 渲染 HTML 模板
- 生成响应
- 发送 HTTP 响应
- 关闭 TCP 连接（四次挥手）
- 解析 HTML
- 下载 CSS（缓存
- 解析 CSS
- 下载 JS（缓存
- 解析 JS
- 下载图片
- 解析图片
- 渲染 DOM 树
- 渲染样式树
- 执行 JS
## 状态码
- 200 OK   正常返回信息
- 201 Created  请求成功并且服务器创建了新的资源
- 202 Accepted  服务器已接受请求，但尚未处理
- 301 Moved Permanently  请求的网页已永久移动到新位置
- 302 Found  临时性重定向
- 303 See Other  临时性重定向，且总是使用 GET 请求新的 URI
- 304 Not Modified  自从上次请求后，请求的网页未修改过
- 400 Bad Request  服务器无法理解请求的格式，客户端不应当尝试再次使用相同的内容发起请求
- 401 Unauthorized  请求未授权
- 403 Forbidden  禁止访问
- 404 Not Found  找不到如何与 URI 相匹配的资源
- 500 Internal Server Error  最常见的服务器端错误