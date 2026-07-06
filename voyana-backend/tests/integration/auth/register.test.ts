import request from "supertest";
import app from "../../../src/app";
import {
  clearTestDB,
  connectTestDB,
  disconnectTestDB,
} from "../../setup/mongoMemoryServer";

const mockSendEmail = jest.fn();

jest.mock("../../../src/shared/email/email.service", () => ({
  sendEmail: (...args: unknown[]) => mockSendEmail(...args),
}));

beforeAll(connectTestDB);
beforeEach(() => {
  mockSendEmail.mockResolvedValue({ messageId: "test-message-id" });
});
afterEach(clearTestDB);
afterAll(disconnectTestDB);

const validRegisterPayload = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  password: "Password1!",
};

describe("POST /api/auth/register", () => {
  it("should register a new user successfully", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send(validRegisterPayload)
      .expect(201);

    expect(response.body).toEqual({
      success: true,
      data: {
        id: expect.any(String),
        firstName: validRegisterPayload.firstName,
        lastName: validRegisterPayload.lastName,
        email: validRegisterPayload.email,
        isEmailVerified: false,
      },
      message: "User registered successfully",
    });

    expect(mockSendEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: validRegisterPayload.email,
        subject: "Verify your Voyana account",
        text: expect.stringMatching(/Security code: \d{6}/),
      }),
    );
  });

  it("should return validation errors for missing required fields", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({})
      .expect(400);

    expect(response.body).toEqual({
      success: false,
      code: "VALIDATION_ERROR",
      message: "Invalid register input",
      statusCode: 400,
      errors: {
        firstName: ["First name is required"],
        lastName: ["Last name is required"],
        email: ["Email is required"],
        password: ["Password is required"],
      },
    });
  });

  it("should return a conflict error when user already exists", async () => {
    await request(app)
      .post("/api/auth/register")
      .send(validRegisterPayload)
      .expect(201);

    const response = await request(app)
      .post("/api/auth/register")
      .send(validRegisterPayload)
      .expect(409);

    expect(response.body).toEqual({
      success: false,
      message: "User already exists",
      code: "CONFLICT",
      statusCode: 409,
      errors: {
        email: ["Email is already in use"],
      },
    });
  });
});
