import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGO_DB_URI);
const db = client.db("career-connect");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client
  }),
    //...other options
  emailAndPassword: { 
    enabled: true, 
  }, 
    user: {
       additionalFields: {
          role: {
              type: "string",
            } ,
            plan : {
            default : "seeker_free",
            }
        }
    }
});