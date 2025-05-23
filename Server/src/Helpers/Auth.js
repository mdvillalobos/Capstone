import bcrypt from 'bcrypt';

export const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(12, (err, salt) => {
            if(err) {
                reject(err)
            }
            bcrypt.hash(password, salt, (err, hash) => {
                if(err) {
                    reject(err)
                }
                resolve(hash)
            })
        })
    })
}

export const compareHashed = (plainText, hashedText) => {
    return bcrypt.compare(plainText, hashedText)
}

export const OTPChecker = async (email, otp, res) => {
    try {
        const userOTP = await EmailVerification.findOne({owner: email});
        const isOTPCorrect = await comparePassword(otp, userOTP.Otp);
        
        if(!isOTPCorrect) {
            return res.json({
                error: 'Incorrect One Time Pin'
            })
        }
    } catch (error) {
        console.log(error)
    }
}
