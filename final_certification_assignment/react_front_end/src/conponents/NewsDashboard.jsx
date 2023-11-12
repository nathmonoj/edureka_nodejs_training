import React, { useState, useEffect } from 'react'
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import { countries } from 'country-data';
import moment from 'moment';
import axios from 'axios';
import './Style/weatherStyle.css'
const newsApiUrl = `${process.env.REACT_APP_NODE_API_DOMAIN}${process.env.REACT_APP_NODE_ADD_NEWS_API_URL}`

export default function NewsDashboard() {
  // Latest News Data.
  const [alNewsData, setAlNewsData] = useState('')
  const [columnDefs] = useState([
    { field: "news_title" },
    { field: "news_data" },
    { field: "createdAt" }
  ]);

  const fetchNewsData = async () => {
    try {
      const newsResponse = await axios.get(newsApiUrl)
      let { data } = newsResponse
      if (data && data.data) {
        setAlNewsData(data.data)
        console.log(alNewsData)
      }
    }
    catch (err) {
    }
  }

  useEffect(() => {
    fetchNewsData()
  }, []);
  return (
    <div className="inner-container" >
      <div className='header'>
        <div className="text">Latest-News-Update</div>
        <div className="underline"></div>
      </div>
      <div className="news-inner-wrapper inner-content">
        <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
          <AgGridReact rowData={alNewsData} columnDefs={columnDefs} pagination={true} paginationPageSize={5}></AgGridReact>
        </div>
      </div>
    </div >
  )
}
