"use client";

import {
  LogLevels,
  OutputData,
  default as _EditorJS,
} from "@editorjs/editorjs";
import { useEffect, useId, useRef } from "react";
import { i18nKorean } from "./i18n";
import { EDITOR_JS_TOOLS } from "./plugin";
import { css } from "@linaria/core";
import { theme } from "@/mds/theme";

export const INITIAL_DATA = () => ({
  time: new Date().getTime(),
  blocks: [],
});

interface EditorJSProps {
  data: OutputData;
  onChangeData?: (data: OutputData) => void;
}

const EditorJS = ({ data, onChangeData }: EditorJSProps) => {
  const editor = useRef<_EditorJS>();
  const holder = useId();

  useEffect(() => {
    if (editor.current) return;

    editor.current = new _EditorJS({
      holder,
      data: data,
      logLevel: "ERROR" as LogLevels,
      placeholder: "새로운 소식이나 나누고 싶은 이야기를 적어주세요",
      i18n: i18nKorean,
      onChange: async (api) => {
        const content = await api.saver.save();
        onChangeData?.(content);
      },
      readOnly: !onChangeData,
      tools: EDITOR_JS_TOOLS,
      inlineToolbar: [
        "bold",
        "italic",
        "underline",
        "link",
        "marker",
        "inlineCode",
      ]
    })

    return () => editor.current?.destroy?.();
  }, []);

  return <div id={holder} className={C.editorJS} />;
};

export default EditorJS;

const C = {
  editorJS: css`
    & .codex-editor-overlay {
      opacity: 0;
    }

    padding-bottom: 2.5rem;

    .ce-header {
      font-size: 16px;
    }
  
    .ce-block {
      &__content {
        font-size: 16px;
        font-weight: normal;
        max-width: none;
      }
    }
  
    .codex-editor {
      position: relative;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      z-index: 1;
      margin: 0 1rem;
  
      &__redactor {
        padding-bottom: 0 !important;
      }
    }
  
    .ce-popover {
      background-color: ${theme.palette.background};
      border: 1px solid ${theme.palette.background};
      &__overlay {
        backdrop-filter: blur(5px);
      }
      &-item {
        &:hover {
          background-color: ${theme.palette.colors.gray[100]};
        }
      }
    }
  
    .ce-conversion-toolbar,
    .ce-inline-toolbar {
      background-color: ${theme.palette.background};
      border: 1px solid ${theme.palette.background};
    }
  
    .ce-conversion-tool,
    .ce-inline-toolbar__dropdown,
    .ce-inline-tool {
      color: ${theme.palette.text.primary};
  
      &:hover {
        background-color: ${theme.palette.colors.gray[100]};
      }
    }
  
    .ce-conversion-tool,
    .ce-popover__item {
      &--focused {
        background-color: ${theme.palette.colors.pink[100]} !important;
      }
    }
  
    .ce-conversion-tool__icon {
      background-color: transparent;
    }
  
    .ce-inline-tool-input {
      background-color: ${theme.palette.background};
      color: ${theme.palette.text.primary};
    }
  
    .cdx-marker {
      background-color: ${theme.palette.colors.pink[100]};
      color: ${theme.palette.text.primary};
    }
  
    .cdx-checklist {
      &__item {
        &-checkbox-check {
          border-radius: 50%;
          background-color: transparent;
          border-color: ${theme.palette.colors.gray[200]};
  
          &:hover {
            background-color: ${theme.palette.background};
            border-color: ${theme.palette.colors.gray[400]};
          }
  
          ::before {
            background-color: ${theme.palette.colors.pink[100]};
          }
        }
        &--checked .cdx-checklist__item-checkbox-check {
          background-color: ${theme.palette.colors.pink[400]};
          border-color: ${theme.palette.colors.pink[400]};
  
          &:hover {
            background-color: ${theme.palette.colors.pink[600]};
            border-color: ${theme.palette.colors.pink[600]};
          }

          svg {
            border-radius: 50%;
          }
        }
      }
    }
  
    .ce-block--selected .ce-block__content {
      background-color: #00000020;
    }
  
    & *::selection {
      background-color: #00000020;
    }
  
    @media (hover: hover) {
      .cdx-checklist__item--checked .cdx-checklist__item-checkbox:not(.cdx-checklist__item--checked .cdx-checklist__item-checkbox--no-hover):hover .cdx-checklist__item-checkbox-check {
        background-color: ${theme.palette.colors.pink[600]};
        border-color: ${theme.palette.colors.pink[600]};
      }
    }
  `
};
