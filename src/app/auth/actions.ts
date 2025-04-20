"use server";

import { prisma } from "@/lib/prisma/prisma";
import { SignUpSchema } from "../schemas/auth/signup";
import bcrypt from "bcryptjs";
import { loginSchema } from "../schemas/auth/login";
import { createSession } from "./sessionActions";

export type FormStateRegister =
  | {
      success: boolean;
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
        phone?: string[];
      };
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
      message?: string;
    }
  | undefined;

export async function registerUser(
  state: FormStateRegister,
  data: FormData
): Promise<FormStateRegister> {
  const formData = Object.fromEntries(data);
  const validatedFields = SignUpSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation error",
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
      message: "User already exists",
    };
  }

  // Hash the user's password
  const password = formData.password as string;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const userCreate = await prisma.user.create({
      data: {
        name: formData.name as string,
        email: formData.email as string,
        password: hashedPassword,
        phone: formData.phone as string,
        role: "BUYER",
      },
    });

    // 4. Create a session for the user
    console.log("User created successfully", userCreate);

    const userId = userCreate.id;
    await createSession(userId);

    return {
      success: true,
      message: "User registered successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Error creating user",
    };
  }
}

export async function login(prevState: FormStateLogin, formData: FormData) {
  // obtener la data y convertirla a un objeto
  const data = Object.fromEntries(formData);
  //parsear la data con zod
  const validatedFields = loginSchema.safeParse(data);

  if (validatedFields.success === false) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Error validating fields",
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
      message: "User not found",
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
      message: "Invalid Credentials",
    };
  }

  // create session
  const userId = user.id;
  await createSession(userId);

  // if everything is ok, return success
  return {
    success: true,
    message: "Login successful",
  };
}
