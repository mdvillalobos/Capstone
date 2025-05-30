import jwt from 'jsonwebtoken';

const authorizationMiddleware = (userRole) => {
    return (req, res, next) => {
        const { token, verificationToken } = req.cookies;
        
        const jwtToken = token || verificationToken
        if(jwtToken) {
            const decodeToken = jwt.verify(jwtToken, process.env.JWT_SECRET);
            if(decodeToken.role !== userRole) { 
                console.log(decodeToken.role, userRole)
                return res.json({ error: "Permission Denied!" })
            }
            return next();
        }

        return res.json({ error: "Unauthorized Access!", data: null })
        
    }
}

export default authorizationMiddleware