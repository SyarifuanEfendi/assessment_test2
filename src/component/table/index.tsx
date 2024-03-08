"use client";

import React, { useState, useEffect, useRef } from "react";
// import { useDispatch } from "react-redux";
import Link from "next/link";
import { TableProps, actionType } from "./interface";

export default function Table(props: TableProps): JSX.Element {
  // const disp = useDispatch();
  const [keySelected, setKeySelected] = useState<number | null>(null);
  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {props.columns.map(({ title, clasName, style, width }, i) => {
                return (
                  <th
                    key={`col-${i}`}
                    scope="col"
                    style={{ ...style }}
                    className="px-6 py-3"
                  >
                    <div className="fit-content inline-flex min-w-[100px]">
                      {title}
                    </div>
                  </th>
                );
              })}
              {props.withAction && (props.actionsMenu || [])?.length > 0 && (
                <th
                  scope="col"
                  key={"col-998"}
                  className="bg-sidebar py-1 px-2 text-right py-3"
                >
                  &nbsp;Action
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {props.data?.length < 0 ? (
              <>
                <tr>
                  <td
                    className="odd:bg-white border-b even:bg-gray-50 hover:bg-slate-200 pl-5"
                    colSpan={props.columns.length + 1}
                  >
                    No Data Records...
                  </td>
                </tr>
              </>
            ) : (
              props.data.map((item: any, l) => (
                <tr
                  key={`e-${l}`}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  {props.columns.map(({ style, width, field }, ix) => (
                    <td
                      key={`col-y-${ix}`}
                      className="font-medium text-gray-900 whitespace-nowrap"
                    >
                      {item[field as keyof typeof item]}
                    </td>
                  ))}
                  {props.withAction &&
                    (props.actionsMenu || [])?.length > 0 && (
                      <td className="py-1 px-2 text-right">
                        <ActionMore
                          listMenu={(props.actionsMenu || [])
                            .filter(({ onRender = () => true }) =>
                              onRender(item)
                            )
                            .map(
                              (
                                {
                                  id,
                                  name,
                                  onClick,
                                  onRender = () => true,
                                  className,
                                },
                                iM
                              ) => ({
                                id,
                                name,
                                onClick: () =>
                                  onClick(
                                    item,
                                    {
                                      name,
                                      onClick,
                                    },
                                    iM
                                  ),
                                onRender,
                                className,
                              })
                            )}
                        />
                      </td>
                    )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

function ActionMore(props: { listMenu: Array<actionType> }): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [coor, setCoor] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  // const [triggerRef, setTriggerRef] = useState<any>(null);
  // const [boxRef, setBoxRef] = useState<any>(null);
  // useOutside(boxRef, triggerRef, () => setIsOpen(false));
  const reffDrop = useRef<HTMLDivElement>(null);
  const onclickAnother = function (e: MouseEvent) {
    if (
      reffDrop.current &&
      !reffDrop.current?.contains(e.target as HTMLElement)
    ) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mouseup", onclickAnother);
    return () => {
      document.removeEventListener("mouseup", onclickAnother);
    };
  }, []);

  return (
    <div ref={reffDrop} className="w-full z-[999] text-center">
      <button
        onClick={() => {
          setIsOpen((v) => !v);
        }}
        className="float-right"
      >
        ||
      </button>
      {isOpen && (
        <div
          className={` fixed min-w-[150px] z-[999] duration-300 bg-slate-50 right-1 transition-all 
            ease-in-out overflow-hidden
            shadow-md `}
        >
          <ul className="w-full">
            {(props.listMenu || []).map((menu, i) => (
              <li
                key={`drp-${i}`}
                className="hover:bg-primary-400 hover:text-white border-b"
              >
                <button
                  className={`block text-left w-full px-2 py-1 text-sm ${menu.className}`}
                  // style={menu.style}
                  onClick={() => {
                    setIsOpen(false);
                    menu.onClick();
                  }}
                >
                  {menu.name}{" "}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

interface CollapsibleDivProps {
  children: React.ReactNode;
}

export const CollapsibleDiv: React.FC<CollapsibleDivProps> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <div className="rounded-md overflow-hidden mb-4">
      <div
        className={`flex justify-between items-center p-3 cursor-pointer ${
          isCollapsed ? "rounded-t-md" : "rounded-md"
        } border-b border-b-gray-300`}
        onClick={toggleCollapse}
      >
        <span className="font-medium">Filter Data</span>
      </div>
      {!isCollapsed && (
        <div className="p-3 border-t border-gray-300">{children}</div>
      )}
    </div>
  );
};
