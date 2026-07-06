import { validateRegisterInput } from "../auth.validators";

describe("validateRegisterInput", () => {
  it("should retun successfully normalized input when valid data is provided", () => {
    const inputData = {
      firstName: " John ",
      lastName: " Doe ",
      email: " JOHN.DOE@EXAMPLE.COM ",
      password: "Password1!",
    };

    const validationResult = validateRegisterInput(inputData);
    expect(validationResult.value).toEqual({
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: "Password1!",
    });
  });

  it("should return body error when request body is not an object", () => {
    const validationResult = validateRegisterInput(null);

    expect(validationResult.errors).toEqual({
      body: ["Request body must be an object"],
    });
  });

  it("should return validation errors for missing required fields", () => {
    const inputData = {};

    const validationResult = validateRegisterInput(inputData);
    expect(validationResult.errors).toEqual({
      firstName: ["First name is required"],
      lastName: ["Last name is required"],
      email: ["Email is required"],
      password: ["Password is required"],
    });
  });

  it("should return error for invalid email format", () => {
    const inputData = {
      firstName: "John",
      lastName: "Doe",
      email: "invalid-email",
      password: "Password1!",
    };
    const validationResult = validateRegisterInput(inputData);
    expect(validationResult.errors).toEqual({
      email: ["Email is invalid"],
    });
  });
  it("should return error for invalid password format", () => {
    const inputData = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: "invalid",
    };
    const validationResult = validateRegisterInput(inputData);
    expect(validationResult.errors).toEqual({
      password: [
        "Password must be at least 8 characters",
        "Password must contain at least one uppercase letter",
        "Password must contain at least one number",
        "Password must contain at least one special character",
      ],
    });
  });
  it("should return error for last name with invalid characters and first name with invalid characters", () => {
    const inputData = {
      firstName: "John123",
      lastName: "Doe@!",
      email: "john.doe@example.com",
      password: "Password1!",
    };
    const validationResult = validateRegisterInput(inputData);
    expect(validationResult.errors).toEqual({
      firstName: [
        "First name can contain only letters, spaces, apostrophes and hyphens",
      ],
      lastName: [
        "Last name can contain only letters, spaces, apostrophes and hyphens",
      ],
    });
  });
});
