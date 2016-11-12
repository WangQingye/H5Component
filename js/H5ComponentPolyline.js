/*折线图组件*/
var H5ComponentPolyline;
H5ComponentPolyline = function (name, cfg) {
    var component = new H5ComponentBase(name, cfg);

    //绘制网格线

    var w = cfg.width;
    var h = cfg.height;

    //加入一个画布，用来做网格线背景
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;

    //水平网格线 100份->10份

    var step = 10;
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'black';

    window.ctx = ctx;
    //水平网格线
    for (var i = 0; i < step + 1; i++) {

        var y = (h / step) * i;

        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
    }
    ;
    //垂直网格线；
    step = cfg.data.length + 1; //根据项目的个数去分

    var text_w = w/step>>0;

    for (var i = 0; i < step + 1; i++) {

        var x = (w / step) * i;

        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
    //项目名称：
    if(cfg.data[i]){
        var text = $('<div class="text">');
        text.text(cfg.data[i][0]);
        text.css('width',text_w/2).css('left',x/2+text_w/4);
        component.append(text);
    }



    }
    ctx.stroke();
    component.append(cns);

    //绘制折线及阴影
    //给函数设置一个百分比0-1，可以有这个来执行动画



        //绘制折线图 —— 重建画布
        var cns = document.createElement('canvas');
        var ctx = cns.getContext('2d');
        cns.width = ctx.width = w;
        cns.height = ctx.height = h;
        component.append(cns);
        //重设画笔
    function draw( per ) {
        //清空之前的画布；
        ctx.clearRect(0,0,w,h);
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#ff7676';

        var x = 0;
        var y = 0;
        /*    ctx.moveTo(10,10);
         ctx.arc(10,10,5,0,2*Math.PI); *///前两个参数是圆心坐标，第三个半径，第四五个为起始弧度和终点弧度
        var row_w = (w / (cfg.data.length + 1));
        //画点
        for (i in cfg.data) {  //枚举一个对象

            var item = cfg.data[i];

            x = row_w * i + row_w;

            y = h-(item[1]*h*per) ;

            ctx.moveTo(x, y);
            ctx.arc(x, y, 5, 0, 2 * Math.PI);
        }

        //连线
        //移动画笔到第一个点位
        ctx.moveTo(row_w, h-(cfg.data[0][1]*h*per));
        for (i in cfg.data) {  //枚举一个对象
            var item = cfg.data[i];
            x = row_w * i + row_w;
            y = h-(item[1]*h*per) ;
            ctx.lineTo(x, y);
        }
        ctx.stroke();//这里结束是为了方便后面控制线宽
        //绘制阴影

        ctx.lineWidth = 1;
        ctx.lineTo(x, h);
        ctx.lineTo(row_w, h);
        ctx.strokeStyle = "rgba(255,118,118,0)";
        ctx.fillStyle = "rgba(255,118,118,0.3)";
        ctx.fill();

        //写数据
        for (i in cfg.data) {  //枚举一个对象

            var item = cfg.data[i];

            x = row_w * i + row_w;

            y = h-(item[1]*h*per);

            ctx.fillStyle = item[2] ? item[2] : 'black';

            ctx.font = '12px';

            ctx.fillText((item[1] * 100) + '%', x - 8, y - 15);
        }
        ctx.stroke();

    }
  //  draw(1);

    //出入动画
    component.on('onLoad',function(){
        var s = 0;
        for(i=0;i<100;i++){
            setTimeout(function(){
                s+=.01;
                draw(s);
            },i*10+500);
        }

    });
    component.on('onLeave',function(){
        var s = 1;
        for(i=0;i<100;i++){
            setTimeout(function(){
                s-=.01;
                draw(s);
            },i*10);
        }

    });


    return component

};