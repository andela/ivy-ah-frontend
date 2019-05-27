import React, { useState } from 'react';
import { Popup, Icon } from 'semantic-ui-react';
import ReportArticleModal from 'Components/ReportArticleModal';

const ReportModalSection = (props) => {
  const [modalOpen, setModal] = useState(false);


  return (
    [<Popup
      content="Report this article"
      trigger={(
        <Icon
          key="button1"
          color="grey"
          className="fas fa-bullhorn"
          onClick={
            () => {
              setModal(true);
            }
          }
        />
)}
    />,
      <ReportArticleModal
        key="modal1"
        modalOpen={modalOpen}
        handleClose={
            () => {
              setModal(false);
            }
          }
        articleId={props.articleid}
      />
    ]);
};

export default ReportModalSection;
