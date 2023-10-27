/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable react/jsx-pascal-case */
import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import adminLayout from "../hoc/adminLayout";

import api from '../config/api';

function UploadPage() {
  const [file, setFile] = useState(null);
  const [folder, setFolder] = useState('');
  const [loading, setLoading] = useState(false);
  const [progressBar, setProgressBar] = useState(0);

  const ref = useRef();
  const navigate = useNavigate();

  const CreateHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();

    if (file == null) {
      await fetch('https://source.unsplash.com/random/500x300?landscape')
        .then((res) => res.blob())
        .then((blob) => {
          const nowDate = Date.now().toString();
          const filerandom = new File([blob], `random-${nowDate}.png`, {
            type: 'image/png',
          });
          formData.append('image', filerandom);
        });
    } else {
      formData.append('image', file);
    }

    formData.append('folder', folder);

    await api
      .post('/upload', formData, {
        onUploadProgress: e=>{
          setProgressBar(Math.round(100*e.loaded)/e.total)
        }
      })
      .then((response) => {
        // eslint-disable-next-line no-console
        console.log(response.data);
        window.location.reload();
        window.alert("Done!");
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      }).finally(() => {
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <>
        <div className="container mx-auto mb-10">
          <div className="relative flex flex-col-reverse lg:flex-row text-center lg:text-start items-center justify-center lg:justify-between">
            <div>
              <h1 className="font-bold text-[40px] leading-tight">
                Upload file image dan pilih folder dibawah
              </h1>
              <div className="mt-12">
                <form action="#" onSubmit={CreateHandler} encType="multipart/form-data">
                  <input type="file" name="image" ref={ref} onChange={(e) => setFile(e.target.files[0])} accept="image/*"/>
                  <label htmlFor="folder">Folder</label>
                  <input id="folder" type="text" name="folder" onChange={(e) => setFolder(e.target.value)}/>
                  <button type="submit">Upload</button>
                </form>
              </div>
              <div className="progress">
                <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" 
                    aria-label="progressbar" aria-valuenow={progressBar} aria-valuemin="0" aria-valuemax="100"
                    style={{width: `${progressBar}%`}}>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="container mx-auto mb-10">
        <div className="relative flex flex-col-reverse lg:flex-row text-center lg:text-start items-center justify-center lg:justify-between">
          <div>
            <h1 className="font-bold text-[40px] leading-tight">
              Upload file image dan pilih folder dibawah
            </h1>
            <div className="mt-12">
              <form action="#" onSubmit={CreateHandler} encType="multipart/form-data">
                <input type="file" name="image" ref={ref} onChange={(e) => setFile(e.target.files[0])} accept="image/*"/>
                <label htmlFor="folder">Folder</label>
                <input id="folder" type="text" name="folder" onChange={(e) => setFolder(e.target.value)}/>
                <button type="submit">Upload</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default adminLayout(UploadPage);