import AxiosRequest from "./axios.request";
import BaseRequest from "./base.request";
import AlertHandler from "@/component/alert";

const ReqDialect = process.env.NEXT_PUBLIC_REQUEST_DIALECT || "axios";

type RequestDefault = {
  baseUrl?: string;
  url: string;
  body?: Record<string, any>;
  dataId: string;
  mode: string;
  flowData?: any;
  headers?: Record<string, string>;
  params?: Record<string, string>;
  alertOnSuccess?: boolean;
  alertOnFail?: boolean;
  alertSuccessMessage?: string;
  alertFailMessage?: string;
};

let req: BaseRequest;
req = new AxiosRequest();

const request = async (p: RequestDefault) => {
  try {
    const res = await req.post({
      baseUrl: p.baseUrl,
      body: {
        data: p.body,
        dataId: p.dataId,
        mode: p.mode,
        flowData: p.flowData,
      },
      url: p.url,
      headers: {
        ...p.headers,
        "Content-Type": "application/json",
        accept: "application/json",
      },
      params: p.params,
    });
    if (p.alertOnSuccess) {
      AlertHandler({
        icon: "success",
        title: p.alertSuccessMessage || "Success",
      });
    }
    return {
      success: true,
      data: res.data,
    };
  } catch (e) {
    if (p.alertOnFail) {
      AlertHandler({
        icon: "error",
        title: p.alertFailMessage || "Failed",
      });
    }
    return {
      success: false,
      data: {},
    };
  }
};

export default request;
