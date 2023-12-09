import React, {
  useContext,
  useEffect,
  useState,
} from "react";
import {
  Routes,
  Route,
  matchPath,
  useParams,
  useLocation,
} from "react-router";
import { useSearchParams } from "react-router-dom";
import Home, {
  LoadInitialData as LoadHomeData,
} from "../pages/Home";
import AboutUs, {
  LoadInitialData as LoadAboutUsData,
} from "../pages/AboutUs";
import Layout from "../components/Layout";
import NotFound from "../pages/Error";
import { RouteContext } from "./StaticRouter";
import useIsFirstRender from "../hooks/useIsFirstRender";
import Product, {
  LoadInitialData as ProductInitialData,
} from "../pages/Product";

const routes = [
  {
    key: "about-us",
    path: "/about-us",
    component: AboutUs,
    loader: LoadAboutUsData,
  },
  {
    key: "home",
    path: "/",
    component: Home,
    loader: null,
  },
  {
    key: "product",
    path: "/product/:productId",
    component: Product,
    loader: ProductInitialData,
  },
];

const RenderComponent = ({ route }) => {
  const { component: Component, loader } = route;
  let initialData = {};
  if (!__isBrowser__) {
    initialData = useContext(RouteContext);
  } else {
    initialData = window.__InitialData__ || {};
  }

  const location = useLocation();
  const params = useParams();
  const [searchParams, _] = useSearchParams();
  const formattedSp = {};
  searchParams.forEach((v, k) => {
    formattedSp[k] = v;
  });

  const isFirstRender = useIsFirstRender();

  const [res, setRes] = useState({
    loading: false,
    data: initialData,
    error: false,
  });

  useEffect(() => {
    (async () => {
      if (!isFirstRender && loader) {
        setRes({
          data: {},
          loading: true,
          error: false,
        });
        try {
          const fetchedData = await loader(
            params,
            formattedSp
          );
          setRes({
            ...res,
            loading: false,
            data: fetchedData,
          });
        } catch (err) {
          setRes({ ...res, loading: false, error: true });
        }
      }
    })();
    return () => {
      setRes({
        data: {},
        loading: false,
        error: false,
      });
    };
  }, [location]);

  if (res.loading) return <h1>Loading...</h1>;

  if (res.error) return <h1>Something went wrong...</h1>;

  return <Component data={res.data} />;
};

const CustomRoutes = () => (
  <Routes>
    <Route key="layout" element={<Layout />}>
      {routes.map((route) => (
        <Route
          key={route.key}
          path={route.path}
          element={<RenderComponent route={route} />}
        />
      ))}
    </Route>
    <Route key="404" path="*" element={<NotFound />} />
  </Routes>
);

export const filterRoutes = (url) => {
  const activeRoute =
    routes.find((route) => {
      // console.log("matchpath", matchPath(route.path, url));
      return matchPath(route.path, url);
    }) || {};

  const activeMatch = activeRoute.path
    ? matchPath(activeRoute.path, url)
    : {};
  return { activeRoute, activeMatch };
};

export default CustomRoutes;
