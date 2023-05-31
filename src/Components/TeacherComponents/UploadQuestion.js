import React, { useState } from "react";
const UploadQuestion = () => {

    const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);

	const changeHandler = (event) => {
        console.log(event.target.value)
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};

    const handleSubmission = () => {
	};

  return (
    <div>
      <div className="upload-paper">
        <form>
            <div className="input-type">
            <input type="file" name="file" onChange={changeHandler} />
			{isFilePicked ? (
				<div>
					<p>Filename: {selectedFile.name}</p>
					<p>Filetype: {selectedFile.type}</p>
				</div>
			) : (
				<p>Select a file to show details</p>
			)}
            </div>
            <button onClick={handleSubmission}>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default UploadQuestion;
