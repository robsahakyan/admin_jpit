import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { useContext } from "react";
import SignIn from "./pages/SignIn";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import { AuthContext } from "./context/AuthContext";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminLayout from "./components/layout/AdminLayout";
function App() {
  let { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="App">
      <Provider store={store}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={true}
          rtl={false}
          pauseOnFocusLoss={true}
          draggable={false}
          pauseOnHover={false}
        />

        <HashRouter>
          <Switch>
            <Route
              exact
              path="/"
              render={() => <Redirect to="/admin/dashboard" />}
            />

            <Route
              exact
              path="/admin"
              render={() => <Redirect to="/admin" />}
            />
            <Route path="/sign-in" exact component={SignIn} />
            <ProtectedRoute path="/admin" component={AdminLayout} />
            <Route component={Error} />
          </Switch>
        </HashRouter>
      </Provider>
    </div>
  );

  function ProtectedRoute({ component: Component, ...rest }) {
    return (
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated() ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/sign-in",
                state: {
                  from: props.location,
                },
              }}
            />
          )
        }
      />
    );
  }
}

export default App;
