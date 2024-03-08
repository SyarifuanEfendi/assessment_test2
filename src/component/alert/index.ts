import Swal from "sweetalert2";
import { SweetAlertOptions } from "sweetalert2";

const AlertHandler = async (p: SweetAlertOptions) => {
  return await Swal.fire(p);
};

export default AlertHandler;
