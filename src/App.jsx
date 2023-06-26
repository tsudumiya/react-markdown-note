import { useEffect, useState } from 'react';
import './App.css';
import Main from './components/Main';
import Sidebar from './components/Sidebar';
import uuid from 'react-uuid';

function App() {
    const [notes, setNotes] = useState(JSON.parse(localStorage.getItem('notes')) || []);
    const [activeNote, setActiveNote] = useState(false);

    useEffect(() => {
        // ローカルストレージにノートを保存する
        localStorage.setItem('notes', JSON.stringify(notes));
    }, [notes]);

    useEffect(() => {
        // リロードしたときに一番上のノートを表示(選択)している状態にする
        notes.length && setActiveNote(notes[0].id);
    }, []);

    const onAddNote = () => {
        console.log('新しくノートが追加されました。');
        const newNote = {
            id: uuid(),
            title: '新しいノート',
            content: '新しいノートの内容',
            modDate: Date.now(),
        };
        setNotes([...notes, newNote]);
        console.log(notes);
    };

    const onDeliteNote = (id) => {
        const filterNotes = notes.filter((note) => {
            return note.id !== id;
        });
        setNotes(filterNotes);
    };

    const getActiveNote = () => {
        return notes.find((note) => note.id === activeNote);
    };

    const onUpdateNote = (updatedNote) => {
        // 修正された新しいノートの配列を返す
        const updateNotesArray = notes.map((note) => {
            if (note.id === updatedNote.id) {
                return updatedNote;
            } else {
                return note;
            }
        });
        setNotes(updateNotesArray);
    };

    return (
        <div className="App">
            <Sidebar onAddNote={onAddNote} notes={notes} onDeliteNote={onDeliteNote} activeNote={activeNote} setActiveNote={setActiveNote} />
            <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
        </div>
    );
}

export default App;
