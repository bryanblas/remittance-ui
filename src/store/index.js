import Vue from "vue";
import Vuex from "vuex";

import { login } from "./Login/login.store"
import { kycdocuments } from "./KycDocument/kyc-document.store"
import { merchants } from "./Merchant/merchant.store"
import { forgotpassword } from "./ForgotPassword/forgot-password.store"
import { resetpassword } from "./ResetPassword/reset-password.store"
import { bankaccounts } from "./BankAccount/bank-account.store"
import { deposits } from "./Deposit/deposit.store"
import { balances } from "./Balance/balance.store"
import { withdrawals } from "./Withdrawal/withdrawal.store"

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    login,
    kycdocuments,
    merchants,
    forgotpassword,
    resetpassword,
    bankaccounts,
    deposits,
    balances,
    withdrawals
  }
})
