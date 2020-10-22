import {
  DMMF,
  DMMFClass,
  Engine,
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
} from './runtime';

export { PrismaClientKnownRequestError }
export { PrismaClientUnknownRequestError }
export { PrismaClientRustPanicError }
export { PrismaClientInitializationError }
export { PrismaClientValidationError }

/**
 * Query Engine version: afd294205618b1c825b013ba6f5a6ebe4aa4a514
 * Prisma Client JS version: 2.0.0-beta.4
 */
export declare type PrismaVersion = {
  client: string
}

export declare const prismaVersion: PrismaVersion 

/**
 * Utility Types
 */

declare type SelectAndInclude = {
  select: any
  include: any
}

declare type HasSelect = {
  select: any
}

declare type HasInclude = {
  include: any
}


declare type CheckSelect<T, S, U> = T extends SelectAndInclude
  ? 'Please either choose `select` or `include`'
  : T extends HasSelect
  ? U
  : T extends HasInclude
  ? U
  : S

/**
 * Get the type of the value, that the Promise holds.
 */
export declare type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

/**
 * Get the return type of a function which returns a Promise.
 */
export declare type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>


export declare type Enumerable<T> = T | Array<T>;

export declare type TrueKeys<T> = {
  [key in keyof T]: T[key] extends false | undefined | null ? never : key
}[keyof T]

/**
 * Subset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
 */
export declare type Subset<T, U> = {
  [key in keyof T]: key extends keyof U ? T[key] : never;
};
declare class PrismaClientFetcher {
  private readonly prisma;
  private readonly debug;
  private readonly hooks?;
  constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
  request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string, collectTimestamps?: any): Promise<T>;
  sanitizeMessage(message: string): string;
  protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
}


/**
 * Client
**/


export type Datasources = {
  db?: string
}

export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

export interface PrismaClientOptions {
  datasources?: Datasources

  /**
   * @default "pretty"
   */
  errorFormat?: ErrorFormat

  log?: Array<LogLevel | LogDefinition>

  /**
   * You probably don't want to use this. `__internal` is used by internal tooling.
   */
  __internal?: {
    debug?: boolean
    hooks?: Hooks
    engine?: {
      cwd?: string
      binaryPath?: string
    }
    measurePerformance?: boolean
  }

  /**
   * Useful for pgbouncer
   */
  forceTransactions?: boolean
}

export type Hooks = {
  beforeRequest?: (options: {query: string, path: string[], rootField?: string, typeName?: string, document: any}) => any
}

/* Types for Logging */
export type LogLevel = 'info' | 'query' | 'warn'
export type LogDefinition = {
  level: LogLevel
  emit: 'stdout' | 'event'
}

export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
export type GetEvents<T extends Array<LogLevel | LogDefinition>> = GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]>

export type QueryEvent = {
  timestamp: Date
  query: string
  params: string
  duration: number
  target: string
}

export type LogEvent = {
  timestamp: Date
  message: string
  target: string
}
/* End Types for Logging */

// tested in getLogLevel.test.ts
export declare function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js (ORM replacement)
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more After_rentals
 * const after_rentals = await prisma.after_rental.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://github.com/prisma/prisma/blob/master/docs/prisma-client-js/api.md).
 */
export declare class PrismaClient<T extends PrismaClientOptions = {}, U = keyof T extends 'log' ? T['log'] extends Array<LogLevel | LogDefinition> ? GetEvents<T['log']> : never : never> {
  /**
   * @private
   */
  private fetcher;
  /**
   * @private
   */
  private readonly dmmf;
  /**
   * @private
   */
  private connectionPromise?;
  /**
   * @private
   */
  private disconnectionPromise?;
  /**
   * @private
   */
  private readonly engineConfig;
  /**
   * @private
   */
  private readonly measurePerformance;
  /**
   * @private
   */
  private engine: Engine;
  /**
   * @private
   */
  private errorFormat: ErrorFormat;

  /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js (ORM replacement)
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more After_rentals
   * const after_rentals = await prisma.after_rental.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://github.com/prisma/prisma/blob/master/docs/prisma-client-js/api.md).
   */
  constructor(optionsArg?: T);
  on<V extends U>(eventType: V, callback: V extends never ? never : (event: V extends 'query' ? QueryEvent : LogEvent) => void): void;
  /**
   * Connect with the database
   */
  connect(): Promise<void>;
  /**
   * @private
   */
  private runDisconnect;
  /**
   * Disconnect from the database
   */
  disconnect(): Promise<any>;
  /**
   * Makes a raw query
   * @example
   * ```
   * // Fetch all entries from the `User` table
   * const result = await prisma.raw`SELECT * FROM User;`
   * // Or
   * const result = await prisma.raw('SELECT * FROM User;')
   * 
   * // With parameters use prisma.raw``, values will be escaped automatically
   * const userId = '1'
   * const result = await prisma.raw`SELECT * FROM User WHERE id = ${userId};`
  * ```
  * 
  * Read more in our [docs](https://github.com/prisma/prisma/blob/master/docs/prisma-client-js/api.md#raw-database-access).
  */
  raw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<T>;

  /**
   * `prisma.after_rental`: Exposes CRUD operations for the **After_rental** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more After_rentals
    * const after_rentals = await prisma.after_rental.findMany()
    * ```
    */
  get after_rental(): After_rentalDelegate;

  /**
   * `prisma.album`: Exposes CRUD operations for the **Album** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Albums
    * const albums = await prisma.album.findMany()
    * ```
    */
  get album(): AlbumDelegate;

  /**
   * `prisma.before_rental`: Exposes CRUD operations for the **Before_rental** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Before_rentals
    * const before_rentals = await prisma.before_rental.findMany()
    * ```
    */
  get before_rental(): Before_rentalDelegate;

  /**
   * `prisma.bill`: Exposes CRUD operations for the **Bill** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Bills
    * const bills = await prisma.bill.findMany()
    * ```
    */
  get bill(): BillDelegate;

  /**
   * `prisma.booking`: Exposes CRUD operations for the **Booking** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Bookings
    * const bookings = await prisma.booking.findMany()
    * ```
    */
  get booking(): BookingDelegate;

  /**
   * `prisma.brand`: Exposes CRUD operations for the **Brand** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Brands
    * const brands = await prisma.brand.findMany()
    * ```
    */
  get brand(): BrandDelegate;

  /**
   * `prisma.car`: Exposes CRUD operations for the **Car** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Cars
    * const cars = await prisma.car.findMany()
    * ```
    */
  get car(): CarDelegate;

  /**
   * `prisma.category`: Exposes CRUD operations for the **Category** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categories
    * const categories = await prisma.category.findMany()
    * ```
    */
  get category(): CategoryDelegate;

  /**
   * `prisma.color`: Exposes CRUD operations for the **Color** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Colors
    * const colors = await prisma.color.findMany()
    * ```
    */
  get color(): ColorDelegate;

  /**
   * `prisma.car_insurance`: Exposes CRUD operations for the **Car_insurance** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Car_insurances
    * const car_insurances = await prisma.car_insurance.findMany()
    * ```
    */
  get car_insurance(): Car_insuranceDelegate;

  /**
   * `prisma.contract`: Exposes CRUD operations for the **Contract** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Contracts
    * const contracts = await prisma.contract.findMany()
    * ```
    */
  get contract(): ContractDelegate;

  /**
   * `prisma.contract_type`: Exposes CRUD operations for the **Contract_type** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Contract_types
    * const contract_types = await prisma.contract_type.findMany()
    * ```
    */
  get contract_type(): Contract_typeDelegate;

  /**
   * `prisma.customer`: Exposes CRUD operations for the **Customer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Customers
    * const customers = await prisma.customer.findMany()
    * ```
    */
  get customer(): CustomerDelegate;

  /**
   * `prisma.image`: Exposes CRUD operations for the **Image** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Images
    * const images = await prisma.image.findMany()
    * ```
    */
  get image(): ImageDelegate;

  /**
   * `prisma.insurance`: Exposes CRUD operations for the **Insurance** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Insurances
    * const insurances = await prisma.insurance.findMany()
    * ```
    */
  get insurance(): InsuranceDelegate;

  /**
   * `prisma.rental`: Exposes CRUD operations for the **Rental** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Rentals
    * const rentals = await prisma.rental.findMany()
    * ```
    */
  get rental(): RentalDelegate;

  /**
   * `prisma.role`: Exposes CRUD operations for the **Role** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Roles
    * const roles = await prisma.role.findMany()
    * ```
    */
  get role(): RoleDelegate;

  /**
   * `prisma.status`: Exposes CRUD operations for the **Status** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Statuses
    * const statuses = await prisma.status.findMany()
    * ```
    */
  get status(): StatusDelegate;

  /**
   * `prisma.technical_control`: Exposes CRUD operations for the **Technical_control** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Technical_controls
    * const technical_controls = await prisma.technical_control.findMany()
    * ```
    */
  get technical_control(): Technical_controlDelegate;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): UserDelegate;
}



/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export declare const OrderByArg: {
  asc: 'asc',
  desc: 'desc'
};

export declare type OrderByArg = (typeof OrderByArg)[keyof typeof OrderByArg]



/**
 * Model After_rental
 */

export type After_rental = {
  id: number
  rentalId: number | null
  albumId: number | null
  kilometrage: number | null
  niveau_carburant: number | null
  createdAt: Date | null
  updatedAt: Date | null
  comment: string | null
  deleted: boolean | null
}

export type After_rentalSelect = {
  id?: boolean
  rentalId?: boolean
  albumId?: boolean
  kilometrage?: boolean
  niveau_carburant?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  comment?: boolean
  deleted?: boolean
}

export type After_rentalGetPayload<
  S extends boolean | null | undefined | After_rentalArgs,
  U = keyof S
> = S extends true
  ? After_rental
  : S extends undefined
  ? never
  : S extends After_rentalArgs | FindManyAfter_rentalArgs
  ? 'include' extends U
    ? After_rental 
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof After_rental ? After_rental[P]
: 
 never
    }
  : After_rental
: After_rental


export interface After_rentalDelegate {
  /**
   * Find zero or one After_rental.
   * @param {FindOneAfter_rentalArgs} args - Arguments to find a After_rental
   * @example
   * // Get one After_rental
   * const after_rental = await prisma.after_rental.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneAfter_rentalArgs>(
    args: Subset<T, FindOneAfter_rentalArgs>
  ): CheckSelect<T, After_rentalClient<After_rental | null>, After_rentalClient<After_rentalGetPayload<T> | null>>
  /**
   * Find zero or more After_rentals.
   * @param {FindManyAfter_rentalArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all After_rentals
   * const after_rentals = await prisma.after_rental.findMany()
   * 
   * // Get first 10 After_rentals
   * const after_rentals = await prisma.after_rental.findMany({ first: 10 })
   * 
   * // Only select the `id`
   * const after_rentalWithIdOnly = await prisma.after_rental.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyAfter_rentalArgs>(
    args?: Subset<T, FindManyAfter_rentalArgs>
  ): CheckSelect<T, Promise<Array<After_rental>>, Promise<Array<After_rentalGetPayload<T>>>>
  /**
   * Create a After_rental.
   * @param {After_rentalCreateArgs} args - Arguments to create a After_rental.
   * @example
   * // Create one After_rental
   * const user = await prisma.after_rental.create({
   *   data: {
   *     // ... data to create a After_rental
   *   }
   * })
   * 
  **/
  create<T extends After_rentalCreateArgs>(
    args: Subset<T, After_rentalCreateArgs>
  ): CheckSelect<T, After_rentalClient<After_rental>, After_rentalClient<After_rentalGetPayload<T>>>
  /**
   * Delete a After_rental.
   * @param {After_rentalDeleteArgs} args - Arguments to delete one After_rental.
   * @example
   * // Delete one After_rental
   * const user = await prisma.after_rental.delete({
   *   where: {
   *     // ... filter to delete one After_rental
   *   }
   * })
   * 
  **/
  delete<T extends After_rentalDeleteArgs>(
    args: Subset<T, After_rentalDeleteArgs>
  ): CheckSelect<T, After_rentalClient<After_rental>, After_rentalClient<After_rentalGetPayload<T>>>
  /**
   * Update one After_rental.
   * @param {After_rentalUpdateArgs} args - Arguments to update one After_rental.
   * @example
   * // Update one After_rental
   * const after_rental = await prisma.after_rental.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends After_rentalUpdateArgs>(
    args: Subset<T, After_rentalUpdateArgs>
  ): CheckSelect<T, After_rentalClient<After_rental>, After_rentalClient<After_rentalGetPayload<T>>>
  /**
   * Delete zero or more After_rentals.
   * @param {After_rentalDeleteManyArgs} args - Arguments to filter After_rentals to delete.
   * @example
   * // Delete a few After_rentals
   * const { count } = await prisma.after_rental.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends After_rentalDeleteManyArgs>(
    args: Subset<T, After_rentalDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more After_rentals.
   * @param {After_rentalUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many After_rentals
   * const after_rental = await prisma.after_rental.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends After_rentalUpdateManyArgs>(
    args: Subset<T, After_rentalUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one After_rental.
   * @param {After_rentalUpsertArgs} args - Arguments to update or create a After_rental.
   * @example
   * // Update or create a After_rental
   * const after_rental = await prisma.after_rental.upsert({
   *   create: {
   *     // ... data to create a After_rental
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the After_rental we want to update
   *   }
   * })
  **/
  upsert<T extends After_rentalUpsertArgs>(
    args: Subset<T, After_rentalUpsertArgs>
  ): CheckSelect<T, After_rentalClient<After_rental>, After_rentalClient<After_rentalGetPayload<T>>>
  /**
   * 
   */
  count(args?: Omit<FindManyAfter_rentalArgs, 'select' | 'include'>): Promise<number>
}

export declare class After_rentalClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  private _collectTimestamps?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';


  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * After_rental findOne
 */
export type FindOneAfter_rentalArgs = {
  /**
   * Select specific fields to fetch from the After_rental
  **/
  select?: After_rentalSelect | null
  /**
   * Filter, which After_rental to fetch.
  **/
  where: After_rentalWhereUniqueInput
}


/**
 * After_rental findMany
 */
export type FindManyAfter_rentalArgs = {
  /**
   * Select specific fields to fetch from the After_rental
  **/
  select?: After_rentalSelect | null
  /**
   * Filter, which After_rentals to fetch.
  **/
  where?: After_rentalWhereInput | null
  /**
   * Determine the order of the After_rentals to fetch.
  **/
  orderBy?: After_rentalOrderByInput | null
  /**
   * Skip the first `n` After_rentals.
  **/
  skip?: number | null
  /**
   * Get all After_rentals that come after the After_rental you provide with the current order.
  **/
  after?: After_rentalWhereUniqueInput | null
  /**
   * Get all After_rentals that come before the After_rental you provide with the current order.
  **/
  before?: After_rentalWhereUniqueInput | null
  /**
   * Get the first `n` After_rentals.
  **/
  first?: number | null
  /**
   * Get the last `n` After_rentals.
  **/
  last?: number | null
}


/**
 * After_rental create
 */
export type After_rentalCreateArgs = {
  /**
   * Select specific fields to fetch from the After_rental
  **/
  select?: After_rentalSelect | null
  /**
   * The data needed to create a After_rental.
  **/
  data: After_rentalCreateInput
}


/**
 * After_rental update
 */
export type After_rentalUpdateArgs = {
  /**
   * Select specific fields to fetch from the After_rental
  **/
  select?: After_rentalSelect | null
  /**
   * The data needed to update a After_rental.
  **/
  data: After_rentalUpdateInput
  /**
   * Choose, which After_rental to update.
  **/
  where: After_rentalWhereUniqueInput
}


/**
 * After_rental updateMany
 */
export type After_rentalUpdateManyArgs = {
  data: After_rentalUpdateManyMutationInput
  where?: After_rentalWhereInput | null
}


/**
 * After_rental upsert
 */
export type After_rentalUpsertArgs = {
  /**
   * Select specific fields to fetch from the After_rental
  **/
  select?: After_rentalSelect | null
  /**
   * The filter to search for the After_rental to update in case it exists.
  **/
  where: After_rentalWhereUniqueInput
  /**
   * In case the After_rental found by the `where` argument doesn't exist, create a new After_rental with this data.
  **/
  create: After_rentalCreateInput
  /**
   * In case the After_rental was found with the provided `where` argument, update it with this data.
  **/
  update: After_rentalUpdateInput
}


/**
 * After_rental delete
 */
export type After_rentalDeleteArgs = {
  /**
   * Select specific fields to fetch from the After_rental
  **/
  select?: After_rentalSelect | null
  /**
   * Filter which After_rental to delete.
  **/
  where: After_rentalWhereUniqueInput
}


/**
 * After_rental deleteMany
 */
export type After_rentalDeleteManyArgs = {
  where?: After_rentalWhereInput | null
}


/**
 * After_rental without action
 */
export type After_rentalArgs = {
  /**
   * Select specific fields to fetch from the After_rental
  **/
  select?: After_rentalSelect | null
}



/**
 * Model Album
 */

export type Album = {
  id: number
  title: string | null
  createdAt: Date | null
  updatedAt: Date | null
  deleted: boolean | null
}

export type AlbumSelect = {
  id?: boolean
  title?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  deleted?: boolean
}

export type AlbumGetPayload<
  S extends boolean | null | undefined | AlbumArgs,
  U = keyof S
> = S extends true
  ? Album
  : S extends undefined
  ? never
  : S extends AlbumArgs | FindManyAlbumArgs
  ? 'include' extends U
    ? Album 
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Album ? Album[P]
: 
 never
    }
  : Album
: Album


export interface AlbumDelegate {
  /**
   * Find zero or one Album.
   * @param {FindOneAlbumArgs} args - Arguments to find a Album
   * @example
   * // Get one Album
   * const album = await prisma.album.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneAlbumArgs>(
    args: Subset<T, FindOneAlbumArgs>
  ): CheckSelect<T, AlbumClient<Album | null>, AlbumClient<AlbumGetPayload<T> | null>>
  /**
   * Find zero or more Albums.
   * @param {FindManyAlbumArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Albums
   * const albums = await prisma.album.findMany()
   * 
   * // Get first 10 Albums
   * const albums = await prisma.album.findMany({ first: 10 })
   * 
   * // Only select the `id`
   * const albumWithIdOnly = await prisma.album.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyAlbumArgs>(
    args?: Subset<T, FindManyAlbumArgs>
  ): CheckSelect<T, Promise<Array<Album>>, Promise<Array<AlbumGetPayload<T>>>>
  /**
   * Create a Album.
   * @param {AlbumCreateArgs} args - Arguments to create a Album.
   * @example
   * // Create one Album
   * const user = await prisma.album.create({
   *   data: {
   *     // ... data to create a Album
   *   }
   * })
   * 
  **/
  create<T extends AlbumCreateArgs>(
    args: Subset<T, AlbumCreateArgs>
  ): CheckSelect<T, AlbumClient<Album>, AlbumClient<AlbumGetPayload<T>>>
  /**
   * Delete a Album.
   * @param {AlbumDeleteArgs} args - Arguments to delete one Album.
   * @example
   * // Delete one Album
   * const user = await prisma.album.delete({
   *   where: {
   *     // ... filter to delete one Album
   *   }
   * })
   * 
  **/
  delete<T extends AlbumDeleteArgs>(
    args: Subset<T, AlbumDeleteArgs>
  ): CheckSelect<T, AlbumClient<Album>, AlbumClient<AlbumGetPayload<T>>>
  /**
   * Update one Album.
   * @param {AlbumUpdateArgs} args - Arguments to update one Album.
   * @example
   * // Update one Album
   * const album = await prisma.album.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends AlbumUpdateArgs>(
    args: Subset<T, AlbumUpdateArgs>
  ): CheckSelect<T, AlbumClient<Album>, AlbumClient<AlbumGetPayload<T>>>
  /**
   * Delete zero or more Albums.
   * @param {AlbumDeleteManyArgs} args - Arguments to filter Albums to delete.
   * @example
   * // Delete a few Albums
   * const { count } = await prisma.album.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends AlbumDeleteManyArgs>(
    args: Subset<T, AlbumDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Albums.
   * @param {AlbumUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Albums
   * const album = await prisma.album.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends AlbumUpdateManyArgs>(
    args: Subset<T, AlbumUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Album.
   * @param {AlbumUpsertArgs} args - Arguments to update or create a Album.
   * @example
   * // Update or create a Album
   * const album = await prisma.album.upsert({
   *   create: {
   *     // ... data to create a Album
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Album we want to update
   *   }
   * })
  **/
  upsert<T extends AlbumUpsertArgs>(
    args: Subset<T, AlbumUpsertArgs>
  ): CheckSelect<T, AlbumClient<Album>, AlbumClient<AlbumGetPayload<T>>>
  /**
   * 
   */
  count(args?: Omit<FindManyAlbumArgs, 'select' | 'include'>): Promise<number>
}

export declare class AlbumClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  private _collectTimestamps?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';


  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Album findOne
 */
export type FindOneAlbumArgs = {
  /**
   * Select specific fields to fetch from the Album
  **/
  select?: AlbumSelect | null
  /**
   * Filter, which Album to fetch.
  **/
  where: AlbumWhereUniqueInput
}


/**
 * Album findMany
 */
export type FindManyAlbumArgs = {
  /**
   * Select specific fields to fetch from the Album
  **/
  select?: AlbumSelect | null
  /**
   * Filter, which Albums to fetch.
  **/
  where?: AlbumWhereInput | null
  /**
   * Determine the order of the Albums to fetch.
  **/
  orderBy?: AlbumOrderByInput | null
  /**
   * Skip the first `n` Albums.
  **/
  skip?: number | null
  /**
   * Get all Albums that come after the Album you provide with the current order.
  **/
  after?: AlbumWhereUniqueInput | null
  /**
   * Get all Albums that come before the Album you provide with the current order.
  **/
  before?: AlbumWhereUniqueInput | null
  /**
   * Get the first `n` Albums.
  **/
  first?: number | null
  /**
   * Get the last `n` Albums.
  **/
  last?: number | null
}


/**
 * Album create
 */
export type AlbumCreateArgs = {
  /**
   * Select specific fields to fetch from the Album
  **/
  select?: AlbumSelect | null
  /**
   * The data needed to create a Album.
  **/
  data: AlbumCreateInput
}


/**
 * Album update
 */
export type AlbumUpdateArgs = {
  /**
   * Select specific fields to fetch from the Album
  **/
  select?: AlbumSelect | null
  /**
   * The data needed to update a Album.
  **/
  data: AlbumUpdateInput
  /**
   * Choose, which Album to update.
  **/
  where: AlbumWhereUniqueInput
}


/**
 * Album updateMany
 */
export type AlbumUpdateManyArgs = {
  data: AlbumUpdateManyMutationInput
  where?: AlbumWhereInput | null
}


/**
 * Album upsert
 */
export type AlbumUpsertArgs = {
  /**
   * Select specific fields to fetch from the Album
  **/
  select?: AlbumSelect | null
  /**
   * The filter to search for the Album to update in case it exists.
  **/
  where: AlbumWhereUniqueInput
  /**
   * In case the Album found by the `where` argument doesn't exist, create a new Album with this data.
  **/
  create: AlbumCreateInput
  /**
   * In case the Album was found with the provided `where` argument, update it with this data.
  **/
  update: AlbumUpdateInput
}


/**
 * Album delete
 */
export type AlbumDeleteArgs = {
  /**
   * Select specific fields to fetch from the Album
  **/
  select?: AlbumSelect | null
  /**
   * Filter which Album to delete.
  **/
  where: AlbumWhereUniqueInput
}


/**
 * Album deleteMany
 */
export type AlbumDeleteManyArgs = {
  where?: AlbumWhereInput | null
}


/**
 * Album without action
 */
export type AlbumArgs = {
  /**
   * Select specific fields to fetch from the Album
  **/
  select?: AlbumSelect | null
}



/**
 * Model Before_rental
 */

export type Before_rental = {
  id: number
  rentalId: number | null
  albumId: number | null
  kilometrage: number | null
  niveau_carburant: number | null
  createdAt: Date | null
  updatedAt: Date | null
  comment: string | null
  deleted: boolean | null
}

export type Before_rentalSelect = {
  id?: boolean
  rentalId?: boolean
  albumId?: boolean
  kilometrage?: boolean
  niveau_carburant?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  comment?: boolean
  deleted?: boolean
}

export type Before_rentalGetPayload<
  S extends boolean | null | undefined | Before_rentalArgs,
  U = keyof S
> = S extends true
  ? Before_rental
  : S extends undefined
  ? never
  : S extends Before_rentalArgs | FindManyBefore_rentalArgs
  ? 'include' extends U
    ? Before_rental 
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Before_rental ? Before_rental[P]
: 
 never
    }
  : Before_rental
: Before_rental


export interface Before_rentalDelegate {
  /**
   * Find zero or one Before_rental.
   * @param {FindOneBefore_rentalArgs} args - Arguments to find a Before_rental
   * @example
   * // Get one Before_rental
   * const before_rental = await prisma.before_rental.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneBefore_rentalArgs>(
    args: Subset<T, FindOneBefore_rentalArgs>
  ): CheckSelect<T, Before_rentalClient<Before_rental | null>, Before_rentalClient<Before_rentalGetPayload<T> | null>>
  /**
   * Find zero or more Before_rentals.
   * @param {FindManyBefore_rentalArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Before_rentals
   * const before_rentals = await prisma.before_rental.findMany()
   * 
   * // Get first 10 Before_rentals
   * const before_rentals = await prisma.before_rental.findMany({ first: 10 })
   * 
   * // Only select the `id`
   * const before_rentalWithIdOnly = await prisma.before_rental.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyBefore_rentalArgs>(
    args?: Subset<T, FindManyBefore_rentalArgs>
  ): CheckSelect<T, Promise<Array<Before_rental>>, Promise<Array<Before_rentalGetPayload<T>>>>
  /**
   * Create a Before_rental.
   * @param {Before_rentalCreateArgs} args - Arguments to create a Before_rental.
   * @example
   * // Create one Before_rental
   * const user = await prisma.before_rental.create({
   *   data: {
   *     // ... data to create a Before_rental
   *   }
   * })
   * 
  **/
  create<T extends Before_rentalCreateArgs>(
    args: Subset<T, Before_rentalCreateArgs>
  ): CheckSelect<T, Before_rentalClient<Before_rental>, Before_rentalClient<Before_rentalGetPayload<T>>>
  /**
   * Delete a Before_rental.
   * @param {Before_rentalDeleteArgs} args - Arguments to delete one Before_rental.
   * @example
   * // Delete one Before_rental
   * const user = await prisma.before_rental.delete({
   *   where: {
   *     // ... filter to delete one Before_rental
   *   }
   * })
   * 
  **/
  delete<T extends Before_rentalDeleteArgs>(
    args: Subset<T, Before_rentalDeleteArgs>
  ): CheckSelect<T, Before_rentalClient<Before_rental>, Before_rentalClient<Before_rentalGetPayload<T>>>
  /**
   * Update one Before_rental.
   * @param {Before_rentalUpdateArgs} args - Arguments to update one Before_rental.
   * @example
   * // Update one Before_rental
   * const before_rental = await prisma.before_rental.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends Before_rentalUpdateArgs>(
    args: Subset<T, Before_rentalUpdateArgs>
  ): CheckSelect<T, Before_rentalClient<Before_rental>, Before_rentalClient<Before_rentalGetPayload<T>>>
  /**
   * Delete zero or more Before_rentals.
   * @param {Before_rentalDeleteManyArgs} args - Arguments to filter Before_rentals to delete.
   * @example
   * // Delete a few Before_rentals
   * const { count } = await prisma.before_rental.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends Before_rentalDeleteManyArgs>(
    args: Subset<T, Before_rentalDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Before_rentals.
   * @param {Before_rentalUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Before_rentals
   * const before_rental = await prisma.before_rental.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends Before_rentalUpdateManyArgs>(
    args: Subset<T, Before_rentalUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Before_rental.
   * @param {Before_rentalUpsertArgs} args - Arguments to update or create a Before_rental.
   * @example
   * // Update or create a Before_rental
   * const before_rental = await prisma.before_rental.upsert({
   *   create: {
   *     // ... data to create a Before_rental
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Before_rental we want to update
   *   }
   * })
  **/
  upsert<T extends Before_rentalUpsertArgs>(
    args: Subset<T, Before_rentalUpsertArgs>
  ): CheckSelect<T, Before_rentalClient<Before_rental>, Before_rentalClient<Before_rentalGetPayload<T>>>
  /**
   * 
   */
  count(args?: Omit<FindManyBefore_rentalArgs, 'select' | 'include'>): Promise<number>
}

export declare class Before_rentalClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  private _collectTimestamps?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';


  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Before_rental findOne
 */
export type FindOneBefore_rentalArgs = {
  /**
   * Select specific fields to fetch from the Before_rental
  **/
  select?: Before_rentalSelect | null
  /**
   * Filter, which Before_rental to fetch.
  **/
  where: Before_rentalWhereUniqueInput
}


/**
 * Before_rental findMany
 */
export type FindManyBefore_rentalArgs = {
  /**
   * Select specific fields to fetch from the Before_rental
  **/
  select?: Before_rentalSelect | null
  /**
   * Filter, which Before_rentals to fetch.
  **/
  where?: Before_rentalWhereInput | null
  /**
   * Determine the order of the Before_rentals to fetch.
  **/
  orderBy?: Before_rentalOrderByInput | null
  /**
   * Skip the first `n` Before_rentals.
  **/
  skip?: number | null
  /**
   * Get all Before_rentals that come after the Before_rental you provide with the current order.
  **/
  after?: Before_rentalWhereUniqueInput | null
  /**
   * Get all Before_rentals that come before the Before_rental you provide with the current order.
  **/
  before?: Before_rentalWhereUniqueInput | null
  /**
   * Get the first `n` Before_rentals.
  **/
  first?: number | null
  /**
   * Get the last `n` Before_rentals.
  **/
  last?: number | null
}


/**
 * Before_rental create
 */
export type Before_rentalCreateArgs = {
  /**
   * Select specific fields to fetch from the Before_rental
  **/
  select?: Before_rentalSelect | null
  /**
   * The data needed to create a Before_rental.
  **/
  data: Before_rentalCreateInput
}


/**
 * Before_rental update
 */
export type Before_rentalUpdateArgs = {
  /**
   * Select specific fields to fetch from the Before_rental
  **/
  select?: Before_rentalSelect | null
  /**
   * The data needed to update a Before_rental.
  **/
  data: Before_rentalUpdateInput
  /**
   * Choose, which Before_rental to update.
  **/
  where: Before_rentalWhereUniqueInput
}


/**
 * Before_rental updateMany
 */
export type Before_rentalUpdateManyArgs = {
  data: Before_rentalUpdateManyMutationInput
  where?: Before_rentalWhereInput | null
}


/**
 * Before_rental upsert
 */
export type Before_rentalUpsertArgs = {
  /**
   * Select specific fields to fetch from the Before_rental
  **/
  select?: Before_rentalSelect | null
  /**
   * The filter to search for the Before_rental to update in case it exists.
  **/
  where: Before_rentalWhereUniqueInput
  /**
   * In case the Before_rental found by the `where` argument doesn't exist, create a new Before_rental with this data.
  **/
  create: Before_rentalCreateInput
  /**
   * In case the Before_rental was found with the provided `where` argument, update it with this data.
  **/
  update: Before_rentalUpdateInput
}


/**
 * Before_rental delete
 */
export type Before_rentalDeleteArgs = {
  /**
   * Select specific fields to fetch from the Before_rental
  **/
  select?: Before_rentalSelect | null
  /**
   * Filter which Before_rental to delete.
  **/
  where: Before_rentalWhereUniqueInput
}


/**
 * Before_rental deleteMany
 */
export type Before_rentalDeleteManyArgs = {
  where?: Before_rentalWhereInput | null
}


/**
 * Before_rental without action
 */
export type Before_rentalArgs = {
  /**
   * Select specific fields to fetch from the Before_rental
  **/
  select?: Before_rentalSelect | null
}



/**
 * Model Bill
 */

export type Bill = {
  id: number
  bill_number: string | null
  bill_date: Date | null
  createdAt: Date | null
  updatedAt: Date | null
  deleted: boolean | null
}

export type BillSelect = {
  id?: boolean
  bill_number?: boolean
  bill_date?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  deleted?: boolean
}

export type BillGetPayload<
  S extends boolean | null | undefined | BillArgs,
  U = keyof S
> = S extends true
  ? Bill
  : S extends undefined
  ? never
  : S extends BillArgs | FindManyBillArgs
  ? 'include' extends U
    ? Bill 
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Bill ? Bill[P]
: 
 never
    }
  : Bill
: Bill


export interface BillDelegate {
  /**
   * Find zero or one Bill.
   * @param {FindOneBillArgs} args - Arguments to find a Bill
   * @example
   * // Get one Bill
   * const bill = await prisma.bill.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneBillArgs>(
    args: Subset<T, FindOneBillArgs>
  ): CheckSelect<T, BillClient<Bill | null>, BillClient<BillGetPayload<T> | null>>
  /**
   * Find zero or more Bills.
   * @param {FindManyBillArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Bills
   * const bills = await prisma.bill.findMany()
   * 
   * // Get first 10 Bills
   * const bills = await prisma.bill.findMany({ first: 10 })
   * 
   * // Only select the `id`
   * const billWithIdOnly = await prisma.bill.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyBillArgs>(
    args?: Subset<T, FindManyBillArgs>
  ): CheckSelect<T, Promise<Array<Bill>>, Promise<Array<BillGetPayload<T>>>>
  /**
   * Create a Bill.
   * @param {BillCreateArgs} args - Arguments to create a Bill.
   * @example
   * // Create one Bill
   * const user = await prisma.bill.create({
   *   data: {
   *     // ... data to create a Bill
   *   }
   * })
   * 
  **/
  create<T extends BillCreateArgs>(
    args: Subset<T, BillCreateArgs>
  ): CheckSelect<T, BillClient<Bill>, BillClient<BillGetPayload<T>>>
  /**
   * Delete a Bill.
   * @param {BillDeleteArgs} args - Arguments to delete one Bill.
   * @example
   * // Delete one Bill
   * const user = await prisma.bill.delete({
   *   where: {
   *     // ... filter to delete one Bill
   *   }
   * })
   * 
  **/
  delete<T extends BillDeleteArgs>(
    args: Subset<T, BillDeleteArgs>
  ): CheckSelect<T, BillClient<Bill>, BillClient<BillGetPayload<T>>>
  /**
   * Update one Bill.
   * @param {BillUpdateArgs} args - Arguments to update one Bill.
   * @example
   * // Update one Bill
   * const bill = await prisma.bill.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends BillUpdateArgs>(
    args: Subset<T, BillUpdateArgs>
  ): CheckSelect<T, BillClient<Bill>, BillClient<BillGetPayload<T>>>
  /**
   * Delete zero or more Bills.
   * @param {BillDeleteManyArgs} args - Arguments to filter Bills to delete.
   * @example
   * // Delete a few Bills
   * const { count } = await prisma.bill.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends BillDeleteManyArgs>(
    args: Subset<T, BillDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Bills.
   * @param {BillUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Bills
   * const bill = await prisma.bill.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends BillUpdateManyArgs>(
    args: Subset<T, BillUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Bill.
   * @param {BillUpsertArgs} args - Arguments to update or create a Bill.
   * @example
   * // Update or create a Bill
   * const bill = await prisma.bill.upsert({
   *   create: {
   *     // ... data to create a Bill
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Bill we want to update
   *   }
   * })
  **/
  upsert<T extends BillUpsertArgs>(
    args: Subset<T, BillUpsertArgs>
  ): CheckSelect<T, BillClient<Bill>, BillClient<BillGetPayload<T>>>
  /**
   * 
   */
  count(args?: Omit<FindManyBillArgs, 'select' | 'include'>): Promise<number>
}

export declare class BillClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  private _collectTimestamps?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';


  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Bill findOne
 */
export type FindOneBillArgs = {
  /**
   * Select specific fields to fetch from the Bill
  **/
  select?: BillSelect | null
  /**
   * Filter, which Bill to fetch.
  **/
  where: BillWhereUniqueInput
}


/**
 * Bill findMany
 */
export type FindManyBillArgs = {
  /**
   * Select specific fields to fetch from the Bill
  **/
  select?: BillSelect | null
  /**
   * Filter, which Bills to fetch.
  **/
  where?: BillWhereInput | null
  /**
   * Determine the order of the Bills to fetch.
  **/
  orderBy?: BillOrderByInput | null
  /**
   * Skip the first `n` Bills.
  **/
  skip?: number | null
  /**
   * Get all Bills that come after the Bill you provide with the current order.
  **/
  after?: BillWhereUniqueInput | null
  /**
   * Get all Bills that come before the Bill you provide with the current order.
  **/
  before?: BillWhereUniqueInput | null
  /**
   * Get the first `n` Bills.
  **/
  first?: number | null
  /**
   * Get the last `n` Bills.
  **/
  last?: number | null
}


/**
 * Bill create
 */
export type BillCreateArgs = {
  /**
   * Select specific fields to fetch from the Bill
  **/
  select?: BillSelect | null
  /**
   * The data needed to create a Bill.
  **/
  data: BillCreateInput
}


/**
 * Bill update
 */
export type BillUpdateArgs = {
  /**
   * Select specific fields to fetch from the Bill
  **/
  select?: BillSelect | null
  /**
   * The data needed to update a Bill.
  **/
  data: BillUpdateInput
  /**
   * Choose, which Bill to update.
  **/
  where: BillWhereUniqueInput
}


/**
 * Bill updateMany
 */
export type BillUpdateManyArgs = {
  data: BillUpdateManyMutationInput
  where?: BillWhereInput | null
}


/**
 * Bill upsert
 */
export type BillUpsertArgs = {
  /**
   * Select specific fields to fetch from the Bill
  **/
  select?: BillSelect | null
  /**
   * The filter to search for the Bill to update in case it exists.
  **/
  where: BillWhereUniqueInput
  /**
   * In case the Bill found by the `where` argument doesn't exist, create a new Bill with this data.
  **/
  create: BillCreateInput
  /**
   * In case the Bill was found with the provided `where` argument, update it with this data.
  **/
  update: BillUpdateInput
}


/**
 * Bill delete
 */
export type BillDeleteArgs = {
  /**
   * Select specific fields to fetch from the Bill
  **/
  select?: BillSelect | null
  /**
   * Filter which Bill to delete.
  **/
  where: BillWhereUniqueInput
}


/**
 * Bill deleteMany
 */
export type BillDeleteManyArgs = {
  where?: BillWhereInput | null
}


/**
 * Bill without action
 */
export type BillArgs = {
  /**
   * Select specific fields to fetch from the Bill
  **/
  select?: BillSelect | null
}



/**
 * Model Booking
 */

export type Booking = {
  id: number
  carId: number | null
  customerId: number | null
  montant_avance: number | null
  date_begin: Date | null
  date_end: Date | null
  comment: string | null
  createdAt: Date | null
  updatedAt: Date | null
  deleted: boolean | null
}

export type BookingSelect = {
  id?: boolean
  carId?: boolean
  customerId?: boolean
  montant_avance?: boolean
  date_begin?: boolean
  date_end?: boolean
  comment?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  deleted?: boolean
}

export type BookingGetPayload<
  S extends boolean | null | undefined | BookingArgs,
  U = keyof S
> = S extends true
  ? Booking
  : S extends undefined
  ? never
  : S extends BookingArgs | FindManyBookingArgs
  ? 'include' extends U
    ? Booking 
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Booking ? Booking[P]
: 
 never
    }
  : Booking
: Booking


export interface BookingDelegate {
  /**
   * Find zero or one Booking.
   * @param {FindOneBookingArgs} args - Arguments to find a Booking
   * @example
   * // Get one Booking
   * const booking = await prisma.booking.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneBookingArgs>(
    args: Subset<T, FindOneBookingArgs>
  ): CheckSelect<T, BookingClient<Booking | null>, BookingClient<BookingGetPayload<T> | null>>
  /**
   * Find zero or more Bookings.
   * @param {FindManyBookingArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Bookings
   * const bookings = await prisma.booking.findMany()
   * 
   * // Get first 10 Bookings
   * const bookings = await prisma.booking.findMany({ first: 10 })
   * 
   * // Only select the `id`
   * const bookingWithIdOnly = await prisma.booking.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyBookingArgs>(
    args?: Subset<T, FindManyBookingArgs>
  ): CheckSelect<T, Promise<Array<Booking>>, Promise<Array<BookingGetPayload<T>>>>
  /**
   * Create a Booking.
   * @param {BookingCreateArgs} args - Arguments to create a Booking.
   * @example
   * // Create one Booking
   * const user = await prisma.booking.create({
   *   data: {
   *     // ... data to create a Booking
   *   }
   * })
   * 
  **/
  create<T extends BookingCreateArgs>(
    args: Subset<T, BookingCreateArgs>
  ): CheckSelect<T, BookingClient<Booking>, BookingClient<BookingGetPayload<T>>>
  /**
   * Delete a Booking.
   * @param {BookingDeleteArgs} args - Arguments to delete one Booking.
   * @example
   * // Delete one Booking
   * const user = await prisma.booking.delete({
   *   where: {
   *     // ... filter to delete one Booking
   *   }
   * })
   * 
  **/
  delete<T extends BookingDeleteArgs>(
    args: Subset<T, BookingDeleteArgs>
  ): CheckSelect<T, BookingClient<Booking>, BookingClient<BookingGetPayload<T>>>
  /**
   * Update one Booking.
   * @param {BookingUpdateArgs} args - Arguments to update one Booking.
   * @example
   * // Update one Booking
   * const booking = await prisma.booking.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends BookingUpdateArgs>(
    args: Subset<T, BookingUpdateArgs>
  ): CheckSelect<T, BookingClient<Booking>, BookingClient<BookingGetPayload<T>>>
  /**
   * Delete zero or more Bookings.
   * @param {BookingDeleteManyArgs} args - Arguments to filter Bookings to delete.
   * @example
   * // Delete a few Bookings
   * const { count } = await prisma.booking.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends BookingDeleteManyArgs>(
    args: Subset<T, BookingDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Bookings.
   * @param {BookingUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Bookings
   * const booking = await prisma.booking.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends BookingUpdateManyArgs>(
    args: Subset<T, BookingUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Booking.
   * @param {BookingUpsertArgs} args - Arguments to update or create a Booking.
   * @example
   * // Update or create a Booking
   * const booking = await prisma.booking.upsert({
   *   create: {
   *     // ... data to create a Booking
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Booking we want to update
   *   }
   * })
  **/
  upsert<T extends BookingUpsertArgs>(
    args: Subset<T, BookingUpsertArgs>
  ): CheckSelect<T, BookingClient<Booking>, BookingClient<BookingGetPayload<T>>>
  /**
   * 
   */
  count(args?: Omit<FindManyBookingArgs, 'select' | 'include'>): Promise<number>
}

export declare class BookingClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  private _collectTimestamps?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';


  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Booking findOne
 */
export type FindOneBookingArgs = {
  /**
   * Select specific fields to fetch from the Booking
  **/
  select?: BookingSelect | null
  /**
   * Filter, which Booking to fetch.
  **/
  where: BookingWhereUniqueInput
}


/**
 * Booking findMany
 */
export type FindManyBookingArgs = {
  /**
   * Select specific fields to fetch from the Booking
  **/
  select?: BookingSelect | null
  /**
   * Filter, which Bookings to fetch.
  **/
  where?: BookingWhereInput | null
  /**
   * Determine the order of the Bookings to fetch.
  **/
  orderBy?: BookingOrderByInput | null
  /**
   * Skip the first `n` Bookings.
  **/
  skip?: number | null
  /**
   * Get all Bookings that come after the Booking you provide with the current order.
  **/
  after?: BookingWhereUniqueInput | null
  /**
   * Get all Bookings that come before the Booking you provide with the current order.
  **/
  before?: BookingWhereUniqueInput | null
  /**
   * Get the first `n` Bookings.
  **/
  first?: number | null
  /**
   * Get the last `n` Bookings.
  **/
  last?: number | null
}


/**
 * Booking create
 */
export type BookingCreateArgs = {
  /**
   * Select specific fields to fetch from the Booking
  **/
  select?: BookingSelect | null
  /**
   * The data needed to create a Booking.
  **/
  data: BookingCreateInput
}


/**
 * Booking update
 */
export type BookingUpdateArgs = {
  /**
   * Select specific fields to fetch from the Booking
  **/
  select?: BookingSelect | null
  /**
   * The data needed to update a Booking.
  **/
  data: BookingUpdateInput
  /**
   * Choose, which Booking to update.
  **/
  where: BookingWhereUniqueInput
}


/**
 * Booking updateMany
 */
export type BookingUpdateManyArgs = {
  data: BookingUpdateManyMutationInput
  where?: BookingWhereInput | null
}


/**
 * Booking upsert
 */
export type BookingUpsertArgs = {
  /**
   * Select specific fields to fetch from the Booking
  **/
  select?: BookingSelect | null
  /**
   * The filter to search for the Booking to update in case it exists.
  **/
  where: BookingWhereUniqueInput
  /**
   * In case the Booking found by the `where` argument doesn't exist, create a new Booking with this data.
  **/
  create: BookingCreateInput
  /**
   * In case the Booking was found with the provided `where` argument, update it with this data.
  **/
  update: BookingUpdateInput
}


/**
 * Booking delete
 */
export type BookingDeleteArgs = {
  /**
   * Select specific fields to fetch from the Booking
  **/
  select?: BookingSelect | null
  /**
   * Filter which Booking to delete.
  **/
  where: BookingWhereUniqueInput
}


/**
 * Booking deleteMany
 */
export type BookingDeleteManyArgs = {
  where?: BookingWhereInput | null
}


/**
 * Booking without action
 */
export type BookingArgs = {
  /**
   * Select specific fields to fetch from the Booking
  **/
  select?: BookingSelect | null
}



/**
 * Model Brand
 */

export type Brand = {
  id: number
  name: string | null
  deleted: boolean | null
}

export type BrandSelect = {
  id?: boolean
  name?: boolean
  deleted?: boolean
}

export type BrandGetPayload<
  S extends boolean | null | undefined | BrandArgs,
  U = keyof S
> = S extends true
  ? Brand
  : S extends undefined
  ? never
  : S extends BrandArgs | FindManyBrandArgs
  ? 'include' extends U
    ? Brand 
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Brand ? Brand[P]
: 
 never
    }
  : Brand
: Brand


export interface BrandDelegate {
  /**
   * Find zero or one Brand.
   * @param {FindOneBrandArgs} args - Arguments to find a Brand
   * @example
   * // Get one Brand
   * const brand = await prisma.brand.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneBrandArgs>(
    args: Subset<T, FindOneBrandArgs>
  ): CheckSelect<T, BrandClient<Brand | null>, BrandClient<BrandGetPayload<T> | null>>
  /**
   * Find zero or more Brands.
   * @param {FindManyBrandArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Brands
   * const brands = await prisma.brand.findMany()
   * 
   * // Get first 10 Brands
   * const brands = await prisma.brand.findMany({ first: 10 })
   * 
   * // Only select the `id`
   * const brandWithIdOnly = await prisma.brand.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyBrandArgs>(
    args?: Subset<T, FindManyBrandArgs>
  ): CheckSelect<T, Promise<Array<Brand>>, Promise<Array<BrandGetPayload<T>>>>
  /**
   * Create a Brand.
   * @param {BrandCreateArgs} args - Arguments to create a Brand.
   * @example
   * // Create one Brand
   * const user = await prisma.brand.create({
   *   data: {
   *     // ... data to create a Brand
   *   }
   * })
   * 
  **/
  create<T extends BrandCreateArgs>(
    args: Subset<T, BrandCreateArgs>
  ): CheckSelect<T, BrandClient<Brand>, BrandClient<BrandGetPayload<T>>>
  /**
   * Delete a Brand.
   * @param {BrandDeleteArgs} args - Arguments to delete one Brand.
   * @example
   * // Delete one Brand
   * const user = await prisma.brand.delete({
   *   where: {
   *     // ... filter to delete one Brand
   *   }
   * })
   * 
  **/
  delete<T extends BrandDeleteArgs>(
    args: Subset<T, BrandDeleteArgs>
  ): CheckSelect<T, BrandClient<Brand>, BrandClient<BrandGetPayload<T>>>
  /**
   * Update one Brand.
   * @param {BrandUpdateArgs} args - Arguments to update one Brand.
   * @example
   * // Update one Brand
   * const brand = await prisma.brand.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends BrandUpdateArgs>(
    args: Subset<T, BrandUpdateArgs>
  ): CheckSelect<T, BrandClient<Brand>, BrandClient<BrandGetPayload<T>>>
  /**
   * Delete zero or more Brands.
   * @param {BrandDeleteManyArgs} args - Arguments to filter Brands to delete.
   * @example
   * // Delete a few Brands
   * const { count } = await prisma.brand.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends BrandDeleteManyArgs>(
    args: Subset<T, BrandDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Brands.
   * @param {BrandUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Brands
   * const brand = await prisma.brand.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends BrandUpdateManyArgs>(
    args: Subset<T, BrandUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Brand.
   * @param {BrandUpsertArgs} args - Arguments to update or create a Brand.
   * @example
   * // Update or create a Brand
   * const brand = await prisma.brand.upsert({
   *   create: {
   *     // ... data to create a Brand
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Brand we want to update
   *   }
   * })
  **/
  upsert<T extends BrandUpsertArgs>(
    args: Subset<T, BrandUpsertArgs>
  ): CheckSelect<T, BrandClient<Brand>, BrandClient<BrandGetPayload<T>>>
  /**
   * 
   */
  count(args?: Omit<FindManyBrandArgs, 'select' | 'include'>): Promise<number>
}

export declare class BrandClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  private _collectTimestamps?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';


  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Brand findOne
 */
export type FindOneBrandArgs = {
  /**
   * Select specific fields to fetch from the Brand
  **/
  select?: BrandSelect | null
  /**
   * Filter, which Brand to fetch.
  **/
  where: BrandWhereUniqueInput
}


/**
 * Brand findMany
 */
export type FindManyBrandArgs = {
  /**
   * Select specific fields to fetch from the Brand
  **/
  select?: BrandSelect | null
  /**
   * Filter, which Brands to fetch.
  **/
  where?: BrandWhereInput | null
  /**
   * Determine the order of the Brands to fetch.
  **/
  orderBy?: BrandOrderByInput | null
  /**
   * Skip the first `n` Brands.
  **/
  skip?: number | null
  /**
   * Get all Brands that come after the Brand you provide with the current order.
  **/
  after?: BrandWhereUniqueInput | null
  /**
   * Get all Brands that come before the Brand you provide with the current order.
  **/
  before?: BrandWhereUniqueInput | null
  /**
   * Get the first `n` Brands.
  **/
  first?: number | null
  /**
   * Get the last `n` Brands.
  **/
  last?: number | null
}


/**
 * Brand create
 */
export type BrandCreateArgs = {
  /**
   * Select specific fields to fetch from the Brand
  **/
  select?: BrandSelect | null
  /**
   * The data needed to create a Brand.
  **/
  data: BrandCreateInput
}


/**
 * Brand update
 */
export type BrandUpdateArgs = {
  /**
   * Select specific fields to fetch from the Brand
  **/
  select?: BrandSelect | null
  /**
   * The data needed to update a Brand.
  **/
  data: BrandUpdateInput
  /**
   * Choose, which Brand to update.
  **/
  where: BrandWhereUniqueInput
}


/**
 * Brand updateMany
 */
export type BrandUpdateManyArgs = {
  data: BrandUpdateManyMutationInput
  where?: BrandWhereInput | null
}


/**
 * Brand upsert
 */
export type BrandUpsertArgs = {
  /**
   * Select specific fields to fetch from the Brand
  **/
  select?: BrandSelect | null
  /**
   * The filter to search for the Brand to update in case it exists.
  **/
  where: BrandWhereUniqueInput
  /**
   * In case the Brand found by the `where` argument doesn't exist, create a new Brand with this data.
  **/
  create: BrandCreateInput
  /**
   * In case the Brand was found with the provided `where` argument, update it with this data.
  **/
  update: BrandUpdateInput
}


/**
 * Brand delete
 */
export type BrandDeleteArgs = {
  /**
   * Select specific fields to fetch from the Brand
  **/
  select?: BrandSelect | null
  /**
   * Filter which Brand to delete.
  **/
  where: BrandWhereUniqueInput
}


/**
 * Brand deleteMany
 */
export type BrandDeleteManyArgs = {
  where?: BrandWhereInput | null
}


/**
 * Brand without action
 */
export type BrandArgs = {
  /**
   * Select specific fields to fetch from the Brand
  **/
  select?: BrandSelect | null
}



/**
 * Model Car
 */

export type Car = {
  id: number
  brandId: number | null
  model: string | null
  model_date: number | null
  categoryId: number | null
  price: number | null
  colorId: number | null
  plate_number: string
  picture: string | null
  chassis_number: string | null
  statusId: number | null
  deleted: boolean | null
  createdAt: Date | null
  updatedAt: Date | null
}

export type CarSelect = {
  id?: boolean
  brandId?: boolean
  model?: boolean
  model_date?: boolean
  categoryId?: boolean
  price?: boolean
  colorId?: boolean
  plate_number?: boolean
  picture?: boolean
  chassis_number?: boolean
  statusId?: boolean
  deleted?: boolean
  createdAt?: boolean
  updatedAt?: boolean
}

export type CarGetPayload<
  S extends boolean | null | undefined | CarArgs,
  U = keyof S
> = S extends true
  ? Car
  : S extends undefined
  ? never
  : S extends CarArgs | FindManyCarArgs
  ? 'include' extends U
    ? Car 
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Car ? Car[P]
: 
 never
    }
  : Car
: Car


export interface CarDelegate {
  /**
   * Find zero or one Car.
   * @param {FindOneCarArgs} args - Arguments to find a Car
   * @example
   * // Get one Car
   * const car = await prisma.car.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneCarArgs>(
    args: Subset<T, FindOneCarArgs>
  ): CheckSelect<T, CarClient<Car | null>, CarClient<CarGetPayload<T> | null>>
  /**
   * Find zero or more Cars.
   * @param {FindManyCarArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Cars
   * const cars = await prisma.car.findMany()
   * 
   * // Get first 10 Cars
   * const cars = await prisma.car.findMany({ first: 10 })
   * 
   * // Only select the `id`
   * const carWithIdOnly = await prisma.car.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyCarArgs>(
    args?: Subset<T, FindManyCarArgs>
  ): CheckSelect<T, Promise<Array<Car>>, Promise<Array<CarGetPayload<T>>>>
  /**
   * Create a Car.
   * @param {CarCreateArgs} args - Arguments to create a Car.
   * @example
   * // Create one Car
   * const user = await prisma.car.create({
   *   data: {
   *     // ... data to create a Car
   *   }
   * })
   * 
  **/
  create<T extends CarCreateArgs>(
    args: Subset<T, CarCreateArgs>
  ): CheckSelect<T, CarClient<Car>, CarClient<CarGetPayload<T>>>
  /**
   * Delete a Car.
   * @param {CarDeleteArgs} args - Arguments to delete one Car.
   * @example
   * // Delete one Car
   * const user = await prisma.car.delete({
   *   where: {
   *     // ... filter to delete one Car
   *   }
   * })
   * 
  **/
  delete<T extends CarDeleteArgs>(
    args: Subset<T, CarDeleteArgs>
  ): CheckSelect<T, CarClient<Car>, CarClient<CarGetPayload<T>>>
  /**
   * Update one Car.
   * @param {CarUpdateArgs} args - Arguments to update one Car.
   * @example
   * // Update one Car
   * const car = await prisma.car.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends CarUpdateArgs>(
    args: Subset<T, CarUpdateArgs>
  ): CheckSelect<T, CarClient<Car>, CarClient<CarGetPayload<T>>>
  /**
   * Delete zero or more Cars.
   * @param {CarDeleteManyArgs} args - Arguments to filter Cars to delete.
   * @example
   * // Delete a few Cars
   * const { count } = await prisma.car.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends CarDeleteManyArgs>(
    args: Subset<T, CarDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Cars.
   * @param {CarUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Cars
   * const car = await prisma.car.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends CarUpdateManyArgs>(
    args: Subset<T, CarUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Car.
   * @param {CarUpsertArgs} args - Arguments to update or create a Car.
   * @example
   * // Update or create a Car
   * const car = await prisma.car.upsert({
   *   create: {
   *     // ... data to create a Car
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Car we want to update
   *   }
   * })
  **/
  upsert<T extends CarUpsertArgs>(
    args: Subset<T, CarUpsertArgs>
  ): CheckSelect<T, CarClient<Car>, CarClient<CarGetPayload<T>>>
  /**
   * 
   */
  count(args?: Omit<FindManyCarArgs, 'select' | 'include'>): Promise<number>
}

export declare class CarClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  private _collectTimestamps?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';


  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Car findOne
 */
export type FindOneCarArgs = {
  /**
   * Select specific fields to fetch from the Car
  **/
  select?: CarSelect | null
  /**
   * Filter, which Car to fetch.
  **/
  where: CarWhereUniqueInput
}


/**
 * Car findMany
 */
export type FindManyCarArgs = {
  /**
   * Select specific fields to fetch from the Car
  **/
  select?: CarSelect | null
  /**
   * Filter, which Cars to fetch.
  **/
  where?: CarWhereInput | null
  /**
   * Determine the order of the Cars to fetch.
  **/
  orderBy?: CarOrderByInput | null
  /**
   * Skip the first `n` Cars.
  **/
  skip?: number | null
  /**
   * Get all Cars that come after the Car you provide with the current order.
  **/
  after?: CarWhereUniqueInput | null
  /**
   * Get all Cars that come before the Car you provide with the current order.
  **/
  before?: CarWhereUniqueInput | null
  /**
   * Get the first `n` Cars.
  **/
  first?: number | null
  /**
   * Get the last `n` Cars.
  **/
  last?: number | null
}


/**
 * Car create
 */
export type CarCreateArgs = {
  /**
   * Select specific fields to fetch from the Car
  **/
  select?: CarSelect | null
  /**
   * The data needed to create a Car.
  **/
  data: CarCreateInput
}


/**
 * Car update
 */
export type CarUpdateArgs = {
  /**
   * Select specific fields to fetch from the Car
  **/
  select?: CarSelect | null
  /**
   * The data needed to update a Car.
  **/
  data: CarUpdateInput
  /**
   * Choose, which Car to update.
  **/
  where: CarWhereUniqueInput
}


/**
 * Car updateMany
 */
export type CarUpdateManyArgs = {
  data: CarUpdateManyMutationInput
  where?: CarWhereInput | null
}


/**
 * Car upsert
 */
export type CarUpsertArgs = {
  /**
   * Select specific fields to fetch from the Car
  **/
  select?: CarSelect | null
  /**
   * The filter to search for the Car to update in case it exists.
  **/
  where: CarWhereUniqueInput
  /**
   * In case the Car found by the `where` argument doesn't exist, create a new Car with this data.
  **/
  create: CarCreateInput
  /**
   * In case the Car was found with the provided `where` argument, update it with this data.
  **/
  update: CarUpdateInput
}


/**
 * Car delete
 */
export type CarDeleteArgs = {
  /**
   * Select specific fields to fetch from the Car
  **/
  select?: CarSelect | null
  /**
   * Filter which Car to delete.
  **/
  where: CarWhereUniqueInput
}


/**
 * Car deleteMany
 */
export type CarDeleteManyArgs = {
  where?: CarWhereInput | null
}


/**
 * Car without action
 */
export type CarArgs = {
  /**
   * Select specific fields to fetch from the Car
  **/
  select?: CarSelect | null
}



/**
 * Model Category
 */

export type Category = {
  id: number
  title: string | null
  deleted: boolean | null
}

export type CategorySelect = {
  id?: boolean
  title?: boolean
  deleted?: boolean
}

export type CategoryGetPayload<
  S extends boolean | null | undefined | CategoryArgs,
  U = keyof S
> = S extends true
  ? Category
  : S extends undefined
  ? never
  : S extends CategoryArgs | FindManyCategoryArgs
  ? 'include' extends U
    ? Category 
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Category ? Category[P]
: 
 never
    }
  : Category
: Category


export interface CategoryDelegate {
  /**
   * Find zero or one Category.
   * @param {FindOneCategoryArgs} args - Arguments to find a Category
   * @example
   * // Get one Category
   * const category = await prisma.category.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneCategoryArgs>(
    args: Subset<T, FindOneCategoryArgs>
  ): CheckSelect<T, CategoryClient<Category | null>, CategoryClient<CategoryGetPayload<T> | null>>
  /**
   * Find zero or more Categories.
   * @param {FindManyCategoryArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Categories
   * const categories = await prisma.category.findMany()
   * 
   * // Get first 10 Categories
   * const categories = await prisma.category.findMany({ first: 10 })
   * 
   * // Only select the `id`
   * const categoryWithIdOnly = await prisma.category.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyCategoryArgs>(
    args?: Subset<T, FindManyCategoryArgs>
  ): CheckSelect<T, Promise<Array<Category>>, Promise<Array<CategoryGetPayload<T>>>>
  /**
   * Create a Category.
   * @param {CategoryCreateArgs} args - Arguments to create a Category.
   * @example
   * // Create one Category
   * const user = await prisma.category.create({
   *   data: {
   *     // ... data to create a Category
   *   }
   * })
   * 
  **/
  create<T extends CategoryCreateArgs>(
    args: Subset<T, CategoryCreateArgs>
  ): CheckSelect<T, CategoryClient<Category>, CategoryClient<CategoryGetPayload<T>>>
  /**
   * Delete a Category.
   * @param {CategoryDeleteArgs} args - Arguments to delete one Category.
   * @example
   * // Delete one Category
   * const user = await prisma.category.delete({
   *   where: {
   *     // ... filter to delete one Category
   *   }
   * })
   * 
  **/
  delete<T extends CategoryDeleteArgs>(
    args: Subset<T, CategoryDeleteArgs>
  ): CheckSelect<T, CategoryClient<Category>, CategoryClient<CategoryGetPayload<T>>>
  /**
   * Update one Category.
   * @param {CategoryUpdateArgs} args - Arguments to update one Category.
   * @example
   * // Update one Category
   * const category = await prisma.category.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends CategoryUpdateArgs>(
    args: Subset<T, CategoryUpdateArgs>
  ): CheckSelect<T, CategoryClient<Category>, CategoryClient<CategoryGetPayload<T>>>
  /**
   * Delete zero or more Categories.
   * @param {CategoryDeleteManyArgs} args - Arguments to filter Categories to delete.
   * @example
   * // Delete a few Categories
   * const { count } = await prisma.category.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends CategoryDeleteManyArgs>(
    args: Subset<T, CategoryDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Categories.
   * @param {CategoryUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Categories
   * const category = await prisma.category.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends CategoryUpdateManyArgs>(
    args: Subset<T, CategoryUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Category.
   * @param {CategoryUpsertArgs} args - Arguments to update or create a Category.
   * @example
   * // Update or create a Category
   * const category = await prisma.category.upsert({
   *   create: {
   *     // ... data to create a Category
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Category we want to update
   *   }
   * })
  **/
  upsert<T extends CategoryUpsertArgs>(
    args: Subset<T, CategoryUpsertArgs>
  ): CheckSelect<T, CategoryClient<Category>, CategoryClient<CategoryGetPayload<T>>>
  /**
   * 
   */
  count(args?: Omit<FindManyCategoryArgs, 'select' | 'include'>): Promise<number>
}

export declare class CategoryClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  private _collectTimestamps?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';


  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Category findOne
 */
export type FindOneCategoryArgs = {
  /**
   * Select specific fields to fetch from the Category
  **/
  select?: CategorySelect | null
  /**
   * Filter, which Category to fetch.
  **/
  where: CategoryWhereUniqueInput
}


/**
 * Category findMany
 */
export type FindManyCategoryArgs = {
  /**
   * Select specific fields to fetch from the Category
  **/
  select?: CategorySelect | null
  /**
   * Filter, which Categories to fetch.
  **/
  where?: CategoryWhereInput | null
  /**
   * Determine the order of the Categories to fetch.
  **/
  orderBy?: CategoryOrderByInput | null
  /**
   * Skip the first `n` Categories.
  **/
  skip?: number | null
  /**
   * Get all Categories that come after the Category you provide with the current order.
  **/
  after?: CategoryWhereUniqueInput | null
  /**
   * Get all Categories that come before the Category you provide with the current order.
  **/
  before?: CategoryWhereUniqueInput | null
  /**
   * Get the first `n` Categories.
  **/
  first?: number | null
  /**
   * Get the last `n` Categories.
  **/
  last?: number | null
}


/**
 * Category create
 */
export type CategoryCreateArgs = {
  /**
   * Select specific fields to fetch from the Category
  **/
  select?: CategorySelect | null
  /**
   * The data needed to create a Category.
  **/
  data: CategoryCreateInput
}


/**
 * Category update
 */
export type CategoryUpdateArgs = {
  /**
   * Select specific fields to fetch from the Category
  **/
  select?: CategorySelect | null
  /**
   * The data needed to update a Category.
  **/
  data: CategoryUpdateInput
  /**
   * Choose, which Category to update.
  **/
  where: CategoryWhereUniqueInput
}


/**
 * Category updateMany
 */
export type CategoryUpdateManyArgs = {
  data: CategoryUpdateManyMutationInput
  where?: CategoryWhereInput | null
}


/**
 * Category upsert
 */
export type CategoryUpsertArgs = {
  /**
   * Select specific fields to fetch from the Category
  **/
  select?: CategorySelect | null
  /**
   * The filter to search for the Category to update in case it exists.
  **/
  where: CategoryWhereUniqueInput
  /**
   * In case the Category found by the `where` argument doesn't exist, create a new Category with this data.
  **/
  create: CategoryCreateInput
  /**
   * In case the Category was found with the provided `where` argument, update it with this data.
  **/
  update: CategoryUpdateInput
}


/**
 * Category delete
 */
export type CategoryDeleteArgs = {
  /**
   * Select specific fields to fetch from the Category
  **/
  select?: CategorySelect | null
  /**
   * Filter which Category to delete.
  **/
  where: CategoryWhereUniqueInput
}


/**
 * Category deleteMany
 */
export type CategoryDeleteManyArgs = {
  where?: CategoryWhereInput | null
}


/**
 * Category without action
 */
export type CategoryArgs = {
  /**
   * Select specific fields to fetch from the Category
  **/
  select?: CategorySelect | null
}



/**
 * Model Color
 */

export type Color = {
  id: number
  name: string | null
  deleted: boolean | null
}

export type ColorSelect = {
  id?: boolean
  name?: boolean
  deleted?: boolean
}

export type ColorGetPayload<
  S extends boolean | null | undefined | ColorArgs,
  U = keyof S
> = S extends true
  ? Color
  : S extends undefined
  ? never
  : S extends ColorArgs | FindManyColorArgs
  ? 'include' extends U
    ? Color 
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Color ? Color[P]
: 
 never
    }
  : Color
: Color


export interface ColorDelegate {
  /**
   * Find zero or one Color.
   * @param {FindOneColorArgs} args - Arguments to find a Color
   * @example
   * // Get one Color
   * const color = await prisma.color.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneColorArgs>(
    args: Subset<T, FindOneColorArgs>
  ): CheckSelect<T, ColorClient<Color | null>, ColorClient<ColorGetPayload<T> | null>>
  /**
   * Find zero or more Colors.
   * @param {FindManyColorArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Colors
   * const colors = await prisma.color.findMany()
   * 
   * // Get first 10 Colors
   * const colors = await prisma.color.findMany({ first: 10 })
   * 
   * // Only select the `id`
   * const colorWithIdOnly = await prisma.color.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyColorArgs>(
    args?: Subset<T, FindManyColorArgs>
  ): CheckSelect<T, Promise<Array<Color>>, Promise<Array<ColorGetPayload<T>>>>
  /**
   * Create a Color.
   * @param {ColorCreateArgs} args - Arguments to create a Color.
   * @example
   * // Create one Color
   * const user = await prisma.color.create({
   *   data: {
   *     // ... data to create a Color
   *   }
   * })
   * 
  **/
  create<T extends ColorCreateArgs>(
    args: Subset<T, ColorCreateArgs>
  ): CheckSelect<T, ColorClient<Color>, ColorClient<ColorGetPayload<T>>>
  /**
   * Delete a Color.
   * @param {ColorDeleteArgs} args - Arguments to delete one Color.
   * @example
   * // Delete one Color
   * const user = await prisma.color.delete({
   *   where: {
   *     // ... filter to delete one Color
   *   }
   * })
   * 
  **/
  delete<T extends ColorDeleteArgs>(
    args: Subset<T, ColorDeleteArgs>
  ): CheckSelect<T, ColorClient<Color>, ColorClient<ColorGetPayload<T>>>
  /**
   * Update one Color.
   * @param {ColorUpdateArgs} args - Arguments to update one Color.
   * @example
   * // Update one Color
   * const color = await prisma.color.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends ColorUpdateArgs>(
    args: Subset<T, ColorUpdateArgs>
  ): CheckSelect<T, ColorClient<Color>, ColorClient<ColorGetPayload<T>>>
  /**
   * Delete zero or more Colors.
   * @param {ColorDeleteManyArgs} args - Arguments to filter Colors to delete.
   * @example
   * // Delete a few Colors
   * const { count } = await prisma.color.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends ColorDeleteManyArgs>(
    args: Subset<T, ColorDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Colors.
   * @param {ColorUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Colors
   * const color = await prisma.color.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends ColorUpdateManyArgs>(
    args: Subset<T, ColorUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Color.
   * @param {ColorUpsertArgs} args - Arguments to update or create a Color.
   * @example
   * // Update or create a Color
   * const color = await prisma.color.upsert({
   *   create: {
   *     // ... data to create a Color
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Color we want to update
   *   }
   * })
  **/
  upsert<T extends ColorUpsertArgs>(
    args: Subset<T, ColorUpsertArgs>
  ): CheckSelect<T, ColorClient<Color>, ColorClient<ColorGetPayload<T>>>
  /**
   * 
   */
  count(args?: Omit<FindManyColorArgs, 'select' | 'include'>): Promise<number>
}

export declare class ColorClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  private _collectTimestamps?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';


  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Color findOne
 */
export type FindOneColorArgs = {
  /**
   * Select specific fields to fetch from the Color
  **/
  select?: ColorSelect | null
  /**
   * Filter, which Color to fetch.
  **/
  where: ColorWhereUniqueInput
}


/**
 * Color findMany
 */
export type FindManyColorArgs = {
  /**
   * Select specific fields to fetch from the Color
  **/
  select?: ColorSelect | null
  /**
   * Filter, which Colors to fetch.
  **/
  where?: ColorWhereInput | null
  /**
   * Determine the order of the Colors to fetch.
  **/
  orderBy?: ColorOrderByInput | null
  /**
   * Skip the first `n` Colors.
  **/
  skip?: number | null
  /**
   * Get all Colors that come after the Color you provide with the current order.
  **/
  after?: ColorWhereUniqueInput | null
  /**
   * Get all Colors that come before the Color you provide with the current order.
  **/
  before?: ColorWhereUniqueInput | null
  /**
   * Get the first `n` Colors.
  **/
  first?: number | null
  /**
   * Get the last `n` Colors.
  **/
  last?: number | null
}


/**
 * Color create
 */
export type ColorCreateArgs = {
  /**
   * Select specific fields to fetch from the Color
  **/
  select?: ColorSelect | null
  /**
   * The data needed to create a Color.
  **/
  data: ColorCreateInput
}


/**
 * Color update
 */
export type ColorUpdateArgs = {
  /**
   * Select specific fields to fetch from the Color
  **/
  select?: ColorSelect | null
  /**
   * The data needed to update a Color.
  **/
  data: ColorUpdateInput
  /**
   * Choose, which Color to update.
  **/
  where: ColorWhereUniqueInput
}


/**
 * Color updateMany
 */
export type ColorUpdateManyArgs = {
  data: ColorUpdateManyMutationInput
  where?: ColorWhereInput | null
}


/**
 * Color upsert
 */
export type ColorUpsertArgs = {
  /**
   * Select specific fields to fetch from the Color
  **/
  select?: ColorSelect | null
  /**
   * The filter to search for the Color to update in case it exists.
  **/
  where: ColorWhereUniqueInput
  /**
   * In case the Color found by the `where` argument doesn't exist, create a new Color with this data.
  **/
  create: ColorCreateInput
  /**
   * In case the Color was found with the provided `where` argument, update it with this data.
  **/
  update: ColorUpdateInput
}


/**
 * Color delete
 */
export type ColorDeleteArgs = {
  /**
   * Select specific fields to fetch from the Color
  **/
  select?: ColorSelect | null
  /**
   * Filter which Color to delete.
  **/
  where: ColorWhereUniqueInput
}


/**
 * Color deleteMany
 */
export type ColorDeleteManyArgs = {
  where?: ColorWhereInput | null
}


/**
 * Color without action
 */
export type ColorArgs = {
  /**
   * Select specific fields to fetch from the Color
  **/
  select?: ColorSelect | null
}



/**
 * Model Car_insurance
 */

export type Car_insurance = {
  id: number
  carId: number | null
  insuranceId: number | null
  date_begin: Date | null
  date_end: Date | null
  createdAt: Date | null
  updatedAt: Date | null
  deleted: boolean | null
}

export type Car_insuranceSelect = {
  id?: boolean
  carId?: boolean
  insuranceId?: boolean
  date_begin?: boolean
  date_end?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  deleted?: boolean
}

export type Car_insuranceGetPayload<
  S extends boolean | null | undefined | Car_insuranceArgs,
  U = keyof S
> = S extends true
  ? Car_insurance
  : S extends undefined
  ? never
  : S extends Car_insuranceArgs | FindManyCar_insuranceArgs
  ? 'include' extends U
    ? Car_insurance 
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Car_insurance ? Car_insurance[P]
: 
 never
    }
  : Car_insurance
: Car_insurance


export interface Car_insuranceDelegate {
  /**
   * Find zero or one Car_insurance.
   * @param {FindOneCar_insuranceArgs} args - Arguments to find a Car_insurance
   * @example
   * // Get one Car_insurance
   * const car_insurance = await prisma.car_insurance.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneCar_insuranceArgs>(
    args: Subset<T, FindOneCar_insuranceArgs>
  ): CheckSelect<T, Car_insuranceClient<Car_insurance | null>, Car_insuranceClient<Car_insuranceGetPayload<T> | null>>
  /**
   * Find zero or more Car_insurances.
   * @param {FindManyCar_insuranceArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Car_insurances
   * const car_insurances = await prisma.car_insurance.findMany()
   * 
   * // Get first 10 Car_insurances
   * const car_insurances = await prisma.car_insurance.findMany({ first: 10 })
   * 
   * // Only select the `id`
   * const car_insuranceWithIdOnly = await prisma.car_insurance.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyCar_insuranceArgs>(
    args?: Subset<T, FindManyCar_insuranceArgs>
  ): CheckSelect<T, Promise<Array<Car_insurance>>, Promise<Array<Car_insuranceGetPayload<T>>>>
  /**
   * Create a Car_insurance.
   * @param {Car_insuranceCreateArgs} args - Arguments to create a Car_insurance.
   * @example
   * // Create one Car_insurance
   * const user = await prisma.car_insurance.create({
   *   data: {
   *     // ... data to create a Car_insurance
   *   }
   * })
   * 
  **/
  create<T extends Car_insuranceCreateArgs>(
    args: Subset<T, Car_insuranceCreateArgs>
  ): CheckSelect<T, Car_insuranceClient<Car_insurance>, Car_insuranceClient<Car_insuranceGetPayload<T>>>
  /**
   * Delete a Car_insurance.
   * @param {Car_insuranceDeleteArgs} args - Arguments to delete one Car_insurance.
   * @example
   * // Delete one Car_insurance
   * const user = await prisma.car_insurance.delete({
   *   where: {
   *     // ... filter to delete one Car_insurance
   *   }
   * })
   * 
  **/
  delete<T extends Car_insuranceDeleteArgs>(
    args: Subset<T, Car_insuranceDeleteArgs>
  ): CheckSelect<T, Car_insuranceClient<Car_insurance>, Car_insuranceClient<Car_insuranceGetPayload<T>>>
  /**
   * Update one Car_insurance.
   * @param {Car_insuranceUpdateArgs} args - Arguments to update one Car_insurance.
   * @example
   * // Update one Car_insurance
   * const car_insurance = await prisma.car_insurance.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends Car_insuranceUpdateArgs>(
    args: Subset<T, Car_insuranceUpdateArgs>
  ): CheckSelect<T, Car_insuranceClient<Car_insurance>, Car_insuranceClient<Car_insuranceGetPayload<T>>>
  /**
   * Delete zero or more Car_insurances.
   * @param {Car_insuranceDeleteManyArgs} args - Arguments to filter Car_insurances to delete.
   * @example
   * // Delete a few Car_insurances
   * const { count } = await prisma.car_insurance.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends Car_insuranceDeleteManyArgs>(
    args: Subset<T, Car_insuranceDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Car_insurances.
   * @param {Car_insuranceUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Car_insurances
   * const car_insurance = await prisma.car_insurance.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends Car_insuranceUpdateManyArgs>(
    args: Subset<T, Car_insuranceUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Car_insurance.
   * @param {Car_insuranceUpsertArgs} args - Arguments to update or create a Car_insurance.
   * @example
   * // Update or create a Car_insurance
   * const car_insurance = await prisma.car_insurance.upsert({
   *   create: {
   *     // ... data to create a Car_insurance
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Car_insurance we want to update
   *   }
   * })
  **/
  upsert<T extends Car_insuranceUpsertArgs>(
    args: Subset<T, Car_insuranceUpsertArgs>
  ): CheckSelect<T, Car_insuranceClient<Car_insurance>, Car_insuranceClient<Car_insuranceGetPayload<T>>>
  /**
   * 
   */
  count(args?: Omit<FindManyCar_insuranceArgs, 'select' | 'include'>): Promise<number>
}

export declare class Car_insuranceClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  private _collectTimestamps?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';


  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Car_insurance findOne
 */
export type FindOneCar_insuranceArgs = {
  /**
   * Select specific fields to fetch from the Car_insurance
  **/
  select?: Car_insuranceSelect | null
  /**
   * Filter, which Car_insurance to fetch.
  **/
  where: Car_insuranceWhereUniqueInput
}


/**
 * Car_insurance findMany
 */
export type FindManyCar_insuranceArgs = {
  /**
   * Select specific fields to fetch from the Car_insurance
  **/
  select?: Car_insuranceSelect | null
  /**
   * Filter, which Car_insurances to fetch.
  **/
  where?: Car_insuranceWhereInput | null
  /**
   * Determine the order of the Car_insurances to fetch.
  **/
  orderBy?: Car_insuranceOrderByInput | null
  /**
   * Skip the first `n` Car_insurances.
  **/
  skip?: number | null
  /**
   * Get all Car_insurances that come after the Car_insurance you provide with the current order.
  **/
  after?: Car_insuranceWhereUniqueInput | null
  /**
   * Get all Car_insurances that come before the Car_insurance you provide with the current order.
  **/
  before?: Car_insuranceWhereUniqueInput | null
  /**
   * Get the first `n` Car_insurances.
  **/
  first?: number | null
  /**
   * Get the last `n` Car_insurances.
  **/
  last?: number | null
}


/**
 * Car_insurance create
 */
export type Car_insuranceCreateArgs = {
  /**
   * Select specific fields to fetch from the Car_insurance
  **/
  select?: Car_insuranceSelect | null
  /**
   * The data needed to create a Car_insurance.
  **/
  data: Car_insuranceCreateInput
}


/**
 * Car_insurance update
 */
export type Car_insuranceUpdateArgs = {
  /**
   * Select specific fields to fetch from the Car_insurance
  **/
  select?: Car_insuranceSelect | null
  /**
   * The data needed to update a Car_insurance.
  **/
  data: Car_insuranceUpdateInput
  /**
   * Choose, which Car_insurance to update.
  **/
  where: Car_insuranceWhereUniqueInput
}


/**
 * Car_insurance updateMany
 */
export type Car_insuranceUpdateManyArgs = {
  data: Car_insuranceUpdateManyMutationInput
  where?: Car_insuranceWhereInput | null
}


/**
 * Car_insurance upsert
 */
export type Car_insuranceUpsertArgs = {
  /**
   * Select specific fields to fetch from the Car_insurance
  **/
  select?: Car_insuranceSelect | null
  /**
   * The filter to search for the Car_insurance to update in case it exists.
  **/
  where: Car_insuranceWhereUniqueInput
  /**
   * In case the Car_insurance found by the `where` argument doesn't exist, create a new Car_insurance with this data.
  **/
  create: Car_insuranceCreateInput
  /**
   * In case the Car_insurance was found with the provided `where` argument, update it with this data.
  **/
  update: Car_insuranceUpdateInput
}


/**
 * Car_insurance delete
 */
export type Car_insuranceDeleteArgs = {
  /**
   * Select specific fields to fetch from the Car_insurance
  **/
  select?: Car_insuranceSelect | null
  /**
   * Filter which Car_insurance to delete.
  **/
  where: Car_insuranceWhereUniqueInput
}


/**
 * Car_insurance deleteMany
 */
export type Car_insuranceDeleteManyArgs = {
  where?: Car_insuranceWhereInput | null
}


/**
 * Car_insurance without action
 */
export type Car_insuranceArgs = {
  /**
   * Select specific fields to fetch from the Car_insurance
  **/
  select?: Car_insuranceSelect | null
}



/**
 * Model Contract
 */

export type Contract = {
  id: number
  rentalId: number | null
  contract_typeId: number | null
  date_begin: Date | null
  date_end: Date | null
  createdAt: Date | null
  updatedAt: Date | null
  deleted: boolean | null
}

export type ContractSelect = {
  id?: boolean
  rentalId?: boolean
  contract_typeId?: boolean
  date_begin?: boolean
  date_end?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  deleted?: boolean
}

export type ContractGetPayload<
  S extends boolean | null | undefined | ContractArgs,
  U = keyof S
> = S extends true
  ? Contract
  : S extends undefined
  ? never
  : S extends ContractArgs | FindManyContractArgs
  ? 'include' extends U
    ? Contract 
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Contract ? Contract[P]
: 
 never
    }
  : Contract
: Contract


export interface ContractDelegate {
  /**
   * Find zero or one Contract.
   * @param {FindOneContractArgs} args - Arguments to find a Contract
   * @example
   * // Get one Contract
   * const contract = await prisma.contract.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneContractArgs>(
    args: Subset<T, FindOneContractArgs>
  ): CheckSelect<T, ContractClient<Contract | null>, ContractClient<ContractGetPayload<T> | null>>
  /**
   * Find zero or more Contracts.
   * @param {FindManyContractArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Contracts
   * const contracts = await prisma.contract.findMany()
   * 
   * // Get first 10 Contracts
   * const contracts = await prisma.contract.findMany({ first: 10 })
   * 
   * // Only select the `id`
   * const contractWithIdOnly = await prisma.contract.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyContractArgs>(
    args?: Subset<T, FindManyContractArgs>
  ): CheckSelect<T, Promise<Array<Contract>>, Promise<Array<ContractGetPayload<T>>>>
  /**
   * Create a Contract.
   * @param {ContractCreateArgs} args - Arguments to create a Contract.
   * @example
   * // Create one Contract
   * const user = await prisma.contract.create({
   *   data: {
   *     // ... data to create a Contract
   *   }
   * })
   * 
  **/
  create<T extends ContractCreateArgs>(
    args: Subset<T, ContractCreateArgs>
  ): CheckSelect<T, ContractClient<Contract>, ContractClient<ContractGetPayload<T>>>
  /**
   * Delete a Contract.
   * @param {ContractDeleteArgs} args - Arguments to delete one Contract.
   * @example
   * // Delete one Contract
   * const user = await prisma.contract.delete({
   *   where: {
   *     // ... filter to delete one Contract
   *   }
   * })
   * 
  **/
  delete<T extends ContractDeleteArgs>(
    args: Subset<T, ContractDeleteArgs>
  ): CheckSelect<T, ContractClient<Contract>, ContractClient<ContractGetPayload<T>>>
  /**
   * Update one Contract.
   * @param {ContractUpdateArgs} args - Arguments to update one Contract.
   * @example
   * // Update one Contract
   * const contract = await prisma.contract.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends ContractUpdateArgs>(
    args: Subset<T, ContractUpdateArgs>
  ): CheckSelect<T, ContractClient<Contract>, ContractClient<ContractGetPayload<T>>>
  /**
   * Delete zero or more Contracts.
   * @param {ContractDeleteManyArgs} args - Arguments to filter Contracts to delete.
   * @example
   * // Delete a few Contracts
   * const { count } = await prisma.contract.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends ContractDeleteManyArgs>(
    args: Subset<T, ContractDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Contracts.
   * @param {ContractUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Contracts
   * const contract = await prisma.contract.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends ContractUpdateManyArgs>(
    args: Subset<T, ContractUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Contract.
   * @param {ContractUpsertArgs} args - Arguments to update or create a Contract.
   * @example
   * // Update or create a Contract
   * const contract = await prisma.contract.upsert({
   *   create: {
   *     // ... data to create a Contract
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Contract we want to update
   *   }
   * })
  **/
  upsert<T extends ContractUpsertArgs>(
    args: Subset<T, ContractUpsertArgs>
  ): CheckSelect<T, ContractClient<Contract>, ContractClient<ContractGetPayload<T>>>
  /**
   * 
   */
  count(args?: Omit<FindManyContractArgs, 'select' | 'include'>): Promise<number>
}

export declare class ContractClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  private _collectTimestamps?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';


  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Contract findOne
 */
export type FindOneContractArgs = {
  /**
   * Select specific fields to fetch from the Contract
  **/
  select?: ContractSelect | null
  /**
   * Filter, which Contract to fetch.
  **/
  where: ContractWhereUniqueInput
}


/**
 * Contract findMany
 */
export type FindManyContractArgs = {
  /**
   * Select specific fields to fetch from the Contract
  **/
  select?: ContractSelect | null
  /**
   * Filter, which Contracts to fetch.
  **/
  where?: ContractWhereInput | null
  /**
   * Determine the order of the Contracts to fetch.
  **/
  orderBy?: ContractOrderByInput | null
  /**
   * Skip the first `n` Contracts.
  **/
  skip?: number | null
  /**
   * Get all Contracts that come after the Contract you provide with the current order.
  **/
  after?: ContractWhereUniqueInput | null
  /**
   * Get all Contracts that come before the Contract you provide with the current order.
  **/
  before?: ContractWhereUniqueInput | null
  /**
   * Get the first `n` Contracts.
  **/
  first?: number | null
  /**
   * Get the last `n` Contracts.
  **/
  last?: number | null
}


/**
 * Contract create
 */
export type ContractCreateArgs = {
  /**
   * Select specific fields to fetch from the Contract
  **/
  select?: ContractSelect | null
  /**
   * The data needed to create a Contract.
  **/
  data: ContractCreateInput
}


/**
 * Contract update
 */
export type ContractUpdateArgs = {
  /**
   * Select specific fields to fetch from the Contract
  **/
  select?: ContractSelect | null
  /**
   * The data needed to update a Contract.
  **/
  data: ContractUpdateInput
  /**
   * Choose, which Contract to update.
  **/
  where: ContractWhereUniqueInput
}


/**
 * Contract updateMany
 */
export type ContractUpdateManyArgs = {
  data: ContractUpdateManyMutationInput
  where?: ContractWhereInput | null
}


/**
 * Contract upsert
 */
export type ContractUpsertArgs = {
  /**
   * Select specific fields to fetch from the Contract
  **/
  select?: ContractSelect | null
  /**
   * The filter to search for the Contract to update in case it exists.
  **/
  where: ContractWhereUniqueInput
  /**
   * In case the Contract found by the `where` argument doesn't exist, create a new Contract with this data.
  **/
  create: ContractCreateInput
  /**
   * In case the Contract was found with the provided `where` argument, update it with this data.
  **/
  update: ContractUpdateInput
}


/**
 * Contract delete
 */
export type ContractDeleteArgs = {
  /**
   * Select specific fields to fetch from the Contract
  **/
  select?: ContractSelect | null
  /**
   * Filter which Contract to delete.
  **/
  where: ContractWhereUniqueInput
}


/**
 * Contract deleteMany
 */
export type ContractDeleteManyArgs = {
  where?: ContractWhereInput | null
}


/**
 * Contract without action
 */
export type ContractArgs = {
  /**
   * Select specific fields to fetch from the Contract
  **/
  select?: ContractSelect | null
}



/**
 * Model Contract_type
 */

export type Contract_type = {
  id: number
  name: string | null
  deleted: boolean | null
}

export type Contract_typeSelect = {
  id?: boolean
  name?: boolean
  deleted?: boolean
}

export type Contract_typeGetPayload<
  S extends boolean | null | undefined | Contract_typeArgs,
  U = keyof S
> = S extends true
  ? Contract_type
  : S extends undefined
  ? never
  : S extends Contract_typeArgs | FindManyContract_typeArgs
  ? 'include' extends U
    ? Contract_type 
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Contract_type ? Contract_type[P]
: 
 never
    }
  : Contract_type
: Contract_type


export interface Contract_typeDelegate {
  /**
   * Find zero or one Contract_type.
   * @param {FindOneContract_typeArgs} args - Arguments to find a Contract_type
   * @example
   * // Get one Contract_type
   * const contract_type = await prisma.contract_type.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneContract_typeArgs>(
    args: Subset<T, FindOneContract_typeArgs>
  ): CheckSelect<T, Contract_typeClient<Contract_type | null>, Contract_typeClient<Contract_typeGetPayload<T> | null>>
  /**
   * Find zero or more Contract_types.
   * @param {FindManyContract_typeArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Contract_types
   * const contract_types = await prisma.contract_type.findMany()
   * 
   * // Get first 10 Contract_types
   * const contract_types = await prisma.contract_type.findMany({ first: 10 })
   * 
   * // Only select the `id`
   * const contract_typeWithIdOnly = await prisma.contract_type.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyContract_typeArgs>(
    args?: Subset<T, FindManyContract_typeArgs>
  ): CheckSelect<T, Promise<Array<Contract_type>>, Promise<Array<Contract_typeGetPayload<T>>>>
  /**
   * Create a Contract_type.
   * @param {Contract_typeCreateArgs} args - Arguments to create a Contract_type.
   * @example
   * // Create one Contract_type
   * const user = await prisma.contract_type.create({
   *   data: {
   *     // ... data to create a Contract_type
   *   }
   * })
   * 
  **/
  create<T extends Contract_typeCreateArgs>(
    args: Subset<T, Contract_typeCreateArgs>
  ): CheckSelect<T, Contract_typeClient<Contract_type>, Contract_typeClient<Contract_typeGetPayload<T>>>
  /**
   * Delete a Contract_type.
   * @param {Contract_typeDeleteArgs} args - Arguments to delete one Contract_type.
   * @example
   * // Delete one Contract_type
   * const user = await prisma.contract_type.delete({
   *   where: {
   *     // ... filter to delete one Contract_type
   *   }
   * })
   * 
  **/
  delete<T extends Contract_typeDeleteArgs>(
    args: Subset<T, Contract_typeDeleteArgs>
  ): CheckSelect<T, Contract_typeClient<Contract_type>, Contract_typeClient<Contract_typeGetPayload<T>>>
  /**
   * Update one Contract_type.
   * @param {Contract_typeUpdateArgs} args - Arguments to update one Contract_type.
   * @example
   * // Update one Contract_type
   * const contract_type = await prisma.contract_type.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends Contract_typeUpdateArgs>(
    args: Subset<T, Contract_typeUpdateArgs>
  ): CheckSelect<T, Contract_typeClient<Contract_type>, Contract_typeClient<Contract_typeGetPayload<T>>>
  /**
   * Delete zero or more Contract_types.
   * @param {Contract_typeDeleteManyArgs} args - Arguments to filter Contract_types to delete.
   * @example
   * // Delete a few Contract_types
   * const { count } = await prisma.contract_type.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends Contract_typeDeleteManyArgs>(
    args: Subset<T, Contract_typeDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Contract_types.
   * @param {Contract_typeUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Contract_types
   * const contract_type = await prisma.contract_type.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends Contract_typeUpdateManyArgs>(
    args: Subset<T, Contract_typeUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Contract_type.
   * @param {Contract_typeUpsertArgs} args - Arguments to update or create a Contract_type.
   * @example
   * // Update or create a Contract_type
   * const contract_type = await prisma.contract_type.upsert({
   *   create: {
   *     // ... data to create a Contract_type
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Contract_type we want to update
   *   }
   * })
  **/
  upsert<T extends Contract_typeUpsertArgs>(
    args: Subset<T, Contract_typeUpsertArgs>
  ): CheckSelect<T, Contract_typeClient<Contract_type>, Contract_typeClient<Contract_typeGetPayload<T>>>
  /**
   * 
   */
  count(args?: Omit<FindManyContract_typeArgs, 'select' | 'include'>): Promise<number>
}

export declare class Contract_typeClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  private _collectTimestamps?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';


  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Contract_type findOne
 */
export type FindOneContract_typeArgs = {
  /**
   * Select specific fields to fetch from the Contract_type
  **/
  select?: Contract_typeSelect | null
  /**
   * Filter, which Contract_type to fetch.
  **/
  where: Contract_typeWhereUniqueInput
}


/**
 * Contract_type findMany
 */
export type FindManyContract_typeArgs = {
  /**
   * Select specific fields to fetch from the Contract_type
  **/
  select?: Contract_typeSelect | null
  /**
   * Filter, which Contract_types to fetch.
  **/
  where?: Contract_typeWhereInput | null
  /**
   * Determine the order of the Contract_types to fetch.
  **/
  orderBy?: Contract_typeOrderByInput | null
  /**
   * Skip the first `n` Contract_types.
  **/
  skip?: number | null
  /**
   * Get all Contract_types that come after the Contract_type you provide with the current order.
  **/
  after?: Contract_typeWhereUniqueInput | null
  /**
   * Get all Contract_types that come before the Contract_type you provide with the current order.
  **/
  before?: Contract_typeWhereUniqueInput | null
  /**
   * Get the first `n` Contract_types.
  **/
  first?: number | null
  /**
   * Get the last `n` Contract_types.
  **/
  last?: number | null
}


/**
 * Contract_type create
 */
export type Contract_typeCreateArgs = {
  /**
   * Select specific fields to fetch from the Contract_type
  **/
  select?: Contract_typeSelect | null
  /**
   * The data needed to create a Contract_type.
  **/
  data: Contract_typeCreateInput
}


/**
 * Contract_type update
 */
export type Contract_typeUpdateArgs = {
  /**
   * Select specific fields to fetch from the Contract_type
  **/
  select?: Contract_typeSelect | null
  /**
   * The data needed to update a Contract_type.
  **/
  data: Contract_typeUpdateInput
  /**
   * Choose, which Contract_type to update.
  **/
  where: Contract_typeWhereUniqueInput
}


/**
 * Contract_type updateMany
 */
export type Contract_typeUpdateManyArgs = {
  data: Contract_typeUpdateManyMutationInput
  where?: Contract_typeWhereInput | null
}


/**
 * Contract_type upsert
 */
export type Contract_typeUpsertArgs = {
  /**
   * Select specific fields to fetch from the Contract_type
  **/
  select?: Contract_typeSelect | null
  /**
   * The filter to search for the Contract_type to update in case it exists.
  **/
  where: Contract_typeWhereUniqueInput
  /**
   * In case the Contract_type found by the `where` argument doesn't exist, create a new Contract_type with this data.
  **/
  create: Contract_typeCreateInput
  /**
   * In case the Contract_type was found with the provided `where` argument, update it with this data.
  **/
  update: Contract_typeUpdateInput
}


/**
 * Contract_type delete
 */
export type Contract_typeDeleteArgs = {
  /**
   * Select specific fields to fetch from the Contract_type
  **/
  select?: Contract_typeSelect | null
  /**
   * Filter which Contract_type to delete.
  **/
  where: Contract_typeWhereUniqueInput
}


/**
 * Contract_type deleteMany
 */
export type Contract_typeDeleteManyArgs = {
  where?: Contract_typeWhereInput | null
}


/**
 * Contract_type without action
 */
export type Contract_typeArgs = {
  /**
   * Select specific fields to fetch from the Contract_type
  **/
  select?: Contract_typeSelect | null
}



/**
 * Model Customer
 */

export type Customer = {
  id: number
  firstname: string
  lastname: string | null
  birthday: Date | null
  gender: string | null
  cni: string | null
  type: number | null
  driver_license: string | null
  city: string | null
  address: string | null
  email: string
  phone: string | null
  company_name: string | null
  createdAt: Date | null
  updatedAt: Date | null
  deleted: boolean | null
}

export type CustomerSelect = {
  id?: boolean
  firstname?: boolean
  lastname?: boolean
  birthday?: boolean
  gender?: boolean
  cni?: boolean
  type?: boolean
  driver_license?: boolean
  city?: boolean
  address?: boolean
  email?: boolean
  phone?: boolean
  company_name?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  deleted?: boolean
}

export type CustomerGetPayload<
  S extends boolean | null | undefined | CustomerArgs,
  U = keyof S
> = S extends true
  ? Customer
  : S extends undefined
  ? never
  : S extends CustomerArgs | FindManyCustomerArgs
  ? 'include' extends U
    ? Customer 
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Customer ? Customer[P]
: 
 never
    }
  : Customer
: Customer


export interface CustomerDelegate {
  /**
   * Find zero or one Customer.
   * @param {FindOneCustomerArgs} args - Arguments to find a Customer
   * @example
   * // Get one Customer
   * const customer = await prisma.customer.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneCustomerArgs>(
    args: Subset<T, FindOneCustomerArgs>
  ): CheckSelect<T, CustomerClient<Customer | null>, CustomerClient<CustomerGetPayload<T> | null>>
  /**
   * Find zero or more Customers.
   * @param {FindManyCustomerArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Customers
   * const customers = await prisma.customer.findMany()
   * 
   * // Get first 10 Customers
   * const customers = await prisma.customer.findMany({ first: 10 })
   * 
   * // Only select the `id`
   * const customerWithIdOnly = await prisma.customer.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyCustomerArgs>(
    args?: Subset<T, FindManyCustomerArgs>
  ): CheckSelect<T, Promise<Array<Customer>>, Promise<Array<CustomerGetPayload<T>>>>
  /**
   * Create a Customer.
   * @param {CustomerCreateArgs} args - Arguments to create a Customer.
   * @example
   * // Create one Customer
   * const user = await prisma.customer.create({
   *   data: {
   *     // ... data to create a Customer
   *   }
   * })
   * 
  **/
  create<T extends CustomerCreateArgs>(
    args: Subset<T, CustomerCreateArgs>
  ): CheckSelect<T, CustomerClient<Customer>, CustomerClient<CustomerGetPayload<T>>>
  /**
   * Delete a Customer.
   * @param {CustomerDeleteArgs} args - Arguments to delete one Customer.
   * @example
   * // Delete one Customer
   * const user = await prisma.customer.delete({
   *   where: {
   *     // ... filter to delete one Customer
   *   }
   * })
   * 
  **/
  delete<T extends CustomerDeleteArgs>(
    args: Subset<T, CustomerDeleteArgs>
  ): CheckSelect<T, CustomerClient<Customer>, CustomerClient<CustomerGetPayload<T>>>
  /**
   * Update one Customer.
   * @param {CustomerUpdateArgs} args - Arguments to update one Customer.
   * @example
   * // Update one Customer
   * const customer = await prisma.customer.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends CustomerUpdateArgs>(
    args: Subset<T, CustomerUpdateArgs>
  ): CheckSelect<T, CustomerClient<Customer>, CustomerClient<CustomerGetPayload<T>>>
  /**
   * Delete zero or more Customers.
   * @param {CustomerDeleteManyArgs} args - Arguments to filter Customers to delete.
   * @example
   * // Delete a few Customers
   * const { count } = await prisma.customer.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends CustomerDeleteManyArgs>(
    args: Subset<T, CustomerDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Customers.
   * @param {CustomerUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Customers
   * const customer = await prisma.customer.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends CustomerUpdateManyArgs>(
    args: Subset<T, CustomerUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Customer.
   * @param {CustomerUpsertArgs} args - Arguments to update or create a Customer.
   * @example
   * // Update or create a Customer
   * const customer = await prisma.customer.upsert({
   *   create: {
   *     // ... data to create a Customer
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Customer we want to update
   *   }
   * })
  **/
  upsert<T extends CustomerUpsertArgs>(
    args: Subset<T, CustomerUpsertArgs>
  ): CheckSelect<T, CustomerClient<Customer>, CustomerClient<CustomerGetPayload<T>>>
  /**
   * 
   */
  count(args?: Omit<FindManyCustomerArgs, 'select' | 'include'>): Promise<number>
}

export declare class CustomerClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  private _collectTimestamps?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';


  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Customer findOne
 */
export type FindOneCustomerArgs = {
  /**
   * Select specific fields to fetch from the Customer
  **/
  select?: CustomerSelect | null
  /**
   * Filter, which Customer to fetch.
  **/
  where: CustomerWhereUniqueInput
}


/**
 * Customer findMany
 */
export type FindManyCustomerArgs = {
  /**
   * Select specific fields to fetch from the Customer
  **/
  select?: CustomerSelect | null
  /**
   * Filter, which Customers to fetch.
  **/
  where?: CustomerWhereInput | null
  /**
   * Determine the order of the Customers to fetch.
  **/
  orderBy?: CustomerOrderByInput | null
  /**
   * Skip the first `n` Customers.
  **/
  skip?: number | null
  /**
   * Get all Customers that come after the Customer you provide with the current order.
  **/
  after?: CustomerWhereUniqueInput | null
  /**
   * Get all Customers that come before the Customer you provide with the current order.
  **/
  before?: CustomerWhereUniqueInput | null
  /**
   * Get the first `n` Customers.
  **/
  first?: number | null
  /**
   * Get the last `n` Customers.
  **/
  last?: number | null
}


/**
 * Customer create
 */
export type CustomerCreateArgs = {
  /**
   * Select specific fields to fetch from the Customer
  **/
  select?: CustomerSelect | null
  /**
   * The data needed to create a Customer.
  **/
  data: CustomerCreateInput
}


/**
 * Customer update
 */
export type CustomerUpdateArgs = {
  /**
   * Select specific fields to fetch from the Customer
  **/
  select?: CustomerSelect | null
  /**
   * The data needed to update a Customer.
  **/
  data: CustomerUpdateInput
  /**
   * Choose, which Customer to update.
  **/
  where: CustomerWhereUniqueInput
}


/**
 * Customer updateMany
 */
export type CustomerUpdateManyArgs = {
  data: CustomerUpdateManyMutationInput
  where?: CustomerWhereInput | null
}


/**
 * Customer upsert
 */
export type CustomerUpsertArgs = {
  /**
   * Select specific fields to fetch from the Customer
  **/
  select?: CustomerSelect | null
  /**
   * The filter to search for the Customer to update in case it exists.
  **/
  where: CustomerWhereUniqueInput
  /**
   * In case the Customer found by the `where` argument doesn't exist, create a new Customer with this data.
  **/
  create: CustomerCreateInput
  /**
   * In case the Customer was found with the provided `where` argument, update it with this data.
  **/
  update: CustomerUpdateInput
}


/**
 * Customer delete
 */
export type CustomerDeleteArgs = {
  /**
   * Select specific fields to fetch from the Customer
  **/
  select?: CustomerSelect | null
  /**
   * Filter which Customer to delete.
  **/
  where: CustomerWhereUniqueInput
}


/**
 * Customer deleteMany
 */
export type CustomerDeleteManyArgs = {
  where?: CustomerWhereInput | null
}


/**
 * Customer without action
 */
export type CustomerArgs = {
  /**
   * Select specific fields to fetch from the Customer
  **/
  select?: CustomerSelect | null
}



/**
 * Model Image
 */

export type Image = {
  id: number
  albumId: number | null
  path: string | null
  createdAt: Date | null
  updatedAt: Date | null
  deleted: boolean | null
}

export type ImageSelect = {
  id?: boolean
  albumId?: boolean
  path?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  deleted?: boolean
}

export type ImageGetPayload<
  S extends boolean | null | undefined | ImageArgs,
  U = keyof S
> = S extends true
  ? Image
  : S extends undefined
  ? never
  : S extends ImageArgs | FindManyImageArgs
  ? 'include' extends U
    ? Image 
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Image ? Image[P]
: 
 never
    }
  : Image
: Image


export interface ImageDelegate {
  /**
   * Find zero or one Image.
   * @param {FindOneImageArgs} args - Arguments to find a Image
   * @example
   * // Get one Image
   * const image = await prisma.image.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneImageArgs>(
    args: Subset<T, FindOneImageArgs>
  ): CheckSelect<T, ImageClient<Image | null>, ImageClient<ImageGetPayload<T> | null>>
  /**
   * Find zero or more Images.
   * @param {FindManyImageArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Images
   * const images = await prisma.image.findMany()
   * 
   * // Get first 10 Images
   * const images = await prisma.image.findMany({ first: 10 })
   * 
   * // Only select the `id`
   * const imageWithIdOnly = await prisma.image.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyImageArgs>(
    args?: Subset<T, FindManyImageArgs>
  ): CheckSelect<T, Promise<Array<Image>>, Promise<Array<ImageGetPayload<T>>>>
  /**
   * Create a Image.
   * @param {ImageCreateArgs} args - Arguments to create a Image.
   * @example
   * // Create one Image
   * const user = await prisma.image.create({
   *   data: {
   *     // ... data to create a Image
   *   }
   * })
   * 
  **/
  create<T extends ImageCreateArgs>(
    args: Subset<T, ImageCreateArgs>
  ): CheckSelect<T, ImageClient<Image>, ImageClient<ImageGetPayload<T>>>
  /**
   * Delete a Image.
   * @param {ImageDeleteArgs} args - Arguments to delete one Image.
   * @example
   * // Delete one Image
   * const user = await prisma.image.delete({
   *   where: {
   *     // ... filter to delete one Image
   *   }
   * })
   * 
  **/
  delete<T extends ImageDeleteArgs>(
    args: Subset<T, ImageDeleteArgs>
  ): CheckSelect<T, ImageClient<Image>, ImageClient<ImageGetPayload<T>>>
  /**
   * Update one Image.
   * @param {ImageUpdateArgs} args - Arguments to update one Image.
   * @example
   * // Update one Image
   * const image = await prisma.image.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends ImageUpdateArgs>(
    args: Subset<T, ImageUpdateArgs>
  ): CheckSelect<T, ImageClient<Image>, ImageClient<ImageGetPayload<T>>>
  /**
   * Delete zero or more Images.
   * @param {ImageDeleteManyArgs} args - Arguments to filter Images to delete.
   * @example
   * // Delete a few Images
   * const { count } = await prisma.image.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends ImageDeleteManyArgs>(
    args: Subset<T, ImageDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Images.
   * @param {ImageUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Images
   * const image = await prisma.image.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends ImageUpdateManyArgs>(
    args: Subset<T, ImageUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Image.
   * @param {ImageUpsertArgs} args - Arguments to update or create a Image.
   * @example
   * // Update or create a Image
   * const image = await prisma.image.upsert({
   *   create: {
   *     // ... data to create a Image
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Image we want to update
   *   }
   * })
  **/
  upsert<T extends ImageUpsertArgs>(
    args: Subset<T, ImageUpsertArgs>
  ): CheckSelect<T, ImageClient<Image>, ImageClient<ImageGetPayload<T>>>
  /**
   * 
   */
  count(args?: Omit<FindManyImageArgs, 'select' | 'include'>): Promise<number>
}

export declare class ImageClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  private _collectTimestamps?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';


  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Image findOne
 */
export type FindOneImageArgs = {
  /**
   * Select specific fields to fetch from the Image
  **/
  select?: ImageSelect | null
  /**
   * Filter, which Image to fetch.
  **/
  where: ImageWhereUniqueInput
}


/**
 * Image findMany
 */
export type FindManyImageArgs = {
  /**
   * Select specific fields to fetch from the Image
  **/
  select?: ImageSelect | null
  /**
   * Filter, which Images to fetch.
  **/
  where?: ImageWhereInput | null
  /**
   * Determine the order of the Images to fetch.
  **/
  orderBy?: ImageOrderByInput | null
  /**
   * Skip the first `n` Images.
  **/
  skip?: number | null
  /**
   * Get all Images that come after the Image you provide with the current order.
  **/
  after?: ImageWhereUniqueInput | null
  /**
   * Get all Images that come before the Image you provide with the current order.
  **/
  before?: ImageWhereUniqueInput | null
  /**
   * Get the first `n` Images.
  **/
  first?: number | null
  /**
   * Get the last `n` Images.
  **/
  last?: number | null
}


/**
 * Image create
 */
export type ImageCreateArgs = {
  /**
   * Select specific fields to fetch from the Image
  **/
  select?: ImageSelect | null
  /**
   * The data needed to create a Image.
  **/
  data: ImageCreateInput
}


/**
 * Image update
 */
export type ImageUpdateArgs = {
  /**
   * Select specific fields to fetch from the Image
  **/
  select?: ImageSelect | null
  /**
   * The data needed to update a Image.
  **/
  data: ImageUpdateInput
  /**
   * Choose, which Image to update.
  **/
  where: ImageWhereUniqueInput
}


/**
 * Image updateMany
 */
export type ImageUpdateManyArgs = {
  data: ImageUpdateManyMutationInput
  where?: ImageWhereInput | null
}


/**
 * Image upsert
 */
export type ImageUpsertArgs = {
  /**
   * Select specific fields to fetch from the Image
  **/
  select?: ImageSelect | null
  /**
   * The filter to search for the Image to update in case it exists.
  **/
  where: ImageWhereUniqueInput
  /**
   * In case the Image found by the `where` argument doesn't exist, create a new Image with this data.
  **/
  create: ImageCreateInput
  /**
   * In case the Image was found with the provided `where` argument, update it with this data.
  **/
  update: ImageUpdateInput
}


/**
 * Image delete
 */
export type ImageDeleteArgs = {
  /**
   * Select specific fields to fetch from the Image
  **/
  select?: ImageSelect | null
  /**
   * Filter which Image to delete.
  **/
  where: ImageWhereUniqueInput
}


/**
 * Image deleteMany
 */
export type ImageDeleteManyArgs = {
  where?: ImageWhereInput | null
}


/**
 * Image without action
 */
export type ImageArgs = {
  /**
   * Select specific fields to fetch from the Image
  **/
  select?: ImageSelect | null
}



/**
 * Model Insurance
 */

export type Insurance = {
  id: number
  name: string | null
  deleted: boolean | null
}

export type InsuranceSelect = {
  id?: boolean
  name?: boolean
  deleted?: boolean
}

export type InsuranceGetPayload<
  S extends boolean | null | undefined | InsuranceArgs,
  U = keyof S
> = S extends true
  ? Insurance
  : S extends undefined
  ? never
  : S extends InsuranceArgs | FindManyInsuranceArgs
  ? 'include' extends U
    ? Insurance 
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Insurance ? Insurance[P]
: 
 never
    }
  : Insurance
: Insurance


export interface InsuranceDelegate {
  /**
   * Find zero or one Insurance.
   * @param {FindOneInsuranceArgs} args - Arguments to find a Insurance
   * @example
   * // Get one Insurance
   * const insurance = await prisma.insurance.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneInsuranceArgs>(
    args: Subset<T, FindOneInsuranceArgs>
  ): CheckSelect<T, InsuranceClient<Insurance | null>, InsuranceClient<InsuranceGetPayload<T> | null>>
  /**
   * Find zero or more Insurances.
   * @param {FindManyInsuranceArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Insurances
   * const insurances = await prisma.insurance.findMany()
   * 
   * // Get first 10 Insurances
   * const insurances = await prisma.insurance.findMany({ first: 10 })
   * 
   * // Only select the `id`
   * const insuranceWithIdOnly = await prisma.insurance.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyInsuranceArgs>(
    args?: Subset<T, FindManyInsuranceArgs>
  ): CheckSelect<T, Promise<Array<Insurance>>, Promise<Array<InsuranceGetPayload<T>>>>
  /**
   * Create a Insurance.
   * @param {InsuranceCreateArgs} args - Arguments to create a Insurance.
   * @example
   * // Create one Insurance
   * const user = await prisma.insurance.create({
   *   data: {
   *     // ... data to create a Insurance
   *   }
   * })
   * 
  **/
  create<T extends InsuranceCreateArgs>(
    args: Subset<T, InsuranceCreateArgs>
  ): CheckSelect<T, InsuranceClient<Insurance>, InsuranceClient<InsuranceGetPayload<T>>>
  /**
   * Delete a Insurance.
   * @param {InsuranceDeleteArgs} args - Arguments to delete one Insurance.
   * @example
   * // Delete one Insurance
   * const user = await prisma.insurance.delete({
   *   where: {
   *     // ... filter to delete one Insurance
   *   }
   * })
   * 
  **/
  delete<T extends InsuranceDeleteArgs>(
    args: Subset<T, InsuranceDeleteArgs>
  ): CheckSelect<T, InsuranceClient<Insurance>, InsuranceClient<InsuranceGetPayload<T>>>
  /**
   * Update one Insurance.
   * @param {InsuranceUpdateArgs} args - Arguments to update one Insurance.
   * @example
   * // Update one Insurance
   * const insurance = await prisma.insurance.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends InsuranceUpdateArgs>(
    args: Subset<T, InsuranceUpdateArgs>
  ): CheckSelect<T, InsuranceClient<Insurance>, InsuranceClient<InsuranceGetPayload<T>>>
  /**
   * Delete zero or more Insurances.
   * @param {InsuranceDeleteManyArgs} args - Arguments to filter Insurances to delete.
   * @example
   * // Delete a few Insurances
   * const { count } = await prisma.insurance.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends InsuranceDeleteManyArgs>(
    args: Subset<T, InsuranceDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Insurances.
   * @param {InsuranceUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Insurances
   * const insurance = await prisma.insurance.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends InsuranceUpdateManyArgs>(
    args: Subset<T, InsuranceUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Insurance.
   * @param {InsuranceUpsertArgs} args - Arguments to update or create a Insurance.
   * @example
   * // Update or create a Insurance
   * const insurance = await prisma.insurance.upsert({
   *   create: {
   *     // ... data to create a Insurance
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Insurance we want to update
   *   }
   * })
  **/
  upsert<T extends InsuranceUpsertArgs>(
    args: Subset<T, InsuranceUpsertArgs>
  ): CheckSelect<T, InsuranceClient<Insurance>, InsuranceClient<InsuranceGetPayload<T>>>
  /**
   * 
   */
  count(args?: Omit<FindManyInsuranceArgs, 'select' | 'include'>): Promise<number>
}

export declare class InsuranceClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  private _collectTimestamps?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';


  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Insurance findOne
 */
export type FindOneInsuranceArgs = {
  /**
   * Select specific fields to fetch from the Insurance
  **/
  select?: InsuranceSelect | null
  /**
   * Filter, which Insurance to fetch.
  **/
  where: InsuranceWhereUniqueInput
}


/**
 * Insurance findMany
 */
export type FindManyInsuranceArgs = {
  /**
   * Select specific fields to fetch from the Insurance
  **/
  select?: InsuranceSelect | null
  /**
   * Filter, which Insurances to fetch.
  **/
  where?: InsuranceWhereInput | null
  /**
   * Determine the order of the Insurances to fetch.
  **/
  orderBy?: InsuranceOrderByInput | null
  /**
   * Skip the first `n` Insurances.
  **/
  skip?: number | null
  /**
   * Get all Insurances that come after the Insurance you provide with the current order.
  **/
  after?: InsuranceWhereUniqueInput | null
  /**
   * Get all Insurances that come before the Insurance you provide with the current order.
  **/
  before?: InsuranceWhereUniqueInput | null
  /**
   * Get the first `n` Insurances.
  **/
  first?: number | null
  /**
   * Get the last `n` Insurances.
  **/
  last?: number | null
}


/**
 * Insurance create
 */
export type InsuranceCreateArgs = {
  /**
   * Select specific fields to fetch from the Insurance
  **/
  select?: InsuranceSelect | null
  /**
   * The data needed to create a Insurance.
  **/
  data: InsuranceCreateInput
}


/**
 * Insurance update
 */
export type InsuranceUpdateArgs = {
  /**
   * Select specific fields to fetch from the Insurance
  **/
  select?: InsuranceSelect | null
  /**
   * The data needed to update a Insurance.
  **/
  data: InsuranceUpdateInput
  /**
   * Choose, which Insurance to update.
  **/
  where: InsuranceWhereUniqueInput
}


/**
 * Insurance updateMany
 */
export type InsuranceUpdateManyArgs = {
  data: InsuranceUpdateManyMutationInput
  where?: InsuranceWhereInput | null
}


/**
 * Insurance upsert
 */
export type InsuranceUpsertArgs = {
  /**
   * Select specific fields to fetch from the Insurance
  **/
  select?: InsuranceSelect | null
  /**
   * The filter to search for the Insurance to update in case it exists.
  **/
  where: InsuranceWhereUniqueInput
  /**
   * In case the Insurance found by the `where` argument doesn't exist, create a new Insurance with this data.
  **/
  create: InsuranceCreateInput
  /**
   * In case the Insurance was found with the provided `where` argument, update it with this data.
  **/
  update: InsuranceUpdateInput
}


/**
 * Insurance delete
 */
export type InsuranceDeleteArgs = {
  /**
   * Select specific fields to fetch from the Insurance
  **/
  select?: InsuranceSelect | null
  /**
   * Filter which Insurance to delete.
  **/
  where: InsuranceWhereUniqueInput
}


/**
 * Insurance deleteMany
 */
export type InsuranceDeleteManyArgs = {
  where?: InsuranceWhereInput | null
}


/**
 * Insurance without action
 */
export type InsuranceArgs = {
  /**
   * Select specific fields to fetch from the Insurance
  **/
  select?: InsuranceSelect | null
}



/**
 * Model Rental
 */

export type Rental = {
  id: number
  bookingId: number | null
  carId: number | null
  customerId: number | null
  second_driverId: number | null
  date_begin: Date | null
  date_end: Date | null
  comment: string | null
  createdAt: Date | null
  updatedAt: Date | null
  deleted: boolean | null
}

export type RentalSelect = {
  id?: boolean
  bookingId?: boolean
  carId?: boolean
  customerId?: boolean
  second_driverId?: boolean
  date_begin?: boolean
  date_end?: boolean
  comment?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  deleted?: boolean
}

export type RentalGetPayload<
  S extends boolean | null | undefined | RentalArgs,
  U = keyof S
> = S extends true
  ? Rental
  : S extends undefined
  ? never
  : S extends RentalArgs | FindManyRentalArgs
  ? 'include' extends U
    ? Rental 
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Rental ? Rental[P]
: 
 never
    }
  : Rental
: Rental


export interface RentalDelegate {
  /**
   * Find zero or one Rental.
   * @param {FindOneRentalArgs} args - Arguments to find a Rental
   * @example
   * // Get one Rental
   * const rental = await prisma.rental.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneRentalArgs>(
    args: Subset<T, FindOneRentalArgs>
  ): CheckSelect<T, RentalClient<Rental | null>, RentalClient<RentalGetPayload<T> | null>>
  /**
   * Find zero or more Rentals.
   * @param {FindManyRentalArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Rentals
   * const rentals = await prisma.rental.findMany()
   * 
   * // Get first 10 Rentals
   * const rentals = await prisma.rental.findMany({ first: 10 })
   * 
   * // Only select the `id`
   * const rentalWithIdOnly = await prisma.rental.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyRentalArgs>(
    args?: Subset<T, FindManyRentalArgs>
  ): CheckSelect<T, Promise<Array<Rental>>, Promise<Array<RentalGetPayload<T>>>>
  /**
   * Create a Rental.
   * @param {RentalCreateArgs} args - Arguments to create a Rental.
   * @example
   * // Create one Rental
   * const user = await prisma.rental.create({
   *   data: {
   *     // ... data to create a Rental
   *   }
   * })
   * 
  **/
  create<T extends RentalCreateArgs>(
    args: Subset<T, RentalCreateArgs>
  ): CheckSelect<T, RentalClient<Rental>, RentalClient<RentalGetPayload<T>>>
  /**
   * Delete a Rental.
   * @param {RentalDeleteArgs} args - Arguments to delete one Rental.
   * @example
   * // Delete one Rental
   * const user = await prisma.rental.delete({
   *   where: {
   *     // ... filter to delete one Rental
   *   }
   * })
   * 
  **/
  delete<T extends RentalDeleteArgs>(
    args: Subset<T, RentalDeleteArgs>
  ): CheckSelect<T, RentalClient<Rental>, RentalClient<RentalGetPayload<T>>>
  /**
   * Update one Rental.
   * @param {RentalUpdateArgs} args - Arguments to update one Rental.
   * @example
   * // Update one Rental
   * const rental = await prisma.rental.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends RentalUpdateArgs>(
    args: Subset<T, RentalUpdateArgs>
  ): CheckSelect<T, RentalClient<Rental>, RentalClient<RentalGetPayload<T>>>
  /**
   * Delete zero or more Rentals.
   * @param {RentalDeleteManyArgs} args - Arguments to filter Rentals to delete.
   * @example
   * // Delete a few Rentals
   * const { count } = await prisma.rental.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends RentalDeleteManyArgs>(
    args: Subset<T, RentalDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Rentals.
   * @param {RentalUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Rentals
   * const rental = await prisma.rental.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends RentalUpdateManyArgs>(
    args: Subset<T, RentalUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Rental.
   * @param {RentalUpsertArgs} args - Arguments to update or create a Rental.
   * @example
   * // Update or create a Rental
   * const rental = await prisma.rental.upsert({
   *   create: {
   *     // ... data to create a Rental
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Rental we want to update
   *   }
   * })
  **/
  upsert<T extends RentalUpsertArgs>(
    args: Subset<T, RentalUpsertArgs>
  ): CheckSelect<T, RentalClient<Rental>, RentalClient<RentalGetPayload<T>>>
  /**
   * 
   */
  count(args?: Omit<FindManyRentalArgs, 'select' | 'include'>): Promise<number>
}

export declare class RentalClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  private _collectTimestamps?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';


  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Rental findOne
 */
export type FindOneRentalArgs = {
  /**
   * Select specific fields to fetch from the Rental
  **/
  select?: RentalSelect | null
  /**
   * Filter, which Rental to fetch.
  **/
  where: RentalWhereUniqueInput
}


/**
 * Rental findMany
 */
export type FindManyRentalArgs = {
  /**
   * Select specific fields to fetch from the Rental
  **/
  select?: RentalSelect | null
  /**
   * Filter, which Rentals to fetch.
  **/
  where?: RentalWhereInput | null
  /**
   * Determine the order of the Rentals to fetch.
  **/
  orderBy?: RentalOrderByInput | null
  /**
   * Skip the first `n` Rentals.
  **/
  skip?: number | null
  /**
   * Get all Rentals that come after the Rental you provide with the current order.
  **/
  after?: RentalWhereUniqueInput | null
  /**
   * Get all Rentals that come before the Rental you provide with the current order.
  **/
  before?: RentalWhereUniqueInput | null
  /**
   * Get the first `n` Rentals.
  **/
  first?: number | null
  /**
   * Get the last `n` Rentals.
  **/
  last?: number | null
}


/**
 * Rental create
 */
export type RentalCreateArgs = {
  /**
   * Select specific fields to fetch from the Rental
  **/
  select?: RentalSelect | null
  /**
   * The data needed to create a Rental.
  **/
  data: RentalCreateInput
}


/**
 * Rental update
 */
export type RentalUpdateArgs = {
  /**
   * Select specific fields to fetch from the Rental
  **/
  select?: RentalSelect | null
  /**
   * The data needed to update a Rental.
  **/
  data: RentalUpdateInput
  /**
   * Choose, which Rental to update.
  **/
  where: RentalWhereUniqueInput
}


/**
 * Rental updateMany
 */
export type RentalUpdateManyArgs = {
  data: RentalUpdateManyMutationInput
  where?: RentalWhereInput | null
}


/**
 * Rental upsert
 */
export type RentalUpsertArgs = {
  /**
   * Select specific fields to fetch from the Rental
  **/
  select?: RentalSelect | null
  /**
   * The filter to search for the Rental to update in case it exists.
  **/
  where: RentalWhereUniqueInput
  /**
   * In case the Rental found by the `where` argument doesn't exist, create a new Rental with this data.
  **/
  create: RentalCreateInput
  /**
   * In case the Rental was found with the provided `where` argument, update it with this data.
  **/
  update: RentalUpdateInput
}


/**
 * Rental delete
 */
export type RentalDeleteArgs = {
  /**
   * Select specific fields to fetch from the Rental
  **/
  select?: RentalSelect | null
  /**
   * Filter which Rental to delete.
  **/
  where: RentalWhereUniqueInput
}


/**
 * Rental deleteMany
 */
export type RentalDeleteManyArgs = {
  where?: RentalWhereInput | null
}


/**
 * Rental without action
 */
export type RentalArgs = {
  /**
   * Select specific fields to fetch from the Rental
  **/
  select?: RentalSelect | null
}



/**
 * Model Role
 */

export type Role = {
  id: number
  title: string | null
  deleted: boolean | null
}

export type RoleSelect = {
  id?: boolean
  title?: boolean
  deleted?: boolean
}

export type RoleGetPayload<
  S extends boolean | null | undefined | RoleArgs,
  U = keyof S
> = S extends true
  ? Role
  : S extends undefined
  ? never
  : S extends RoleArgs | FindManyRoleArgs
  ? 'include' extends U
    ? Role 
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Role ? Role[P]
: 
 never
    }
  : Role
: Role


export interface RoleDelegate {
  /**
   * Find zero or one Role.
   * @param {FindOneRoleArgs} args - Arguments to find a Role
   * @example
   * // Get one Role
   * const role = await prisma.role.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneRoleArgs>(
    args: Subset<T, FindOneRoleArgs>
  ): CheckSelect<T, RoleClient<Role | null>, RoleClient<RoleGetPayload<T> | null>>
  /**
   * Find zero or more Roles.
   * @param {FindManyRoleArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Roles
   * const roles = await prisma.role.findMany()
   * 
   * // Get first 10 Roles
   * const roles = await prisma.role.findMany({ first: 10 })
   * 
   * // Only select the `id`
   * const roleWithIdOnly = await prisma.role.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyRoleArgs>(
    args?: Subset<T, FindManyRoleArgs>
  ): CheckSelect<T, Promise<Array<Role>>, Promise<Array<RoleGetPayload<T>>>>
  /**
   * Create a Role.
   * @param {RoleCreateArgs} args - Arguments to create a Role.
   * @example
   * // Create one Role
   * const user = await prisma.role.create({
   *   data: {
   *     // ... data to create a Role
   *   }
   * })
   * 
  **/
  create<T extends RoleCreateArgs>(
    args: Subset<T, RoleCreateArgs>
  ): CheckSelect<T, RoleClient<Role>, RoleClient<RoleGetPayload<T>>>
  /**
   * Delete a Role.
   * @param {RoleDeleteArgs} args - Arguments to delete one Role.
   * @example
   * // Delete one Role
   * const user = await prisma.role.delete({
   *   where: {
   *     // ... filter to delete one Role
   *   }
   * })
   * 
  **/
  delete<T extends RoleDeleteArgs>(
    args: Subset<T, RoleDeleteArgs>
  ): CheckSelect<T, RoleClient<Role>, RoleClient<RoleGetPayload<T>>>
  /**
   * Update one Role.
   * @param {RoleUpdateArgs} args - Arguments to update one Role.
   * @example
   * // Update one Role
   * const role = await prisma.role.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends RoleUpdateArgs>(
    args: Subset<T, RoleUpdateArgs>
  ): CheckSelect<T, RoleClient<Role>, RoleClient<RoleGetPayload<T>>>
  /**
   * Delete zero or more Roles.
   * @param {RoleDeleteManyArgs} args - Arguments to filter Roles to delete.
   * @example
   * // Delete a few Roles
   * const { count } = await prisma.role.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends RoleDeleteManyArgs>(
    args: Subset<T, RoleDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Roles.
   * @param {RoleUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Roles
   * const role = await prisma.role.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends RoleUpdateManyArgs>(
    args: Subset<T, RoleUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Role.
   * @param {RoleUpsertArgs} args - Arguments to update or create a Role.
   * @example
   * // Update or create a Role
   * const role = await prisma.role.upsert({
   *   create: {
   *     // ... data to create a Role
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Role we want to update
   *   }
   * })
  **/
  upsert<T extends RoleUpsertArgs>(
    args: Subset<T, RoleUpsertArgs>
  ): CheckSelect<T, RoleClient<Role>, RoleClient<RoleGetPayload<T>>>
  /**
   * 
   */
  count(args?: Omit<FindManyRoleArgs, 'select' | 'include'>): Promise<number>
}

export declare class RoleClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  private _collectTimestamps?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';


  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Role findOne
 */
export type FindOneRoleArgs = {
  /**
   * Select specific fields to fetch from the Role
  **/
  select?: RoleSelect | null
  /**
   * Filter, which Role to fetch.
  **/
  where: RoleWhereUniqueInput
}


/**
 * Role findMany
 */
export type FindManyRoleArgs = {
  /**
   * Select specific fields to fetch from the Role
  **/
  select?: RoleSelect | null
  /**
   * Filter, which Roles to fetch.
  **/
  where?: RoleWhereInput | null
  /**
   * Determine the order of the Roles to fetch.
  **/
  orderBy?: RoleOrderByInput | null
  /**
   * Skip the first `n` Roles.
  **/
  skip?: number | null
  /**
   * Get all Roles that come after the Role you provide with the current order.
  **/
  after?: RoleWhereUniqueInput | null
  /**
   * Get all Roles that come before the Role you provide with the current order.
  **/
  before?: RoleWhereUniqueInput | null
  /**
   * Get the first `n` Roles.
  **/
  first?: number | null
  /**
   * Get the last `n` Roles.
  **/
  last?: number | null
}


/**
 * Role create
 */
export type RoleCreateArgs = {
  /**
   * Select specific fields to fetch from the Role
  **/
  select?: RoleSelect | null
  /**
   * The data needed to create a Role.
  **/
  data: RoleCreateInput
}


/**
 * Role update
 */
export type RoleUpdateArgs = {
  /**
   * Select specific fields to fetch from the Role
  **/
  select?: RoleSelect | null
  /**
   * The data needed to update a Role.
  **/
  data: RoleUpdateInput
  /**
   * Choose, which Role to update.
  **/
  where: RoleWhereUniqueInput
}


/**
 * Role updateMany
 */
export type RoleUpdateManyArgs = {
  data: RoleUpdateManyMutationInput
  where?: RoleWhereInput | null
}


/**
 * Role upsert
 */
export type RoleUpsertArgs = {
  /**
   * Select specific fields to fetch from the Role
  **/
  select?: RoleSelect | null
  /**
   * The filter to search for the Role to update in case it exists.
  **/
  where: RoleWhereUniqueInput
  /**
   * In case the Role found by the `where` argument doesn't exist, create a new Role with this data.
  **/
  create: RoleCreateInput
  /**
   * In case the Role was found with the provided `where` argument, update it with this data.
  **/
  update: RoleUpdateInput
}


/**
 * Role delete
 */
export type RoleDeleteArgs = {
  /**
   * Select specific fields to fetch from the Role
  **/
  select?: RoleSelect | null
  /**
   * Filter which Role to delete.
  **/
  where: RoleWhereUniqueInput
}


/**
 * Role deleteMany
 */
export type RoleDeleteManyArgs = {
  where?: RoleWhereInput | null
}


/**
 * Role without action
 */
export type RoleArgs = {
  /**
   * Select specific fields to fetch from the Role
  **/
  select?: RoleSelect | null
}



/**
 * Model Status
 */

export type Status = {
  id: number
  title: string | null
  deleted: boolean | null
}

export type StatusSelect = {
  id?: boolean
  title?: boolean
  deleted?: boolean
}

export type StatusGetPayload<
  S extends boolean | null | undefined | StatusArgs,
  U = keyof S
> = S extends true
  ? Status
  : S extends undefined
  ? never
  : S extends StatusArgs | FindManyStatusArgs
  ? 'include' extends U
    ? Status 
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Status ? Status[P]
: 
 never
    }
  : Status
: Status


export interface StatusDelegate {
  /**
   * Find zero or one Status.
   * @param {FindOneStatusArgs} args - Arguments to find a Status
   * @example
   * // Get one Status
   * const status = await prisma.status.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneStatusArgs>(
    args: Subset<T, FindOneStatusArgs>
  ): CheckSelect<T, StatusClient<Status | null>, StatusClient<StatusGetPayload<T> | null>>
  /**
   * Find zero or more Statuses.
   * @param {FindManyStatusArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Statuses
   * const statuses = await prisma.status.findMany()
   * 
   * // Get first 10 Statuses
   * const statuses = await prisma.status.findMany({ first: 10 })
   * 
   * // Only select the `id`
   * const statusWithIdOnly = await prisma.status.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyStatusArgs>(
    args?: Subset<T, FindManyStatusArgs>
  ): CheckSelect<T, Promise<Array<Status>>, Promise<Array<StatusGetPayload<T>>>>
  /**
   * Create a Status.
   * @param {StatusCreateArgs} args - Arguments to create a Status.
   * @example
   * // Create one Status
   * const user = await prisma.status.create({
   *   data: {
   *     // ... data to create a Status
   *   }
   * })
   * 
  **/
  create<T extends StatusCreateArgs>(
    args: Subset<T, StatusCreateArgs>
  ): CheckSelect<T, StatusClient<Status>, StatusClient<StatusGetPayload<T>>>
  /**
   * Delete a Status.
   * @param {StatusDeleteArgs} args - Arguments to delete one Status.
   * @example
   * // Delete one Status
   * const user = await prisma.status.delete({
   *   where: {
   *     // ... filter to delete one Status
   *   }
   * })
   * 
  **/
  delete<T extends StatusDeleteArgs>(
    args: Subset<T, StatusDeleteArgs>
  ): CheckSelect<T, StatusClient<Status>, StatusClient<StatusGetPayload<T>>>
  /**
   * Update one Status.
   * @param {StatusUpdateArgs} args - Arguments to update one Status.
   * @example
   * // Update one Status
   * const status = await prisma.status.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends StatusUpdateArgs>(
    args: Subset<T, StatusUpdateArgs>
  ): CheckSelect<T, StatusClient<Status>, StatusClient<StatusGetPayload<T>>>
  /**
   * Delete zero or more Statuses.
   * @param {StatusDeleteManyArgs} args - Arguments to filter Statuses to delete.
   * @example
   * // Delete a few Statuses
   * const { count } = await prisma.status.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends StatusDeleteManyArgs>(
    args: Subset<T, StatusDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Statuses.
   * @param {StatusUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Statuses
   * const status = await prisma.status.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends StatusUpdateManyArgs>(
    args: Subset<T, StatusUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Status.
   * @param {StatusUpsertArgs} args - Arguments to update or create a Status.
   * @example
   * // Update or create a Status
   * const status = await prisma.status.upsert({
   *   create: {
   *     // ... data to create a Status
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Status we want to update
   *   }
   * })
  **/
  upsert<T extends StatusUpsertArgs>(
    args: Subset<T, StatusUpsertArgs>
  ): CheckSelect<T, StatusClient<Status>, StatusClient<StatusGetPayload<T>>>
  /**
   * 
   */
  count(args?: Omit<FindManyStatusArgs, 'select' | 'include'>): Promise<number>
}

export declare class StatusClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  private _collectTimestamps?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';


  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Status findOne
 */
export type FindOneStatusArgs = {
  /**
   * Select specific fields to fetch from the Status
  **/
  select?: StatusSelect | null
  /**
   * Filter, which Status to fetch.
  **/
  where: StatusWhereUniqueInput
}


/**
 * Status findMany
 */
export type FindManyStatusArgs = {
  /**
   * Select specific fields to fetch from the Status
  **/
  select?: StatusSelect | null
  /**
   * Filter, which Statuses to fetch.
  **/
  where?: StatusWhereInput | null
  /**
   * Determine the order of the Statuses to fetch.
  **/
  orderBy?: StatusOrderByInput | null
  /**
   * Skip the first `n` Statuses.
  **/
  skip?: number | null
  /**
   * Get all Statuses that come after the Status you provide with the current order.
  **/
  after?: StatusWhereUniqueInput | null
  /**
   * Get all Statuses that come before the Status you provide with the current order.
  **/
  before?: StatusWhereUniqueInput | null
  /**
   * Get the first `n` Statuses.
  **/
  first?: number | null
  /**
   * Get the last `n` Statuses.
  **/
  last?: number | null
}


/**
 * Status create
 */
export type StatusCreateArgs = {
  /**
   * Select specific fields to fetch from the Status
  **/
  select?: StatusSelect | null
  /**
   * The data needed to create a Status.
  **/
  data: StatusCreateInput
}


/**
 * Status update
 */
export type StatusUpdateArgs = {
  /**
   * Select specific fields to fetch from the Status
  **/
  select?: StatusSelect | null
  /**
   * The data needed to update a Status.
  **/
  data: StatusUpdateInput
  /**
   * Choose, which Status to update.
  **/
  where: StatusWhereUniqueInput
}


/**
 * Status updateMany
 */
export type StatusUpdateManyArgs = {
  data: StatusUpdateManyMutationInput
  where?: StatusWhereInput | null
}


/**
 * Status upsert
 */
export type StatusUpsertArgs = {
  /**
   * Select specific fields to fetch from the Status
  **/
  select?: StatusSelect | null
  /**
   * The filter to search for the Status to update in case it exists.
  **/
  where: StatusWhereUniqueInput
  /**
   * In case the Status found by the `where` argument doesn't exist, create a new Status with this data.
  **/
  create: StatusCreateInput
  /**
   * In case the Status was found with the provided `where` argument, update it with this data.
  **/
  update: StatusUpdateInput
}


/**
 * Status delete
 */
export type StatusDeleteArgs = {
  /**
   * Select specific fields to fetch from the Status
  **/
  select?: StatusSelect | null
  /**
   * Filter which Status to delete.
  **/
  where: StatusWhereUniqueInput
}


/**
 * Status deleteMany
 */
export type StatusDeleteManyArgs = {
  where?: StatusWhereInput | null
}


/**
 * Status without action
 */
export type StatusArgs = {
  /**
   * Select specific fields to fetch from the Status
  **/
  select?: StatusSelect | null
}



/**
 * Model Technical_control
 */

export type Technical_control = {
  id: number
  carId: number
  date_begin: Date | null
  date_end: Date | null
  createdAt: Date | null
  updatedAt: Date | null
  deleted: boolean | null
}

export type Technical_controlSelect = {
  id?: boolean
  carId?: boolean
  date_begin?: boolean
  date_end?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  deleted?: boolean
}

export type Technical_controlGetPayload<
  S extends boolean | null | undefined | Technical_controlArgs,
  U = keyof S
> = S extends true
  ? Technical_control
  : S extends undefined
  ? never
  : S extends Technical_controlArgs | FindManyTechnical_controlArgs
  ? 'include' extends U
    ? Technical_control 
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Technical_control ? Technical_control[P]
: 
 never
    }
  : Technical_control
: Technical_control


export interface Technical_controlDelegate {
  /**
   * Find zero or one Technical_control.
   * @param {FindOneTechnical_controlArgs} args - Arguments to find a Technical_control
   * @example
   * // Get one Technical_control
   * const technical_control = await prisma.technical_control.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneTechnical_controlArgs>(
    args: Subset<T, FindOneTechnical_controlArgs>
  ): CheckSelect<T, Technical_controlClient<Technical_control | null>, Technical_controlClient<Technical_controlGetPayload<T> | null>>
  /**
   * Find zero or more Technical_controls.
   * @param {FindManyTechnical_controlArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Technical_controls
   * const technical_controls = await prisma.technical_control.findMany()
   * 
   * // Get first 10 Technical_controls
   * const technical_controls = await prisma.technical_control.findMany({ first: 10 })
   * 
   * // Only select the `id`
   * const technical_controlWithIdOnly = await prisma.technical_control.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyTechnical_controlArgs>(
    args?: Subset<T, FindManyTechnical_controlArgs>
  ): CheckSelect<T, Promise<Array<Technical_control>>, Promise<Array<Technical_controlGetPayload<T>>>>
  /**
   * Create a Technical_control.
   * @param {Technical_controlCreateArgs} args - Arguments to create a Technical_control.
   * @example
   * // Create one Technical_control
   * const user = await prisma.technical_control.create({
   *   data: {
   *     // ... data to create a Technical_control
   *   }
   * })
   * 
  **/
  create<T extends Technical_controlCreateArgs>(
    args: Subset<T, Technical_controlCreateArgs>
  ): CheckSelect<T, Technical_controlClient<Technical_control>, Technical_controlClient<Technical_controlGetPayload<T>>>
  /**
   * Delete a Technical_control.
   * @param {Technical_controlDeleteArgs} args - Arguments to delete one Technical_control.
   * @example
   * // Delete one Technical_control
   * const user = await prisma.technical_control.delete({
   *   where: {
   *     // ... filter to delete one Technical_control
   *   }
   * })
   * 
  **/
  delete<T extends Technical_controlDeleteArgs>(
    args: Subset<T, Technical_controlDeleteArgs>
  ): CheckSelect<T, Technical_controlClient<Technical_control>, Technical_controlClient<Technical_controlGetPayload<T>>>
  /**
   * Update one Technical_control.
   * @param {Technical_controlUpdateArgs} args - Arguments to update one Technical_control.
   * @example
   * // Update one Technical_control
   * const technical_control = await prisma.technical_control.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends Technical_controlUpdateArgs>(
    args: Subset<T, Technical_controlUpdateArgs>
  ): CheckSelect<T, Technical_controlClient<Technical_control>, Technical_controlClient<Technical_controlGetPayload<T>>>
  /**
   * Delete zero or more Technical_controls.
   * @param {Technical_controlDeleteManyArgs} args - Arguments to filter Technical_controls to delete.
   * @example
   * // Delete a few Technical_controls
   * const { count } = await prisma.technical_control.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends Technical_controlDeleteManyArgs>(
    args: Subset<T, Technical_controlDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Technical_controls.
   * @param {Technical_controlUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Technical_controls
   * const technical_control = await prisma.technical_control.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends Technical_controlUpdateManyArgs>(
    args: Subset<T, Technical_controlUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Technical_control.
   * @param {Technical_controlUpsertArgs} args - Arguments to update or create a Technical_control.
   * @example
   * // Update or create a Technical_control
   * const technical_control = await prisma.technical_control.upsert({
   *   create: {
   *     // ... data to create a Technical_control
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Technical_control we want to update
   *   }
   * })
  **/
  upsert<T extends Technical_controlUpsertArgs>(
    args: Subset<T, Technical_controlUpsertArgs>
  ): CheckSelect<T, Technical_controlClient<Technical_control>, Technical_controlClient<Technical_controlGetPayload<T>>>
  /**
   * 
   */
  count(args?: Omit<FindManyTechnical_controlArgs, 'select' | 'include'>): Promise<number>
}

export declare class Technical_controlClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  private _collectTimestamps?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';


  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Technical_control findOne
 */
export type FindOneTechnical_controlArgs = {
  /**
   * Select specific fields to fetch from the Technical_control
  **/
  select?: Technical_controlSelect | null
  /**
   * Filter, which Technical_control to fetch.
  **/
  where: Technical_controlWhereUniqueInput
}


/**
 * Technical_control findMany
 */
export type FindManyTechnical_controlArgs = {
  /**
   * Select specific fields to fetch from the Technical_control
  **/
  select?: Technical_controlSelect | null
  /**
   * Filter, which Technical_controls to fetch.
  **/
  where?: Technical_controlWhereInput | null
  /**
   * Determine the order of the Technical_controls to fetch.
  **/
  orderBy?: Technical_controlOrderByInput | null
  /**
   * Skip the first `n` Technical_controls.
  **/
  skip?: number | null
  /**
   * Get all Technical_controls that come after the Technical_control you provide with the current order.
  **/
  after?: Technical_controlWhereUniqueInput | null
  /**
   * Get all Technical_controls that come before the Technical_control you provide with the current order.
  **/
  before?: Technical_controlWhereUniqueInput | null
  /**
   * Get the first `n` Technical_controls.
  **/
  first?: number | null
  /**
   * Get the last `n` Technical_controls.
  **/
  last?: number | null
}


/**
 * Technical_control create
 */
export type Technical_controlCreateArgs = {
  /**
   * Select specific fields to fetch from the Technical_control
  **/
  select?: Technical_controlSelect | null
  /**
   * The data needed to create a Technical_control.
  **/
  data: Technical_controlCreateInput
}


/**
 * Technical_control update
 */
export type Technical_controlUpdateArgs = {
  /**
   * Select specific fields to fetch from the Technical_control
  **/
  select?: Technical_controlSelect | null
  /**
   * The data needed to update a Technical_control.
  **/
  data: Technical_controlUpdateInput
  /**
   * Choose, which Technical_control to update.
  **/
  where: Technical_controlWhereUniqueInput
}


/**
 * Technical_control updateMany
 */
export type Technical_controlUpdateManyArgs = {
  data: Technical_controlUpdateManyMutationInput
  where?: Technical_controlWhereInput | null
}


/**
 * Technical_control upsert
 */
export type Technical_controlUpsertArgs = {
  /**
   * Select specific fields to fetch from the Technical_control
  **/
  select?: Technical_controlSelect | null
  /**
   * The filter to search for the Technical_control to update in case it exists.
  **/
  where: Technical_controlWhereUniqueInput
  /**
   * In case the Technical_control found by the `where` argument doesn't exist, create a new Technical_control with this data.
  **/
  create: Technical_controlCreateInput
  /**
   * In case the Technical_control was found with the provided `where` argument, update it with this data.
  **/
  update: Technical_controlUpdateInput
}


/**
 * Technical_control delete
 */
export type Technical_controlDeleteArgs = {
  /**
   * Select specific fields to fetch from the Technical_control
  **/
  select?: Technical_controlSelect | null
  /**
   * Filter which Technical_control to delete.
  **/
  where: Technical_controlWhereUniqueInput
}


/**
 * Technical_control deleteMany
 */
export type Technical_controlDeleteManyArgs = {
  where?: Technical_controlWhereInput | null
}


/**
 * Technical_control without action
 */
export type Technical_controlArgs = {
  /**
   * Select specific fields to fetch from the Technical_control
  **/
  select?: Technical_controlSelect | null
}



/**
 * Model User
 */

export type User = {
  id: number
  firstname: string
  lastname: string | null
  gender: string | null
  cni: string | null
  address: string | null
  email: string
  phone: string | null
  roleId: number | null
  password: string | null
  createdAt: Date | null
  updatedAt: Date | null
  deleted: boolean | null
}

export type UserSelect = {
  id?: boolean
  firstname?: boolean
  lastname?: boolean
  gender?: boolean
  cni?: boolean
  address?: boolean
  email?: boolean
  phone?: boolean
  roleId?: boolean
  password?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  deleted?: boolean
}

export type UserGetPayload<
  S extends boolean | null | undefined | UserArgs,
  U = keyof S
> = S extends true
  ? User
  : S extends undefined
  ? never
  : S extends UserArgs | FindManyUserArgs
  ? 'include' extends U
    ? User 
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof User ? User[P]
: 
 never
    }
  : User
: User


export interface UserDelegate {
  /**
   * Find zero or one User.
   * @param {FindOneUserArgs} args - Arguments to find a User
   * @example
   * // Get one User
   * const user = await prisma.user.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneUserArgs>(
    args: Subset<T, FindOneUserArgs>
  ): CheckSelect<T, UserClient<User | null>, UserClient<UserGetPayload<T> | null>>
  /**
   * Find zero or more Users.
   * @param {FindManyUserArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Users
   * const users = await prisma.user.findMany()
   * 
   * // Get first 10 Users
   * const users = await prisma.user.findMany({ first: 10 })
   * 
   * // Only select the `id`
   * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyUserArgs>(
    args?: Subset<T, FindManyUserArgs>
  ): CheckSelect<T, Promise<Array<User>>, Promise<Array<UserGetPayload<T>>>>
  /**
   * Create a User.
   * @param {UserCreateArgs} args - Arguments to create a User.
   * @example
   * // Create one User
   * const user = await prisma.user.create({
   *   data: {
   *     // ... data to create a User
   *   }
   * })
   * 
  **/
  create<T extends UserCreateArgs>(
    args: Subset<T, UserCreateArgs>
  ): CheckSelect<T, UserClient<User>, UserClient<UserGetPayload<T>>>
  /**
   * Delete a User.
   * @param {UserDeleteArgs} args - Arguments to delete one User.
   * @example
   * // Delete one User
   * const user = await prisma.user.delete({
   *   where: {
   *     // ... filter to delete one User
   *   }
   * })
   * 
  **/
  delete<T extends UserDeleteArgs>(
    args: Subset<T, UserDeleteArgs>
  ): CheckSelect<T, UserClient<User>, UserClient<UserGetPayload<T>>>
  /**
   * Update one User.
   * @param {UserUpdateArgs} args - Arguments to update one User.
   * @example
   * // Update one User
   * const user = await prisma.user.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends UserUpdateArgs>(
    args: Subset<T, UserUpdateArgs>
  ): CheckSelect<T, UserClient<User>, UserClient<UserGetPayload<T>>>
  /**
   * Delete zero or more Users.
   * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
   * @example
   * // Delete a few Users
   * const { count } = await prisma.user.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends UserDeleteManyArgs>(
    args: Subset<T, UserDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Users.
   * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Users
   * const user = await prisma.user.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends UserUpdateManyArgs>(
    args: Subset<T, UserUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one User.
   * @param {UserUpsertArgs} args - Arguments to update or create a User.
   * @example
   * // Update or create a User
   * const user = await prisma.user.upsert({
   *   create: {
   *     // ... data to create a User
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the User we want to update
   *   }
   * })
  **/
  upsert<T extends UserUpsertArgs>(
    args: Subset<T, UserUpsertArgs>
  ): CheckSelect<T, UserClient<User>, UserClient<UserGetPayload<T>>>
  /**
   * 
   */
  count(args?: Omit<FindManyUserArgs, 'select' | 'include'>): Promise<number>
}

export declare class UserClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  private _collectTimestamps?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';


  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * User findOne
 */
export type FindOneUserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Filter, which User to fetch.
  **/
  where: UserWhereUniqueInput
}


/**
 * User findMany
 */
export type FindManyUserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Filter, which Users to fetch.
  **/
  where?: UserWhereInput | null
  /**
   * Determine the order of the Users to fetch.
  **/
  orderBy?: UserOrderByInput | null
  /**
   * Skip the first `n` Users.
  **/
  skip?: number | null
  /**
   * Get all Users that come after the User you provide with the current order.
  **/
  after?: UserWhereUniqueInput | null
  /**
   * Get all Users that come before the User you provide with the current order.
  **/
  before?: UserWhereUniqueInput | null
  /**
   * Get the first `n` Users.
  **/
  first?: number | null
  /**
   * Get the last `n` Users.
  **/
  last?: number | null
}


/**
 * User create
 */
export type UserCreateArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * The data needed to create a User.
  **/
  data: UserCreateInput
}


/**
 * User update
 */
export type UserUpdateArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * The data needed to update a User.
  **/
  data: UserUpdateInput
  /**
   * Choose, which User to update.
  **/
  where: UserWhereUniqueInput
}


/**
 * User updateMany
 */
export type UserUpdateManyArgs = {
  data: UserUpdateManyMutationInput
  where?: UserWhereInput | null
}


/**
 * User upsert
 */
export type UserUpsertArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * The filter to search for the User to update in case it exists.
  **/
  where: UserWhereUniqueInput
  /**
   * In case the User found by the `where` argument doesn't exist, create a new User with this data.
  **/
  create: UserCreateInput
  /**
   * In case the User was found with the provided `where` argument, update it with this data.
  **/
  update: UserUpdateInput
}


/**
 * User delete
 */
export type UserDeleteArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Filter which User to delete.
  **/
  where: UserWhereUniqueInput
}


/**
 * User deleteMany
 */
export type UserDeleteManyArgs = {
  where?: UserWhereInput | null
}


/**
 * User without action
 */
export type UserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
}



/**
 * Deep Input Types
 */


export type After_rentalWhereInput = {
  id?: number | IntFilter | null
  rentalId?: number | NullableIntFilter | null
  albumId?: number | NullableIntFilter | null
  kilometrage?: number | NullableIntFilter | null
  niveau_carburant?: number | NullableIntFilter | null
  createdAt?: Date | string | NullableDateTimeFilter | null
  updatedAt?: Date | string | NullableDateTimeFilter | null
  comment?: string | NullableStringFilter | null
  deleted?: boolean | NullableBooleanFilter | null
  AND?: Enumerable<After_rentalWhereInput> | null
  OR?: Enumerable<After_rentalWhereInput> | null
  NOT?: Enumerable<After_rentalWhereInput> | null
}

export type After_rentalWhereUniqueInput = {
  id?: number | null
}

export type AlbumWhereInput = {
  id?: number | IntFilter | null
  title?: string | NullableStringFilter | null
  createdAt?: Date | string | NullableDateTimeFilter | null
  updatedAt?: Date | string | NullableDateTimeFilter | null
  deleted?: boolean | NullableBooleanFilter | null
  AND?: Enumerable<AlbumWhereInput> | null
  OR?: Enumerable<AlbumWhereInput> | null
  NOT?: Enumerable<AlbumWhereInput> | null
}

export type AlbumWhereUniqueInput = {
  id?: number | null
}

export type Before_rentalWhereInput = {
  id?: number | IntFilter | null
  rentalId?: number | NullableIntFilter | null
  albumId?: number | NullableIntFilter | null
  kilometrage?: number | NullableIntFilter | null
  niveau_carburant?: number | NullableIntFilter | null
  createdAt?: Date | string | NullableDateTimeFilter | null
  updatedAt?: Date | string | NullableDateTimeFilter | null
  comment?: string | NullableStringFilter | null
  deleted?: boolean | NullableBooleanFilter | null
  AND?: Enumerable<Before_rentalWhereInput> | null
  OR?: Enumerable<Before_rentalWhereInput> | null
  NOT?: Enumerable<Before_rentalWhereInput> | null
}

export type Before_rentalWhereUniqueInput = {
  id?: number | null
}

export type BillWhereInput = {
  id?: number | IntFilter | null
  bill_number?: string | NullableStringFilter | null
  bill_date?: Date | string | NullableDateTimeFilter | null
  createdAt?: Date | string | NullableDateTimeFilter | null
  updatedAt?: Date | string | NullableDateTimeFilter | null
  deleted?: boolean | NullableBooleanFilter | null
  AND?: Enumerable<BillWhereInput> | null
  OR?: Enumerable<BillWhereInput> | null
  NOT?: Enumerable<BillWhereInput> | null
}

export type BillWhereUniqueInput = {
  id?: number | null
}

export type BookingWhereInput = {
  id?: number | IntFilter | null
  carId?: number | NullableIntFilter | null
  customerId?: number | NullableIntFilter | null
  montant_avance?: number | NullableIntFilter | null
  date_begin?: Date | string | NullableDateTimeFilter | null
  date_end?: Date | string | NullableDateTimeFilter | null
  comment?: string | NullableStringFilter | null
  createdAt?: Date | string | NullableDateTimeFilter | null
  updatedAt?: Date | string | NullableDateTimeFilter | null
  deleted?: boolean | NullableBooleanFilter | null
  AND?: Enumerable<BookingWhereInput> | null
  OR?: Enumerable<BookingWhereInput> | null
  NOT?: Enumerable<BookingWhereInput> | null
}

export type BookingWhereUniqueInput = {
  id?: number | null
}

export type BrandWhereInput = {
  id?: number | IntFilter | null
  name?: string | NullableStringFilter | null
  deleted?: boolean | NullableBooleanFilter | null
  AND?: Enumerable<BrandWhereInput> | null
  OR?: Enumerable<BrandWhereInput> | null
  NOT?: Enumerable<BrandWhereInput> | null
}

export type BrandWhereUniqueInput = {
  id?: number | null
}

export type CarWhereInput = {
  id?: number | IntFilter | null
  brandId?: number | NullableIntFilter | null
  model?: string | NullableStringFilter | null
  model_date?: number | NullableIntFilter | null
  categoryId?: number | NullableIntFilter | null
  price?: number | NullableIntFilter | null
  colorId?: number | NullableIntFilter | null
  plate_number?: string | StringFilter | null
  picture?: string | NullableStringFilter | null
  chassis_number?: string | NullableStringFilter | null
  statusId?: number | NullableIntFilter | null
  deleted?: boolean | NullableBooleanFilter | null
  createdAt?: Date | string | NullableDateTimeFilter | null
  updatedAt?: Date | string | NullableDateTimeFilter | null
  AND?: Enumerable<CarWhereInput> | null
  OR?: Enumerable<CarWhereInput> | null
  NOT?: Enumerable<CarWhereInput> | null
}

export type CarWhereUniqueInput = {
  id?: number | null
}

export type CategoryWhereInput = {
  id?: number | IntFilter | null
  title?: string | NullableStringFilter | null
  deleted?: boolean | NullableBooleanFilter | null
  AND?: Enumerable<CategoryWhereInput> | null
  OR?: Enumerable<CategoryWhereInput> | null
  NOT?: Enumerable<CategoryWhereInput> | null
}

export type CategoryWhereUniqueInput = {
  id?: number | null
}

export type ColorWhereInput = {
  id?: number | IntFilter | null
  name?: string | NullableStringFilter | null
  deleted?: boolean | NullableBooleanFilter | null
  AND?: Enumerable<ColorWhereInput> | null
  OR?: Enumerable<ColorWhereInput> | null
  NOT?: Enumerable<ColorWhereInput> | null
}

export type ColorWhereUniqueInput = {
  id?: number | null
}

export type Car_insuranceWhereInput = {
  id?: number | IntFilter | null
  carId?: number | NullableIntFilter | null
  insuranceId?: number | NullableIntFilter | null
  date_begin?: Date | string | NullableDateTimeFilter | null
  date_end?: Date | string | NullableDateTimeFilter | null
  createdAt?: Date | string | NullableDateTimeFilter | null
  updatedAt?: Date | string | NullableDateTimeFilter | null
  deleted?: boolean | NullableBooleanFilter | null
  AND?: Enumerable<Car_insuranceWhereInput> | null
  OR?: Enumerable<Car_insuranceWhereInput> | null
  NOT?: Enumerable<Car_insuranceWhereInput> | null
}

export type Car_insuranceWhereUniqueInput = {
  id?: number | null
}

export type ContractWhereInput = {
  id?: number | IntFilter | null
  rentalId?: number | NullableIntFilter | null
  contract_typeId?: number | NullableIntFilter | null
  date_begin?: Date | string | NullableDateTimeFilter | null
  date_end?: Date | string | NullableDateTimeFilter | null
  createdAt?: Date | string | NullableDateTimeFilter | null
  updatedAt?: Date | string | NullableDateTimeFilter | null
  deleted?: boolean | NullableBooleanFilter | null
  AND?: Enumerable<ContractWhereInput> | null
  OR?: Enumerable<ContractWhereInput> | null
  NOT?: Enumerable<ContractWhereInput> | null
}

export type ContractWhereUniqueInput = {
  id?: number | null
}

export type Contract_typeWhereInput = {
  id?: number | IntFilter | null
  name?: string | NullableStringFilter | null
  deleted?: boolean | NullableBooleanFilter | null
  AND?: Enumerable<Contract_typeWhereInput> | null
  OR?: Enumerable<Contract_typeWhereInput> | null
  NOT?: Enumerable<Contract_typeWhereInput> | null
}

export type Contract_typeWhereUniqueInput = {
  id?: number | null
}

export type CustomerWhereInput = {
  id?: number | IntFilter | null
  firstname?: string | StringFilter | null
  lastname?: string | NullableStringFilter | null
  birthday?: Date | string | NullableDateTimeFilter | null
  gender?: string | NullableStringFilter | null
  cni?: string | NullableStringFilter | null
  type?: number | NullableIntFilter | null
  driver_license?: string | NullableStringFilter | null
  city?: string | NullableStringFilter | null
  address?: string | NullableStringFilter | null
  email?: string | StringFilter | null
  phone?: string | NullableStringFilter | null
  company_name?: string | NullableStringFilter | null
  createdAt?: Date | string | NullableDateTimeFilter | null
  updatedAt?: Date | string | NullableDateTimeFilter | null
  deleted?: boolean | NullableBooleanFilter | null
  AND?: Enumerable<CustomerWhereInput> | null
  OR?: Enumerable<CustomerWhereInput> | null
  NOT?: Enumerable<CustomerWhereInput> | null
}

export type CustomerWhereUniqueInput = {
  id?: number | null
}

export type ImageWhereInput = {
  id?: number | IntFilter | null
  albumId?: number | NullableIntFilter | null
  path?: string | NullableStringFilter | null
  createdAt?: Date | string | NullableDateTimeFilter | null
  updatedAt?: Date | string | NullableDateTimeFilter | null
  deleted?: boolean | NullableBooleanFilter | null
  AND?: Enumerable<ImageWhereInput> | null
  OR?: Enumerable<ImageWhereInput> | null
  NOT?: Enumerable<ImageWhereInput> | null
}

export type ImageWhereUniqueInput = {
  id?: number | null
}

export type InsuranceWhereInput = {
  id?: number | IntFilter | null
  name?: string | NullableStringFilter | null
  deleted?: boolean | NullableBooleanFilter | null
  AND?: Enumerable<InsuranceWhereInput> | null
  OR?: Enumerable<InsuranceWhereInput> | null
  NOT?: Enumerable<InsuranceWhereInput> | null
}

export type InsuranceWhereUniqueInput = {
  id?: number | null
}

export type RentalWhereInput = {
  id?: number | IntFilter | null
  bookingId?: number | NullableIntFilter | null
  carId?: number | NullableIntFilter | null
  customerId?: number | NullableIntFilter | null
  second_driverId?: number | NullableIntFilter | null
  date_begin?: Date | string | NullableDateTimeFilter | null
  date_end?: Date | string | NullableDateTimeFilter | null
  comment?: string | NullableStringFilter | null
  createdAt?: Date | string | NullableDateTimeFilter | null
  updatedAt?: Date | string | NullableDateTimeFilter | null
  deleted?: boolean | NullableBooleanFilter | null
  AND?: Enumerable<RentalWhereInput> | null
  OR?: Enumerable<RentalWhereInput> | null
  NOT?: Enumerable<RentalWhereInput> | null
}

export type RentalWhereUniqueInput = {
  id?: number | null
}

export type RoleWhereInput = {
  id?: number | IntFilter | null
  title?: string | NullableStringFilter | null
  deleted?: boolean | NullableBooleanFilter | null
  AND?: Enumerable<RoleWhereInput> | null
  OR?: Enumerable<RoleWhereInput> | null
  NOT?: Enumerable<RoleWhereInput> | null
}

export type RoleWhereUniqueInput = {
  id?: number | null
}

export type StatusWhereInput = {
  id?: number | IntFilter | null
  title?: string | NullableStringFilter | null
  deleted?: boolean | NullableBooleanFilter | null
  AND?: Enumerable<StatusWhereInput> | null
  OR?: Enumerable<StatusWhereInput> | null
  NOT?: Enumerable<StatusWhereInput> | null
}

export type StatusWhereUniqueInput = {
  id?: number | null
}

export type Technical_controlWhereInput = {
  id?: number | IntFilter | null
  carId?: number | IntFilter | null
  date_begin?: Date | string | NullableDateTimeFilter | null
  date_end?: Date | string | NullableDateTimeFilter | null
  createdAt?: Date | string | NullableDateTimeFilter | null
  updatedAt?: Date | string | NullableDateTimeFilter | null
  deleted?: boolean | NullableBooleanFilter | null
  AND?: Enumerable<Technical_controlWhereInput> | null
  OR?: Enumerable<Technical_controlWhereInput> | null
  NOT?: Enumerable<Technical_controlWhereInput> | null
}

export type Technical_controlWhereUniqueInput = {
  id?: number | null
}

export type UserWhereInput = {
  id?: number | IntFilter | null
  firstname?: string | StringFilter | null
  lastname?: string | NullableStringFilter | null
  gender?: string | NullableStringFilter | null
  cni?: string | NullableStringFilter | null
  address?: string | NullableStringFilter | null
  email?: string | StringFilter | null
  phone?: string | NullableStringFilter | null
  roleId?: number | NullableIntFilter | null
  password?: string | NullableStringFilter | null
  createdAt?: Date | string | NullableDateTimeFilter | null
  updatedAt?: Date | string | NullableDateTimeFilter | null
  deleted?: boolean | NullableBooleanFilter | null
  AND?: Enumerable<UserWhereInput> | null
  OR?: Enumerable<UserWhereInput> | null
  NOT?: Enumerable<UserWhereInput> | null
}

export type UserWhereUniqueInput = {
  id?: number | null
}

export type After_rentalCreateInput = {
  rentalId?: number | null
  albumId?: number | null
  kilometrage?: number | null
  niveau_carburant?: number | null
  createdAt?: Date | string | null
  updatedAt?: Date | string | null
  comment?: string | null
  deleted?: boolean | null
}

export type After_rentalUpdateInput = {
  id?: number | null
  rentalId?: number | null
  albumId?: number | null
  kilometrage?: number | null
  niveau_carburant?: number | null
  createdAt?: Date | string | null
  updatedAt?: Date | string | null
  comment?: string | null
  deleted?: boolean | null
}

export type After_rentalUpdateManyMutationInput = {
  id?: number | null
  rentalId?: number | null
  albumId?: number | null
  kilometrage?: number | null
  niveau_carburant?: number | null
  createdAt?: Date | string | null
  updatedAt?: Date | string | null
  comment?: string | null
  deleted?: boolean | null
}

export type AlbumCreateInput = {
  title?: string | null
  createdAt?: Date | string | null
  updatedAt?: Date | string | null
  deleted?: boolean | null
}

export type AlbumUpdateInput = {
  id?: number | null
  title?: string | null
  createdAt?: Date | string | null
  updatedAt?: Date | string | null
  deleted?: boolean | null
}

export type AlbumUpdateManyMutationInput = {
  id?: number | null
  title?: string | null
  createdAt?: Date | string | null
  updatedAt?: Date | string | null
  deleted?: boolean | null
}

export type Before_rentalCreateInput = {
  rentalId?: number | null
  albumId?: number | null
  kilometrage?: number | null
  niveau_carburant?: number | null
  createdAt?: Date | string | null
  updatedAt?: Date | string | null
  comment?: string | null
  deleted?: boolean | null
}

export type Before_rentalUpdateInput = {
  id?: number | null
  rentalId?: number | null
  albumId?: number | null
  kilometrage?: number | null
  niveau_carburant?: number | null
  createdAt?: Date | string | null
  updatedAt?: Date | string | null
  comment?: string | null
  deleted?: boolean | null
}

export type Before_rentalUpdateManyMutationInput = {
  id?: number | null
  rentalId?: number | null
  albumId?: number | null
  kilometrage?: number | null
  niveau_carburant?: number | null
  createdAt?: Date | string | null
  updatedAt?: Date | string | null
  comment?: string | null
  deleted?: boolean | null
}

export type BillCreateInput = {
  bill_number?: string | null
  bill_date?: Date | string | null
  createdAt?: Date | string | null
  updatedAt?: Date | string | null
  deleted?: boolean | null
}

export type BillUpdateInput = {
  id?: number | null
  bill_number?: string | null
  bill_date?: Date | string | null
  createdAt?: Date | string | null
  updatedAt?: Date | string | null
  deleted?: boolean | null
}

export type BillUpdateManyMutationInput = {
  id?: number | null
  bill_number?: string | null
  bill_date?: Date | string | null
  createdAt?: Date | string | null
  updatedAt?: Date | string | null
  deleted?: boolean | null
}

export type BookingCreateInput = {
  carId?: number | null
  customerId?: number | null
  montant_avance?: number | null
  date_begin?: Date | string | null
  date_end?: Date | string | null
  comment?: string | null
  createdAt?: Date | string | null
  updatedAt?: Date | string | null
  deleted?: boolean | null
}

export type BookingUpdateInput = {
  id?: number | null
  carId?: number | null
  customerId?: number | null
  montant_avance?: number | null
  date_begin?: Date | string | null
  date_end?: Date | string | null
  comment?: string | null
  createdAt?: Date | string | null
  updatedAt?: Date | string | null
  deleted?: boolean | null
}

export type BookingUpdateManyMutationInput = {
  id?: number | null
  carId?: number | null
  customerId?: number | null
  montant_avance?: number | null
  date_begin?: Date | string | null
  date_end?: Date | string | null
  comment?: string | null
  createdAt?: Date | string | null
  updatedAt?: Date | string | null
  deleted?: boolean | null
}

export type BrandCreateInput = {
  name?: string | null
  deleted?: boolean | null
}

export type BrandUpdateInput = {
  id?: number | null
  name?: string | null
  deleted?: boolean | null
}

export type BrandUpdateManyMutationInput = {
  id?: number | null
  name?: string | null
  deleted?: boolean | null
}

export type CarCreateInput = {
  brandId?: number | null
  model?: string | null
  model_date?: number | null
  categoryId?: number | null
  price?: number | null
  colorId?: number | null
  plate_number: string
  picture?: string | null
  chassis_number?: string | null
  statusId?: number | null
  deleted?: boolean | null
  createdAt?: Date | string | null
  updatedAt?: Date | string | null
}

export type CarUpdateInput = {
  id?: number | null
  brandId?: number | null
  model?: string | null
  model_date?: number | null
  categoryId?: number | null
  price?: number | null
  colorId?: number | null
  plate_number?: string | null
  picture?: string | null
  chassis_number?: string | null
  statusId?: number | null
  deleted?: boolean | null
  createdAt?: Date | string | null
  updatedAt?: Date | string | null
}

export type CarUpdateManyMutationInput = {
  id?: number | null
  brandId?: number | null
  model?: string | null
  model_date?: number | null
  categoryId?: number | null
  price?: number | null
  colorId?: number | null
  plate_number?: string | null
  picture?: string | null
  chassis_number?: string | null
  statusId?: number | null
  deleted?: boolean | null
  createdAt?: Date | string | null
  updatedAt?: Date | string | null
}

export type CategoryCreateInput = {
  title?: string | null
  deleted?: boolean | null
}

export type CategoryUpdateInput = {
  id?: number | null
  title?: string | null
  deleted?: boolean | null
}

export type CategoryUpdateManyMutationInput = {
  id?: number | null
  title?: string | null
  deleted?: boolean | null
}

export type ColorCreateInput = {
  name?: string | null
  deleted?: boolean | null
}

export type ColorUpdateInput = {
  id?: number | null
  name?: string | null
  deleted?: boolean | null
}

export type ColorUpdateManyMutationInput = {
  id?: number | null
  name?: string | null
  deleted?: boolean | null
}

export type Car_insuranceCreateInput = {
  carId?: number | null
  insuranceId?: number | null
  date_begin?: Date | string | null
  date_end?: Date | string | null
  createdAt?: Date | string | null
  updatedAt?: Date | string | null
  deleted?: boolean | null
}

export type Car_insuranceUpdateInput = {
  id?: number | null
  carId?: number | null
  insuranceId?: number | null
  date_begin?: Date | string | null
  date_end?: Date | string | null
  createdAt?: Date | string | null
  updatedAt?: Date | string | null
  deleted?: boolean | null
}

export type Car_insuranceUpdateManyMutationInput = {
  id?: number | null
  carId?: number | null
  insuranceId?: number | null
  date_begin?: Date | string | null
  date_end?: Date | string | null
  createdAt?: Date | string | null
  updatedAt?: Date | string | null
  deleted?: boolean | null
}

export type ContractCreateInput = {
  rentalId?: number | null
  contract_typeId?: number | null
  date_begin?: Date | string | null
  date_end?: Date | string | null
  createdAt?: Date | string | null
  updatedAt?: Date | string | null
  deleted?: boolean | null
}

export type ContractUpdateInput = {
  id?: number | null
  rentalId?: number | null
  contract_typeId?: number | null
  date_begin?: Date | string | null
  date_end?: Date | string | null
  createdAt?: Date | string | null
  updatedAt?: Date | string | null
  deleted?: boolean | null
}

export type ContractUpdateManyMutationInput = {
  id?: number | null
  rentalId?: number | null
  contract_typeId?: number | null
  date_begin?: Date | string | null
  date_end?: Date | string | null
  createdAt?: Date | string | null
  updatedAt?: Date | string | null
  deleted?: boolean | null
}

export type Contract_typeCreateInput = {
  name?: string | null
  deleted?: boolean | null
}

export type Contract_typeUpdateInput = {
  id?: number | null
  name?: string | null
  deleted?: boolean | null
}

export type Contract_typeUpdateManyMutationInput = {
  id?: number | null
  name?: string | null
  deleted?: boolean | null
}

export type CustomerCreateInput = {
  firstname: string
  lastname?: string | null
  birthday?: Date | string | null
  gender?: string | null
  cni?: string | null
  type?: number | null
  driver_license?: string | null
  city?: string | null
  address?: string | null
  email: string
  phone?: string | null
  company_name?: string | null
  createdAt?: Date | string | null
  updatedAt?: Date | string | null
  deleted?: boolean | null
}

export type CustomerUpdateInput = {
  id?: number | null
  firstname?: string | null
  lastname?: string | null
  birthday?: Date | string | null
  gender?: string | null
  cni?: string | null
  type?: number | null
  driver_license?: string | null
  city?: string | null
  address?: string | null
  email?: string | null
  phone?: string | null
  company_name?: string | null
  createdAt?: Date | string | null
  updatedAt?: Date | string | null
  deleted?: boolean | null
}

export type CustomerUpdateManyMutationInput = {
  id?: number | null
  firstname?: string | null
  lastname?: string | null
  birthday?: Date | string | null
  gender?: string | null
  cni?: string | null
  type?: number | null
  driver_license?: string | null
  city?: string | null
  address?: string | null
  email?: string | null
  phone?: string | null
  company_name?: string | null
  createdAt?: Date | string | null
  updatedAt?: Date | string | null
  deleted?: boolean | null
}

export type ImageCreateInput = {
  albumId?: number | null
  path?: string | null
  createdAt?: Date | string | null
  updatedAt?: Date | string | null
  deleted?: boolean | null
}

export type ImageUpdateInput = {
  id?: number | null
  albumId?: number | null
  path?: string | null
  createdAt?: Date | string | null
  updatedAt?: Date | string | null
  deleted?: boolean | null
}

export type ImageUpdateManyMutationInput = {
  id?: number | null
  albumId?: number | null
  path?: string | null
  createdAt?: Date | string | null
  updatedAt?: Date | string | null
  deleted?: boolean | null
}

export type InsuranceCreateInput = {
  name?: string | null
  deleted?: boolean | null
}

export type InsuranceUpdateInput = {
  id?: number | null
  name?: string | null
  deleted?: boolean | null
}

export type InsuranceUpdateManyMutationInput = {
  id?: number | null
  name?: string | null
  deleted?: boolean | null
}

export type RentalCreateInput = {
  bookingId?: number | null
  carId?: number | null
  customerId?: number | null
  second_driverId?: number | null
  date_begin?: Date | string | null
  date_end?: Date | string | null
  comment?: string | null
  createdAt?: Date | string | null
  updatedAt?: Date | string | null
  deleted?: boolean | null
}

export type RentalUpdateInput = {
  id?: number | null
  bookingId?: number | null
  carId?: number | null
  customerId?: number | null
  second_driverId?: number | null
  date_begin?: Date | string | null
  date_end?: Date | string | null
  comment?: string | null
  createdAt?: Date | string | null
  updatedAt?: Date | string | null
  deleted?: boolean | null
}

export type RentalUpdateManyMutationInput = {
  id?: number | null
  bookingId?: number | null
  carId?: number | null
  customerId?: number | null
  second_driverId?: number | null
  date_begin?: Date | string | null
  date_end?: Date | string | null
  comment?: string | null
  createdAt?: Date | string | null
  updatedAt?: Date | string | null
  deleted?: boolean | null
}

export type RoleCreateInput = {
  title?: string | null
  deleted?: boolean | null
}

export type RoleUpdateInput = {
  id?: number | null
  title?: string | null
  deleted?: boolean | null
}

export type RoleUpdateManyMutationInput = {
  id?: number | null
  title?: string | null
  deleted?: boolean | null
}

export type StatusCreateInput = {
  title?: string | null
  deleted?: boolean | null
}

export type StatusUpdateInput = {
  id?: number | null
  title?: string | null
  deleted?: boolean | null
}

export type StatusUpdateManyMutationInput = {
  id?: number | null
  title?: string | null
  deleted?: boolean | null
}

export type Technical_controlCreateInput = {
  carId: number
  date_begin?: Date | string | null
  date_end?: Date | string | null
  createdAt?: Date | string | null
  updatedAt?: Date | string | null
  deleted?: boolean | null
}

export type Technical_controlUpdateInput = {
  id?: number | null
  carId?: number | null
  date_begin?: Date | string | null
  date_end?: Date | string | null
  createdAt?: Date | string | null
  updatedAt?: Date | string | null
  deleted?: boolean | null
}

export type Technical_controlUpdateManyMutationInput = {
  id?: number | null
  carId?: number | null
  date_begin?: Date | string | null
  date_end?: Date | string | null
  createdAt?: Date | string | null
  updatedAt?: Date | string | null
  deleted?: boolean | null
}

export type UserCreateInput = {
  firstname: string
  lastname?: string | null
  gender?: string | null
  cni?: string | null
  address?: string | null
  email: string
  phone?: string | null
  roleId?: number | null
  password?: string | null
  createdAt?: Date | string | null
  updatedAt?: Date | string | null
  deleted?: boolean | null
}

export type UserUpdateInput = {
  id?: number | null
  firstname?: string | null
  lastname?: string | null
  gender?: string | null
  cni?: string | null
  address?: string | null
  email?: string | null
  phone?: string | null
  roleId?: number | null
  password?: string | null
  createdAt?: Date | string | null
  updatedAt?: Date | string | null
  deleted?: boolean | null
}

export type UserUpdateManyMutationInput = {
  id?: number | null
  firstname?: string | null
  lastname?: string | null
  gender?: string | null
  cni?: string | null
  address?: string | null
  email?: string | null
  phone?: string | null
  roleId?: number | null
  password?: string | null
  createdAt?: Date | string | null
  updatedAt?: Date | string | null
  deleted?: boolean | null
}

export type IntFilter = {
  equals?: number | null
  not?: number | IntFilter | null
  in?: Enumerable<number> | null
  notIn?: Enumerable<number> | null
  lt?: number | null
  lte?: number | null
  gt?: number | null
  gte?: number | null
}

export type NullableIntFilter = {
  equals?: number | null
  not?: number | null | NullableIntFilter
  in?: Enumerable<number> | null
  notIn?: Enumerable<number> | null
  lt?: number | null
  lte?: number | null
  gt?: number | null
  gte?: number | null
}

export type NullableDateTimeFilter = {
  equals?: Date | string | null
  not?: Date | string | null | NullableDateTimeFilter
  in?: Enumerable<Date | string> | null
  notIn?: Enumerable<Date | string> | null
  lt?: Date | string | null
  lte?: Date | string | null
  gt?: Date | string | null
  gte?: Date | string | null
}

export type NullableStringFilter = {
  equals?: string | null
  not?: string | null | NullableStringFilter
  in?: Enumerable<string> | null
  notIn?: Enumerable<string> | null
  lt?: string | null
  lte?: string | null
  gt?: string | null
  gte?: string | null
  contains?: string | null
  startsWith?: string | null
  endsWith?: string | null
}

export type NullableBooleanFilter = {
  equals?: boolean | null
  not?: boolean | null | NullableBooleanFilter
}

export type StringFilter = {
  equals?: string | null
  not?: string | StringFilter | null
  in?: Enumerable<string> | null
  notIn?: Enumerable<string> | null
  lt?: string | null
  lte?: string | null
  gt?: string | null
  gte?: string | null
  contains?: string | null
  startsWith?: string | null
  endsWith?: string | null
}

export type After_rentalOrderByInput = {
  id?: OrderByArg | null
  rentalId?: OrderByArg | null
  albumId?: OrderByArg | null
  kilometrage?: OrderByArg | null
  niveau_carburant?: OrderByArg | null
  createdAt?: OrderByArg | null
  updatedAt?: OrderByArg | null
  comment?: OrderByArg | null
  deleted?: OrderByArg | null
}

export type AlbumOrderByInput = {
  id?: OrderByArg | null
  title?: OrderByArg | null
  createdAt?: OrderByArg | null
  updatedAt?: OrderByArg | null
  deleted?: OrderByArg | null
}

export type Before_rentalOrderByInput = {
  id?: OrderByArg | null
  rentalId?: OrderByArg | null
  albumId?: OrderByArg | null
  kilometrage?: OrderByArg | null
  niveau_carburant?: OrderByArg | null
  createdAt?: OrderByArg | null
  updatedAt?: OrderByArg | null
  comment?: OrderByArg | null
  deleted?: OrderByArg | null
}

export type BillOrderByInput = {
  id?: OrderByArg | null
  bill_number?: OrderByArg | null
  bill_date?: OrderByArg | null
  createdAt?: OrderByArg | null
  updatedAt?: OrderByArg | null
  deleted?: OrderByArg | null
}

export type BookingOrderByInput = {
  id?: OrderByArg | null
  carId?: OrderByArg | null
  customerId?: OrderByArg | null
  montant_avance?: OrderByArg | null
  date_begin?: OrderByArg | null
  date_end?: OrderByArg | null
  comment?: OrderByArg | null
  createdAt?: OrderByArg | null
  updatedAt?: OrderByArg | null
  deleted?: OrderByArg | null
}

export type BrandOrderByInput = {
  id?: OrderByArg | null
  name?: OrderByArg | null
  deleted?: OrderByArg | null
}

export type CarOrderByInput = {
  id?: OrderByArg | null
  brandId?: OrderByArg | null
  model?: OrderByArg | null
  model_date?: OrderByArg | null
  categoryId?: OrderByArg | null
  price?: OrderByArg | null
  colorId?: OrderByArg | null
  plate_number?: OrderByArg | null
  picture?: OrderByArg | null
  chassis_number?: OrderByArg | null
  statusId?: OrderByArg | null
  deleted?: OrderByArg | null
  createdAt?: OrderByArg | null
  updatedAt?: OrderByArg | null
}

export type CategoryOrderByInput = {
  id?: OrderByArg | null
  title?: OrderByArg | null
  deleted?: OrderByArg | null
}

export type ColorOrderByInput = {
  id?: OrderByArg | null
  name?: OrderByArg | null
  deleted?: OrderByArg | null
}

export type Car_insuranceOrderByInput = {
  id?: OrderByArg | null
  carId?: OrderByArg | null
  insuranceId?: OrderByArg | null
  date_begin?: OrderByArg | null
  date_end?: OrderByArg | null
  createdAt?: OrderByArg | null
  updatedAt?: OrderByArg | null
  deleted?: OrderByArg | null
}

export type ContractOrderByInput = {
  id?: OrderByArg | null
  rentalId?: OrderByArg | null
  contract_typeId?: OrderByArg | null
  date_begin?: OrderByArg | null
  date_end?: OrderByArg | null
  createdAt?: OrderByArg | null
  updatedAt?: OrderByArg | null
  deleted?: OrderByArg | null
}

export type Contract_typeOrderByInput = {
  id?: OrderByArg | null
  name?: OrderByArg | null
  deleted?: OrderByArg | null
}

export type CustomerOrderByInput = {
  id?: OrderByArg | null
  firstname?: OrderByArg | null
  lastname?: OrderByArg | null
  birthday?: OrderByArg | null
  gender?: OrderByArg | null
  cni?: OrderByArg | null
  type?: OrderByArg | null
  driver_license?: OrderByArg | null
  city?: OrderByArg | null
  address?: OrderByArg | null
  email?: OrderByArg | null
  phone?: OrderByArg | null
  company_name?: OrderByArg | null
  createdAt?: OrderByArg | null
  updatedAt?: OrderByArg | null
  deleted?: OrderByArg | null
}

export type ImageOrderByInput = {
  id?: OrderByArg | null
  albumId?: OrderByArg | null
  path?: OrderByArg | null
  createdAt?: OrderByArg | null
  updatedAt?: OrderByArg | null
  deleted?: OrderByArg | null
}

export type InsuranceOrderByInput = {
  id?: OrderByArg | null
  name?: OrderByArg | null
  deleted?: OrderByArg | null
}

export type RentalOrderByInput = {
  id?: OrderByArg | null
  bookingId?: OrderByArg | null
  carId?: OrderByArg | null
  customerId?: OrderByArg | null
  second_driverId?: OrderByArg | null
  date_begin?: OrderByArg | null
  date_end?: OrderByArg | null
  comment?: OrderByArg | null
  createdAt?: OrderByArg | null
  updatedAt?: OrderByArg | null
  deleted?: OrderByArg | null
}

export type RoleOrderByInput = {
  id?: OrderByArg | null
  title?: OrderByArg | null
  deleted?: OrderByArg | null
}

export type StatusOrderByInput = {
  id?: OrderByArg | null
  title?: OrderByArg | null
  deleted?: OrderByArg | null
}

export type Technical_controlOrderByInput = {
  id?: OrderByArg | null
  carId?: OrderByArg | null
  date_begin?: OrderByArg | null
  date_end?: OrderByArg | null
  createdAt?: OrderByArg | null
  updatedAt?: OrderByArg | null
  deleted?: OrderByArg | null
}

export type UserOrderByInput = {
  id?: OrderByArg | null
  firstname?: OrderByArg | null
  lastname?: OrderByArg | null
  gender?: OrderByArg | null
  cni?: OrderByArg | null
  address?: OrderByArg | null
  email?: OrderByArg | null
  phone?: OrderByArg | null
  roleId?: OrderByArg | null
  password?: OrderByArg | null
  createdAt?: OrderByArg | null
  updatedAt?: OrderByArg | null
  deleted?: OrderByArg | null
}

/**
 * Batch Payload for updateMany & deleteMany
 */

export type BatchPayload = {
  count: number
}

/**
 * DMMF
 */
export declare const dmmf: DMMF.Document;
export {};
