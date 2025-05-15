"use client";

import { useState } from "react";
import { FileUp, FileText, XCircle } from "lucide-react";

export function PdfUploader() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const maxFiles = 3;
  const maxFileSizeMB = 5;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    e.target.value = ""; // Reset the input so onChange can fire again for same files

    const pdfFiles = files.filter((file) => {
      const isPdf = file.type === "application/pdf";
      const isSizeValid = file.size <= maxFileSizeMB * 1024 * 1024;
      return isPdf && isSizeValid;
    });

    if (selectedFiles.length + pdfFiles.length > maxFiles) {
      alert(
        `You can only upload up to ${maxFiles} PDF files. You already selected ${selectedFiles.length}.`
      );
      return;
    }

    if (pdfFiles.length !== files.length) {
      alert(`Each file must be a PDF and less than ${maxFileSizeMB}MB.`);
    }

    const newFiles = [...selectedFiles, ...pdfFiles];
    setSelectedFiles(newFiles);

    // Simulate auto-upload
    pdfFiles.forEach(uploadFileToServer);
  };

  const uploadFileToServer = async (file: File) => {
    console.log("Uploading:", file.name);
    // Replace this with your actual upload logic
    // Example:
    // const formData = new FormData();
    // formData.append("file", file);
    // await fetch("/api/upload", { method: "POST", body: formData });
  };

  const handleRemove = (index: number) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
  };

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <label
        className="flex items-center gap-1 w-[8rem] text-sm px-3 py-1.5 border border-border rounded-md cursor-pointer hover:bg-muted transition w-full"
        title="Upload PDF(s)"
      >
        <FileUp className="w-4 h-4 text-primary" />
        <span className="truncate text-xs font-medium text-foreground">
          Upload PDFs
        </span>
        <input
          type="file"
          accept="application/pdf"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
      </label>

      {/* File preview with remove */}
      {selectedFiles.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center text-xs text-muted-foreground w-full">
          {selectedFiles.map((file, index) => (
            <div
              key={index}
              className="flex items-center gap-1 bg-muted px-2 py-1 rounded-md max-w-full"
            >
              <FileText className="w-3 h-3 text-primary" />
              <span className="truncate max-w-[100px]">{file.name}</span>
              <button onClick={() => handleRemove(index)} className="ml-1">
                <XCircle className="w-3 h-3 text-red-500 hover:text-red-700" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
