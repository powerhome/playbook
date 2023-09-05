import React from "react";
import { Nav, NavItem } from 'playbook-ui'


const MainSidebar = ({dark, type, category, kit, kits}) => {

    const linkFormat = (item) => {
        const linkTitle = Array.isArray(item) ? item[0] : item
        const replaceUnderscore = linkTitle
        .replace(/_/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

        return replaceUnderscore;
    }

    return (
        <>
        <Nav
            dark={dark}
            link={`/kits${type ? `?type=${type}` : ""}`}
            paddingY="sm"
            title="Kits"
            variant="subtle"
        >
            {
                kits.map((link, i) => (
                    typeof link === 'object' ? (
                    <div key={i} className="category_section">
                        <NavItem
                            active={category === Object.keys(link)[0]}
                            className="category"
                            dark={dark}
                            iconRight="angle-down"
                            key={i}
                            link={`/kit_category/${Object.keys(link)}?type=${type}`}
                            text={linkFormat(Object.keys(link))}
                        />                       
                        
                        <div className="sub_category">
                            {
                            link[Object.keys(link)[0]].map((sublink, i) => (
                                    <NavItem
                                        active={kit === sublink}
                                        dark={dark}
                                        key={i}
                                        link={`/kits/${sublink}/${type}`}
                                        text={linkFormat(sublink)}
                                    />
                                )) 
                            }
                        </div>
                    </div>
                    ) : (
                        <NavItem
                            active={kit === link}
                            className="category"
                            dark={dark}
                            key={i}
                            text={linkFormat(link)}
                            link={`/kits/${link}?type=${type}`}
                            />   
                    )
                   
                ))
            }
            

        </Nav>
        </>
    )
}

export default MainSidebar