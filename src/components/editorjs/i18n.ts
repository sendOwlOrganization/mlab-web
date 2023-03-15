import { I18nConfig } from "@editorjs/editorjs"

export const i18nKorean: I18nConfig = {
  messages: {
    ui: {
      toolbar: {
        toolbox: {
          ["Add"]: "추가"
        }
      },
      blockTunes: {
        toggler: {
          ["Click to tune"]: "수정",
          ["or drag to move"]: "드래그하여 이동"
        }
      },
      inlineToolbar: {
        converter: {
          ["Convert to"]: "변환"
        }
      },
      popover: {
        ["Filter"]: "필터",
        ["Nothing found"]: "검색된 항목이 없습니다"
      }
    },
    blockTunes: {
      delete: {
        ["Delete"]: "삭제",
        ["Click to delete"]: "클릭하여 삭제"
      },
      moveUp: {
        ["Move up"]: "위로 이동"
      },
      moveDown: {
        ["Move down"]: "아래로 이동"
      }
    },
    toolNames: {
      ["Text"]: "텍스트",
      ["Table"]: "표",
      ["List"]: "리스트",
      ["Heading"]: "제목",
      ["Checklist"]: "체크 리스트",
      ["Link"]: "링크",
      ["Code"]: "코드",
      ["Delimiter"]: "구분문자",
      ["Bold"]: "굵게",
      ["Italic"]: "기울기",
      ["InlineCode"]: "코드",
      ["Marker"]: "하이라이트",
      ["Underline"]: "밑줄"
    },
    tools: {
      table: {
        ["Add column to left"]: "왼쪽에 열 삽입",
        ["Add column to right"]: "오른쪽에 열 삽입",
        ["Delete column"]: "열 삭제",
        ["Add row above"]: "위에 행 삽입",
        ["Add row below"]: "아래에 행 삽입",
        ["Delete row"]: "행 삭제",
        ["With headings"]: "머리글 O",
        ["Without headings"]: "머리글 X",
        ["Heading"]: "머리글"
      },
      list: {
        ["Unordered"]: "기호 목록",
        ["Ordered"]: "번호 목록"
      },
      header: {
        ["Heading 1"]: "제목 1",
        ["Heading 2"]: "제목 2",
        ["Heading 3"]: "제목 3",
        ["Heading 4"]: "제목 4",
        ["Heading 5"]: "제목 5",
        ["Heading 6"]: "제목 6"
      }
    }
  }
}
