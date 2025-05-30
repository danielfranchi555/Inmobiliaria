"use server";

import { prisma } from "@/lib/prisma/prisma";
import { SignUpSchema } from "../schemas/auth/signup";
import bcrypt from "bcryptjs";
import { loginSchema } from "../schemas/auth/login";
import { createSession, deleteSession } from "./sessionActions";

export type FormStateRegister =
  | {
      success: boolean;
      role?: string;
      errors?: {
        name?: string[];
        lastname?: string[];
        email?: string[];
        password?: string[];
        phone?: string[];
      };
      redirectUrl?: string;
      message?: string;
    }
  | undefined;

export type FormStateLogin =
  | {
      success: boolean;
      errors?: {
        email?: string[];
        password?: string[];
      };
      redirectUrl?: string;
      message?: string;
    }
  | undefined;

export async function registerUser(
  state: FormStateRegister,
  data: FormData
): Promise<FormStateRegister> {
  try {
    const formData = Object.fromEntries(data);
    const validatedFields = SignUpSchema.safeParse(formData);

    if (!validatedFields.success) {
      return {
        success: false,
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Error de validación",
      };
    }

    const userExist = await prisma.user.findUnique({
      where: {
        email: formData.email as string,
      },
    });

    if (userExist) {
      return {
        success: false,
        message: "El usuario ya existe",
      };
    }

    // Hash the user's password
    const password = formData.password as string;
    const hashedPassword = await bcrypt.hash(password, 10);

    const userCreate = await prisma.user.create({
      data: {
        name: formData.name as string,
        email: formData.email as string,
        password: hashedPassword,
        lastName: formData.lastname as string,
        phone: formData.phone as string,
        role: "BUYER", // Default role
      },
    });

    if (!userCreate) {
      return {
        success: false,
        message: "Error al crear el usuario",
      };
    }
    // create session
    await createSession({
      userId: userCreate.id,
      role: userCreate.role,
      name: userCreate.name,
      expiresAt: new Date(Date.now() + 60 * 60 * 1000),
    });

    return {
      success: true,
      message: "Usuario registrado con éxito",
      role: userCreate.role,
      redirectUrl: userCreate.role === "ADMIN" ? "/admin" : "/",
    };
  } catch (error) {
    return {
      success: false,
      message: "Ocurrió un error inesperado. Por favor, inténtalo más tarde.",
      redirectUrl: "/auth/login",
      role: undefined,
    };
  }
}

export async function login(prevState: FormStateLogin, formData: FormData) {
  try {
    // obtener la data y convertirla a un objeto
    const data = Object.fromEntries(formData);
    //parsear la data con zod
    const validatedFields = loginSchema.safeParse(data);

    if (validatedFields.success === false) {
      return {
        success: false,
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Error validando los campos",
      };
    }

    // check if user exists
    const user = await prisma.user.findUnique({
      where: {
        email: data.email as string,
      },
    });

    if (!user) {
      return {
        success: false,
        message: "Credenciales inválidas",
      };
    }

    // check if password is correct
    const isPasswordValid = await bcrypt.compare(
      data.password as string,
      user.password as string
    );

    // if password is not valid, return error
    if (!isPasswordValid) {
      return {
        success: false,
        message: "Credenciales inválidas",
      };
    }

    // create session
    const userId = user.id;
    await createSession({
      userId,
      role: user.role,
      name: user.name,
      expiresAt: new Date(Date.now() + 60 * 60 * 1000),
    });

    // Obtén el redirectTo del formData o usa el valor predeterminado
    const redirectTo = data.redirectTo as string;
    // Si no hay redirectTo, usa la ruta según el rol del usuario
    const redirectUrl = redirectTo || (user.role === "ADMIN" ? "/admin" : "/");

    return {
      success: true,
      message: "Inicio de sesión exitoso",
      redirectUrl,
    };
  } catch (error) {
    return {
      success: false,
      message: "Ocurrió un error inesperado. Por favor, inténtalo más tarde.",
      redirectUrl: "/auth/login",
    };
  }
}

export async function logout() {
  // delete session
  await deleteSession();
}

export async function getUserData(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return {
        success: false,
        message: "Usuario no encontrado",
      };
    }

    return {
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
      message: "Datos del usuario obtenidos con éxito",
    };
  } catch (error) {
    return {
      success: false,
      message: "Error al obtener los datos del usuario",
    };
  }
}
