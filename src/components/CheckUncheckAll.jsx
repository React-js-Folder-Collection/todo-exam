import React from 'react';

export default function CheckUncheckAll(props) {
  return (
    <>
    {props.todos.length > 5 ? (
    <button  type="button" className="btn btn-outline-primary tw-mr-5" onClick={props.check ? props.checkAll : props.uncheckAll }>
      {props.check ? 'check All' : 'UnCheck All'}
    </button>) : ''
    }
    </>
  )
}
