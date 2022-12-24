const storeToken = (value) => {
    if(value){
        console.log('Store Token')
        //jub bhi value ayega to ek Object ke form me ayega
        // to us object ko Dstructure kar lenge, ek access or dusra refresh hota hai.  
        const {access, refresh} = value
        localStorage.setItem('access_token', access)
        localStorage.setItem('refresh_token', refresh)
    }
}
const getToken =() => {
    let access_token = localStorage.getItem('access_token')
    let refresh_token = localStorage.getItem('refresh_token')
    //as a object return 
    return {access_token, refresh_token}
}

const removeToken =() => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
}
export {storeToken, getToken, removeToken}