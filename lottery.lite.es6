/*
* @Author: lyushine
* @Date:   2017-05-25 17:06:20
* @Last Modified time: 2018-01-11 15:12:11
* @Last Modified For  Yanlongli<ahlyl94@gmail.com> 2019年10月31日 精简功能，由调用自身处理
*/
function Lottery(option) {
    let _private = {
        myBrowser: function () {
            let userAgent = window.navigator.userAgent; //取得浏览器的userAgent字符串
            let isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
            let isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
            let isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
            let isSafari = userAgent.indexOf("Safari") > -1; //判断是否Safari浏览器
            if (userAgent.indexOf("Edge") > -1) {
                return "edge";
            }
            if (isIE) {
                let IE55, IE6, IE7, IE8, IE9;
                let reIE = new RegExp("MSIE (\\d+\\.\\d+);");
                reIE.test(userAgent);
                let fIEVersion = parseFloat(RegExp["$1"]);
                IE55 = fIEVersion === 5.5;
                IE6 = fIEVersion === 6.0;
                IE7 = fIEVersion === 7.0;
                IE8 = fIEVersion === 8.0;
                IE9 = fIEVersion === 9.0;
                if (IE55) {
                    return "IE55";
                }
                if (IE6) {
                    return "IE6";
                }
                if (IE7) {
                    return "IE7";
                }
                if (IE8) {
                    return "IE8";
                }
                if (IE9) {
                    return "IE9";
                }
            }//isIE end
            if (isFF) {
                return "FF";
            }
            if (isOpera) {
                return "Opera";
            }
        },
        /**
         * 在指定范围中获取一个随机数
         * @param  {number} min 最小值
         * @param  {number} max 最大值
         * @return {number}     获取到的随机值
         */
        random: function (min, max) {
            return Math.floor(min + Math.random() * (max - min));
        }
    };


    let _static= this.constructor;
    // 插件默认配置
    _static.config = {
        'total': 8,//抽奖产品的总数
        'onCompleteRollEvent': function () {
        }, //对应上面接口
        'onChange': function () {
        }, //对应上面接口
    };
    let myBrowser = _private.myBrowser();


    let _self = this;


    // 下面两个函数应该是合并参数配置
    function cloneObj(oldObj) { //复制对象方法
        if (typeof (oldObj) != 'object') return oldObj;
        if (oldObj == null) return oldObj;
        let newObj = {};
        for (let i in oldObj)
            newObj[i] = cloneObj(oldObj[i]);
        return newObj;
    }

    function extendObj() { //扩展对象
        let args = arguments;
        // //////////console.log(args);
        if (args.length < 2) return;
        let temp = cloneObj(args[0]); //调用复制对象方法
        for (let n = 1; n < args.length; n++) {
            for (let i in args[n]) {
                temp[i] = args[n][i];
            }
        }
        return temp;
    }


    _self.config = extendObj({}, _static.config, option);
    let config = _self.config;
    let curIndex = 0;
    //运动到下一个奖品
    let moveNext = function () {
        if (++curIndex >= config.total) {
            curIndex = 0;
        }
        //运动方式 顺时针
        let sort = [0, 1, 2, 4, 7, 6, 5, 3];
        //如果不根据sort排序运动方式为Z字形运动
        config.onChange(sort[curIndex]);
    };

    let fastTime = 30, slowTime = 300, rdis = 8;
    this.stopRoll = function (id) {
        if (config.r) {
            if (myBrowser !== "IE6" && myBrowser !== "IE7" && myBrowser !== "IE8" && myBrowser !== "IE8" && myBrowser !== "edge") {
                let animateEndBool = false;
                // 动画结束时事件
                config.onCompleteRollEvent();

            } else {
                config.onCompleteRollEvent();
            }
            curIndex = id;
        } else {
            let ani = function (t, b, c, d) {
                return c * t / d + b;
            };
            let dis = id - curIndex;
            let stepCounts = dis + config.total * _private.random(3, 7) - 1;   //3到6圈之间随机转
            let speedUp, uniform, slowDown;
            uniform = config.total * 2;
            speedUp = Math.floor((stepCounts - uniform) / 3);
            uniform += speedUp;
            slowDown = stepCounts;
            let index = 0, slowT = 0;
            let moveFunc = function () {
                moveNext();
                if (++index > stepCounts) {
                    // btn.enable();
                    setTimeout(function () {
                        config.onCompleteRollEvent();
                    }, 100);

                    return;
                }
                let moveTime, t = index, b = slowTime, c = fastTime - slowTime, d = speedUp;

                if (index <= speedUp) {//加速
                    moveTime = ani(t, b, c, d);
                }
                if (index > speedUp) { //匀速
                    moveTime = fastTime;
                }
                if (index > uniform) {//减速
                    t = slowT++;
                    b = fastTime;
                    c = slowTime - fastTime;
                    d = slowDown - uniform;
                    moveTime = ani(t, b, c, d);
                }
                setTimeout(moveFunc, moveTime)
            };
            setTimeout(moveFunc, slowTime);
        }
    }


}
