// const {Article} = require("../models");
//
//
// module.exports.displayAll = async function(req, res){
//     const articles = await Article.findAll({
//         include: ['author']
//     });
//     console.log(Math.floor(Math.random() * 100));
//     res.render('articles/viewAll', {articles});
// };
// //todo make game controller display games

module.exports.displayAll = async function(req, res){
    res.render('games/viewAll');
    //C:\Users\igkv\WebstormProjects\projBlog\views\games\viewAll.pug
};