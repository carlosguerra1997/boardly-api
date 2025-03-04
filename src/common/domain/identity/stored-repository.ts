export interface StoredRepository<T> {
  save(element: T): Promise<T>
  remove(element: T): Promise<T>
}