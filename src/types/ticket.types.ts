export enum TicketStatus {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}
export enum TicketPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}
export interface Ticket {
  id?: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  deviceId: string;
  assignedPersonId: string;
  createdAt?: string;
}