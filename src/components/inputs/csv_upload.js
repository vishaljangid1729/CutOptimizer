import React from 'react'
import { Button } from '@material-ui/core'

const CsvUpload = (props) => {
  return (
    <div>
      <input
        accept="image/*"
        id="contained-button-file"
        style={{ display: 'none' }}
        multiple
        type="file"
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          Upload
        </Button>
      </label>
    </div>
  )
}

export { CsvUpload }
