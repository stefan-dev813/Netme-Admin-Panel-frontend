import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthReducer";
import activePartnerReducer from "./Partner/ActivePartnerReducer";
import currentVoucherReducer from "./Voucher/CurrentVoucherReducer";
import UserReducer from "./User/UserReducer";
import PartnerAdReducer from "./Advertisement/Partner/PartnerAdReducer";
import SubscriptionReducer from "./Subscription/subscriptionReducer";
import ExternalAdReducer from "./Advertisement/External/ExternalAdReducer";
import RoleReducer from "./Role/RoleReducer";
import NotificationReducer from "./PushNotification/NotificationReducer";
import UserNotificationReducer from "./User/UserNotificationReducer";
import CurrentPromotionReducer from "./Promotion/CurrentPromotionReducer";

export default configureStore({
  reducer: {
    auth: authReducer,
    partner: activePartnerReducer,
    currentVoucherReducer: currentVoucherReducer,
    UserReducer: UserReducer,
    PartnerAdReducer: PartnerAdReducer,
    SubscriptionReducer: SubscriptionReducer,
    ExternalAdReducer: ExternalAdReducer,
    RoleReducer: RoleReducer,
    NotificationReducer:NotificationReducer,
    UserNotificationReducer:UserNotificationReducer,
    currentPromotionReducer: CurrentPromotionReducer
  },
});
