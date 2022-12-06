import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Layout, Drawer, Affix } from "antd";
import Sidenav from "./Sidenav";
import Header from "./Header";
import Footer from "./Footer";
// // context
// import { useLayoutState } from "../../context/LayoutContext";
// import { UserProvider } from "../../pages/user-context/context/UserContext";
// import { CourseProvider } from "../../pages/course-context/context/CourseContext";
import Home from "../../pages/Home";
import Products from "../../pages/Products";
import Users from "../../pages/Users";
import Orders from "../../pages/Orders";
import ProductsCreate from "../../pages/ProductsCreate";
import ProductsEdit from "../../pages/ProductsEdit";
import { SingleOrder } from "../../pages/SingleOrder";
import { SingleUser } from "../../pages/SingleUser";

const { Header: AntHeader, Content, Sider } = Layout;

function AdminLayout(props) {
  // global
  const [visible, setVisible] = useState(false);
  const [placement, setPlacement] = useState("right");
  const [sidenavColor, setSidenavColor] = useState("#1890ff");
  const [sidenavType, setSidenavType] = useState("transparent");
  const [fixed, setFixed] = useState(false);

  const openDrawer = () => setVisible(!visible);
  const handleSidenavType = (type) => setSidenavType(type);
  const handleSidenavColor = (color) => setSidenavColor(color);
  const handleFixedNavbar = (type) => setFixed(type);

  let { pathname } = useLocation();
  // pathname = pathname.replace("/", "");

  useEffect(() => {
    if (pathname === "rtl") {
      setPlacement("left");
    } else {
      setPlacement("right");
    }
  }, [pathname]);

  return (
    <>
      <Layout
        className={`layout-dashboard ${
          pathname === "profile" ? "layout-profile" : ""
        } ${pathname === "rtl" ? "layout-dashboard-rtl" : ""}`}
      >
        <Drawer
          title={false}
          placement={placement === "right" ? "left" : "right"}
          closable={false}
          onClose={() => setVisible(false)}
          visible={visible}
          key={placement === "right" ? "left" : "right"}
          width={250}
          className={`drawer-sidebar ${
            pathname === "rtl" ? "drawer-sidebar-rtl" : ""
          } `}
        >
          <Layout
            className={`layout-dashboard ${
              pathname === "rtl" ? "layout-dashboard-rtl" : ""
            }`}
          >
            <Sider
              trigger={null}
              width={250}
              theme="light"
              className={`sider-primary ant-layout-sider-primary ${
                sidenavType === "#fff" ? "active-route" : ""
              }`}
              style={{ background: sidenavType }}
            >
              <Sidenav color={sidenavColor} />
            </Sider>
          </Layout>
        </Drawer>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
          trigger={null}
          width={250}
          theme="light"
          className={`sider-primary ant-layout-sider-primary ${
            sidenavType === "#fff" ? "active-route" : ""
          }`}
          style={{ background: sidenavType }}
        >
          <Sidenav color={sidenavColor} />
        </Sider>
        <Layout>
          {fixed ? (
            <Affix>
              <AntHeader className={`${fixed ? "ant-header-fixed" : ""}`}>
                <Header
                  onPress={openDrawer}
                  name={pathname}
                  subName={pathname}
                  handleSidenavColor={handleSidenavColor}
                  handleSidenavType={handleSidenavType}
                  handleFixedNavbar={handleFixedNavbar}
                />
              </AntHeader>
            </Affix>
          ) : (
            <AntHeader className={`${fixed ? "ant-header-fixed" : ""}`}>
              <Header
                onPress={openDrawer}
                name={pathname}
                subName={pathname}
                handleSidenavColor={handleSidenavColor}
                handleSidenavType={handleSidenavType}
                handleFixedNavbar={handleFixedNavbar}
              />
            </AntHeader>
          )}
          <Content className="content-ant">
            <Switch>
              <Route exact path="/admin/dashboard" component={Home} />
              <Route exact path="/admin/products" component={Products} />
              <Route
                exact
                path="/admin/edit-product/:id"
                component={ProductsEdit}
              />
              <Route
                exact
                path="/admin/add-product"
                component={ProductsCreate}
              />
              <Route exact path="/admin/users" component={Users} />
              <Route exact path="/admin/users/:id" component={SingleUser} />
              <Route exact path="/admin/orders" component={Orders} />
              <Route
                exact
                path="/admin/orders/:id"
                component={SingleOrder}
              />
            </Switch>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </>
  );
}

export default withRouter(AdminLayout);
