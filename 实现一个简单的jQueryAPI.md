# 实现一个简单的jQuery API

jQuery是一个快速、简洁的JavaScript框架,jQuery设计的宗旨是“write Less，Do More”，即倡导写更少的代码，做更多的事情,下面我们模仿jQuery风格,实现一个简单的jQuery API

## $()

### jQuery是什么?

jQuery是一个由原生JavaScript开发的库,并不是一门独立的语言,其本质是一个函数,函数名为jQuery,`$`符号是这个函数的简写

```HTML
	<ul>
	    <li>1</li>
	    <li>2</li>
	</ul>
```
比如我们想获取`ul`下面的`li` 就可以写成这样`$('ul > li')`,最终得到的是一个对象,其包含获取到的元素属性以及jQuery的原型(prototype)

### 实现$()

下面我们来实现一个基本的`$()`方法:

```JavaScript
window.jQuery = function(ele) {
  return {
    0: document.querySelectorAll(ele)
  }

}
window.$ = jQuery
```

`$()`的本质是利用DOM API来获取选中的元素,并将其包装成对象返回

```
console.dir($('ul > li'))
```
我们调用一下刚刚封装的方法将会选中`li`元素

## addClass() 和 setText()
利用刚才的思路,我们再添加两个比较常用的方法,一个是添加class, 一个是设置text,我们在刚才的基础上再继续改造一下:

```JavaScript
window.jQuery = function(ele) {
  return {
    0: document.querySelectorAll(ele) ,
    
    addClass: function(classes){
		document.querySelectorAll(ele).forEach(element=>element.classList.add(classes))
    } ,
    
    setText: function(text) {
       document.querySelectorAll(ele).forEach(element=>element.textContent = text)
    }
  }

}
window.$ = jQuery
```

下面我们调用`addClass()` 和 `setText()` 方法就能改变元素的class以及text

``` JavaScript
var $div = $('div')
$div.addClass('red') 
$div.setText('hi') 
```

## jQuery的链式调用

jQuery 还有一个很好用的功能就是支持链式编程,它可以一直连续调用方法,从而提高我们的开发效率

jQuery链式调用的本质其实就是使其每一个方法的返回值为this,我们将上面的代码再改造一下,以支持链式调用

```JavaScript
window.jQuery = function(ele) {
  return {
    0: document.querySelectorAll(ele) ,
    
    addClass: function(classes){
			document.querySelectorAll(ele).forEach(element=>element.classList.add(classes))
			     return this 

    } ,
    
    setText: function(text) {
       document.querySelectorAll(ele).forEach(element=>element.textContent = text)
            return this 

    }
  }

}
window.$ = jQuery
```

这样我们直接执行`$('ul > li').addClass('red').setText("text")`就能既添加class又能设置text了















