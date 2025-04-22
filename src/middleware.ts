import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "@/app/auth/sessionActions";

// Rutas que requieren rol específico
const protectedRoutes: { [key: string]: string[] } = {
  "/admin": ["ADMIN"],
};

// Rutas públicas sin necesidad de autenticación
const publicRoutes = ["/", "/login", "/signup"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(path);
  const allowedRoles = Object.entries(protectedRoutes).find(([route]) =>
    path.startsWith(route)
  )?.[1];

  const cookiesStorage = await cookies();
  const cookie = cookiesStorage.get("session")?.value;
  const session = await decrypt(cookie);

  // Ruta protegida y no logueado
  if (allowedRoles) {
    if (!session?.userId) {
      return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
    }

    if (!allowedRoles.includes(session.role as string)) {
      return NextResponse.redirect(new URL("/unauthorized", req.nextUrl));
    }
  }

  // Usuario logueado entra a una ruta pública (como login o register)
  if (isPublicRoute && session?.userId) {
    // Evita redirigir si ya estamos en la ruta correcta
    const redirectUrl = session.role === "ADMIN" ? "/admin" : "/";

    if (path !== redirectUrl) {
      return NextResponse.redirect(new URL(redirectUrl, req.nextUrl));
    }
  }

  return NextResponse.next();
}
