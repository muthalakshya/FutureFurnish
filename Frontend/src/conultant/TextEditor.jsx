import React, { useState } from "react";

const TextEditor = ({ productType, productData, setProductData }) => {
  const [selectedText, setSelectedText] = useState("");

  // Function to apply formatting
  const applyStyle = (style) => {
    const textarea = document.getElementById("descriptionEditor");
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    let updatedText = productData.description;

    if (start !== end) {
      const selected = productData.description.substring(start, end);

      // Apply styles based on selection
      let formattedText;
      switch (style) {
        case "bold":
          formattedText = `**${selected}**`; // Markdown for bold
          break;
        case "italic":
          formattedText = `*${selected}*`; // Markdown for italic
          break;
        case "underline":
          formattedText = `<u>${selected}</u>`; // HTML tag for underline
          break;
        default:
          formattedText = selected;
      }

      updatedText =
        productData.description.substring(0, start) +
        formattedText +
        productData.description.substring(end);
    }

    setProductData({ ...productData, description: updatedText });
  };

  return (
    <div className="bg-white rounded shadow p-4 mb-4">
      <label className="block text-sm font-medium mb-1">Description</label>
      <div className="border rounded p-2">
        {/* Toolbar */}
        <div className="flex border-b pb-2 mb-2">
          <button type="button" className="px-2 py-1 border-r flex items-center">
            <span className="text-sm">Paragraph</span>
            <span className="ml-1">▼</span>
          </button>
          <div className="flex px-2">
            <button
              type="button"
              className="px-2 font-bold"
              onClick={() => applyStyle("bold")}
            >
              B
            </button>
            <button
              type="button"
              className="px-2 italic"
              onClick={() => applyStyle("italic")}
            >
              I
            </button>
            <button
              type="button"
              className="px-2 underline"
              onClick={() => applyStyle("underline")}
            >
              U
            </button>
            <button type="button" className="px-2">A</button>
            <span className="mx-2">|</span>
            <button type="button" className="px-2">≡</button>
            <button type="button" className="px-2">•</button>
            <button type="button" className="px-2">@</button>
            <button type="button" className="px-2">...</button>
          </div>
          <div className="ml-auto">
            <button type="button" className="px-2">&lt;/&gt;</button>
          </div>
        </div>

        {/* Editable Text Area */}
        <textarea
          id="descriptionEditor"
          className="w-full h-24 outline-none resize-none"
          placeholder={
            productType === "jute_bag"
              ? "Describe your eco-friendly jute bag..."
              : "Describe your handcrafted wooden table..."
          }
          value={productData.description}
          onChange={(e) => setProductData({ ...productData, description: e.target.value })}
        ></textarea>
      </div>
    </div>
  );
};

export default TextEditor;
