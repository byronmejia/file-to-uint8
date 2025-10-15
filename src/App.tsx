import React, { ChangeEventHandler, useState } from 'react';
import './App.css';

export function App() {
  const [file, setFile] = useState<File | null>(null);
  const [uint8Array, setUint8Array] = useState<Uint8Array | null>(null);

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result instanceof ArrayBuffer) {
          setUint8Array(new Uint8Array(reader.result));
          console.log(new Uint8Array(reader.result));
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };
  
  const handleButtonCopyToClipboard = (event: React.MouseEvent) => {
    if (uint8Array) {
      navigator.clipboard.writeText(uint8Array.toString()).then(() => {
        console.log('Copied to clipboard');
      });
    }
  }

  return (
    <>
      <h1>File to Uint8</h1>
      <p>
        This app allows you to convert a file to a Uint8Array. That's it really.
      </p>
      <p>
        This app runs entirely in your browser. No files are uploaded to a server.
      </p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fileInput" >
            <p>
              Select a file:
            </p>
          </label>
          <input type="file" id="fileInput" onChange={handleFileChange} />
        </div>
        <div>
          <button type="submit">Convert</button>
        </div>
      </form>

      {uint8Array && (
        <div>
          <h2>File as Uint8Array</h2>
          <button onClick={handleButtonCopyToClipboard}>Copy to Clipboard</button>
          <p>Size in bytes: {uint8Array.byteLength}</p>
          <code style={{
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-all',
            maxWidth: '100%',
            maxHeight: '400px',
            display: 'block',
            overflowX: 'auto',
            overflowY: 'auto',
          }}>{uint8Array.toString()} </code>
        </div>
      )}
    </>
  );
}
