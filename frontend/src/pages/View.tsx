import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { ChangeEvent, useCallback, useEffect, useState } from "react"
import { readData } from "../api"
import { setData, setPage, setSearchText, setTotalCount } from "../store/fileViewerReducer"
import { Box, Input, Pagination, Table, TableBody, TableCell, TableRow } from "@mui/material"
import { debounce } from "lodash"

const ViewPage = () => {
  const { id: fileId } = useParams()
  const [cols, setCols] = useState(1)
  const [searchVal, setSearchVal] = useState<string>("")

  const count = useAppSelector(state => state.fileViewer.count)
  const page = useAppSelector(state => state.fileViewer.page)
  const sort = useAppSelector(state => state.fileViewer.sort)
  const sortIndex = useAppSelector(state => state.fileViewer.sortIndex)
  const searchText = useAppSelector(state => state.fileViewer.searchText)
  const totalCount = useAppSelector(state => state.fileViewer.totalCount)
  const data = useAppSelector(state => state.fileViewer.data)

  const dispatch = useAppDispatch()
  const getData = useCallback(() => {
    if (fileId) {
      readData({ count, page, sort, sortIndex, searchText, fileId })
        .then(res => {
          dispatch(setData(res.data))
          dispatch(setTotalCount(res.total))
          setCols(res.maxCols)
        })
    }
  }, [count, page, sort, sortIndex, searchText, fileId])

  const debounceSearch = useCallback(debounce((_searchText) => {
    dispatch(setSearchText(_searchText));

  }, 1000), [])

  useEffect(() => {
    getData()
  }, [getData])


  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    debounceSearch(e.target.value);
    setSearchVal(e.target.value)
  }

  const handleChangePage = (_, newPage: number) => {
    dispatch(setPage(newPage))
  }

  return (
    <Box>
      
      <Box
        marginBottom={4}
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Input
          value={searchVal}
          onChange={handleChangeSearch}
          color="primary"
          placeholder="Search..."
          sx={{ color: 'white' }}
        />
      </Box>

      <Table sx={{ minWidth: 600, maxWidth: 1000 }}>
        <TableBody>
          {data.map((record, index) => (
            <TableRow key={index} >
              {
                Array.from({ length: cols }).map((_, cind) => {
                  let key = "col" + cind
                  let value = record[key]?.result || record[key] || ""
                  return <TableCell
                    key={key}
                    sx={{ color: "white" }}
                  >
                    {value}
                  </TableCell>
                })
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination
        sx={{ mt: 2 }}
        count={Math.ceil(totalCount / count)}
        page={page}
        shape="rounded"
        variant="outlined"
        onChange={handleChangePage}
        color="primary"
      />

    </Box>
  )
}

export default ViewPage