import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";

interface Routes {
  [key: string]: boolean;
}

const publicOnlyUrls: Routes = {
  "/": true,
  "/login": true,
  "/sms": true,
  "/create-account": true,
  "/github/start": true,
  "/github/complete": true,
};

export async function middleware(request: NextRequest) {
  //   console.log(request.nextUrl);
  //   console.log(request.nextUrl.pathname);
  //   console.log(request.url);
  //   console.log(request.cookies.getAll());
  console.log("middleware");
  //   const { pathname } = request.nextUrl;
  //   if (pathname === "/") {
  //     const response = NextResponse.next();
  //     response.cookies.set("middleware-cookie", "hello world");
  //     return response;
  //   }
  //   if (pathname === "/profile") {
  //     return NextResponse.redirect(new URL("/", request.nextUrl));
  //   }
  const session = await getSession();
  const exists = publicOnlyUrls[request.nextUrl.pathname];
  if (!session.id) {
    if (!exists) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    if (exists) {
      //   return NextResponse.redirect(new URL("/products", request.url));
      return NextResponse.redirect(new URL("/home", request.url));
    }
  }
}

export const config = {
  //   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
  // !은 not을 의미한다. api, _next/static, _next/image, favicon.ico를 제외한 모든 url에 대해 middleware를 적용한다.
  // middleware함수에서 if문을 사용하여 설정하든지, matcher를 통해 설정하든지 둘 중 하나만 사용하면 된다.
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
