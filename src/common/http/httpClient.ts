import axios, { AxiosInstance, AxiosPromise, AxiosResponse, Method } from 'axios'

export interface Request<T = unknown> {
   headers?: Record<string, string>
   data?: T
   params?: T
}

export class HttpClient {
   private httpClient: AxiosInstance

   private async handleRequest<T>(
      url: string,
      method: Method,
      config: Request = {},
   ): Promise<AxiosResponse<T>> {
      const { headers, data, params } = config
      const response = await this.httpClient.request({
         url,
         method,
         data,
         params,
         headers,
      })
      return response
   }

   public get<T>(url: string, config: Request = {}): AxiosPromise<T> {
      return this.handleRequest(url, 'get', config)
   }

   public post<T>(url: string, config: Request = {}): AxiosPromise<T> {
      return this.handleRequest(url, 'post', config)
   }

   public put<T>(url: string, config: Request = {}): AxiosPromise<T> {
      return this.handleRequest(url, 'put', config)
   }

   public delete<T>(url: string, config: Request = {}): AxiosPromise<T> {
      return this.handleRequest(url, 'delete', config)
   }

   public patch<T>(url: string, config: Request = {}): AxiosPromise<T> {
      return this.handleRequest(url, 'patch', config)
   }

   constructor() {
      this.httpClient = axios.create({
         baseURL: import.meta.env.VITE_BACKEND_URL,
         timeout: 60000,
      })
   }
}

export default new HttpClient()
