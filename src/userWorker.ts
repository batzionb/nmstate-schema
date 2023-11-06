import * as monaco from "monaco-editor";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import YamlWorker from "./yaml.worker.js?worker";
import { configureMonacoYaml } from "monaco-yaml";
import nmstateSchema from "./nmstate-schema.json";
import { JSONSchema7 } from "json-schema";

// @ts-ignore
self.MonacoEnvironment = {
  getWorker(_: any, label: string) {
    if (label === "json") {
      return new jsonWorker();
    }
    if (label === "css" || label === "scss" || label === "less") {
      return new cssWorker();
    }
    if (label === "html" || label === "handlebars" || label === "razor") {
      return new htmlWorker();
    }
    if (label === "yaml") {
      return new YamlWorker();
    }
    return new editorWorker();
  },
};

configureMonacoYaml(monaco, {
  enableSchemaRequest: true,
  schemas: [
    {
      schema: nmstateSchema as JSONSchema7,
      // If YAML file is opened matching this glob
      fileMatch: ["**/nmstate.yaml"],
      // Then this schema will be downloaded from the internet and used.
      uri: "https://github.com/batzionb/nmstate-schema/blob/main/nmstate-schema.json",
    },
  ],
});

monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true);
