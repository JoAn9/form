import * as toastr from 'toastr';
import "../node_modules/toastr/build/toastr.min.css";

export class ErrorHandler {
  static handle(error) {
    if ('repetition') {
      toastr.error("User with this email already exists")
    } else {
      toastr.info("Unknown error");
    }
  }
}