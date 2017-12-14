import React from 'react';
import { connect } from 'react-redux';

import Dialog from 'material-ui/Dialog';

class GlobalErrorReporterComponent extends React.Component {
  render () {
    const { shouldOpenDialog } = this.props;
    return (
      <Dialog
        title="エラーが発生しました"
        modal={true}
        open={shouldOpenDialog}
      >
        サーバーと通信できませんでした。ページをリロードしてみてください。
      </Dialog>
    )
  }
}

function mapStateToProps(state) {
  const { global } = state;
  const { shouldOpenDialog } = global;

  return {
    shouldOpenDialog
  }
}
const GlobalErrorReporterContainer = connect(mapStateToProps)(GlobalErrorReporterComponent);
export default GlobalErrorReporterContainer;
