import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react-hooks';
import { jest } from '@jest/globals';
import { useJoinEvent } from '../../src/hooks/useJoinEvent';
import { joinEventService } from '../../src/services/eventService';
// Mocks
jest.mock('../../src/services/api', () => ({
  fetchAPI: jest.fn(),
}));
jest.mock('../../src/features/auth/providers/AuthProvider', () => ({
  useAuth: jest.fn(),
}));
const { fetchAPI } = require('../../src/services/api') as { fetchAPI: jest.Mock };
const { useAuth } = require('../../src/features/auth/providers/AuthProvider') as { useAuth: jest.Mock };
const createTestQueryClient = () => new QueryClient({
  defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
});
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={createTestQueryClient()}>{children}</QueryClientProvider>
);
beforeEach(() => {
  jest.clearAllMocks();
  useAuth.mockReturnValue({ token: 'test-token-123' });
});
// --- 10 Tests ---
describe('Event Service & Hook Tests', () => {
  
  // 1. Test Service : Succès
  it('1. joinEventService: should return data on API success', async () => {
    const fakeData = { id: 1, name: 'Party' };
    fetchAPI.mockResolvedValue(fakeData);
    const result = await joinEventService(1, 'token');
    expect(result).toEqual(fakeData);
    expect(fetchAPI).toHaveBeenCalledWith('/events/1/join', 'POST', 'token', {});
  });
  // 2. Test Service : Erreur API
  it('2. joinEventService: should throw specific error on API failure', async () => {
    fetchAPI.mockRejectedValue(new Error('Server Down'));
    await expect(joinEventService(1, 'token')).rejects.toThrow('Erreur lors de l\'inscription à l\'événement');
  });
  // 3. Test Hook : Succès de la mutation
  it('3. useJoinEvent: should set isSuccess to true on successful join', async () => {
    const fakeData = { id: 1 };
    fetchAPI.mockResolvedValue(fakeData);
    const { result } = renderHook(() => useJoinEvent(), { wrapper });
    
    result.current.mutate(1);
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(fakeData);
  });
  // 4. Test Hook : Erreur 403 Permission
  it('4. useJoinEvent: should handle 403 Forbidden error', async () => {
    const error = new Error('Forbidden');
    (error as any).status = 403;
    fetchAPI.mockRejectedValue(error);
    const { result } = renderHook(() => useJoinEvent(), { wrapper });
    result.current.mutate(1);
    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error).toBeTruthy();
  });
  // 5. Test Hook : Erreur réseau (Backend inaccessible)
  it('5. useJoinEvent: should handle Network Error', async () => {
    fetchAPI.mockRejectedValue(new Error('Network request failed'));
    const { result } = renderHook(() => useJoinEvent(), { wrapper });
    result.current.mutate(1);
    await waitFor(() => expect(result.current.isError).toBe(true));
  });
  // 6. Test Hook : Vérification du token passé
  it('6. useJoinEvent: should use the token from useAuth', async () => {
    fetchAPI.mockResolvedValue({});
    useAuth.mockReturnValue({ token: 'my-secret-token' });
    const { result } = renderHook(() => useJoinEvent(), { wrapper });
    result.current.mutate(99);
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(fetchAPI).toHaveBeenCalledWith(expect.anything(), expect.anything(), 'my-secret-token', expect.anything());
  });
  // 7. Test Hook : Loading state
  it('7. useJoinEvent: should be in loading state during request', async () => {
    fetchAPI.mockImplementation(() => new Promise(res => setTimeout(() => res({}), 100)));
    const { result } = renderHook(() => useJoinEvent(), { wrapper });
    result.current.mutate(1);
    expect(result.current.isPending).toBe(true);
  });
  // 8. Test Service : Appel avec différents IDs
  it('8. joinEventService: should call correct endpoint for different event IDs', async () => {
    fetchAPI.mockResolvedValue({});
    await joinEventService(999, 'token');
    expect(fetchAPI).toHaveBeenCalledWith('/events/999/join', 'POST', 'token', {});
  });
  // 9. Test Hook : Reset state after error
  it('9. useJoinEvent: should reset error state on new successful attempt', async () => {
    fetchAPI.mockRejectedValueOnce(new Error('Fail'));
    const { result } = renderHook(() => useJoinEvent(), { wrapper });
    result.current.mutate(1);
    await waitFor(() => expect(result.current.isError).toBe(true));
    fetchAPI.mockResolvedValueOnce({ id: 2 });
    result.current.mutate(2);
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });
  // 10. Test Service : Gestion de l'absence de token
  it('10. joinEventService: should work even if token is undefined (handled by fetchAPI)', async () => {
    fetchAPI.mockResolvedValue({ status: 'joined' });
    const result = await joinEventService(1, undefined as any);
    expect(fetchAPI).toHaveBeenCalledWith('/events/1/join', 'POST', undefined, {});
    expect(result).toBeDefined();
  });
});