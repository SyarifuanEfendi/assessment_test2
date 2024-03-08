"use client";

import { useRouter } from "next/navigation";
import LayoutWrapper from "@/component/card";
import { useData } from "../provider";
import React from "react";

export default function Client() {
  const router = useRouter();
  const { state, action } = useData();

  let fields = [];

  switch (state.mode) {
    case "create":
      fields = [
        { name: "firstname", type: "string", label: "Firstname" },
        { name: "lastname", type: "string", label: "Lastname" },
        { name: "email", type: "email", label: "Email" },
        { name: "password", type: "password", label: "Password" },
      ];
      break;
    case "view":
      fields = [
        { name: "firstname", type: "string", label: "Firstname" },
        { name: "lastname", type: "string", label: "Lastname" },
        { name: "email", type: "email", label: "Email" },
      ];
      break;
    case "edit":
      fields = [
        { name: "firstname", type: "string", label: "Firstname" },
        { name: "lastname", type: "string", label: "Lastname" },
      ];
      break;
    case "delete":
      fields = [
        { name: "firstname", type: "string", label: "Firstname" },
        { name: "lastname", type: "string", label: "Lastname" },
      ];
      break;
    case "password":
      fields = [
        { name: "passwordlama", type: "password", label: "Password Lama" },
        { name: "password", type: "password", label: "Password Baru" },
      ];
    default:
      fields = [{ name: "", type: "", label: "" }];
      break;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    action.setField({ ...state.field, [name]: value });
  };

  return (
    <LayoutWrapper title={state.title}>
      <div className="p-4 flex flex-grow items-center justify-center">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-96">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {state.title}
            </h3>
          </div>
          <form className="p-4" onSubmit={(e) => action.saveData(e)}>
            <input type="hidden" name="id" value={state.field.id} />
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                {fields.map((field, index) => (
                  <div key={index}>
                    <label
                      htmlFor="field.name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      value={(state.field as any)[field.name] || ""}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    />
                  </div>
                ))}
              </div>
              <div className="flex">
                <button
                  disabled={state.isLoading}
                  type="submit"
                  className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {/* {state.mode === "create" && (
                    <svg
                      className="me-1 -ms-1 w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  )} */}
                  {state.isLoading ? "Loading..." : state.mode + " users"}
                </button>
                {/* <button
                  className="text-white inline-flex items-center ml-3 bg-red-500 rounded-lg text-sm px-3 py-2.5 text-center"
                  onClick={() => {
                    action.setIsLoading(false)
                    router.push("/users");
                    console.log(state.isLoading);
                    
                  }}
                >
                  Back
                </button> */}
              </div>
            </div>
          </form>
          {/* <form className="p-4 md:p-5" onSubmit={(e) => action.saveData(e)}>
            <input type="hidden" name="id" value={state.field.id} />
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2 sm:col-span-1">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Firstname
                </label>
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Firstname"
                  value={state.field.firstname}
                  onChange={(e) =>
                    action.setField({ firstname: e.target.value })
                  }
                  required
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Lastname
                </label>
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Lastname"
                  value={state.field.lastname}
                  onChange={(e) =>
                    action.setField({ lastname: e.target.value })
                  }
                />
              </div>
              <div className="col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="name@company.com"
                />
              </div>
              <div className="col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                />
              </div>
            </div>
            <button
              disabled={state.isLoading}
              type="submit"
              className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {state.mode === "create" && (
                <svg
                  className="me-1 -ms-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              )}
              {state.isLoading ? "Loading..." : state.mode + " users"}
            </button>
          </form> */}
        </div>
      </div>
    </LayoutWrapper>
  );
}
