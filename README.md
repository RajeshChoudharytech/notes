# Note-Taking Application with Voice Recording

This project is a note-taking application that allows users to create, read, update, and delete notes. Users can also record their voice and attach it to their notes. The application is built with a React frontend and a Django Rest Framework backend.

# Features

- User authentication (registration and login)
- Create, read, update, and delete notes
- Record audio notes and attach them to the text notes
- List all notes with the ability to play audio recordings
- Responsive design using Material-UI


---

## Getting Started

### Prerequisites

- **Python 3.8+** for the Django backend
- **Node.js 14+** and **npm** for the React frontend
- **Virtual Environment** for backend dependency isolation

---

## Backend Setup (Django Rest Framework)

1. **Navigate to the backend directory**:
   ```bash
   cd backend_note_taking_app
2. **To create virtual env**:
    python3 -m venv env
    source env/bin/activate  # On Windows: env\Scripts\activate
3. **install modules**
    pip install -r requirements.txt

4. **Run database migrations**
    python manage.py migrate
5. **run server**
    python manage.py runserver

#Frontend Setup (React)
1.**Navigate to the frontend directory**:
    cd frontend_note_taking_app
2.**Install dependencies**:
    npm install
3.**run frontend**
    nom start