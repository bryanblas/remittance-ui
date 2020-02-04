import Vue from "vue";
import Router from "vue-router";
import store from "@/store/";

import Login from "@/components/Login/Login";
import Register from "@/components/Register/Register";
import Verification from "@/components/Verification/Verification";
import ForgotPassword from "@/components/ForgotPassword/ForgotPassword";
import ResetPassword from "@/components/ResetPassword/ResetPassword";

import Dashboard from "@/components/Dashboard/Dashboard";
import Kyc from "@/components/Kyc/Kyc";

import Deposit from "@/components/Deposit/Deposit";
import AddDeposit from "@/components/Deposit/AddDeposit/AddDeposit";

import Withdrawal from "@/components/Withdrawal/Withdrawal";
import AddWithdrawal from "@/components/Withdrawal/AddWithdrawal/AddWithdrawal";

Vue.use(Router);

let router = new Router({
  mode: "history",
  routes: [
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/register",
      name: "Register",
      component: Register
    },
    {
      path: "/verification/:hash",
      name: "Verification",
      component: Verification
    },
    {
      path: "/forgot-password",
      name: "ForgotPassword",
      component: ForgotPassword
    },
    {
      path: "/reset-password/:hash",
      name: "ResetPassword",
      component: ResetPassword
    },
    /*{
      path: "/change-password",
      name: "ChangePassword",
      component: ChangePassword,
      meta: {
        requiresAuth: true
      }
    },*/
    {
      path: "/",
      alias: "/dashboard",
      name: "Dashboard",
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/kyc",
      name: "Kyc",
      component: Kyc,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/deposits",
      name: "Deposit",
      component: Deposit,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/deposit/add",
      name: "AddDeposit",
      component: AddDeposit,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/withdrawals",
      name: "Withdrawal",
      component: Withdrawal,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/withdrawal/add",
      name: "AddWithdrawal",
      component: AddWithdrawal,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem("token")
  if (token !== undefined) {
    store.state.token = token
  } else {
    store.state.token = null
  }

  if (to.meta.requiresAuth) {
    if (token) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

export default router;
