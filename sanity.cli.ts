import { defineCliConfig } from "sanity/cli";

// Config del CLI de Sanity (npx sanity ...): proyecto y dataset.
export default defineCliConfig({
  api: {
    projectId: "0zggugch",
    dataset: "production",
  },
});
