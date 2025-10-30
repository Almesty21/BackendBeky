import Contact, { IContact } from "../models/contact";

export const getContacts = async (): Promise<IContact[]> => {
  return Contact.find();
};

export const getContactById = async (id: string): Promise<IContact | null> => {
  return Contact.findById(id);
};

export const createContact = async (
  data: Partial<IContact>
): Promise<IContact> => {
  const newContact = new Contact(data);
  return newContact.save();
};

export const updateContact = async (
  id: string,
  data: Partial<IContact>
): Promise<IContact | null> => {
  return Contact.findByIdAndUpdate(id, { $set: data }, { new: true });
};

export const deleteContact = async (id: string): Promise<IContact | null> => {
  return Contact.findByIdAndDelete(id);
};
