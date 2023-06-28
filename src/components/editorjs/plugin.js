import Checklist from "@editorjs/checklist";
import Code from "@editorjs/code";
import Delimiter from "@editorjs/delimiter";
import Header from "@editorjs/header";
// import Image from "@editorjs/image"
import InlineCode from "@editorjs/inline-code";
import Marker from "@editorjs/marker";
import NestedList from "@editorjs/nested-list";
import Paragraph from "@editorjs/paragraph";
import Table from "@editorjs/table";
import Underline from "@editorjs/underline";

/**
 * Editor.js tools 설정 객체.
 * tools들이 Typescript 지원을 하지 않아서 일반 Javascript 파일로 만들어야함
 */
export const EDITOR_JS_TOOLS = Object.freeze({
  // https://github.com/editor-js/checklist
  checklist: {
    class: Checklist,
    inlineToolbar: true
  },
  // https://github.com/editor-js/code
  code: {
    class: Code,
    config: {
      placeholder: "코드를 작성해보세요!"
    }
  },
  // https://github.com/editor-js/delimiter
  delimiter: Delimiter,
  // https://github.com/editor-js/header
  header: {
    class: Header,
    config: {
      placeholder: "제목을 입력해주세요",
      levels: [1, 2, 3],
      defaultLevel: 1
    },
    inlineToolbar: true
  },
  // https://github.com/editor-js/image
  // TODO: 백엔드와 이미지 업로드 구현후 추가
  // image: {
  //   class: Image,
  //   config: {
  //     endpoints: {
  //       byFile: '', // Your backend file uploader endpoint
  //       byUrl: '', // Your endpoint that provides uploading by Url
  //     }
  //   }
  // },
  // https://github.com/editor-js/inline-code
  inlineCode: {
    class: InlineCode,
    shortcut: "CMD+SHIFT+C"
  },
  // https://github.com/editor-js/marker
  marker: {
    class: Marker,
    shortcut: "CMD+SHIFT+M"
  },
  // https://github.com/editor-js/nested-list
  list: {
    class: NestedList,
    inlineToolbar: true,
    config: {
      defaultStyle: "unordered"
    }
  },
  // https://github.com/editor-js/paragraph
  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
    config: {
      preserveBlank: true
    }
  },
  // https://github.com/editor-js/table
  table: {
    class: Table,
    inlineToolbar: true
  },
  // https://github.com/editor-js/underline
  underline: {
    class: Underline,
    shortcut: "CMD+U"
  }
});
