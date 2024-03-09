# NoteBook - Note Taking Web App


NoteBook is a straightforward web application for taking and organizing notes. It's designed to be minimalistic, easy to use, and focused on providing a seamless note-taking experience.

## Features

- **Create Notes**: Quickly create new notes with a title , description and category.
- **Edit and Delete Notes**: Easily edit and delete existing notes.
- **Responsive Design**: The app is designed to work on various devices, including desktops, tablets, and mobile phones.

## Technologies Used

- **Frontend**: React, React Router, Context API
- **Backend**: Node.js, Express.js, Mongoose (MongoDB)
- **Authentication**: JSON Web Tokens (JWT)
- **Styling**: CSS Modules,Bootstrap
- **LocalStorage**: For client-side data storage
- **Icons**: FontAwesome
- **Deployment**: Render (Backend), Netlify (Frontend)

## Getting Started

### Prerequisites

- Node.js and npm should be installed on your machine.

### Installation

1. Clone the repository:

```bash
git clone https://github.com/sumitcoder01/Note-Book.git
cd Note-Book
```

2. Install dependencies:

```bash
npm install
```

### Running the Application

1. Start the app:

```bash
npm start
```

2. Open your browser and go to `http://localhost:3000` to start using NoteBook.

## Usage

- **Creating a Note**: Click on the "New Note" button, enter a title and content, then click "Save".
- **Editing a Note**: Click on a note from the list, make your changes, then click "Save".
- **Deleting a Note**: Click on the trash icon next to a note.

## Deployment

- **Backend**: Deploy the Node.js server on a platform like Render.
- **Frontend**: Deploy the React app on a platform like Netlify. Update the API URL in `/src/constant/constant.js` to the deployed backend URL.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---