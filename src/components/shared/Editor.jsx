"use client";

import { useRef, useCallback, useState, useEffect } from "react";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaStrikethrough,
  FaListUl,
  FaListOl,
  FaLink,
  FaImage,
  FaQuoteLeft,
  FaCode,
} from "react-icons/fa";

const Editor = ({
  value = "",
  onChange,
  placeholder = "Start typing...",
  className = "",
}) => {
  const editorRef = useRef(null);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");
  const [linkRel, setLinkRel] = useState("noopener noreferrer");
  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [imageWidth, setImageWidth] = useState("");
  const [imageHeight, setImageHeight] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);
  const [lastValue, setLastValue] = useState(value);
  const [savedSelection, setSavedSelection] = useState(null);

  // Initialize editor content and handle value changes
  useEffect(() => {
    if (editorRef.current) {
      if (
        !isInitialized ||
        (value !== lastValue && value !== editorRef.current.innerHTML)
      ) {
        if (value) {
          editorRef.current.innerHTML = value;
        } else {
          editorRef.current.innerHTML = "<p><br></p>";
        }
        setIsInitialized(true);
        setLastValue(value);
      }
    }
  }, [value, isInitialized, lastValue]);

  // Handle content changes
  const handleContentChange = useCallback(() => {
    if (editorRef.current && onChange) {
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  // Handle paste events
  const handlePaste = useCallback(
    (e) => {
      e.preventDefault();

      const pastedHtml = e.clipboardData.getData("text/html");
      const pastedText = e.clipboardData.getData("text/plain");

      if (pastedHtml) {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = pastedHtml;

        const cleanHtml = (element) => {
          const allowedAttributes = [
            "href",
            "src",
            "alt",
            "title",
            "target",
            "rel",
          ];
          const attributes = Array.from(element.attributes);

          attributes.forEach((attr) => {
            if (!allowedAttributes.includes(attr.name)) {
              element.removeAttribute(attr.name);
            }
          });

          Array.from(element.children).forEach((child) => {
            cleanHtml(child);
          });
        };

        Array.from(tempDiv.children).forEach((child) => {
          cleanHtml(child);
        });

        let cleanedHtml = tempDiv.innerHTML;

        cleanedHtml = cleanedHtml
          .replace(/\s+/g, " ")
          .replace(/<o:p\s*\/?>|<\/o:p>/gi, "")
          .replace(/<span[^>]*>\s*<\/span>/gi, "")
          .replace(/<p[^>]*>\s*<\/p>/gi, "")
          .replace(/&nbsp;/g, " ")
          .trim();

        if (cleanedHtml) {
          document.execCommand("insertHTML", false, cleanedHtml);
          handleContentChange();
        }
      } else if (pastedText) {
        const cleanText = pastedText
          .replace(/\r\n/g, "\n")
          .replace(/\r/g, "\n");
        const lines = cleanText.split("\n");
        let htmlContent = "";

        for (let i = 0; i < lines.length; i++) {
          if (i === 0) {
            htmlContent += lines[i];
          } else {
            htmlContent += "<br>" + lines[i];
          }
        }

        document.execCommand("insertHTML", false, htmlContent);
        handleContentChange();
      }
    },
    [handleContentChange]
  );

  // Execute formatting command
  const execCommand = useCallback(
    (command, value) => {
      document.execCommand(command, false, value);
      if (editorRef.current) {
        editorRef.current.focus();
        handleContentChange();
      }
    },
    [handleContentChange]
  );

  const formatBold = useCallback(() => execCommand("bold"), [execCommand]);
  const formatItalic = useCallback(() => execCommand("italic"), [execCommand]);
  const formatUnderline = useCallback(
    () => execCommand("underline"),
    [execCommand]
  );
  const formatStrikethrough = useCallback(
    () => execCommand("strikeThrough"),
    [execCommand]
  );

  // Handle keyboard events
  const handleKeyDown = useCallback(
    (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case "b":
            e.preventDefault();
            formatBold();
            return;
          case "i":
            e.preventDefault();
            formatItalic();
            return;
          case "u":
            e.preventDefault();
            formatUnderline();
            return;
        }
      }

      if (e.key === "Enter") {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          const container = range.commonAncestorContainer;

          const isInList = (node) => {
            let current =
              node.nodeType === Node.TEXT_NODE ? node.parentNode : node;
            while (current && current !== editorRef.current) {
              if (
                current.nodeName === "LI" ||
                current.nodeName === "UL" ||
                current.nodeName === "OL"
              ) {
                return true;
              }
              current = current.parentNode;
            }
            return false;
          };

          if (isInList(container)) {
            handleContentChange();
            return;
          }
        }

        e.preventDefault();
        if (e.shiftKey) {
          document.execCommand("insertHTML", false, "<br>");
          document.execCommand("insertHTML", false, "<br>");
        } else {
          document.execCommand("insertHTML", false, "<p></p>");
        }

        handleContentChange();
      }
    },
    [handleContentChange, formatBold, formatItalic, formatUnderline]
  );

  // Heading commands
  const formatHeading = (level) => {
    execCommand("formatBlock", `<h${level}>`);
  };

  const formatUnorderedList = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const selectedText = selection.toString().trim();

      if (selectedText) {
        const lines = selectedText.split("\n").filter((line) => line.trim());
        const listItems = lines
          .map((line) => `<li>${line.trim()}</li>`)
          .join("");
        const listHtml = `<ul>${listItems}</ul>`;
        execCommand("insertHTML", listHtml);
      } else {
        const listHtml = "<ul><li></li></ul>";
        execCommand("insertHTML", listHtml);
        setTimeout(() => {
          if (editorRef.current) {
            const newLi = editorRef.current.querySelector(
              "ul:last-of-type li:last-of-type"
            );
            if (newLi) {
              const range = document.createRange();
              const selection = window.getSelection();
              range.setStart(newLi, 0);
              range.setEnd(newLi, 0);
              selection?.removeAllRanges();
              selection?.addRange(range);
            }
          }
        }, 0);
      }
    } else {
      const listHtml = "<ul><li></li></ul>";
      execCommand("insertHTML", listHtml);
    }
  };

  const formatOrderedList = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const selectedText = selection.toString().trim();

      if (selectedText) {
        const lines = selectedText.split("\n").filter((line) => line.trim());
        const listItems = lines
          .map((line) => `<li>${line.trim()}</li>`)
          .join("");
        const listHtml = `<ol>${listItems}</ol>`;
        execCommand("insertHTML", listHtml);
      } else {
        const listHtml = "<ol><li></li></ol>";
        execCommand("insertHTML", listHtml);
        setTimeout(() => {
          if (editorRef.current) {
            const newLi = editorRef.current.querySelector(
              "ol:last-of-type li:last-of-type"
            );
            if (newLi) {
              const range = document.createRange();
              const selection = window.getSelection();
              range.setStart(newLi, 0);
              range.setEnd(newLi, 0);
              selection?.removeAllRanges();
              selection?.addRange(range);
            }
          }
        }, 0);
      }
    } else {
      const listHtml = "<ol><li></li></ol>";
      execCommand("insertHTML", listHtml);
    }
  };

  const formatBlockquote = () => execCommand("formatBlock", "<blockquote>");
  const formatPreformattedText = () => execCommand("formatBlock", "<pre>");

  // Link handling
  const handleLinkClick = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      setSavedSelection(range.cloneRange());

      if (selection.toString().trim()) {
        setLinkText(selection.toString().trim());
      } else {
        setLinkText("");
      }
    } else {
      setSavedSelection(null);
      setLinkText("");
    }
    setShowLinkDialog(true);
  };

  const insertLink = () => {
    if (linkUrl) {
      let linkHtml;

      if (linkText) {
        linkHtml = `<a href="${linkUrl}" target="_blank" rel="${linkRel}">${linkText}</a>`;
      } else {
        linkHtml = `<a href="${linkUrl}" target="_blank" rel="${linkRel}">${linkUrl}</a>`;
      }

      if (savedSelection) {
        const selection = window.getSelection();
        if (selection) {
          selection.removeAllRanges();
          selection.addRange(savedSelection);
        }
      }

      if (editorRef.current) {
        editorRef.current.focus();
      }

      execCommand("insertHTML", linkHtml);
    }

    setShowLinkDialog(false);
    setLinkUrl("");
    setLinkText("");
    setLinkRel("noopener noreferrer");
    setSavedSelection(null);
  };

  // Image handling
  const handleImageClick = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      setSavedSelection(range.cloneRange());
    } else {
      setSavedSelection(null);
    }
    setShowImageDialog(true);
  };

  const insertImage = () => {
    if (imageUrl.trim()) {
      if (savedSelection) {
        const selection = window.getSelection();
        if (selection) {
          selection.removeAllRanges();
          selection.addRange(savedSelection);
        }
      }

      if (editorRef.current) {
        editorRef.current.focus();
      }

      const imageHtml = `<img src="${imageUrl.trim()}" alt="${
        imageAlt.trim() || "Image"
      }" width="${imageWidth.trim() || "100%"}" height="${
        imageHeight.trim() || "auto"
      }" loading="lazy" />`;

      execCommand("insertHTML", imageHtml);
    }

    setShowImageDialog(false);
    setImageUrl("");
    setImageAlt("");
    setImageWidth("");
    setImageHeight("");
    setSavedSelection(null);
  };

  const ToolbarButton = ({ onClick, icon, title, active = false }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`p-2 rounded border border-gray-300 hover:bg-gray-100 transition-colors ${
        active ? "bg-gray-200" : "bg-white"
      }`}
    >
      {icon}
    </button>
  );

  return (
    <div
      className={`border border-gray-300 rounded-lg overflow-hidden ${className}`}
    >
      {/* Toolbar */}
      <div className="border-b border-gray-300 p-2 bg-gray-50">
        <div className="flex flex-wrap gap-1">
          <ToolbarButton onClick={formatBold} icon={<FaBold />} title="Bold" />
          <ToolbarButton
            onClick={formatItalic}
            icon={<FaItalic />}
            title="Italic"
          />
          <ToolbarButton
            onClick={formatUnderline}
            icon={<FaUnderline />}
            title="Underline"
          />
          <ToolbarButton
            onClick={formatStrikethrough}
            icon={<FaStrikethrough />}
            title="Strikethrough"
          />
          <div className="w-px h-8 bg-gray-300 mx-1" />
          <select
            onChange={(e) => formatHeading(e.target.value)}
            className="px-2 py-1 border border-gray-300 rounded text-sm"
            defaultValue=""
          >
            <option value="">Heading</option>
            <option value="2">H2</option>
            <option value="3">H3</option>
            <option value="4">H4</option>
          </select>
          <div className="w-px h-8 bg-gray-300 mx-1" />
          <ToolbarButton
            onClick={formatUnorderedList}
            icon={<FaListUl />}
            title="Unordered List"
          />
          <ToolbarButton
            onClick={formatOrderedList}
            icon={<FaListOl />}
            title="Ordered List"
          />
          <div className="w-px h-8 bg-gray-300 mx-1" />
          <ToolbarButton
            onClick={formatBlockquote}
            icon={<FaQuoteLeft />}
            title="Blockquote"
          />
          <ToolbarButton
            onClick={formatPreformattedText}
            icon={<FaCode />}
            title="Preformatted Text"
          />
          <div className="w-px h-8 bg-gray-300 mx-1" />
          <ToolbarButton
            onClick={handleLinkClick}
            icon={<FaLink />}
            title="Insert Link"
          />
          <ToolbarButton
            onClick={handleImageClick}
            icon={<FaImage />}
            title="Insert Image"
          />
        </div>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleContentChange}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        className="prose p-4 min-h-[200px] max-h-[550px] overflow-auto focus:outline-none prose prose-sm max-w-none"
        style={{ wordBreak: "break-word" }}
        data-placeholder={placeholder}
      />

      {/* Link Dialog */}
      {showLinkDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Insert Link</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">URL</label>
                <input
                  type="url"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      insertLink();
                    }
                  }}
                  placeholder="https://example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Link Text (optional)
                </label>
                <input
                  type="text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      insertLink();
                    }
                  }}
                  placeholder="Link text"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Rel Attribute
                </label>
                <select
                  value={linkRel}
                  onChange={(e) => setLinkRel(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="noopener noreferrer">
                    noopener noreferrer (Default - Secure)
                  </option>
                  <option value="nofollow">
                    nofollow (Don&apos;t follow for SEO)
                  </option>
                  <option value="noopener">noopener (Secure window)</option>
                  <option value="noreferrer">
                    noreferrer (No referrer info)
                  </option>
                  <option value="nofollow noopener noreferrer">
                    nofollow noopener noreferrer (All combined)
                  </option>
                  <option value="">Do-Follow</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={() => {
                  setShowLinkDialog(false);
                  setLinkUrl("");
                  setLinkText("");
                  setLinkRel("noopener noreferrer");
                  setSavedSelection(null);
                }}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={insertLink}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Insert
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Dialog */}
      {showImageDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Insert Image</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      insertImage();
                    }
                  }}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Alt Text
                </label>
                <input
                  type="text"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      insertImage();
                    }
                  }}
                  placeholder="Describe the image"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Width (px)
                  </label>
                  <input
                    type="number"
                    value={imageWidth}
                    onChange={(e) => setImageWidth(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        insertImage();
                      }
                    }}
                    placeholder="Auto"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Height (px)
                  </label>
                  <input
                    type="number"
                    value={imageHeight}
                    onChange={(e) => setImageHeight(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        insertImage();
                      }
                    }}
                    placeholder="Auto"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={() => {
                  setShowImageDialog(false);
                  setImageUrl("");
                  setImageAlt("");
                  setImageWidth("");
                  setImageHeight("");
                  setSavedSelection(null);
                }}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={insertImage}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Insert
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Editor;
