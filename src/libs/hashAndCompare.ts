import bcrypt from 'bcryptjs'




interface Hash {
    plainText:string
    salt?:string 
}
interface Compare {
    plainText:string
    hashValue:string 
}

export const hash = ({ plainText, salt = process.env.SALT_ROUND || "8" } : Hash ) => {
    const hashResult = bcrypt.hashSync(plainText, parseInt(salt))
    return hashResult
}


export const compare = ({ plainText, hashValue } :Compare) => {
    const matchResult = bcrypt.compareSync(plainText, hashValue)
    return matchResult
}