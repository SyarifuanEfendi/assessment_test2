import { pool } from "@/lib/dbconn";
import { UserCreateService } from "@/services/users/service";
import { NextResponse, NextRequest } from "next/server";
import { PoolClient } from "pg";
import { createData, deleteData, getData, updateData } from "./services";
import { responseBasicOK, responseWithData } from "@/lib/response";

export async function POST(request: NextRequest, client?: PoolClient) {
  const qParams = request.nextUrl.searchParams;
  const body = await request.json();
  const { dataId, data, mode } = body;

  switch (dataId) {
    case "getData":
      const rows = await getData();
      return responseWithData({ rows: rows });
    case "getDetail":
      const detail = await getData(data.id);
      return responseWithData({ rows: detail });
    case "saveData":
      console.log(mode);
      
      if (mode === "create") {
        const create = await createData(data.data);
        // return responseBasicOK({
        //   status: create?.status_code,
        //   statusText: create?.message,
        // });
        return NextResponse.json({
          status: create.status,
          statusText: create.message,
        });
      } else if (mode === "edit") {
        const edit = await updateData(data.data.id, data.data);
        // return responseBasicOK({
        //   status: create?.status_code,
        //   statusText: create?.message,
        // });
        return NextResponse.json({
          status: edit.status,
          statusText: edit.message,
        });
      } else if (mode === "password") {
        const uPassword = await deleteData(data.data.id, data.data);
        // return responseBasicOK({
        //   status: uPassword?.status_code,
        //   statusText: uPassword?.message,
        // });
        return NextResponse.json({
          status: uPassword.status,
          statusText: uPassword.message,
        });
      } else {
        const dData = await deleteData(data.data.id);
        // return responseBasicOK({
        //   status: dData?.status_code,
        //   statusText: dData?.message || "",
        // });
        return NextResponse.json({
          status: dData.status,
          statusText: dData.message,
        });
      }
      break;
    default:
      return NextResponse.json(null, {
        status: 400,
        statusText: "Invalid parameter",
      });
  }
}
