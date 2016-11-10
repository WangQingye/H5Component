/*折线图组件*/
var H5ComponentPie = function (name, cfg) {
    var component = new H5ComponentBase(name, cfg);

    //绘制网格线 --背景层

    var w = cfg.width;
    var h = cfg.height;

    //加入一个画布，给底图层
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    $(cns).css('z-index',1);
    component.append(cns);

    var r  = w/2;
    //加入一个底图层
    ctx.beginPath();
    ctx.fillStyle='#eee';
    ctx.strokeStyle='#eee';
    ctx.lineWidth=1;
    ctx.arc(r,r,r,0,2*Math.PI);
    ctx.fill();
    ctx.stroke();
    //绘制一个数据层
    var r1  = w/2-1;
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    $(cns).css('z-index',2);
    component.append(cns);

    var colors=['red','green','blue','darkred','orange']; //备用颜色
    var sAngel  = 1.5 * Math.PI; //设置起始角度在12点钟方向
    var eAngel  = 0 ; //结束角度
    var aAngel  = Math.PI*2; //100%的圆结束角度



    var step = cfg.data.length;
    for(var i = 0 ;i<step;i++){

        var item = cfg.data[i];
        var color = item[2]||(item[2]=colors.pop());

         eAngel = sAngel + aAngel * item[1];
         ctx.beginPath();
         ctx.fillStyle=color;
         ctx.strokeStyle=color;
         ctx.lineWidth=1;
         ctx.moveTo(r,r);
         ctx.arc(r,r,r1,sAngel,eAngel);
         ctx.fill();
         ctx.stroke();
         sAngel = eAngel ;

        //加入所有项目文本（加入项目文本一般需要在遍历数组的时候进行）

        var text = $('<div class="text"></div>');
        text.text(cfg.data[i][0]);
        var per = $('<div class="per"></div>');
        per.text(cfg.data[i][1]*100+'%');
        text.append(per);

        var x = r + Math.sin(.5*Math.PI-sAngel)*r;
        var y = r + Math.cos(.5*Math.PI-sAngel)*r;

       // text.css('left',x/2).css('top',y/2);


        if(x>w/2){
            text.css('left',x/2);
        }else {
            text.css('right',(w-x)/2);
        }

        if(y>h/2){
            text.css('top',y/2);
        }else {
            text.css('bottom',(h-y)/2);
        }

        if(cfg.data[i][2]){
            text.css('color',cfg.data[i][2]);
        }
        text.css('opacity',0);
        text.css('transition','all .5s '+i *.2+'s'); //顺序出现
        component.append(text);
    }

    //加入一个蒙版层
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    $(cns).css('z-index',3);
    component.append(cns);

    //绘制一个蒙版
  //  ctx.beginPath();
    ctx.fillStyle='#eee';
    ctx.strokeStyle='#eee';
    ctx.lineWidth=1;
   // ctx.arc(r,r,r,0,2*Math.PI);//
   // ctx.fill();
  //  ctx.stroke();

    //蒙版生长动画
function draw( per ) {

     ctx.clearRect(0,0,w,h);

     ctx.beginPath();
     ctx.moveTo(r,r);

     if(per<=0){
         ctx.arc(r,r,r,0,2*Math.PI);
         component.find('.text').css('opacity',0);
     }else {
         ctx.arc(r,r,r,sAngel,sAngel+2*Math.PI*per,true);
     }

   //ctx.arc(r,r,r,0,2*Math.PI*per); //不知道为什么没有修改起始角度就出问题
     ctx.fill();
     ctx.stroke();
     if(per>=1){
         component.find('.text').css('opacity',1);
     }
    }

    draw(0);

    //饼图生长动画
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