import React from "react";
import Layout from "@theme/Layout";
import Gallery from '../_components/Gallery'
import { ENTRIES } from "./_config";
import { BRAND } from "../../constants/env";

const HomePage = () => {
  return <Layout>
    <Gallery brand={BRAND} entries={ENTRIES} title="SDK" cardSize="wide" />
  </Layout>
};

export default HomePage;
