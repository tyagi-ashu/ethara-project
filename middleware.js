export const isNotLoggedIn=(req,res,next)=>{
    if(req.isAuthenticated()){
        return res.status(400).json({error:'Already logged in'});
    }
    next()
}
export const isLoggedIn=(req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }else{
        return res.status(401).json({error:'Not logged in'});
    }
}
//passport will fetch from the backend so no need to wory about frontend malicious activity
export const isAdmin = (req, res, next) => {
    if (req.user?.role !== 'admin') {
        return res.status(403).json({message: 'Access denied'});
    }
    next();
};
