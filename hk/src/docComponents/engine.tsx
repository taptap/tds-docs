import React from "react";
import { CLI_BINARY } from "../constants/env";

export const Command = ({ prefix, suffix }) => (
  <code>
    {prefix}
    {CLI_BINARY}
    {suffix}
  </code>
);
