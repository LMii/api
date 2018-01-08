/*var routes=*/
var router=new VueRouter({
    routes:[
        {
            path:'/',
            component:Main,
            children:[
                {
                    path:'',
                    components:{left:Left, right:Right}
                }
            ]
        },
        {
            path:'/get',
            component:Get
        }
    ]

})