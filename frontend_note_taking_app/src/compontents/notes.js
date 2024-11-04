import React, { useState, useEffect, useRef } from 'react';
import {
    Container,
    Grid,
    Paper,
    IconButton,
    Typography,
    Fab,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Button,
    Box
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';
import { fetchNotes, addNote, deleteNote, updateNote ,createAudioRecording} from '../services/api';

const NotesPage = () => {
    const [notes, setNotes] = useState([]);
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [newNote, setNewNote] = useState({ title: '', description: '' });
    const [editNoteId, setEditNoteId] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const [recordTime, setRecordTime] = useState(0);
    const [audioBlob, setAudioBlob] = useState(null); // State for audio
    const recorder = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        loadNotes();
    }, []);

    useEffect(() => {
        let timer;
        if (isRecording) {
            timer = setInterval(() => {
                setRecordTime((prevTime) => prevTime + 1);
            }, 1000);
        } else {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [isRecording]);

    const loadNotes = async () => {
        const notesData = await fetchNotes();
        setNotes(notesData);
    };

    const handleAddNote = async () => {
        const formData = new FormData();
        formData.append("title", newNote.title);
        formData.append("description", newNote.description);
    
    
     
        const addNoteResponse = await addNote(formData);
    
        const createdNoteId = addNoteResponse.id; 
    
        if (audioBlob) {
            const audioFormData = new FormData();
            audioFormData.append("audio_file", audioBlob, "recording.mp3");
            audioFormData.append("note", createdNoteId); 
    

            for (const [key, value] of audioFormData.entries()) {
                console.log(`${key}: ${value instanceof Blob ? 'Blob' : value}`);
            }
    
            await createAudioRecording(audioFormData);         }
    
        resetNoteForm();
        loadNotes();
    };
    
    
    
    
    const handleEditNote = async () => {
        const formData = new FormData();
        formData.append("title", newNote.title);
        formData.append("description", newNote.description);
        
        if (audioBlob) {
            formData.append("audio_file", audioBlob, "recording.mp3");
        }

        await updateNote(editNoteId, formData);
        resetNoteForm();
        loadNotes();
    };

    const handleDeleteNote = async (noteId) => {
        await deleteNote(noteId);
        loadNotes();
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    const resetNoteForm = () => {
        setNewNote({ title: '', description: '' });
        setOpenAdd(false);
        setOpenEdit(false);
        setIsRecording(false);
        setRecordTime(0);
        setAudioBlob(null);
    };

    const openEditDialog = (note) => {
        setEditNoteId(note.id);
        setNewNote({ title: note.title, description: note.description, audio_recordings:note.audio_recordings });
        setOpenEdit(true);
    };

    const startRecording = () => {
        navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
            recorder.current = new MediaRecorder(stream);
            const chunks = [];

            recorder.current.ondataavailable = (event) => {
                chunks.push(event.data);
            };

            recorder.current.onstop = () => {
                const audioBlob = new Blob(chunks, { type: "audio/mp3" });
                setAudioBlob(audioBlob);
                setRecordTime(0);
            };

            recorder.current.start();
            setIsRecording(true);
        });
    };

    const stopRecording = () => {
        recorder.current.stop();
        setIsRecording(false);
    };

    const toggleRecording = () => {
        if (isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h4" gutterBottom>
                    My Notes
                </Typography>
                <Button variant="outlined" color="secondary" onClick={handleLogout}>
                    Logout
                </Button>
            </Box>
            <Grid container spacing={3}>
                {notes.map((note) => (
                    <Grid item xs={12} sm={6} md={4} key={note.id}>
                        <Paper elevation={3} sx={{ p: 2, position: 'relative' }}>
                            <Typography variant="h6">{note.title}</Typography>
                            <Typography variant="body2" color="textSecondary">
                                {note.description}
                            </Typography>
                            <IconButton
                                aria-label="edit"
                                onClick={() => openEditDialog(note)}
                                sx={{ position: 'absolute', top: 8, right: 40 }}
                            >
                                <EditIcon color="primary" />
                            </IconButton>
                            <IconButton
                                aria-label="delete"
                                onClick={() => handleDeleteNote(note.id)}
                                sx={{ position: 'absolute', top: 8, right: 8 }}
                            >
                                <DeleteIcon color="error" />
                            </IconButton>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
            <Fab
                color="primary"
                aria-label="add"
                sx={{ position: 'fixed', bottom: 16, right: 16 }}
                onClick={() => setOpenAdd(true)}
            >
                <AddIcon />
            </Fab>

            {/* Add Note Dialog */}
            <Dialog open={openAdd} onClose={resetNoteForm}>
                <DialogTitle>Add New Note</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Title"
                        fullWidth
                        variant="outlined"
                        value={newNote.title}
                        onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        value={newNote.description}
                        onChange={(e) => setNewNote({ ...newNote, description: e.target.value })}
                    />
                    <IconButton onClick={toggleRecording} sx={{ mt: 2 }}>
                        {isRecording ? <StopIcon color="error" /> : <MicIcon color="primary" />}
                    </IconButton>
                    {isRecording && (
                        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                            Recording time: {recordTime}s
                        </Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={resetNoteForm} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddNote} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Edit Note Dialog */}
            <Dialog open={openEdit} onClose={resetNoteForm}>
                <DialogTitle>Edit Note</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Title"
                        fullWidth
                        variant="outlined"
                        value={newNote.title}
                        onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        value={newNote.description}
                        onChange={(e) => setNewNote({ ...newNote, description: e.target.value })}
                    />
                  
                  {newNote.audio_recordings && newNote.audio_recordings.length > 0 && (
            <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="textSecondary">
                    Existing recording:
                </Typography>
                <a href={newNote.audio_recordings[0].audio_file} target="_blank" rel="noopener noreferrer">
                    Listen to recording
                </a>
            </Box>
        )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={resetNoteForm} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleEditNote} color="primary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default NotesPage;
