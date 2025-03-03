export const CertQueryPage = async (req,res)=>{
    res.render('pages/cert-query.hbs',{
        sitename:'Artıdoksan',
        page:'Home',
        title:'HomePage',
        url:`https://artidoksancert.com`,
        siteurl:`https://artidoksancert.com`,
        publicdata:'/cert-query'
    })
    // const resp = await fetch("https://www.tuv-nord.com/cy/en/home/");
    // const content = await resp.text();
    // res.set('Content-Type', 'text/html');
    // res.send(content); 
    // res.redirect('https://www.tuv-nord.com/cy/en/home/')
}
