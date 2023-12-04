import React from "react";
import Layout from "@theme/Layout";
import Gallery from './_components/Gallery'
import { getEntries } from "./_config";
import { BRAND, REGION } from "../constants/env";
import sdkVersions from '../docComponents/sdkVersions';

const HomePage = () => {
  const entries = getEntries(BRAND, REGION)
  sdkVersions.initialize()

  return <Layout>
    <Gallery brand={BRAND} entries={entries} title="开发者文档" cardSize="narrow" />
  </Layout>
};

export default HomePage;
