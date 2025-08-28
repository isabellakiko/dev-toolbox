# 开发者工具箱 - Developer Toolbox

<div align="center">

![Developer Toolbox](https://img.shields.io/badge/Developer-Toolbox-blue?style=for-the-badge&logo=tools)
![Version](https://img.shields.io/badge/version-1.0.0-green?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-yellow?style=for-the-badge)
![PWA](https://img.shields.io/badge/PWA-Ready-purple?style=for-the-badge)

专业的开发者工具集合，包含各种实用的开发工具，提升工作效率

[在线体验](https://kaylonchan.com/dev-toolbox/) • [功能介绍](#功能特性) • [使用指南](#使用指南) • [技术文档](#技术架构)

</div>

## 📚 目录

- [功能特性](#功能特性)
- [快速开始](#快速开始)
- [详细功能](#详细功能)
- [技术架构](#技术架构)
- [部署指南](#部署指南)
- [开发贡献](#开发贡献)
- [常见问题](#常见问题)
- [更新日志](#更新日志)

## ✨ 功能特性

### 🔧 核心工具
- **GUID/UUID生成器** - 支持v1、v4、v5多种格式
- **密码生成器** - 自定义规则的安全密码生成
- **随机数据生成器** - 数字、字符串、颜色、IP、MAC地址
- **哈希/编码工具** - MD5、SHA1、SHA256、Base64、URL编码
- **时间戳转换器** - 时间戳与日期时间相互转换
- **文本处理工具** - 大小写转换、去重、排序、统计

### 🚀 产品特色
- ✅ **现代化界面** - 深色主题，响应式设计
- ✅ **离线可用** - PWA支持，无网络也能使用
- ✅ **一键复制** - 所有结果支持快速复制
- ✅ **历史记录** - 自动保存操作历史
- ✅ **键盘快捷键** - 高效的操作体验
- ✅ **移动端优化** - 完美的移动端体验
- ✅ **无依赖** - 纯原生JavaScript实现
- ✅ **隐私安全** - 本地处理，数据不上传

## 🚀 快速开始

### 在线使用
直接访问：[https://kaylonchan.com/dev-toolbox/](https://kaylonchan.com/dev-toolbox/)

### 本地部署
```bash
# 克隆项目
git clone https://github.com/username/dev-toolbox.git

# 进入目录
cd dev-toolbox

# 使用任意HTTP服务器运行
# 方法1: 使用Python
python -m http.server 8000

# 方法2: 使用Node.js
npx http-server -p 8000

# 方法3: 使用Live Server (VS Code插件)
# 直接右键index.html选择"Open with Live Server"

# 访问 http://localhost:8000
```

### PWA安装
1. 在Chrome等现代浏览器中访问网站
2. 点击地址栏的"安装"图标
3. 或者在菜单中选择"安装开发者工具箱"
4. 安装后可在桌面或应用列表中找到

## 🛠️ 详细功能

### 1. GUID/UUID生成器
生成全球唯一标识符，支持多种版本和格式：

**支持的版本：**
- **UUID v1** - 基于时间戳和MAC地址
- **UUID v4** - 基于随机数（推荐）
- **UUID v5** - 基于命名空间和名称

**输出格式：**
- 标准格式：`550e8400-e29b-41d4-a716-446655440000`
- 简单格式：`550e8400e29b41d4a716446655440000`
- 大写格式：`550E8400-E29B-41D4-A716-446655440000`
- 花括号格式：`{550e8400-e29b-41d4-a716-446655440000}`

**使用场景：**
- 数据库主键
- 文件名唯一标识
- API请求ID
- 分布式系统节点ID

### 2. 密码生成器
生成强度可控的安全密码：

**配置选项：**
- 密码长度：4-128位
- 字符类型：大写字母、小写字母、数字、特殊字符
- 排除易混淆字符：0oO1lI等
- 批量生成：1-10个密码

**强度评估：**
- 实时显示密码强度等级
- 弱/中等/强/非常强四个级别
- 基于长度和字符复杂度评估

**使用场景：**
- 用户账户密码
- API密钥生成
- 临时访问令牌
- 数据库连接密码

### 3. 随机数据生成器
生成各种类型的随机测试数据：

**数字生成：**
- 自定义范围：最小值到最大值
- 批量生成：1-100个数字
- 整数随机分布

**字符串生成：**
- 自定义长度：1-50位
- 字母数字组合
- 适合作为测试数据

**颜色生成：**
- HEX格式：#ffffff
- RGB格式：rgb(255, 255, 255)
- HSL格式：hsl(360, 100%, 50%)
- 可视化颜色预览

**网络数据：**
- IP地址：192.168.1.1
- MAC地址：AA:BB:CC:DD:EE:FF
- 端口号：1-65535

**使用场景：**
- 软件测试数据
- 用户界面占位符
- API测试参数
- 数据库填充

### 4. 哈希/编码工具
文本加密和编码转换：

**哈希算法：**
- **MD5** - 128位散列值（不推荐用于安全）
- **SHA1** - 160位散列值
- **SHA256** - 256位散列值（推荐）

**编码转换：**
- **Base64编码/解码** - 文本与Base64互转
- **URL编码/解码** - 处理URL特殊字符
- **支持中文** - 正确处理UTF-8编码

**使用场景：**
- 密码存储验证
- 文件完整性校验
- API签名生成
- 数据传输编码

### 5. 时间戳转换器
时间格式的相互转换：

**转换方向：**
- 时间戳 → 日期时间
- 日期时间 → 时间戳
- 当前时间实时显示

**支持格式：**
- Unix时间戳（秒/毫秒）
- ISO 8601格式
- 本地化日期时间
- 标准时间字符串

**实时功能：**
- 当前时间自动更新
- 多种格式同时显示
- 一键复制任意格式

**使用场景：**
- 日志分析
- 数据库时间字段
- API时间参数
- 性能分析

### 6. 文本处理工具
强大的文本批处理功能：

**格式转换：**
- 大写/小写转换
- 首字母大写
- 文本反转

**内容处理：**
- 移除空格
- 行去重
- 行排序

**统计分析：**
- 字符数统计（含/不含空格）
- 单词数统计
- 行数统计
- 段落数统计

**使用场景：**
- 文档格式化
- 数据清理
- 内容分析
- 文本预处理

## 🏗️ 技术架构

### 前端技术栈
```
├── HTML5 - 语义化结构
├── CSS3 - 现代化样式
│   ├── CSS变量系统
│   ├── Flexbox & Grid布局
│   ├── 响应式媒体查询
│   └── 深色主题设计
├── JavaScript ES6+ - 核心功能
│   ├── 类和模块化设计
│   ├── async/await异步处理
│   ├── Web Crypto API
│   └── Clipboard API
└── PWA - 渐进式Web应用
    ├── Service Worker
    ├── Web App Manifest
    └── 离线缓存策略
```

### 核心类设计
```javascript
class DevToolbox {
    constructor()     // 应用初始化
    init()           // 事件绑定和配置
    switchTool()     // 工具切换
    generateGuid()   // GUID生成
    generatePassword() // 密码生成
    processHashEncode() // 哈希编码处理
    // ... 更多方法
}
```

### 数据流架构
```
用户操作 → 事件处理 → 数据处理 → 结果展示 → 历史记录
    ↓         ↓         ↓         ↓         ↓
  DOM事件   参数验证   核心算法   界面更新   本地存储
```

### 响应式设计
```css
/* 断点系统 */
1024px+ : 桌面端 - 完整侧边栏布局
768px-1024px : 平板 - 中等屏幕优化
768px- : 移动端 - 折叠式导航
480px- : 小屏 - 紧凑布局
```

## 🌟 高级特性

### 键盘快捷键
- `Ctrl/Cmd + 1-6` - 快速切换工具
- `Ctrl/Cmd + H` - 打开/关闭历史记录
- `Ctrl/Cmd + T` - 切换主题
- `ESC` - 关闭弹出面板

### 历史记录系统
- 自动保存所有操作结果
- 本地存储，隐私安全
- 点击历史项快速复制
- 支持清空历史记录
- 限制100条记录防止存储溢出

### 主题系统
- 深色主题（默认）
- 浅色主题
- 自动保存用户偏好
- 平滑的主题切换动画

### 通知系统
- 成功/错误/警告通知
- 自动消失机制
- 非阻塞式提示
- 响应式位置调整

## 📱 移动端优化

### 触摸友好
- 最小44px点击区域
- 触摸反馈动画
- 防止误触设计

### 性能优化
- 按需加载内容
- 虚拟滚动
- 图片懒加载
- 最小化重排重绘

### 用户体验
- 原生应用感受
- 流畅的页面切换
- 离线可用
- 添加到主屏幕

## 🚀 部署指南

### 静态部署
适用于GitHub Pages、Netlify、Vercel等：

```bash
# 1. 上传所有文件到静态托管服务
# 2. 确保服务器支持HTTPS（PWA要求）
# 3. 配置正确的MIME类型

# Netlify _headers文件
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin

/manifest.json
  Content-Type: application/manifest+json

/sw.js
  Content-Type: application/javascript
```

### 服务器部署
使用Nginx或Apache：

```nginx
# Nginx配置示例
server {
    listen 443 ssl http2;
    server_name your-domain.com;
    
    # SSL配置...
    
    location / {
        root /path/to/dev-toolbox;
        index index.html;
        try_files $uri $uri/ /index.html;
        
        # PWA缓存策略
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
        
        location /manifest.json {
            add_header Content-Type application/manifest+json;
        }
        
        location /sw.js {
            add_header Content-Type application/javascript;
            expires 0;
            add_header Cache-Control "no-cache, no-store, must-revalidate";
        }
    }
}
```

### CDN优化
```javascript
// 可选的CDN配置
const CDN_RESOURCES = {
    'font-awesome': 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css'
};
```

## 🤝 开发贡献

### 开发环境设置
```bash
# 1. 克隆项目
git clone https://github.com/username/dev-toolbox.git
cd dev-toolbox

# 2. 安装开发工具（可选）
npm install -g live-server

# 3. 启动开发服务器
live-server --port=8080

# 4. 开始开发
```

### 代码规范
- 使用ES6+语法
- 遵循语义化HTML
- CSS使用BEM命名规范
- JavaScript使用驼峰命名
- 添加适当的注释

### 提交规范
```bash
# 功能开发
git commit -m "feat: 添加新的工具功能"

# Bug修复
git commit -m "fix: 修复复制功能在Safari中的问题"

# 文档更新
git commit -m "docs: 更新使用说明"

# 样式调整
git commit -m "style: 优化移动端布局"
```

### 测试清单
- [ ] 桌面端Chrome/Firefox/Safari测试
- [ ] 移动端iOS Safari/Android Chrome测试
- [ ] PWA安装和离线功能测试
- [ ] 所有工具功能验证
- [ ] 响应式布局检查
- [ ] 键盘快捷键测试

## ❓ 常见问题

### Q: 生成的数据是否安全？
A: 所有数据都在本地浏览器中处理，不会上传到服务器，确保隐私安全。

### Q: 为什么某些哈希算法不能用？
A: 部分算法需要HTTPS环境和现代浏览器支持Web Crypto API。

### Q: 移动端为什么有些功能受限？
A: 某些功能（如复制到剪贴板）需要安全上下文（HTTPS）才能正常工作。

### Q: 如何添加新的工具？
A: 参考现有工具的实现，在HTML中添加界面，在CSS中添加样式，在JavaScript中实现逻辑。

### Q: 支持哪些浏览器？
A: 支持所有现代浏览器，包括Chrome 70+, Firefox 65+, Safari 12+, Edge 79+。

## 📋 更新日志

### v1.0.0 (2025-01-21)
- ✨ 初始版本发布
- ✅ 实现6大核心工具模块
- ✅ 完整的PWA支持
- ✅ 响应式设计
- ✅ 深色主题
- ✅ 历史记录功能
- ✅ 键盘快捷键
- ✅ 一键复制功能

### 计划功能
- [ ] 颜色选择器工具
- [ ] JSON格式化工具
- [ ] 二维码生成器
- [ ] 文件哈希计算
- [ ] 正则表达式测试
- [ ] 浅色主题优化

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🙏 致谢

- [Font Awesome](https://fontawesome.com/) - 图标库
- [MDN Web Docs](https://developer.mozilla.org/) - 技术文档
- [PWA Builder](https://www.pwabuilder.com/) - PWA指南

## 📞 联系方式

- 作者：Stephen Chan
- 邮箱：stephen@kaylonchan.com
- 网站：[kaylonchan.com](https://kaylonchan.com)
- GitHub：[@stephenchan](https://github.com/stephenchan)

---

<div align="center">
  
**如果这个项目对你有帮助，请给个 ⭐ Star！**

Made with ❤️ by Stephen Chan

</div>