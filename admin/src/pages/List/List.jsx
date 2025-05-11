import React from 'react'
import './List.css'
import { useState } from 'react'
import axios from "axios"
function List() {
  const [list, setList] = useState([]);
  return (
    <div className="lis add flex-col">
      <p>Tất cả danh sách món ăn </p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Ảnh </b>
          <b>Tên  </b>
          <b>Loại  </b>
          <b>Giá tiền  </b>
          <b> Hoạt động  </b>

        </div>
      </div>
    </div>
  )
}

export default List