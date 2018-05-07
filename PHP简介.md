# PHP简介

### PHP 是什么

PHP（全称 **Hypertext Preprocessor**，超文本预处理器的字母缩写）是一种服务器端脚本语言，它可嵌入到 HTML 中，尤其适合 WEB 开发。

```HTML

<html>
  <head>
    <title>PHP简介</title>
  </head>

  <body>
    <p>
    <?php echo 'Hello World!';?>
    </p>
  </body>
</html>


```

其中被 `<?php 和 ?> `包围的内容即是 PHP 程序，在装了 PHP 解释器的服务端运行该文件时，PHP 程序能够被解析到 HTML 页面中，上例中结果为

```html 

<html>
  <head>
    <title>PHP简介</title>
  </head>

  <body>
    <p>
    Hello World!
    </p>
  </body>
</html>

```




