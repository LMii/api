var Main=Vue.component('Main',{
    template:`<div class="main">
         
         <div class="content">
             <div class="left">
               <router-view name="left"></router-view>
             </div>
             <div class="right">
               <router-view name="right"></router-view>
             </div>
         </div>
    </div>`
})
/*左边导航栏，转换成二级菜单的数据*/
var Left=Vue.component('Left',{
    template:`<div> 
         <ul v-for="item in data">
            <li><router-link :to="'#'+item.id">{{item.title}}</router-link></li>
            <ul style="margin-left: 20px">
                <li v-for="v in item.child"><router-link :to="'#'+v.id">{{v.title}}</router-link></li>
            </ul>
         </ul>
     </div>`,
    data(){
        return{
          menu:[],
        }
    },
    mounted(){
        fetch('./data.txt').then(function(e){
            return e.json();
        }).then((e)=>{
            this.menu=e;
            console.log(this.menu)
        })
    },
    computed:{
        data(){
            var arr=[];
            for(var i in this.menu){
                if(this.menu[i].pid==0){
                    arr.push(this.menu[i])
                }else{
                    for(var j in arr){
                        if(this.menu[i].pid==arr[j].id){
                            if(!arr[j].child){
                                arr[j].child=[];
                            }
                            arr[j].child.push(this.menu[i])
                        }
                    }
                }
            }
            console.log(arr)
            return arr;
        },
    },
    watch:{
        $route(){
            var num=this.$route.hash.slice(1);
            var pos=document.querySelector('.a'+num).offsetTop-40;
            /*距离事件源高度*/
            var top=document.querySelector('.right').scrollTop;
            console.log(top)
            function animate () {
                if (TWEEN.update()) {
                    requestAnimationFrame(animate)
                }
            }
            new TWEEN.Tween({ number: document.querySelector('.right').scrollTop })
                .easing(TWEEN.Easing.Quadratic.Out)
                .to({ number: pos }, 500)
                .onUpdate(function () {
                    document.querySelector('.right').scrollTop = this.number.toFixed(0)
                })
                .start()

            animate()
        }

    }
})
var Right=Vue.component('Right',{
    template:`<div class="markdown-body">
       <div v-html="data"></div>
     </div>`,
    data(){
        return{
          data:'',
        }
    },
    mounted(){
        fetch('./right.txt').then(function(e){
            return e.text();
        }).then((e)=>{
            this.data=e;
        })
    },

})
/*安装*/
var Get=Vue.component('Get',{
    template:`<div class="get">
       安装</br>安装</br>安装</br>安装</br>安装
    </div>`,
})
