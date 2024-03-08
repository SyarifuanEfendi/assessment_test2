import BaseRequest, { postProps, baseProps } from "./base.request";

import axios, { AxiosRequestConfig, AxiosResponse } from "axios";


class AxiosRequest extends BaseRequest {

    constructor() {
        super();
    }

    async get(p: baseProps): Promise<AxiosResponse> {
        let config: AxiosRequestConfig = {
            params: p.params,
            headers: p.headers,
        }

        let url = p.baseUrl ? p.baseUrl + p.url : p.url;

        return await axios.get(url, config)
    }

    async post(p: postProps): Promise<AxiosResponse> {
        let config: AxiosRequestConfig = {
            params: p.params,
            headers: p.headers,
        }

        let url = p.baseUrl ? p.baseUrl + p.url : p.url;

        return await axios.post(url, p.body, config)
    }

    async put(p: postProps): Promise<AxiosResponse> {
        let config: AxiosRequestConfig = {
            params: p.params,
            headers: p.headers,
        }

        let url = p.baseUrl ? p.baseUrl + p.url : p.url;

        return await axios.put(url, p.body, config)
    }

    async delete(p: baseProps): Promise<AxiosResponse> {
        let config: AxiosRequestConfig = {
            params: p.params,
            headers: p.headers,
        }

        let url = p.baseUrl ? p.baseUrl + p.url : p.url;

        return await axios.delete(url, config)
    }
}

export default AxiosRequest;