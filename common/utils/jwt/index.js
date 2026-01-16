import jwt from "jsonwebtoken";

export const generateToken = (user, expiresIn) => {
  if (!user) return null;

  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is missing");

  return jwt.sign(
    { userId: user.id }, 
    secret,
    { expiresIn }
  );
};
