module.exports = (req, res, next) => {
    if(!req.session.isLoggedIn){
        return res.status(401).json({success:false,error:"Please sign in!"})
    }
    next();
}