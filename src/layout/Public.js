//import libs
import React from 'react'
import PropTypes from 'prop-types'

// import components
import AppBar from '@material-ui/core/AppBar';
import {Button} from "@material-ui/core";

const propTypes = {
  children: PropTypes.node.isRequired,
}

function PublicLayout({children}) {
  return <div>
    <AppBar
      title="PostPone"
      iconElementRight={<Button>Log out</Button>}
      iconStyleRight={{
        display: 'flex',
        alignItems: 'center',
        marginTop: '0'
      }}
    />
    <div className="container d-flex justify-content-center mt-3">
      <div className="row">
        <main style={{minHeight: '100vh'}}>
          {children}

        </main>
      </div>
    </div>
  </div>
}

PublicLayout.propTypes = propTypes

export default PublicLayout
