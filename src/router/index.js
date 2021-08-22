import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../components/login/Login";
import Layout from "../components/layout/Layout";
import Dashboard from "../admin/dashboard/Dashboard";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/app",
    component: Layout,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: "",
        component: Dashboard,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/project",
        name: "project",
        component: () => import(/* webpackChunkName: "project"*/ "@/admin/project/Project"),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/userHistory/:projectUuid",
        name: "userHistory",
        component: () => import(/* webpackChunkName: "userHistory"*/ "@/admin/userHistory/UserHistory"),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/ticket/:userHistoryUuid",
        name: "ticket",
        component: () => import(/* webpackChunkName: "ticket"*/ "@/admin/ticket/Ticket"),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/enterprise",
        name: "enterprise",
        component: () => import(/* webpackChunkName: "enterprise"*/ "@/admin/enterprise/Enterprise"),
        meta: {
          requiresAuth: true
        }
      }
    ]
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});


router.beforeEach((to,from,next) => {

  if(to.matched.some(route => route.meta.requiresAuth)){
    if(localStorage.getItem('access_token')) return next();

    return next('/login');
  }

  if (
    localStorage.getItem("authenticated") === "true" && 
    to.name === "login"
  ) {
    next(process.env.VUE_APP_HOME_ROUTE);
  } else {
    next();
  }

  next();
});


export default router;
