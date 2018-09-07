import Cookies from "js-cookie";
import {getMenuListByUserId} from "../api";

function initRouter() {
    return new Promise(function (resolve) {
        // 判断用户是否登录
        let userInfo = Cookies.get('userInfo')
        if (userInfo === null || userInfo === "" || userInfo === undefined) {
            // 未登录
            return;
        }
        let userId = JSON.parse(Cookies.get("userInfo")).id;
        // 加载菜单
        getMenuListByUserId(userId).then(res=>{
            if(res.success){
                let menuData = res.result;
                if (menuData === null || menuData === "" || menuData === undefined) {
                    return;
                }
                menuData = menuData.map(obj=>{
                    obj.children.map(item=>{
                        item.path = `/app${obj.path}/${item.path}`;
                        return item
                    })
                    return obj
                })
                menuData = [{name:'home',
                    path:'/app/home',
                    title:'首页',component:'home',children:[]},...menuData]
                resolve(menuData)
            }
        })
    })
}


export {initRouter}