export const toPublicAuthUser = (user: {
  _id: unknown;
  firstName: string;
  lastName: string;
  email: string;
  isEmailVerified: boolean;
}) => ({
  id: user._id,
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  isEmailVerified: user.isEmailVerified,
});
