import AuthToken from '../application/Default/AuthToken';
import User from '../application/User/Model';

export default (req, res, next)=>{
    let token = (req.body && req.body.access_token) || req.headers['authorization'];
    let userModel = new User();

    if(token){
        try{
            let decodedToken = AuthToken.decodeToken(token);

            if(decodedToken.exp <= Date.now()){
                return res.status(400).send({message: "Token Expired"});
            }

            userModel.compareUserPassword(decodedToken.data, (err, result)=>{
                if(err) {
                    return res.status(500).send({message: err});
                }
                if(!result) {
                    return res.status(401).send({message: "Invalid User"});
                }
            });
        } catch (err){
            return res.status(500).send({message: err.message});
        }
    } else{
        return res.status(401).send({message: "Invalid Token or Key"});
    }

    next();
}