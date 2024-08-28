/**
 * This is the contract that is going to be signed off in the infrastructure
 * layer in order to provide a valid implementation of the 'T' Entity
 * to the required resource
 */
export interface Crud<T> {
  save: (entity: T) => Promise<void>
  get: (id: keyof T, value: string) => Promise<T>
  update: (args: { criteria: Record<string, unknown>, data: T }) => Promise<void>
}
