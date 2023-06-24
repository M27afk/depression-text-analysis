import { useRef, useState } from "react";
import "./Upload.css";
import "./App.css";
import axios from "axios";

import uploadIcon from "./assets/uploadIcon.svg";

function App() {
  const [text, setText] = useState("");
  const fileInput = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const handleClick = (e) => {
    fileInput.current.click();
  };
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("picture", selectedFile);
    formData.append("text", text);
    axios
      .post("http://127.0.0.1:5000/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        document.getElementById("result").innerText = res.data;
      })
      .catch((err) => alert(err));
  };
  return (
    <div class="bg-[#c8d9ed]">
      {/* navbar */}
      <nav class="bg-white border-gray-200 dark:bg-[#4663ac]">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="https://flowbite.com/" class="flex items-center">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              class="h-8 mr-3"
              alt="Flowbite Logo"
            />
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              DTA
            </span>
          </a>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
          {/* <div class="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a
                  href="#"
                  class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
            </ul>
          </div> */}
        </div>
      </nav>

      {/* body */}

      <div class="w-full h-screen flex flex-col">
        <div class="h-5/6">
          <div class="mt-3 text-3xl">Enter Text or Upload Snapshot</div>
          <div class="mt-4 h-3/5 flex items-center justify-evenly">
            <div>
              <textarea
                class="resize-none py-3 px-2 "
                rows={10}
                cols={50}
                placeholder="Enter the text here.."
                onChange={(e) => {
                  setText(e.target.value);
                }}
              />
            </div>
            <div className="upload--container" onClick={handleClick}>
              <input
                type="file"
                style={{ display: "none" }}
                ref={fileInput}
                onChange={handleFileSelect}
              />
              <div className="upload--img">
                <img src={uploadIcon} alt="Upload Image of the structure" />
                <p>{selectedFile ? "Edit" : "Upload"} picture.</p>
                {selectedFile && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    File selected:<div>{selectedFile["name"]}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <button
            class="mt-4 border-2 px-4 py-2 bg-[#4663ac] text-white"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>

        <div id="result" class="text-3xl">
          Result
        </div>
      </div>
    </div>
  );
}

export default App;
