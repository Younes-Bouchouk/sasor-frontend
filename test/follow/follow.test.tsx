import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { renderHook, waitFor } from "@testing-library/react";
import { useFollowUser } from "../../src/hooks/useFollowUser";
import { useUnfollowUser } from "../../src/hooks/useUnfollowUser";
import {
  followUserService,
  unfollowUserService,
} from "../../src/services/followService";
import { queryWrapper } from "../helpers/queryWrapper";

jest.mock("../../src/services/api", () => ({
  fetchAPI: jest.fn(),
}));
jest.mock("@/features/auth", () => ({
  useAuth: jest.fn(),
}));

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { fetchAPI } = require("../../src/services/api") as {
  fetchAPI: jest.Mock;
};
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { useAuth } = require("@/features/auth") as {
  useAuth: jest.Mock;
};

beforeEach(() => {
  jest.clearAllMocks();
  useAuth.mockReturnValue({ token: "test-token-123" });
});

describe("Suivi utilisateur", () => {
  describe("followUserService", () => {
    it("renvoie la réponse API et appelle POST /follows/me avec followingId", async () => {
      const apiResponse = { id: 10, followingId: 5 };
      fetchAPI.mockResolvedValue(apiResponse as never);
      await expect(followUserService(5, "tok")).resolves.toEqual(apiResponse);
      expect(fetchAPI).toHaveBeenCalledWith("/follows/me", "POST", "tok", {
        followingId: 5,
      });
    });

    it("expose un message métier si l’API échoue", async () => {
      fetchAPI.mockRejectedValue(new Error("Server Down") as never);
      await expect(followUserService(1, "tok")).rejects.toThrow(
        "Erreur lors du suivi de l'utilisateur",
      );
    });
  });

  describe("unfollowUserService", () => {
    it("renvoie la réponse API et appelle DELETE /follows/me avec followingId", async () => {
      const apiResponse = { ok: true };
      fetchAPI.mockResolvedValue(apiResponse as never);
      await expect(unfollowUserService(7, "tok")).resolves.toEqual(apiResponse);
      expect(fetchAPI).toHaveBeenCalledWith("/follows/me", "DELETE", "tok", {
        followingId: 7,
      });
    });

    it("expose un message métier si l’API échoue", async () => {
      fetchAPI.mockRejectedValue(new Error("timeout") as never);
      await expect(unfollowUserService(2, "tok")).rejects.toThrow(
        "Erreur lors du désabonnement de l'utilisateur",
      );
    });
  });

  describe("useFollowUser", () => {
    it("met à jour la mutation en succès et envoie le token useAuth", async () => {
      const apiResponse = { id: 1 };
      fetchAPI.mockResolvedValue(apiResponse as never);
      const { result } = renderHook(() => useFollowUser(), {
        wrapper: queryWrapper,
      });
      result.current.mutate(3);
      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data).toEqual(apiResponse);
      expect(fetchAPI).toHaveBeenCalledWith("/follows/me", "POST", "test-token-123", {
        followingId: 3,
      });
    });
  });

  describe("useUnfollowUser", () => {
    it("met à jour la mutation en succès et envoie le token useAuth", async () => {
      fetchAPI.mockResolvedValue({ removed: true } as never);
      const { result } = renderHook(() => useUnfollowUser(), {
        wrapper: queryWrapper,
      });
      result.current.mutate(9);
      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(fetchAPI).toHaveBeenCalledWith("/follows/me", "DELETE", "test-token-123", {
        followingId: 9,
      });
    });
  });
});
