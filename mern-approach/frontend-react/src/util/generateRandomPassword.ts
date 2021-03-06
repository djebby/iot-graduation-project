const CHARS: string = "a+b%cd(e@fg1h#i6jk2lm!n]o~p8q,r:s|t-u&v_w<xt}z$A;B4C^DEF/G0H9IJKL*MNOP=Q)R{S.T7U?V5W>X[Y3Z";
const getPassword = (passwordLength: number = 20): string => {
    let password: string = "";
    for(let i = 0; i<passwordLength; i++){
        let randomNumber = Math.floor(Math.random() * CHARS.length);
        password += CHARS[randomNumber];
    }
    return password;
}
export default getPassword;