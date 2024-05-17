const {User, Role, Article} = require('../models');
const md5 = require('md5');
const passport = require('passport');

module.exports.renderRegistrationForm = async function(req, res){
    const roles = await Role.findAll();
    console.log(roles);
    res.render('users/register', {roles});
}

module.exports.register = async function(req, res){
    await User.create({
        first_name: req.body.first_name,
        last_name:req.body.last_name,
        password:md5(req.body.password),
        email:req.body.email,
        icon: `/images/bf_defaultIcon`,
        role_id: req.body.role_id
    });
    res.redirect('/login')
}

module.exports.renderUpdateForm = async function (req,res){
    const user = await User.findByPk(req.params.userId);
    res.render('users/update', {user});
};

module.exports.updateUser = async function(req, res){
    const user = await User.findByPk(req.params.userId);
    // if(!article.isOwnedBy(user)){
    //     res.redirect('/');
    //     return;
    //}
    await User.update({
        first_name: req.body.first_name,
        last_name:req.body.last_name,
        email:req.body.email,
        password:md5(req.body.password),

    }, {
        where: {
            id: req.params.userId
        }
    });
    res.redirect(`/users/${req.params.userId}`);
}

module.exports.deleteUser = async function(req, res){
    const user = await User.findByPk(req.params.userId);
    // if(!user.is(mod) && !article.isOwnedBy(user)){
    //     res.redirect('/');
    //     return;
    // }
    await User.destroy({
        where: {
            id: req.params.userId
        }
    });
    res.redirect('/')
};

module.exports.renderLogin = function(req, res){
    res.render('users/login');
}

module.exports.login = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureMessage: true
});

module.exports.logout = function(req,res){
    req.logout();
    res.redirect('/login');
}
