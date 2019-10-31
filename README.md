# Js抽奖插件

抽奖组件    
使用场景：PC端和移动端    
浏览器兼容情况：    
方形抽奖：IE7/IE8/IE9/IE10/IE11/CHROME/FIREFOX/SAFARI 等浏览器   
圆形抽奖：暂不支持IE8及以下版本   

组件分两个版本 
lottery.js 和下面的 cdn 是 来自腾讯 TGideas 团队的原版作品，用于快速集成使用。
lottery.lite.es6 是我再实际使用场景下，精简官方组件只保留最基础的抽奖跑马效果，具体展现效果由开发者自由展现。

官方组件的案例请参考

lite组件的案例请参考
```ecmascript 6
let lottery = new Lottery({
    'total': 8,//默认为8个奖品，非8个奖品的需要修改源码定义跑马效果
    'onCompleteRollEvent': function() {
      // 抽奖动画结束动作
    },
    'onChange': function(key) {
        // 抽奖时跑动效果ID 默认为8个奖品顺时针跑动
    },
});
lottery.stopRoll(key);
```


组件CDN：

    <script src="//game.gtimg.cn/images/js/delottery/lottery.js"></script>
