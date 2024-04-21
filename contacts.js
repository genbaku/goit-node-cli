import { promises as fs } from "fs";
import path from "path";
import crypto from "node:crypto";

const contactsPath = path.resolve("db", "contacts.json");

async function listContacts() {
    const data = await fs.readFile(contactsPath, "utf-8");

    return JSON.parse(data);
}

async function getContactById(contactId) {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);

    return contacts.find(contact => contact.id === contactId) || null;
}

async function removeContact(contactId) {
    const data = await fs.readFile(contactsPath, "utf-8");
    let contacts = JSON.parse(data);
    const removedContact = contacts.find(contact => contact.id === contactId);

    if (!removedContact) return null;
    contacts = contacts.filter(contact => contact.id !== contactId);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return removedContact;
}

async function addContact(name, email, phone) {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const newContact = { id: crypto.randomUUID(), name, email, phone };

    contacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return newContact;
}

export { listContacts, getContactById, removeContact, addContact };
