import { useDropzone } from "react-dropzone"
import { useState } from "react"
import { isValidExcelFile } from "../lib/utils";
import { ClipLoader } from "react-spinners";
import { uploadFileToServer } from "../api";

const UploadPage = () => {
  const [fileName, setFileName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleUploadChange = (files: any) => {
    console.log(files, 'files')
    const file = files[0]
    if (!isValidExcelFile(file.name)) {
      setError("Invalid Excel file")
      return
    }
    setLoading(true)
    setError("")
    setFileName(files[0].name)
    uploadFileToServer(file)
      .then((res) => {
        console.log("file upload result:", res)
        setLoading(false)
      })
      .catch(e => {
        setLoading(false)
        console.log(e, 'error')
      })

  }

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop: handleUploadChange
  })

  return (
    <div {...getRootProps()} onClick={e => e.stopPropagation()}>
      <input {...getInputProps()} type="file" className="border rounded-md" />
      <button onClick={open} disabled={loading}>
        {
          loading ? (<div className="flex items-center gap-2"><ClipLoader size={16} color="white" /> Uploading</div>) : "Upload a Excel file"
        }
      </button>
      <p>{fileName || error}</p>
    </div>
  )
}

export default UploadPage