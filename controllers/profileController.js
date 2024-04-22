const {User} = require('../models');

module.exports.displayProfile = async function(req, res){
    const user = await User.findByPk(req.params.userId);
    res.render('profiles/view', {user});
};

module.exports.renderEditForm = async function(req,res){
    const user = await User.findByPk(req.params.userId);
    res.render('profiles/edit', {user});
};

module.exports.updateProfile = async function(req, res){
    await User.update({
        icon: req.body.icon,
        desc: req.body.desc
    }, {
        where: {
            id: req.params.userId
        }
    });
    res.redirect(`/profile/${req.params.userId}`);
}