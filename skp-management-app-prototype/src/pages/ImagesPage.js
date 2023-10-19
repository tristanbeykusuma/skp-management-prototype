/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable react/jsx-pascal-case */
import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import api from '../config/api';

export default function LandingPage() {
  const [imageUrl, setImageUrl] = useState([]);

  useEffect(() => {
    api
      .get('/images', {
      })
      .then((response) => {
        setImageUrl(response.data.image);
        // eslint-disable-next-line no-console
        console.log(response.data);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  }, []);

  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between bg-white lg:bg-transparent shadow-lg lg:shadow-none border-b-2 lg:border-none mb-3 ">
        <div className="container mx-auto p-2">
          <div className="flex flex-wrap items-center justify-between">
              <ul className="flex flex-col items-start justify-center lg:flex-row list-none lg:ml-auto mt-2">
                <li className="nav-item">
                  <Link
                    className="px-3 py-2 text-md font-medium leading-snug text-primary-3 lg:text-white hover:opacity-75"
                    to="/"
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
            <div>
          {imageUrl.map((url) => (
             <span>{url}</span>
          ))}
        </div>
          </div>
        </div>
      </div>
    </>
  );
}