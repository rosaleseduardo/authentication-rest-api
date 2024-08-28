import { MongoClient } from 'mongodb'
import * as dotenv from 'dotenv'

dotenv.config()

export const client = new MongoClient(process.env.DATABASE_URL ?? '')
export const mongodb = client.db()
