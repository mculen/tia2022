import React from "react";

const Header = (props) => {
  return (
    <header className="header">
      <span className="headerName">Správa elektronických dokumentov</span>
      { props.logged_user.logged_in &&
        <div className="headerNameLogout">  
          <span className="headerUserName">{props.logged_user.name}</span>
          <input type="button" className="logoutButton" value="Odhlásiť" onClick={props.logOutFunction}/>
        </div>
      }
    </header>
  );
};

export default Header;