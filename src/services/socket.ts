// services/socket.ts
import { io, Socket } from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from './api';

class SocketService {
  private socket: Socket | null = null;
  private listeners: Map<string, Set<Function>> = new Map();

  async connect() {
    if (this.socket?.connected) return;

    const token = await AsyncStorage.getItem('authToken');
    
    this.socket = io(API_BASE_URL, {
      auth: { token },
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    this.setupListeners();
  }

  private setupListeners() {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('Socket.IO connecté');
    });

    this.socket.on('disconnect', () => {
      console.log(' Socket.IO déconnecté');
    });

    this.socket.on('error', (error) => {
      console.error('Socket.IO error:', error);
    });

    // Écouter les événements entrants
    this.socket.on('eventCreated', (data) => {
      this.emitToListeners('eventCreated', data);
    });

    this.socket.on('eventUpdated', (data) => {
      this.emitToListeners('eventUpdated', data);
    });

    this.socket.on('eventDeleted', (data) => {
      this.emitToListeners('eventDeleted', data);
    });

    this.socket.on('userJoined', (data) => {
      this.emitToListeners('userJoined', data);
    });

    this.socket.on('userLeft', (data) => {
      this.emitToListeners('userLeft', data);
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  // S'abonner à un événement
  on(event: string, callback: Function) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)?.add(callback);
  }

  // Se désabonner
  off(event: string, callback: Function) {
    this.listeners.get(event)?.delete(callback);
  }

  private emitToListeners(event: string, data: any) {
    this.listeners.get(event)?.forEach(callback => callback(data));
  }

  // Émettre des événements
  emit(event: string, data: any) {
    if (this.socket?.connected) {
      this.socket.emit(event, data);
    }
  }

  get isConnected() {
    return this.socket?.connected || false;
  }
}

export const socketService = new SocketService();