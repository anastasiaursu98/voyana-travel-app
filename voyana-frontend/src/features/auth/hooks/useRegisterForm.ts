import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../app/router/routes";
import { useAppDispatch } from "../../../app/store/hooks";
import type { RegisterFormValues } from "../schemas/auth.schemas";
import { registerSchema } from "../schemas/auth.schemas";
import { registerUser } from "../store/authSlice";
import { toTextFieldProps } from "../utils/formFieldProps";
import { getFormErrorMessage } from "../utils/getFormErrorMessage";
import { usePasswordVisibility } from "./usePasswordVisibility";

const passwordHelperText =
  "Use 8+ chars with uppercase, number, and special character.";

export function useRegisterForm() {
  const navigate = useNavigate();
  const passwordVisibility = usePasswordVisibility();
  const confirmPasswordVisibility = usePasswordVisibility();
  const [formError, setFormError] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const submitForm = handleSubmit(async (data) => {
    setFormError(null);

    try {
      await dispatch(
        registerUser({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
        }),
      ).unwrap();
      localStorage.setItem("email", data.email);

      navigate(routes.otpVerification, {
        state: { backTo: routes.register },
      });
    } catch (error) {
      setFormError(
        getFormErrorMessage(error, "Registration failed. Please try again."),
      );
    }
  });

  return {
    formError,
    isSubmitting,
    submitForm,
    firstNameFieldProps: toTextFieldProps(
      register("firstName"),
      errors.firstName,
    ),
    lastNameFieldProps: toTextFieldProps(register("lastName"), errors.lastName),
    emailFieldProps: toTextFieldProps(register("email"), errors.email),
    passwordFieldProps: {
      ...toTextFieldProps(register("password"), errors.password),
      isVisible: passwordVisibility.isVisible,
      onToggleVisibility: passwordVisibility.toggleVisibility,
    },
    confirmPasswordFieldProps: {
      ...toTextFieldProps(
        register("confirmPassword"),
        errors.confirmPassword,
        passwordHelperText,
      ),
      isVisible: confirmPasswordVisibility.isVisible,
      onToggleVisibility: confirmPasswordVisibility.toggleVisibility,
    },
  };
}

export type RegisterFormModel = ReturnType<typeof useRegisterForm>;
