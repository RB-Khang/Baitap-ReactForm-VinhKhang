import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BTFormActions } from "../redux/slice";
import axios from 'axios'

const FormTable = (pros) => {
  const { inputValue, setInputValue, searchList, setSearchList, setMessErr, messErr } = pros;
  const dispatch = useDispatch();
  const { studentList } = useSelector((state) => state.BTForm);

  const vietHoa = (string) => {
    const str = string.toLowerCase().split(' ')
    const arr = str.map(word => {
      return word.replace(word.charAt(0), word.charAt(0).toUpperCase())
    })
    return arr.join(' ')
  }

  const getData = async () => {
    const data = await axios({
      method: 'GET',
      url: 'https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01',
      header: {
        TokenCybersoft: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA0NyIsIkhldEhhblN0cmluZyI6IjAxLzAyLzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcwNjc0NTYwMDAwMCIsIm5iZiI6MTY3ODk4NjAwMCwiZXhwIjoxNzA2ODkzMjAwfQ.-axBsmkeW5i-ufzRXjqOhPEUumPXCQLTot5UjBRmtdQ'
      }
    })
    console.log({data});
  }

  useEffect(() => {
    const valueSearch = document.getElementById("searchInput").value;
    const nameSearch = valueSearch.replace(/\s/g, "").toUpperCase();
    let search = studentList.filter((student) => student.name.replace(/\s/g, "").toUpperCase().indexOf(nameSearch) !== -1);
    setSearchList(search)
    getData()
  }, [studentList]);
  return (
    <div className="container mt-3 border p-2 ">
      <div className="d-flex justify-content-center">
        <input
          className="form-control mb-2 border-info"
          style={{
            width: 500,
          }}
          id="searchInput"
          type="text"
          placeholder="Nhập tên để tìm sinh viên"
          onChange={(event) => {
            const { value } = event.target;
            const nameSearch = value.replace(/\s/g, "").toUpperCase();
            let search = studentList.filter((student) => student?.name.replace(/\s/g, "").toUpperCase().indexOf(nameSearch) !== -1
            );
            if (search.length === 0) {
              setSearchList([]);
            } else { setSearchList(search) }
          }}
        />
      </div>
      <table className="table border">
        <thead>
          <tr className="table-primary">
            <th>Mã SV</th>
            <th>Họ và tên</th>
            <th>Số điện thoại</th>
            <th>Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {(searchList ? searchList : studentList).map((student) => {
            return (
              <tr key={student.id}>
                <td className="fw-bold">{student.id}</td>
                <td>{vietHoa(student.name)}</td>
                <td>{student.phone}</td>
                <td>{student.email}</td>
                <td>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-outline-success"
                      onClick={() => {
                        dispatch(BTFormActions.editStudent(student));
                        setMessErr({});
                        let maSV = document.getElementById("maSV");
                        maSV.readOnly = true;
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => {
                        if (
                          window.confirm(
                            "Bạn có chắc chắn muốn xoá thông tin sinh viên này không?"
                          )
                        ) {
                          dispatch(BTFormActions.deleteStudent(student.id));
                          setInputValue({});
                        }
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default FormTable;
