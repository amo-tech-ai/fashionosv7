
import { Contact } from '../types';

const STORAGE_KEY = 'fashionos_crm_data';

export const saveContacts = (contacts: Contact[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
  } catch (error) {
    console.error('Failed to save contacts:', error);
  }
};

export const loadContacts = (fallback: Contact[]): Contact[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : fallback;
  } catch (error) {
    console.error('Failed to load contacts:', error);
    return fallback;
  }
};
