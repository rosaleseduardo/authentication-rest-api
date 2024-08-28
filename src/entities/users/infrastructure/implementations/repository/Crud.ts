import bcrypt from 'bcrypt'
import { type Filter } from 'mongodb'

import { Instance } from '../../../infrastructure/instances'

import type { Interfaces, ImplLogic } from '../../../domain'

export class Crud implements ImplLogic.CrudRepository {
  async save(user: Interfaces.User): Promise<void> {
    const hashedPassword = await bcrypt.hash(user.password, 10)

    await Instance.Collection.insertOne({
      ...user,
      password: hashedPassword
    })
  }

  async get(property: keyof Interfaces.User, value: string): Promise<Interfaces.User> {
    const record = await Instance.Collection.findOne({ [property]: value })

    const user = {
      age: record?.age ?? 0,
      email: record?.email ?? '',
      name: record?.name ?? '',
      password: record?.password ?? '',
      refreshToken: record?.refreshToken ?? ''
    }

    return user
  }

  async update(args: {
    criteria: Filter<Interfaces.User>
    data: Interfaces.User
  }): Promise<void> {
    await Instance.Collection.updateOne(args.criteria, { $set: args.data })
  }

  async recordPreExists(email: string): Promise<boolean> {
    const recordFound = await Instance.Collection.findOne({
      email
    })

    return Boolean(recordFound)
  }
}
