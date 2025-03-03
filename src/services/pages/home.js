export const HomePage = async (req,res)=>{
    res.render('pages/home.hbs',{
        sitename:'Cert Query | TÜVNORD',
        page:'Cert Query | TÜVNORD',
        title:'Cert Query | TÜVNORD',
        url:`https://artidoksancert.com`,
        siteurl:`https://artidoksancert.com`,
        publicdata:'/home'
    })
    // const resp = await fetch("https://www.tuv-nord.com/cy/en/home/");
    // const content = await resp.text();
    // res.set('Content-Type', 'text/html');
    // res.send(content); 
    // res.redirect('https://www.tuv-nord.com/cy/en/home/')
}
