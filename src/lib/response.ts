import { NextResponse } from "next/server";

export interface responseBasicOK {
    status: number;
    statusText: string
}

export interface responseWithData {
    rows?: any
}

export const responseBasicOK = async (props: responseBasicOK): Promise<NextResponse> => {
    return NextResponse.json({status: props.status, statusText: props.statusText})
}

export const responseWithData = async (props: responseWithData): Promise<NextResponse> => {
    return NextResponse.json({rows: props.rows}, {status: 200, statusText: "SUCCESS"})
}