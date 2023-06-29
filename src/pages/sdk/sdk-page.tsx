import React from "react";
import Layout from "@theme/Layout";
import Gallery from '../components/Gallery'
import { ENTRIES } from "./_config";
import { BRAND } from "../../constants/env";

const HomePage = () => {
  return <Layout>
    <Gallery brand={BRAND} entries={ENTRIES} title="SDK" cardSize="wide" />
  </Layout>
};

export default HomePage;
