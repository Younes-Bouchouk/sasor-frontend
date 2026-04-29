import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { renderHook, waitFor } from "@testing-library/react";
import { useExitEvent } from "../../src/hooks/useExitEvent";
import { exitEventService } from "../../src/services/eventService";
import { queryWrapper } from "../helpers/queryWrapper";

jest.mock("../../src/services/api", () => ({
  fetchAPI: jest.fn(),
}));
jest.mock("../../src/contexts/AuthProvider", () => ({
  useAuth: jest.fn(),
}));

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { fetchAPI } = require("../../src/services/api") as {
  fetchAPI: jest.Mock;
};
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { useAuth } = require("../../src/contexts/AuthProvider") as {
  useAuth: jest.Mock;
};

beforeEach(() => {
  jest.clearAllMocks();
  useAuth.mockReturnValue({ token: "test-token-123" });
});

describe("Quitter un événement", () => {
  describe("exitEventService", () => {
    it("renvoie la réponse API et appelle DELETE /events/:id/exit", async () => {
      const apiResponse = { left: true };
      fetchAPI.mockResolvedValue(apiResponse as never);
      await expect(exitEventService(4, "tok")).resolves.toEqual(apiResponse);
      expect(fetchAPI).toHaveBeenCalledWith(
        "/events/4/exit",
        "DELETE",
        "tok",
        {},
      );
    });

    it("expose un message métier si l’API échoue", async () => {
      fetchAPI.mockRejectedValue(new Error("network") as never);
      await expect(exitEventService(2, "tok")).rejects.toThrow(
        "Erreur lors de la sortie de l'événement",
      );
    });
  });

  describe("useExitEvent", () => {
    it("met à jour la mutation en succès et utilise le token useAuth pour DELETE", async () => {
      const apiResponse = { ok: true };
      fetchAPI.mockResolvedValue(apiResponse as never);
      const { result } = renderHook(() => useExitEvent(), {
        wrapper: queryWrapper,
      });
      result.current.mutate(8);
      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data).toEqual(apiResponse);
      expect(fetchAPI).toHaveBeenCalledWith(
        "/events/8/exit",
        "DELETE",
        "test-token-123",
        {},
      );
    });

    it("passe le token courant de useAuth à fetchAPI", async () => {
      fetchAPI.mockResolvedValue({} as never);
      useAuth.mockReturnValue({ token: "exit-token-xyz" });
      const { result } = renderHook(() => useExitEvent(), {
        wrapper: queryWrapper,
      });
      result.current.mutate(12);
      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(fetchAPI).toHaveBeenCalledWith(
        "/events/12/exit",
        "DELETE",
        "exit-token-xyz",
        {},
      );
    });
  });
});
