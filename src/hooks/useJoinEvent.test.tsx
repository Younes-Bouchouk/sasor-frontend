import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook } from "@testing-library/react";
import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useJoinEvent } from "./useJoinEvent";

const fetchAPIMock = vi.hoisted(() => vi.fn());

vi.mock("../contexts/AuthProvider", () => ({
  useAuth: () => ({
    token: "token-factice-pour-le-test",
  }),
}));

vi.mock("../services/api", () => ({
  fetchAPI: fetchAPIMock,
}));

function createWrapper() {
  const client = new QueryClient({
    defaultOptions: { mutations: { retry: false }, queries: { retry: false } },
  });
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
  };
}

describe("useJoinEvent", () => {
  beforeEach(() => {
    fetchAPIMock.mockReset();
  });

  it("appelle fetchAPI avec POST, le chemin /events/:id/join et le token mocké", async () => {
    fetchAPIMock.mockResolvedValue({ ok: true });

    const { result } = renderHook(() => useJoinEvent(), {
      wrapper: createWrapper(),
    });

    await result.current.mutateAsync(42);

    expect(fetchAPIMock).toHaveBeenCalledOnce();
    expect(fetchAPIMock).toHaveBeenCalledWith(
      "/events/42/join",
      "POST",
      "token-factice-pour-le-test",
      {},
    );
  });

  it("remonte une erreur si fetchAPI échoue", async () => {
    fetchAPIMock.mockRejectedValue(new Error("réseau"));

    const { result } = renderHook(() => useJoinEvent(), {
      wrapper: createWrapper(),
    });

    await expect(result.current.mutateAsync(1)).rejects.toThrow(
      "Erreur lors de l'inscription à l'événement",
    );
  });
});
