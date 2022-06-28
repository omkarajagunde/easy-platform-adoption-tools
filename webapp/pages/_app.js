import React from "react";
import SiteLayout from "../components/SiteLayout";
// Styles
import 'carbon-components/scss/globals/scss/styles.scss';
import "@carbon/ibmdotcom-styles"
import "carbon-components/css/carbon-components.min.css";

import '../styles/styles.scss'
// import Script from "next/script";
// import '../public/easy-platform-adoption-tools.css'


export default function MyApp({ Component, pageProps }) {
  
  return (
      <main>
        {/* <FronteggProvider
          contextOptions={contextOptions}
          hostedLoginBox={true}
        >
        </FronteggProvider> */}
        <SiteLayout>
            <Component {...pageProps} />
        </SiteLayout>
      </main>
  )
}