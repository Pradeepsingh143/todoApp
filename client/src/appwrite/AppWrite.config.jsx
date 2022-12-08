import { Client, Account, Databases } from "appwrite";

const client = new Client()
    .setEndpoint('http://localhost/v1') // API Endpoint
    .setProject('6385ed14f329fc100d69'); // project ID

export const account = new Account(client);

export const databases = new Databases(client, '6385ed98e9b878328d64')