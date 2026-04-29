import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { renderHook, waitFor } from "@testing-library/react";
import { useJoinEvent } from "../../src/hooks/useJoinEvent";
import { joinEventService } from "../../src/services/eventService";
import { queryWrapper } from "../helpers/queryWrapper";

jest.mock("../../src/services/api", () => ({
  fetchAPI: jest.fn(),
}));
jest.mock("../../src/contexts/AuthProvider", () => ({
  useAuth: jest.fn(),
}));

// eslint-disable-next-line @typescript-eslint/no-require-imports -- mocks Jest après jest.mock
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

describe("Rejoindre un événement", () => {
  describe("joinEventService", () => {
    it("renvoie la réponse API et appelle POST /events/:id/join", async () => {
      const apiResponse = { id: 1, name: "Party" };
      fetchAPI.mockResolvedValue(apiResponse as never);
      await expect(joinEventService(1, "tok")).resolves.toEqual(apiResponse);
      expect(fetchAPI).toHaveBeenCalledWith("/events/1/join", "POST", "tok", {});
    });

    it("expose un message métier si l’API échoue", async () => {
      fetchAPI.mockRejectedValue(new Error("network") as never);
      await expect(joinEventService(1, "tok")).rejects.toThrow(
        "Erreur lors de l'inscription à l'événement",
      );
    });

    it("expose le même message métier si l’événement est complet (API refuse)", async () => {
      fetchAPI.mockRejectedValue(new Error("409 EVENT_FULL") as never);
      await expect(joinEventService(42, "tok")).rejects.toThrow(
        "Erreur lors de l'inscription à l'événement",
      );
    });
  });

  describe("useJoinEvent", () => {
    it("met à jour la mutation en succès avec les données renvoyées", async () => {
      const apiResponse = { id: 1 };
      fetchAPI.mockResolvedValue(apiResponse as never);
      const { result } = renderHook(() => useJoinEvent(), {
        wrapper: queryWrapper,
      });
      result.current.mutate(1);
      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data).toEqual(apiResponse);
      expect(fetchAPI).toHaveBeenCalledWith(
        "/events/1/join",
        "POST",
        "test-token-123",
        {},
      );
    });

    it("met la mutation en erreur si l’événement est complet", async () => {
      fetchAPI.mockRejectedValue(new Error("capacity reached") as never);
      const { result } = renderHook(() => useJoinEvent(), {
        wrapper: queryWrapper,
      });
      result.current.mutate(7);
      await waitFor(() => expect(result.current.isError).toBe(true));
      expect(result.current.error).toMatchObject({
        message: "Erreur lors de l'inscription à l'événement",
      });
    });
  });
});
