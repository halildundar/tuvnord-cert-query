export const HakkimizdaPage = (req,res)=>{
    res.render('pages/kurumsal/hakkimizda.hbs',{
        sitename:'Tüvnord Belge Sorgu',
        page:'Login',
        title:'LoginPage',
        publicdata:'/login/main'
    })
}
