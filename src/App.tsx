import styles from "./App.scss";
import { Header } from "./header/components";
import { ProgressBar } from "./components";
import { AddForms, CategoriesPage } from "./categories-page/components";
import ClassName from "classnames/bind";
import { useSelector } from "react-redux";
import { getCurrentProgress } from "./state/Selector";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const cx = ClassName.bind(styles);

function App() {
  const currentProgress = useSelector(getCurrentProgress);

  return (
    <Router>
      <div
        className={cx("App")}
        style={{ backgroundImage: "url(/background.webp)" }}
      >
        <Header />
        <main className={cx("main")}>
          <div className={cx("main-wrapper")}>
            <ProgressBar progress={currentProgress} />
            <AddForms />
            <Switch>
              <Route
                exact
                path="/categories/:id/todo/:todoId"
                component={CategoriesPage}
              />
              <Route exact path="/categories/:id" component={CategoriesPage} />
              <Route exact path="/" component={CategoriesPage} />
              <Route path="*" component={() => <div>Not found</div>} />
            </Switch>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
