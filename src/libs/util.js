import Cookies from "js-cookie";
import {getMenuListByUserId} from "../api";

function initRouter() {
    return new Promise(function (resolve) {
        // 加载菜单
        getMenuListByUserId().then(res=>{
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
