import { useDropzone } from "react-dropzone"
import { useState } from "react"
import { isValidExcelFile } from "../lib/utils"
import { ClipLoader } from "react-spinners"
import { uploadFileToServer } from "../api"
import { useNavigate } from 'react-router-dom'
import { Button, Typography, Stack } from "@mui/material"

const UploadPage = () => {
  const [fileName, setFileName] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()

  const handleUploadChange = (files: any) => {
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
        navigate('/view/' + res.filename)
        setLoading(false)
      })
      .catch(e => {
        setLoading(false)
      })

  }

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop: handleUploadChange
  })

  return (
    <div {...getRootProps()} onClick={e => e.stopPropagation()}>
      <input {...getInputProps()} type="file" className="border rounded-md" />
      <Button onClick={open} disabled={loading} variant="outlined">
        {
          loading ? (<Stack alignItems={'center'} gap={2}><ClipLoader size={16} color="white" /> Uploading</Stack>) : "Upload a Excel file"
        }
      </Button>
      <Typography>{fileName || error}</Typography>
    </div>
  )
}

export default UploadPage