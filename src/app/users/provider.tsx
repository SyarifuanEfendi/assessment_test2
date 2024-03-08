"use client";

import React, { createContext, useState, useEffect } from "react";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { InitialState, Mode, DataWithPagination, FormProps } from "./type";
import request from "@/lib/defaulrequest";

let initialState: InitialState = {
  action: {
    getData() {},
    saveData(data: any) {},
    setField(data: FormProps) {},
    setIsLoading(n: false) {},
  },
  state: {
    title: "",
    mode: "create",
    data: {
      limit: 10,
      page: 1,
      rows: [],
      is_next_page: false,
    },
    isLoading: false,
    field: {
      id: "",
      firstname: "",
      lastname: "",
    },
  },
  module: {
    module_name: "",
    module_path: "",
  },
  hooks: {
    param: {},
    router: {} as any,
    pathname: "",
    searchParams: {} as any,
  },
};

const DataContext = createContext<typeof initialState>(initialState);

export const MODULE_NAME = "USERS";
export const MODULE_PATH = "users";

export function Provider(p: React.PropsWithChildren) {
  // react hooks
  const param = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { mode = "new" } = param;
  const [data, setData] = useState<DataWithPagination>({
    limit: 10,
    page: 1,
    rows: [],
    is_next_page: false,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [field, setField] = useState<{ [key: string]: string }>({});

  const saveData = async (e: any) => {
    try {
      // setIsLoading(true);
      e.preventDefault();

      let data: Record<string, any> = {};
      switch (param.mode) {
        case "create":
          data = {
            firstname: e.target.firstname.value || "",
            lastname: e.target.lastname.value || "",
            email: e.target.email.value || "",
            password: e.target.password.value || "",
          };
          break;
        case "edit":
          data = {
            firstname: e.target.firstname.value || "",
            lastname: e.target.lastname.value || "",
            email: e.target.email.value || "",
            id: e.target.id.value || "",
          };
          break;
        case "delete":
          data = {
            firstname: e.target.firstname.value || "",
            lastname: e.target.lastname.value || "",
            id: e.target.id.value || "",
          };
          break;
        case "password":
          data = {
            passwordlama: e.target.passwordlama.value || "",
            password: e.target.password.value || "",
            id: e.target.id.value || "",
          };
          break;
        default:
          break;
      }
      // if (["edit","password","delete"].includes(param.mode as string)) data["id"] = e.target.id.value;
      console.log(param.mode);
      console.log(data);

      const res = await request({
        dataId: "saveData",
        url: "http://localhost:3000/api/users",
        body: { data },
        mode: (param.mode as string) || "create",
      });
      console.log(res);
      
      // setIsLoading(false);
      if (res.success) {
        router.push(`/users`);
      } else {
        console.log("GAGAL");
      }
    } catch (error) {}
  };

  const getData = async () => {
    try {
      // setIsLoading(true);
      const res = await request({
        dataId: "getData",
        url: `http://localhost:3000/api/users`,
        body: {},
        mode: param.mode as string,
      });
      setData(res.data);
      // setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  const getDetail = async (id: string) => {
    try {
      // setIsLoading(true);
      const res = await request({
        dataId: "getDetail",
        url: "http://localhost:3000/api/users",
        body: { id },
        mode: param.mode as string,
      });

      if (res.success) {
        setField({
          id: res.data.rows[0].id,
          firstname: res.data.rows[0].firstname,
          lastname: res.data.rows[0].lastname,
          email: res.data.rows[0].email,
        });
        // setIsLoading(false);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  });

  useEffect(() => {
    const id = searchParams.get("id");
    if (
      ["edit", "view", "delete", "password"].includes(param.mode as string) &&
      id
    ) {
      getDetail(id);
    }
  });

  return (
    <DataContext.Provider
      value={{
        action: {
          getData,
          saveData,
          setField,
          setIsLoading,
        },
        state: {
          title: "Users",
          mode: mode as Mode,
          data,
          isLoading,
          field,
        },
        module: {
          module_name: MODULE_NAME,
          module_path: MODULE_PATH,
        },
        hooks: {
          param,
          router,
          pathname,
          searchParams,
        },
      }}
    >
      {p.children}
    </DataContext.Provider>
  );
}

export const useData = (): typeof initialState => React.useContext(DataContext);
