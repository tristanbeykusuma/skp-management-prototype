/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable react/jsx-pascal-case */
import React from "react";
import adminLayout from "../hoc/adminLayout"
import { useNavigate, Link } from 'react-router-dom';
import api from '../config/api';

class ImagesPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          initial: 'state',
          fileName:[],
          imageUrl:[],
          loading:false     
        }
    }

    componentDidMount() {
      this.setState({loading:true });
      api
      .get('/images', {
      })
      .then((response) => {
        // eslint-disable-next-line react/no-direct-mutation-state
        // eslint-disable-next-line no-console
        this.setState({fileName: response.data.fileName, imageUrl:response.data.image})
        console.log(response.data);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        this.setState({imageUrl:[]})
        console.log(error);
      }).finally(() => {
        this.setState({loading: false});
      });
    }

    render()
  { 
  if (this.state.loading) {
      return <div>
      <h1 className="font-medium text-primary-1 text-[18px]">
        Images displayed below
      </h1>
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      </div>
  }

  return (
    <>
      <div className="container mx-auto mb-10">
        <div className="relative flex flex-col-reverse lg:flex-row text-center lg:text-start items-center justify-center lg:justify-between">
          <div>
            <h1 className="font-medium text-primary-1 text-[18px]">
              Images displayed below
            </h1>
            <div>
          {this.state.imageUrl.map((url, i) => (
             <img width={250} height={250} src={url} key={i} alt={this.state.fileName[i]}/>
          ))}
        </div>
          </div>
        </div>
      </div>
    </>
    );}
}

export default adminLayout(ImagesPage);