import React, { useState } from "react";
//import Navbar from "react-bootstrap/Navbar";
//import Nav from "react-bootstrap/Nav";
import { Route, Switch, Link, BrowserRouter as Router } from "react-router-dom";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import "../styles/Navigation.css";
import Home from "./Home";
import Bitcoin from "./Bitcoin";
import Ethereum from "./Ethereum";
import Dogecoin from "./Dogecoin";
import TableView from "./TableView";
import Chart from "./Chart";
import { FaBitcoin } from "react-icons/fa";
import { RiSettings2Fill, RiMoneyDollarCircleFill } from "react-icons/ri";
import { BiTable } from "react-icons/bi";
import { BsFillBarChartFill } from "react-icons/bs";
import { BsPeople, BsBook } from "react-icons/bs";
import {
  FiHome,
  FiLogOut,
  FiArrowLeftCircle,
  FiArrowRightCircle,
} from "react-icons/fi";
import About from "./About";
import Search from "./Search";

function Navigation(props) {
  //create initial menuCollapse state using useState hook
  const [menuCollapse, setMenuCollapse] = useState(false);

  //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  return (
    <Router>
      <div id="header">
        {/* collapsed props to change menu size using menucollapse state */}
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
            <div className="logotext d-flex justify-content-center">
              {/* small and big change using menucollapse state */}
              <p>
                {menuCollapse ? (
                  <RiMoneyDollarCircleFill size={60} />
                ) : (
                  "Cyptocurrency DashBoard"
                )}
              </p>
            </div>
            <div className="closemenu" onClick={menuIconClick}>
              {/* changing menu collapse icon on click */}
              {menuCollapse ? <FiArrowRightCircle /> : <FiArrowLeftCircle />}
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
              <MenuItem icon={<FiHome />}>
                Home
                <Link to="/" />
              </MenuItem>
              <SubMenu title="crypto" icon={<FaBitcoin />}>
                Crypto Coins
                <MenuItem>
                  Bitcoin
                  <Link to="/Bitcoin" />
                </MenuItem>
                <MenuItem>
                  Ethereum
                  <Link to="/Ethereum" />
                </MenuItem>
                <MenuItem>
                  Dogecoin
                  <Link to="/Dogecoin" />
                </MenuItem>
              </SubMenu>
              <MenuItem icon={<BiTable />}>
                Table View
                <Link to="/TableView" />
              </MenuItem>
              <MenuItem icon={<BsFillBarChartFill />}>
                Chart
                <Link to="/Chart" />
              </MenuItem>
              <MenuItem icon={<BsBook />}>
                Search <Link to="/Search" />
              </MenuItem>
              <MenuItem icon={<BsPeople />}>
                About us
                <Link to="/About" />
              </MenuItem>
              <MenuItem icon={<RiSettings2Fill />}>Settings</MenuItem>
            </Menu>
          </SidebarContent>
        </ProSidebar>
      </div>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/Bitcoin">
          <Bitcoin />
        </Route>
        <Route path="/Ethereum">
          <Ethereum />
        </Route>
        <Route path="/Dogecoin">
          <Dogecoin />
        </Route>
        <Route path="/Search">
          <Search />
        </Route>
        <Route path="/About">
          <About />
        </Route>
        <Route path="/TableView">
          <TableView />
        </Route>
        <Route path="/Chart">
          <Chart />
        </Route>
      </Switch>
    </Router>
  );
}

/*
<Router>
      <Navbar
        className="col-md-12 d-none d-md-block bg-light sidebar"
        activeKey="/home"
        onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
      >
        <div className="sidebar-sticky"></div>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
        </Nav>
      </Navbar>
      <Switch>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
*/

//https://medium.com/how-to-react/create-a-sidebar-menu-in-react-js-3463b306ca9a
//https://react-icons.github.io/react-icons/icons?name=bs
//https://reactrouter.com/web/guides/quick-start
export default Navigation;
