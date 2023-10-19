/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable react/jsx-pascal-case */
import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import api from '../config/api';

export default function LandingPage() {
  const [file, setFile] = useState(null);
  const [folder, setFolder] = useState('');

  const ref = useRef();
  const navigate = useNavigate();

  const CreateHandler = async (e) => {
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
      });
  };

  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between bg-white lg:bg-transparent shadow-lg lg:shadow-none border-b-2 lg:border-none mb-3 ">
        <div className="container mx-auto p-2">
          <div className="flex flex-wrap items-center justify-between">
              <ul className="flex flex-col items-start justify-center lg:flex-row list-none lg:ml-auto mt-2">
                <li className="nav-item">
                  <Link
                    className="px-3 py-2 text-md font-medium leading-snug text-primary-3 lg:text-white hover:opacity-75"
                    to="/home"
                  >
                    Beranda
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="px-3 py-2 text-md font-medium leading-snug text-primary-3 lg:text-white hover:opacity-75"
                    to="/"
                  >
                    Upload
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="px-3 py-2 text-md font-medium leading-snug text-primary-3 lg:text-white hover:opacity-75"
                    to="/images"
                  >
                    Dapatkan Gambar
                  </Link>
                </li>
              </ul>
            </div>
        </div>
      </nav>
      <div className="container mx-auto mb-10">
        <div className="relative flex flex-col-reverse lg:flex-row text-center lg:text-start items-center justify-center lg:justify-between">
          <div>
            <span className="font-medium text-primary-1 text-[18px]">
              Halo, Selamat Datang
            </span>
            <h1 className="font-bold text-[40px] leading-tight">
              Upload file image dan pilih folder dibawah
            </h1>
            <div className="mt-12">
            <form action="#" onSubmit={CreateHandler} enctype="multipart/form-data">
              <input type="file" name="image" ref={ref} onChange={(e) => setFile(e.target.files[0])} accept="image/*"/>
              <input type="text" name="folder" onChange={(e) => setFolder(e.target.value)}/>
              <button type="submit">Upload</button>
            </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}