import React, { useState, useEffect } from "react";

// Assuming you've imported your JSON files
import russianSynodal from "../src/BIBLES/RussianSynodal.json";
import ukrainianOgienko from "../src/BIBLES/UkrainianOgienko.json";
import kingJames from "../src/BIBLES/UkrainianOgienko.json";
import "../src/css/BibleReader.css";

const BIBLE_VERSIONS = {
  "Ukrainian Ogienko": ukrainianOgienko,
  "King James": kingJames,
  "Russian Synodal": russianSynodal,
};

const BibleMemorizerNew = () => {
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [previousSelections, setPreviousSelections] = useState({});

  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (selectedVersion) {
      setBooks(BIBLE_VERSIONS[selectedVersion].books);
      setSelectedBook(null);
      setSelectedChapter(null);
    }
  }, [selectedVersion]);

  const handleVersionChange = (e) => {
    const version = e.target.value;
    setSelectedVersion(version);

    if (previousSelections[version]) {
      setSelectedBook(previousSelections[version].book);
      setSelectedChapter(previousSelections[version].chapter);
    } else {
      setSelectedBook(null);
      setSelectedChapter(null);
    }
  };

  const handleBookChange = (e) => {
    const book = e.target.value;
    setSelectedBook(book);
    setSelectedChapter(null);

    setPreviousSelections({
      ...previousSelections,
      [selectedVersion]: { book: book, chapter: null },
    });
  };

  const handleChapterChange = (e) => {
    const chapter = e.target.value;
    setSelectedChapter(chapter);

    setPreviousSelections({
      ...previousSelections,
      [selectedVersion]: { book: selectedBook, chapter: chapter },
    });
  };

  return (
    <div className="container">
      <div className="selector-container">
        <select
          className="select"
          onChange={handleVersionChange}
          value={selectedVersion || ""}
        >
          <option value="">Select Version</option>
          {Object.keys(BIBLE_VERSIONS).map((version) => (
            <option key={version} value={version}>
              {version}
            </option>
          ))}
        </select>

        {selectedVersion && (
          <select
            className="select"
            onChange={handleBookChange}
            value={selectedBook || ""}
          >
            <option value="">Select Book</option>
            {books.map((book, index) => (
              <option key={index} value={book.name}>
                {book.name}
              </option>
            ))}
          </select>
        )}

        {selectedBook && (
          <select
            className="select"
            onChange={handleChapterChange}
            value={selectedChapter || ""}
          >
            <option value="">Select Chapter</option>
            {books
              .find((b) => b.name === selectedBook)
              .chapters.map((chapter) => (
                <option key={chapter.chapter} value={chapter.chapter}>
                  Chapter {chapter.chapter}
                </option>
              ))}
          </select>
        )}
      </div>
      {selectedChapter && (
        <div className="chapter-text">
          {books
            .find((b) => b.name === selectedBook)
            .chapters.find((c) => c.chapter === parseInt(selectedChapter))
            .verses.map((verse) => (
              <div key={verse.verse} className="verse-block">
                <span className="verse-number">{verse.verse}</span>
                {verse.text}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default BibleMemorizerNew;
