import React from "react";
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { toast } from 'react-toastify';

class TransactionManagement extends React.Component {
  state = {
    showHiddenPassword: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.stackId !== this.props.stackId) {
      setTimeout(() => {
        this.getStatusTransaction();
      }, 3000);
    }
  }

  getStatusTransaction () {
    if (this.props.transactionStack[this.props.stackId]) {
      const txHash = this.props.transactionStack[this.props.stackId];
      if(this.props.transactions[txHash] && this.props.transactions[txHash].status){
        if(this.props.transactions[txHash].status === 'success' && !toast.isActive('success')){
          toast.success('La transacción ha ido bien', { toastId: 'success', position: toast.POSITION.TOP_RIGHT });
        } else if (this.props.transactions[txHash].status === 'error' && !toast.isActive('error')){
          const error = this.props.transactions[txHash].error.message.substring(142, 181) || 'Ha ocurrido un error.'
          toast.error(error, { toastId: 'error', position: toast.POSITION.TOP_RIGHT });
        };
      } else {
        setTimeout(() => {
          this.getStatusTransaction();
        }, 3000);
      }
    } 
  }
  
    render() {
      return ( <ToastContainer />)
    }
  }

  export default TransactionManagement;
  