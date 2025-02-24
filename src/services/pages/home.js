export const HomePage = (req,res)=>{
    res.render('pages/home.hbs',{
        page:'Home',
        title:'HomePage',
        publicdata:'/home/main'
    })
}
