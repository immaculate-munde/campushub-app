import React, { useEffect, useState, createContext, useContext } from 'react';
const NotesContext = createContext(undefined);
export const NotesProvider = ({
  children
}) => {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [{
      id: '1',
      title: 'Introduction to Psychology',
      content: 'Psychology is the scientific study of the mind and behavior...',
      date: '2023-11-01',
      category: 'Psychology'
    }, {
      id: '2',
      title: 'Calculus Formulas',
      content: 'Important formulas to remember: derivatives, integrals...',
      date: '2023-11-02',
      category: 'Mathematics'
    }, {
      id: '3',
      title: 'History Essay Ideas',
      content: 'Potential topics for the upcoming history essay...',
      date: '2023-11-03',
      category: 'History'
    }];
  });
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);
  const addNote = note => {
    const newNote = {
      ...note,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0]
    };
    setNotes(prevNotes => [...prevNotes, newNote]);
  };
  const updateNote = (id, updatedFields) => {
    setNotes(prevNotes => prevNotes.map(note => note.id === id ? {
      ...note,
      ...updatedFields
    } : note));
  };
  const deleteNote = id => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
  };
  const getNoteById = id => {
    return notes.find(note => note.id === id);
  };
  return <NotesContext.Provider value={{
    notes,
    addNote,
    updateNote,
    deleteNote,
    getNoteById
  }}>
      {children}
    </NotesContext.Provider>;
};
export const useNotes = () => {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
};