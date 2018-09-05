export const setStorage = (key,value) => {
    if(!key) return;
    if(typeof value !== 'string'){
        value = JSON.stringify(value)
    }
    window.localStorage.setItem(key,value)
}
export const getStorage = key => {
    if(!key) return;
    return window.localStorage.getItem(key)
}
export const removeStorage = key=>{
    if(!key) return;
    return window.localStorage.removeItem(key)
}