import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import bcrypt from "bcryptjs";

const VALID_ROLES = [
  "CLIENT_INDIVIDUAL",
  "CLIENT_COMPANY",
  "COLLECTOR",
  "SORTING_AGENT",
  "FARMER",
  "BUYER",
  "MUNICIPALITY",
] as const;

export async function POST(req: Request) {
  try {
    const { name, email, password, role } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email et mot de passe requis" }, { status: 400 });
    }

    const selectedRole = role || "CLIENT_INDIVIDUAL";
    if (!VALID_ROLES.includes(selectedRole)) {
      return NextResponse.json({ error: "Rôle invalide" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: "Cet email est déjà utilisé" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: selectedRole,
      },
    });

    return NextResponse.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    console.error("REGISTER_ERROR:", error);
    return NextResponse.json({ error: "Erreur lors de l'inscription" }, { status: 500 });
  }
}
