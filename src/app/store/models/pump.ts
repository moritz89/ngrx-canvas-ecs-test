export interface Pump {
  id: string; // UUID
  name: string; // Human readable name
  aspectTypes: string[]; // List of used aspect types (canvas, water, electrical)
}
