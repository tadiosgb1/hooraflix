import { createRouter, createWebHistory } from "vue-router";
import Home from '../views/opened/landing/Home.vue'

import SendSMS from  '../views/opened/landing/apidocs/SendSMS.vue'
import BulkSend from "../views/opened/landing/apidocs/BulkSend.vue";
import Otp from  '../views/opened/landing/apidocs/OTP.vue'
import Verify from  '../views/opened/landing/apidocs/Verify.vue'
import Balance from  '../views/opened/landing/apidocs/Balance.vue'
import Status from  '../views/opened/landing/apidocs/Status.vue'
import About from  '../views/opened/landing/about.vue'
import Products from  '../views/opened/landing/products.vue'
import Pricing from  '../views/opened/landing/plans.vue'

import Login from '../views/opened/auth/login.vue'

import ResetPassword from '../views/opened/auth/ResetPassword.vue'
import ForgotPasssword from '../views/opened/auth/forgotPassword.vue'
import ActivateEmailMessage from '../views/opened/landing/activateEmailMessage.vue'
import Registration from '../views/opened/auth/registration.vue'
import ForgotPassword from '../views/opened/auth/forgotPassword.vue';
import Reset from '../views/opened/auth/reset.vue';
import AccessDenied from "../views/opened/auth/accessDenied.vue";
import first_dash from '../views/closed/first_dash.vue'
import dashboard from '../views/closed/dashboard.vue'


import RoleView from '../views/closed/Roles/RoleView.vue'
import PermissionView from '../views/closed/Permissions/PermissionView.vue'




const routes = [
  {
    path: "/", name: "/",
    component: Home,
    meta:
      { requiresGuest: true }
  },
  {
    path: "/login", name: "login",
    component: Login,
    meta:
      { requiresGuest: true }
  },

  {
    path: "/register", name: "register",
    component: Registration,
    meta:
      { requiresGuest: true }
  },

  {
    path: "/send-sms", name: "/send-sms",
    component: SendSMS,
    meta:
      { requiresGuest: true }
  },


    {
    path: "/bulk-sms", name: "/bulk-sms",
    component: BulkSend,
    meta:
      { requiresGuest: true }
  },

    {
    path: "/otp", name: "/otp",
    component: Otp,
    meta:
      { requiresGuest: true }
  },

    {
    path: "/verify", name: "/verify",
    component: Verify,
    meta:
      { requiresGuest: true }
  },

    {
    path: "/balance", name: "/balance",
    component: Balance,
    meta:
      { requiresGuest: true }
  },


   {
    path: "/status", name: "/status",
    component: Status,
    meta:
      { requiresGuest: true }
  },


    {
    path: "/about", name: "/about",
    component: About,
    meta:
      { requiresGuest: true }
  },


    {
    path: "/products", name: "/products",
    component: Products,
    meta:
      { requiresGuest: true }
  },

  {
    path: "/pricing", name: "/pricing",
    component: Pricing,
    meta:
      { requiresGuest: true }
  },

  {
    path: "/email-activate-message", name: "email-activate-message",
    component: ActivateEmailMessage,
    meta:
      { requiresGuest: true }
  },
  // router/index.js
   {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPasssword,
    props: true
  },
    {
      path: "/:lang/reset-password",
      name: "ResetPassword",
      component: ResetPassword,
      props: true, // passes route params as props
    },
  ,
  {
    path: "/dashboard", name: "dashboard",
    component: dashboard,
    meta:
      { requiresGuest: true },
      children: [
      {
        path: "contentpeoples",
        name: "Contentpeople-view",
        component: () => import('../views/closed/ContentPeoples/ContentpeopleView.vue'),
      },
      {
        path: "contentpeoples/add",
        name: "Contentpeople-add",
        component: () => import('../views/closed/ContentPeoples/AddContentpeople.vue'),
      },
      {
        path: "contentpeoples/edit/:id",
        name: "Contentpeople-edit",
        component: () => import('../views/closed/ContentPeoples/EditContentpeople.vue'),
        props: true,
      },
      {
        path: "contentpeoples/detail/:id",
        name: "Contentpeople-detail",
        component: () => import('../views/closed/ContentPeoples/ContentpeopleDetail.vue'),
        props: true,
      },

      {
        path: "contentcategories",
        name: "Contentcategories-view",
        component: () => import('../views/closed/ContentCategories/ContentcategoriesView.vue'),
      },
      {
        path: "contentcategories/add",
        name: "Contentcategories-add",
        component: () => import('../views/closed/ContentCategories/AddContentcategories.vue'),
      },
      {
        path: "contentcategories/edit/:id",
        name: "Contentcategories-edit",
        component: () => import('../views/closed/ContentCategories/EditContentcategories.vue'),
        props: true,
      },
      {
        path: "contentcategories/detail/:id",
        name: "Contentcategories-detail",
        component: () => import('../views/closed/ContentCategories/ContentcategoriesDetail.vue'),
        props: true,
      },

     
    

      {
        path: "peoples",
        name: "People-view",
        component: () => import('../views/closed/Peoples/PeopleView.vue'),
      },
      {
        path: "peoples/add",
        name: "People-add",
        component: () => import('../views/closed/Peoples/AddPeople.vue'),
      },
      {
        path: "peoples/edit/:id",
        name: "People-edit",
        component: () => import('../views/closed/Peoples/EditPeople.vue'),
        props: true,
      },
      {
        path: "peoples/detail/:id",
        name: "People-detail",
        component: () => import('../views/closed/Peoples/PeopleDetail.vue'),
        props: true,
      },

      {
        path: "contents",
        name: "Content-view",
        component: () => import('../views/closed/Contents/ContentView.vue'),
      },
      {
        path: "contents/add",
        name: "Content-add",
        component: () => import('../views/closed/Contents/AddContent.vue'),
      },
      {
        path: "contents/edit/:id",
        name: "Content-edit",
        component: () => import('../views/closed/Contents/EditContent.vue'),
        props: true,
      },
      {
        path: "contents/detail/:id",
        name: "Content-detail",
        component: () => import('../views/closed/Contents/ContentDetail.vue'),
        props: true,
      },

      {
        path: "categories",
        name: "Categories-view",
        component: () => import('../views/closed/Categories/CategoriesView.vue'),
      },
      {
        path: "categories/add",
        name: "Categories-add",
        component: () => import('../views/closed/Categories/AddCategories.vue'),
      },
      {
        path: "categories/edit/:id",
        name: "Categories-edit",
        component: () => import('../views/closed/Categories/EditCategories.vue'),
        props: true,
      },
      {
        path: "categories/detail/:id",
        name: "Categories-detail",
        component: () => import('../views/closed/Categories/CategoriesDetail.vue'),
        props: true,
      },

      {
        path: "adcampaigns",
        name: "AdCampaign-view",
        component: () => import('../views/closed/AdCampaigns/AdCampaignView.vue'),
      },
      {
        path: "adcampaigns/add",
        name: "AdCampaign-add",
        component: () => import('../views/closed/AdCampaigns/AddAdCampaign.vue'),
      },
      {
        path: "adcampaigns/edit/:id",
        name: "AdCampaign-edit",
        component: () => import('../views/closed/AdCampaigns/EditAdCampaign.vue'),
        props: true,
      },
      {
        path: "adcampaigns/detail/:id",
        name: "AdCampaign-detail",
        component: () => import('../views/closed/AdCampaigns/AdCampaignDetail.vue'),
        props: true,
      },

      {
        path: "trainingmodules",
        name: "TrainingModule-view",
        component: () => import('../views/closed/TrainingModules/TrainingModuleView.vue'),
      },
      {
        path: "trainingmodules/add",
        name: "TrainingModule-add",
        component: () => import('../views/closed/TrainingModules/AddTrainingModule.vue'),
      },
      {
        path: "trainingmodules/edit/:id",
        name: "TrainingModule-edit",
        component: () => import('../views/closed/TrainingModules/EditTrainingModule.vue'),
        props: true,
      },
      {
        path: "trainingmodules/detail/:id",
        name: "TrainingModule-detail",
        component: () => import('../views/closed/TrainingModules/TrainingModuleDetail.vue'),
        props: true,
      },

      {
        path: "subscriptions",
        name: "Subscription-view",
        component: () => import('../views/closed/Subscriptions/SubscriptionView.vue'),
      },
      {
        path: "subscriptions/add",
        name: "Subscription-add",
        component: () => import('../views/closed/Subscriptions/AddSubscription.vue'),
      },
      {
        path: "subscriptions/edit/:id",
        name: "Subscription-edit",
        component: () => import('../views/closed/Subscriptions/EditSubscription.vue'),
        props: true,
      },
      {
        path: "subscriptions/detail/:id",
        name: "Subscription-detail",
        component: () => import('../views/closed/Subscriptions/SubscriptionDetail.vue'),
        props: true,
      },

      {
        path: "transactions",
        name: "Transaction-view",
        component: () => import('../views/closed/Transactions/TransactionView.vue'),
      },
      {
        path: "transactions/add",
        name: "Transaction-add",
        component: () => import('../views/closed/Transactions/AddTransaction.vue'),
      },
      {
        path: "transactions/edit/:id",
        name: "Transaction-edit",
        component: () => import('../views/closed/Transactions/EditTransaction.vue'),
        props: true,
      },
      {
        path: "transactions/detail/:id",
        name: "Transaction-detail",
        component: () => import('../views/closed/Transactions/TransactionDetail.vue'),
        props: true,
      },

      {
        path: "transactions",
        name: "Transaction-view",
        component: () => import('../views/closed/Transactions/TransactionView.vue'),
      },
      {
        path: "transactions/add",
        name: "Transaction-add",
        component: () => import('../views/closed/Transactions/AddTransaction.vue'),
      },
      {
        path: "transactions/edit/:id",
        name: "Transaction-edit",
        component: () => import('../views/closed/Transactions/EditTransaction.vue'),
        props: true,
      },
      {
        path: "transactions/detail/:id",
        name: "Transaction-detail",
        component: () => import('../views/closed/Transactions/TransactionDetail.vue'),
        props: true,
      },

      {
        path: "wallets",
        name: "Wallet-view",
        component: () => import('../views/closed/Wallets/WalletView.vue'),
      },
      {
        path: "wallets/add",
        name: "Wallet-add",
        component: () => import('../views/closed/Wallets/AddWallet.vue'),
      },
      {
        path: "wallets/edit/:id",
        name: "Wallet-edit",
        component: () => import('../views/closed/Wallets/EditWallet.vue'),
        props: true,
      },
      {
        path: "wallets/detail/:id",
        name: "Wallet-detail",
        component: () => import('../views/closed/Wallets/WalletDetail.vue'),
        props: true,
      },

      {
        path: "talentranks",
        name: "TalentRank-view",
        component: () => import('../views/closed/TalentRanks/TalentRankView.vue'),
      },
      {
        path: "talentranks/add",
        name: "TalentRank-add",
        component: () => import('../views/closed/TalentRanks/AddTalentRank.vue'),
      },
      {
        path: "talentranks/edit/:id",
        name: "TalentRank-edit",
        component: () => import('../views/closed/TalentRanks/EditTalentRank.vue'),
        props: true,
      },
      {
        path: "talentranks/detail/:id",
        name: "TalentRank-detail",
        component: () => import('../views/closed/TalentRanks/TalentRankDetail.vue'),
        props: true,
      },

      {
        path: "networks",
        name: "Network-view",
        component: () => import('../views/closed/Networks/NetworkView.vue'),
      },
      {
        path: "networks/add",
        name: "Network-add",
        component: () => import('../views/closed/Networks/AddNetwork.vue'),
      },
      {
        path: "networks/edit/:id",
        name: "Network-edit",
        component: () => import('../views/closed/Networks/EditNetwork.vue'),
        props: true,
      },
      {
        path: "networks/detail/:id",
        name: "Network-detail",
        component: () => import('../views/closed/Networks/NetworkDetail.vue'),
        props: true,
      },

      {
        path: "liveevents",
        name: "LiveEvent-view",
        component: () => import('../views/closed/LiveEvents/LiveEventView.vue'),
      },
      {
        path: "liveevents/add",
        name: "LiveEvent-add",
        component: () => import('../views/closed/LiveEvents/AddLiveEvent.vue'),
      },
      {
        path: "liveevents/edit/:id",
        name: "LiveEvent-edit",
        component: () => import('../views/closed/LiveEvents/EditLiveEvent.vue'),
        props: true,
      },
      {
        path: "liveevents/detail/:id",
        name: "LiveEvent-detail",
        component: () => import('../views/closed/LiveEvents/LiveEventDetail.vue'),
        props: true,
      },

      {
        path: "mediacontents",
        name: "MediaContent-view",
        component: () => import('../views/closed/MediaContents/MediaContentView.vue'),
      },
      {
        path: "mediacontents/add",
        name: "MediaContent-add",
        component: () => import('../views/closed/MediaContents/AddMediaContent.vue'),
      },
      {
        path: "mediacontents/edit/:id",
        name: "MediaContent-edit",
        component: () => import('../views/closed/MediaContents/EditMediaContent.vue'),
        props: true,
      },
      {
        path: "mediacontents/detail/:id",
        name: "MediaContent-detail",
        component: () => import('../views/closed/MediaContents/MediaContentDetail.vue'),
        props: true,
      },

      {
        path: "talentprofiles",
        name: "TalentProfile-view",
        component: () => import('../views/closed/TalentProfiles/TalentProfileView.vue'),
      },
      {
        path: "talentprofiles/add",
        name: "TalentProfile-add",
        component: () => import('../views/closed/TalentProfiles/AddTalentProfile.vue'),
      },
      {
        path: "talentprofiles/edit/:id",
        name: "TalentProfile-edit",
        component: () => import('../views/closed/TalentProfiles/EditTalentProfile.vue'),
        props: true,
      },
      {
        path: "talentprofiles/detail/:id",
        name: "TalentProfile-detail",
        component: () => import('../views/closed/TalentProfiles/TalentProfileDetail.vue'),
        props: true,
      },

      {
        path: "permissions",
        name: "Permission-view",
        component: () => import('../views/closed/Permissions/PermissionView.vue'),
      },
      {
        path: "permissions/add",
        name: "Permission-add",
        component: () => import('../views/closed/Permissions/AddPermission.vue'),
      },
      {
        path: "permissions/edit/:id",
        name: "Permission-edit",
        component: () => import('../views/closed/Permissions/EditPermission.vue'),
        props: true,
      },
      {
        path: "permissions/detail/:id",
        name: "Permission-detail",
        component: () => import('../views/closed/Permissions/PermissionDetail.vue'),
        props: true,
      },

      {
        path: "users",
        name: "Users-view",
        component: () => import('../views/closed/users/UsersView.vue'),
      },
      {
        path: "users/add",
        name: "Users-add",
        component: () => import('../views/closed/users/AddUsers.vue'),
      },
      {
        path: "users/edit/:id",
        name: "Users-edit",
        component: () => import('../views/closed/users/EditUsers.vue'),
        props: true,
      },
      {
        path: "users/detail/:id",
        name: "Users-detail",
        component: () => import('../views/closed/users/UsersDetail.vue'),
        props: true,
      },

      {
        path: "first-dash", name: "first-dash",
        component: first_dash,
      },

      {
        path: "role-view", name: "Role-view",
        component: RoleView,
      },

        {
        path: "permission-view", name: "Permission-view",
        component: PermissionView,
      },
       

         
    ]
  },
  { path: "/forgot-password", name: "forgotPassword", component: ForgotPassword },
  { path: "/reset/:token", name: "reset", component: Reset, meta: { requiresGuest: true } },
  { path: "/:pathMatch(.*)*", name: "accessDenied", component: AccessDenied, meta: { requiresGuest: true } },
];

const router = createRouter({
  // mode: 'hash',
  history: createWebHistory(),
  routes, // ✅ no spread needed
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresGuest = to.matched.some(record => record.meta.requiresGuest);
  const requiredRole = to.meta.role;

  if (requiresAuth) {
    if (!isAuthenticated) {
      next("/login");
    } else if (requiredRole && userRole !== requiredRole) {
      localStorage.clear();
      next("/login");
    } else {
      next();
    }
  } else if (requiresGuest) {
    next();
  } else {
    next();
  }
});

export default router;
