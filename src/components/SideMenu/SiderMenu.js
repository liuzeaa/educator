import React from 'react';
import { Menu,Icon} from 'antd';
import { Link } from 'react-router-dom';

const renderMenuItem = (item) => (
    <Menu.Item
        key={item.name}
    >
        <Link to={item.path} >
            <Icon type="bars" />
            <span className="nav-text">{item.title}</span>
        </Link>
    </Menu.Item>
)
const renderSubMenu = item=>(
    <Menu.SubMenu
        key={item.path}
        title={
            <span>
                    <Icon type="bars" />
                    <span className="nav-text">{item.title}</span>
                </span>
        }
    >
        {item.children.map(obj => renderMenuItem(obj))}
    </Menu.SubMenu>
)
export default ({menus,...props})=> {
    return (
        <Menu {...props}>
            {menus && menus.map(item => (
                item.children.length>1 ? renderSubMenu(item) : renderMenuItem(item)
            ))
            }
        </Menu>
    )
}

