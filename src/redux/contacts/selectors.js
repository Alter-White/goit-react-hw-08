import { createSelector } from "@reduxjs/toolkit";

export const selectFilteredContacts = createSelector(
  (state) => state.contacts.items,
  (state) => state.filters.name,
  (contacts, nameFilter) => {
    if (!nameFilter) {
      return contacts;
    }
    const normalizedFilter = nameFilter.toLowerCase();
    return contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(normalizedFilter) ||
        (contact.number &&
          contact.number.toLowerCase().includes(normalizedFilter))
    );
  }
);
export const selectContactsLoading = (state) => state.contacts.loading;
export const selectContactsError = (state) => state.contacts.error;
