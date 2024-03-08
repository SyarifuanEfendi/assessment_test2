import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { ReadonlyURLSearchParams } from "next/navigation";


export type DataWithPagination = {
  rows: Record<string, any>[];
  is_next_page: boolean;
  limit: number;
  page: number;
};

export type FormProps = {
  id?: string,
  firstname?: string;
  lastname?: string;
};
export type InitialState = {
  action: {
    getData(): any;
    saveData(data: any): any;
    setField(data: FormProps): any;
    setIsLoading(n: boolean): any;
  };
  state: {
    title: string;
    mode: Mode;
    data: DataWithPagination;
    isLoading: boolean;
    field: FormProps;
  };
  module: {
    module_name: string;
    module_path: string;
  };
  hooks: {
    router: AppRouterInstance;
    param: Params;
    pathname: string;
    searchParams: ReadonlyURLSearchParams;
  };
};

export type Mode = "create" | "edit" | "view" | "delete" | "password";