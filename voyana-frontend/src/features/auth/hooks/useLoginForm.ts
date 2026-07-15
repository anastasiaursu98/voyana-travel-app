import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../app/router/routes";
import { useAppDispatch } from "../../../app/store/hooks";
import { isApiErrorInfo } from "../../../shared/utils/apiError";
import type { LoginFormValues } from "../schemas/auth.schemas";
import { loginSchema } from "../schemas/auth.schemas";
import { loginUser } from "../store/authSlice";
import { toCheckboxProps, toTextFieldProps } from "../utils/formFieldProps";
import { getFormErrorMessage } from "../utils/getFormErrorMessage";
import { usePasswordVisibility } from "./usePasswordVisibility";

export function useLoginForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const passwordVisibility = usePasswordVisibility();
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberFor30Days: false,
    },
  });

  const submitForm = handleSubmit(async (data) => {
    setFormError(null);

    try {
      await dispatch(
        loginUser({
          email: data.email,
          password: data.password,
        }),
      ).unwrap();

      navigate(routes.home);
    } catch (error) {
      console.error("Login failed:", error);

      if (isApiErrorInfo(error) && error.code === "EMAIL_NOT_VERIFIED") {
        navigate(routes.otpVerification, {
          state: { backTo: routes.login, email: data.email },
        });

        return;
      }

      setFormError(
        getFormErrorMessage(error, "Login failed. Please try again."),
      );
    }
  });

  return {
    formError,
    isSubmitting,
    submitForm,
    emailFieldProps: toTextFieldProps(register("email"), errors.email),
    passwordFieldProps: {
      ...toTextFieldProps(register("password"), errors.password),
      isVisible: passwordVisibility.isVisible,
      onToggleVisibility: passwordVisibility.toggleVisibility,
    },
    rememberCheckboxProps: toCheckboxProps(register("rememberFor30Days")),
  };
}

export type LoginFormModel = ReturnType<typeof useLoginForm>;
