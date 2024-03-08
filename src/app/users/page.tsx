"use client";

import { useData } from "./provider";
import Table, { CollapsibleDiv } from "@/component/table";
import Link from "next/link";
import { columns } from "./metadata";
import LayoutWrapper from "@/component/card";
function Client() {
  const { state, action, hooks, module } = useData();
  return (
    <LayoutWrapper title="List Users">
      <div className="m-5 relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex justify-end">
          <Link
            href={`/users/create`}
            className="mb-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Create Data
          </Link>
        </div>
        <CollapsibleDiv>
          <div className="flex">
            <input
              type="text"
              name="firstname"
              id="firstname"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Firstname"
            />
            <button className="ml-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Cari
            </button>
          </div>
        </CollapsibleDiv>
        <Table
          data={state.data?.rows}
          columns={columns}
          withAction={true}
          filter={{
            handleFilterOnchange: action.getData,
            onSetFilter: action.getData,
          }}
          actionsMenu={[
            {
              id: "lihatusers",
              name: "Lihat",
              onClick: (item: any) =>
                hooks.router.push(`/${module.module_path}/view?id=${item.id}`),
            },
            {
              id: "ubahusers",
              name: "Ubah",
              onClick: (item: any) =>
                hooks.router.push(`/${module.module_path}/edit?id=${item.id}`),
            },
            {
              id: "ubahpassword",
              name: "Ubah Password",
              onClick: (item: any) =>
                hooks.router.push(`/${module.module_path}/password?id=${item.id}`),
            },
            {
              id: "deleteusers",
              name: "Delete",
              onClick: (item: any) =>
                hooks.router.push(`/${module.module_path}/delete?id=${item.id}`),
            },
          ]}
        ></Table>
      </div>
      {/* <div className="w-full">
      </div> */}
    </LayoutWrapper>
  );
}

export default Client;
