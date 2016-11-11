/*内容管理对象 */
var H5=function( name , cfg ){
    this.id=('h5_'+Math.random()).replace('.','_');
    this.el=$('<div class="h5" id="'+this.id+'">').hide();
    this.page=[]; //用来储存生成的page
    $('body').append(this.el);

    this.addPage=function(name,text){
        var page = $('<div class="h5_page section"></div>');
       //这里这样判断是为了防止有空格名字
        if(name!=undefined){
            page.addClass('h5_page_'+name);
        }
        if(text!=undefined){
            page.text(text);
        }
        this.el.append(page);
        this.page.push(page);
        if(typeof this.whenAddPage === 'function'){
            this.whenAddPage();
        }
        return this;
    };
    this.addComponent=function(name,cfg){
        var cfg =cfg||{};
        //extend方法的用处是如果cfg里没有传type，就添加一个type
        cfg= $.extend({
            type:'base'
        },cfg);
        var component; //定义一个变量，存储组件元素
        var page=this.page.slice(-1)[0]; //取得最新的page（配合链式调用）
        switch (cfg.type){
            case'base':
                component =new H5ComponentBase(name,cfg);
                break;
            default:
        }
        page.append(component);
        return this;
    };
    this.loader=function( firstPage ){
        this.el.fullpage({
            onLeave:function(index, nextIndex, direction){
                $(this).find('.h5_component').trigger('onLeave');
            },
            afterLoad:function(anchorLink,index){
                $(this).find('.h5_component').trigger('onLoad');
            }
        });
        this.page[0].find('.h5_component').trigger('onLoad');
        this.el.show();
        if(firstPage){
            $.fn.fullpage.moveTo(firstPage);
        }

    };

    return this;
};

