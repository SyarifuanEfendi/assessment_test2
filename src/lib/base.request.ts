export type baseProps = {
    baseUrl?: string,
    url: string,
    params?: Record<string, any>,
    headers?: Record<string, any>,
}

export type postProps = baseProps & {
    body: Record<string, any>,
}


/**
 * abstract class BaseRequest
 * 
 * abstract class for all request to backend services
 */

abstract class BaseRequest {

    /**
     * 
     * @param p baseProps
     * @returns Promise<any>
     */
    abstract get(p: baseProps): Promise<any>;

    /**
     * 
     * @param p postProps
     * @returns Promise<any>
     */
    abstract post(p: postProps): Promise<any>;

    /**
     * 
     * @param p postProps
     * @returns Promise<any>
     */
    abstract put(p: postProps): Promise<any>;

    /**
     * 
     * @param p baseProps
     * @returns Promise<any>
     */
    abstract delete(p: baseProps): Promise<any>;

}

export default BaseRequest;