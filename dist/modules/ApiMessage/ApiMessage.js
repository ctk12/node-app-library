"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Error;
(function (Error) {
    Error["FORBIDDEN"] = "Your account is not authorized to access the requested resource.";
    Error["UNAUTHORIZED"] = "You are unauthorized to access the requested resource. Please log in.";
    Error["MISSING_PARAMETER"] = "The requested resource is missing required parameters.";
    Error["NOT_FOUND"] = "We could not find the resource you requested";
    Error["UPLOAD_FAILED"] = "Upload failed";
    Error["CREATED_FAILED"] = "Create failed";
    Error["UPDATE_FAILED"] = "Update failed";
    Error["DELETE_FAILED"] = "Delete failed";
    Error["INVITE_FAILED"] = "Invite sent failed";
    Error["EMAIL_VERIFY_FAILED"] = "Email verification failed";
    Error["INVALID_OTP"] = "INVALID OTP";
    Error["INVALID_EMAIL"] = "Invalid Email";
    Error["OTP_EXPIRED"] = "OTP EXPIRED";
    Error["NUMBER_TAKEN"] = "Phone number already taken";
    Error["EMAIL_TAKEN"] = "Email already taken";
    Error["NAME_TAKEN"] = "Name already taken";
    Error["USERNAME_TAKEN"] = "Username already taken";
    Error["USE_TRUECALLER"] = "You have exiting account, Use TrueCaller to login";
    Error["USE_PHONE_NUMBER"] = "You have exiting account, Use Phone number to login";
    Error["INCORRECT_EMAIL_PASS"] = "Incorrect email or password";
    Error["PASSWORD_RESET_FAILED"] = "Password reset failed";
    Error["NOT_ALLOWED"] = "Not allowed";
    Error["PASSWORD_REQUIRMENTS"] = "Password must contain at least one letter and one number";
    Error["TRANSACTION_EXITS"] = "Already transaction exits with same details";
})(Error || (Error = {}));
var Data;
(function (Data) {
    Data["SUCCESS"] = "Success";
    Data["UPDATED_SUCCESSFULLY"] = "Updated successfully";
    Data["DELETED_SUCCESSFULLY"] = "Deleted successfully";
    Data["CREATED_SUCCESSFULLY"] = "Created successfully";
    Data["UPLOAD_SUCCESSFULLY"] = "Uploaded successfully";
    Data["INVITE_SENT"] = "Invite sent successfully";
    Data["OTP_SENT"] = "OTP sent successfully";
    Data["PASSWORD_RESET_SUCCESS"] = "Password reset successfully";
    Data["EMAIL_VERIFY_SUCCESS"] = "Email verified successfully";
    Data["OTP_VERIFY_SUCCESS"] = "OTP verified successfully";
    Data["LOGOUT_SUCCESS"] = "Logout successfully";
})(Data || (Data = {}));
const ApiMessage = {
    Error,
    Data,
};
exports.default = ApiMessage;
