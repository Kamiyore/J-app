// Shared DTOs for J-Address application
import { InboxStatus, ActionType } from '../types';

export interface CreateUserDto {
  email: string;
  password: string;
}

export interface UpdateInboxDto {
  status?: InboxStatus;
  requestedAction?: ActionType;
  imageUrl?: string;
}

export interface CreateInboxDto {
  userId: string;
  imageUrl?: string;
}
