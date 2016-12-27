import React from 'react';

import Loader from 'client/components/shared/loader.jsx';

import style from './style.scss';
import prefaceImg from './preface.jpg';


export default ({
  preface
}: {
  preface: Object
}) => {
  const content = preface.get('content');

  let body;
  if (!content) {
    body = (
      <div className={style.loaderContainer}>
        <Loader size="3" />
      </div>
    );
  } else {
    body = (
      <div className="row">
        <div className="col-md-3">
          <img className={style.prefaceImage} alt="" src={prefaceImg} />
        </div>
        <div className="col-md-9">
          { content }
        </div>
      </div>
    );
  }


  return (
    <div>
      <div className={style.postContainer}>
        <div className={style.postHeader}>
          <h3 className={style.headerContent}>Lời tâm huyết</h3>
        </div>
        {body}
      </div>
    </div>
  );
};
