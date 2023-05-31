import React, { useEffect, useState } from "react";
import "./index.css";
import { useAuth } from '../../auth';

const NewContestForm = ({ setIsLoading, loading, setModal, setModalMsg, setFileLoader }) => {
  const { backendActor, isAuthenticated } = useAuth();

  const [proposalType, setProposalType] = useState("Text");
  const [description, setDescription] = useState("");
  const [icp, setIcp] = useState(0);
  const [content, setContent] = useState("");

  useEffect(() => {

  }, [loading])

  const MAX_CHUNK_SIZE_VIDEO = 1024 * 500; // 500kb
  const MAX_CHUNK_SIZE_IMG = 2048 * 2048
  const [file, setFile] = useState(null);
  let MAX_CHUNK_SIZE

  const uploadFileInChunks = async (file) => {
    const maxSizeInBytes = 20 * 1024 * 1024; // 10 MB in bytes

    if (file.size < maxSizeInBytes) {
      // File is smaller than 10 MB
      console.log("File is smaller than 10 MB");
    } else {
      // File is larger than or equal to 10 MB
      setModalMsg("the file needs to be smaller then 10 MBs");
      setModal(true);
      console.log("File is larger than or equal to 10 MB");

      return
    }

    let position = 0;
    let proposalId;
    let chunkIndex = 0;
    setIsLoading(true)
    if (proposalType === "Video") {
      MAX_CHUNK_SIZE = MAX_CHUNK_SIZE_VIDEO;
    } else if (proposalType == "Image") {
      MAX_CHUNK_SIZE = MAX_CHUNK_SIZE_IMG;
    }
    const roundedNumber = Math.ceil(file.size / MAX_CHUNK_SIZE);

    while (position < file.size) {
      setFileLoader({
        isOpen: true,
        currentIndex: chunkIndex,
        totalChunks: roundedNumber
      })
      const fileChunk = file.slice(position, position + MAX_CHUNK_SIZE);
      const arrayBuffer = await fileChunk.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);

      let content = { "Text": 0 }

      // This is the first chunk, so create a new proposal
      if (position === 0) {
        // This is the first chunk, so create a new proposal
        const proposal = {
          description,
          icp,
          content
        }


        proposalId = await backendActor.addNewContest(proposal);
        console.log("proposal", Number(proposalId.ok))
        if (proposalType === "Video") {
          console.log("Uploading video", chunkIndex, [...uint8Array])
          await backendActor.addProposalVideoChunk(Number(proposalId.ok), [...uint8Array], chunkIndex);
          chunkIndex = chunkIndex + 1;
          console.log("what that in incrementing?", chunkIndex)

        }
      } else {
        // This is not the first chunk, so add it to the existing proposal
        console.log("what that heck?", proposalType)
        if (proposalType === "Video") {
          console.log("Uploading video", chunkIndex, [...uint8Array])
          await backendActor.addProposalVideoChunk(Number(proposalId.ok), [...uint8Array], chunkIndex);
          chunkIndex = chunkIndex + 1;
        }
      }
      if (proposalType !== "Video") {
        console.log("adding proposal chunk",)
        await backendActor.addProposalChunk(Number(proposalId.ok), [...uint8Array]);
        chunkIndex = chunkIndex + 1;
      }
      console.log("next position?", MAX_CHUNK_SIZE, chunkIndex);
      position += MAX_CHUNK_SIZE;

    };
    setFileLoader({
      isOpen: false,
      currentIndex: 0,
      totalChunks: 0
    })
    setIsLoading(false)

  };

  const onSubmit = async () => {
    console.log("file", file);
  };

  return (
    <div className="NewContestCard" >
      <h2>Create new Contest</h2>
      <label>
        Enter contest name:{" "}
        <input type="text" name="contestName" placeholder="Enter contest name" onChange={e => setDescription(e.target.value)} />
      </label>
      <label>Select a Date and Time:{" "}
        <input type="datetime-local" name="contestDate" onChange={e => setContent(e.target.value)} />
      </label>
      <button onClick={() => onSubmit()}>Submit</button>
    </div>
  );
};

export default NewContestForm;