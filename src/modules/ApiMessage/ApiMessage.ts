enum Error {
  FORBIDDEN = "Your account is not authorized to access the requested resource.",
  UNAUTHORIZED = "You are unauthorized to access the requested resource. Please log in.",
  MISSING_PARAMETER = "The requested resource is missing required parameters.",
  NOT_FOUND = "We could not find the resource you requested",
  UPLOAD_FAILED = "Upload failed",
  CREATED_FAILED = "Create failed",
  UPDATE_FAILED = "Update failed",
  DELETE_FAILED = "Delete failed",
  INVITE_FAILED = "Invite sent failed",
  EMAIL_VERIFY_FAILED = "Email verification failed",
  INVALID_OTP = "INVALID OTP",
  INVALID_EMAIL = "Invalid Email",
  OTP_EXPIRED = "OTP EXPIRED",
  NUMBER_TAKEN = "Phone number already taken",
  EMAIL_TAKEN = "Email already taken",
  NAME_TAKEN = "Name already taken",
  USERNAME_TAKEN = "Username already taken",
  USE_TRUECALLER = "You have exiting account, Use TrueCaller to login",
  USE_PHONE_NUMBER = "You have exiting account, Use Phone number to login",
  INCORRECT_EMAIL_PASS = "Incorrect email or password",
  PASSWORD_RESET_FAILED = "Password reset failed",
  NOT_ALLOWED = "Not allowed",
  PASSWORD_REQUIRMENTS = "Password must contain at least one letter and one number",
  TRANSACTION_EXITS = "Already transaction exits with same details",
}

enum Data {
  SUCCESS = "Success",
  UPDATED_SUCCESSFULLY = "Updated successfully",
  DELETED_SUCCESSFULLY = "Deleted successfully",
  CREATED_SUCCESSFULLY = "Created successfully",
  UPLOAD_SUCCESSFULLY = "Uploaded successfully",
  INVITE_SENT = "Invite sent successfully",
  OTP_SENT = "OTP sent successfully",
  PASSWORD_RESET_SUCCESS = "Password reset successfully",
  EMAIL_VERIFY_SUCCESS = "Email verified successfully",
  OTP_VERIFY_SUCCESS = "OTP verified successfully",
  LOGOUT_SUCCESS = "Logout successfully",
}

const ApiMessage = {
  Error,
  Data,
};

export default ApiMessage;
