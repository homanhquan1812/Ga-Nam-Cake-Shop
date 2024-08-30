import React from 'react'
import { Helmet } from 'react-helmet'

class Head extends React.Component {
  render() {
    const { additionalStylesheets = [] } = this.props
    const { additionalTitle = [] } = this.props

    return (
      <div className="application">
          <Helmet>
              <title>Gà Nấm Cake Shop</title>
              <meta charSet="UTF-8" />
              <meta name="author" content="Ho Manh Quan" />
              <meta name="description" content="Gà Nấm Cake Shop" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
              <link rel="icon" href="../../img/logo.png" />
              {/* Include Bootstrap for button styling */}
              <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" />
              {/* Include jQuery */}
              <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons+Sharp" />
              <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
              <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous" />
              {/* BS5 CSS  */}
              <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossOrigin="anonymous" />
              {/* FONT AWESOME */}
              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
              {/* FONT GOOGLE */}
              <link rel="preconnect" href="https://fonts.googleapis.com" />
              <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
              <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700&display=swap" rel="stylesheet" />
              <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700,900" rel="stylesheet"></link>

              {/* Additional Title */}
              {additionalTitle.map((href) => (
                <title>{href}</title>
              ))}

              {/* Additional Stylesheets */}
              {additionalStylesheets.map((href, index) => (
                <link key={index} rel="stylesheet" href={href} />
              ))}
          </Helmet>
      </div>
    )
  }
}

export default Head