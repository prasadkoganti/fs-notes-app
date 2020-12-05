const chalk = require('chalk')
const fs = require('fs')

const listNotes = () => {
    console.log(chalk.green.inverse('Your Notes..'))
    const notes = loadNotes()
    console.log(notes)
    notes.forEach((note) => console.log(chalk.green.inverse(note.title)))
}

const readNote = (title) => {
    const notes = loadNotes()
    const noteFound = notes.find((note) => note.title === title)
    if (noteFound) {
        console.log(chalk.green.inverse('Title: ' + noteFound.title))
        console.log('Body: ' + noteFound.body)
    } else {
        console.log(chalk.red.inverse('Note not Found'))
    }
    // const notes = loadNotes()
    // console.log(notes)
    // notes.forEach((note) => console.log(chalk.green.inverse(note.title)))
}

const addNote = function (title, body) {
    const notes = loadNotes()
    // const duplicateNotes = notes.filter(function (note) {
    //     console.log(note.title, title)
    //     return note.title === title
    // })
    //const duplicateNotes = notes.filter((note) => note.title === title)
    const duplicateNote = notes.find((note) => note.title === title)

    //console.log(duplicateNotes.length);
    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New Note Added'))
    } else {
        console.log(chalk.red.inverse('Note Already exists'))
    }
}

const removeNote = function (title, body) {
    const notes = loadNotes()
    // const noteExists = notes.filter(function (note) {
    //     return note.title === title
    // })
    const noteExists = notes.filter((note) => note.title === title)
    //console.log(noteExists.length);
    if (noteExists.length !== 0) {
        notes.pop({
            title: title
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('Note Removed'))
    } else {
        console.log(chalk.red.inverse('Note does not exist'))
    }

}


const saveNotes = function (notes) {
    const notesJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', notesJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (error) {
        return []
    }

}

module.exports =
{
    listNotes: listNotes,
    addNote: addNote,
    removeNote: removeNote,
    readNote: readNote
}
