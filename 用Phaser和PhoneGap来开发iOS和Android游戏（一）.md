## 前言 ##
一个月前看到[Phaser](http://phaser.io)这个很简洁漂亮的HTML5 Javascript游戏框架后便有了做一个手游玩玩的念头。半个月前也开始陆陆续续的照着[Phaser官网的教程](http://phaser.io/tutorials/making-your-first-phaser-game)学习Phaser。为什么要写这篇博客呢？完全是为了治愈目前的拖延，督促自己完成目标：

 1. 用**Phaser**开发一个手机游戏
 2. 用**PhoneGap**把游戏打包成Android APP
 3. Android APP在**豌豆荚**上线
 4. 用**PhoneGap**把游戏打包成iOS APP
 5. iOS APP在**AppStore**上线

当然，如果你能从我写的博客里受益，也开发出属于自己的游戏，那就更好了！

## Phaser和PhoneGap简介 ##
先讲讲我们要用到的两个重要工具：**Phaser**和**PhoneGap**。

**Phaser**是一个游戏框架，你可以用它来开发桌面或者手机HTML5网页游戏，开发语言支持JavaScript/TypeScript。教程里面用JavaScript，这个Internet时代最流行的语言。

用Phaser开发出来的其实是一个网页游戏，我们要在AppStore或者Google Play上线必须用原生APP的方式。如果要用Objective-C/Swift来写一个iOS APP，然后再用Java写一个Android APP才能上线我们的游戏，那成本太高了，维护两套不同的代码也是很头痛的。于是，我们需要PhoneGap。

**PhoneGap**其实就是一个打包软件，它可以把你用HTML/CSS/JavaScript写的网页应用（Web APP）直接打包成iPhone/Android/WindowsPhone的原生APP。一套代码，直接生成多种平台的原生APP，相当的酷！

## 准备工作 ##

APP开发当然用MacBook最好，因为iOS版的游戏APP必须在MacBook电脑上用PhoneGap打包，此外MacBook也可以打包Android APP。如果你没有MacBook也没有关系，准备一台能上网的Windows PC就可以了。用Windows PC我们至少可以做到开发Android APP并上线（目标的第3步）。

**你需要准备:**

- 能上网的Windows PC
- 在Windows PC上安装[Python 2.7.x for Windows](https://www.python.org/downloads/) （用来做HTTP server）

## 开始行动 ##
激动人心的时刻到了，让我们开始着手**目标1**：**用Phaser开发一个手机游戏**。

### 游戏的策划 ###
开发一个游戏，想想还真是不简单。







