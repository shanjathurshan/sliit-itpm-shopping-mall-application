import React from "react";

const Menu = (props) => {

  return (
    <ul className={`flex flex-row gap-16 ${props.className}`}>
      {props.links.map((link, index) => (
        <a
          key={index}
          className={`font-light text-h1-black transition-colors lg:hover:text-blue-600 ${props.linkClassNames}`}
          href={link.link}
          onClick={props.onLinkClick}
        >
          <li>{link.title}</li>
        </a>
      ))}
    </ul>
  );
};

export default Menu;
