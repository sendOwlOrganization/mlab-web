## 변경 내용

-

## 체크리스트

- [ ] 백엔드 선배포
- [ ] Playwright 테스트 케이스 작성
- [ ] Jest Hook 테스트 케이스 작성
- [ ] Storybook 테스트 케이스 작성

## 📸 스크린샷


## 기타사항


---------------------------------------

## 🤚🏻 코드리뷰 하는 방법
🪧 [개발 공통 코드리뷰 가이드]

### ✎ Code Review Manner
1. **지적이 아닌 질문**하기
    - 원작하신분이 몰라서 그렇게 한게 아니라 그랬을 수 밖에 없는 상황일 수 있습니다
    - 위험하다고 판단시 _request change_
2. 다른 방법에 대해 **제안**하기
    - 이 때 본인이 생각한 것과 너무 다른 경우 _request change_
3. **예시코드를 작성**하여 댓글로 달기
4. 리뷰 마무리
    - 무플 방지! 고생한 사우에게 고생했다 한마디 남기는 게 좋습니다 (LGTM 강추)

### ✎ [Pn Rule](https://blog.banksalad.com/tech/banksalad-code-review-culture/#%EC%BB%A4%EB%AE%A4%EB%8B%88%EC%BC%80%EC%9D%B4%EC%85%98-%EB%B9%84%EC%9A%A9%EC%9D%84-%EC%A4%84%EC%9D%B4%EA%B8%B0-%EC%9C%84%ED%95%9C-pn-%EB%A3%B0)

- Pn
    - _**P1**_ : 꼭 반영해주세요 (Request changes)
    - _**P2**_ : 적극적으로 고려해주세요 (Request changes)
    - _**P3**_ : 웬만하면 반영해 주세요 (Comment)
    - _**P4**_ : 반영해도 좋고 넘어가도 좋습니다 (Approve)
    - _**P5**_ : 그냥 사소한 의견입니다 (Approve)


- Pn Resolve
    - P1, P2, P3는 리뷰어가 Resolve 합니다
    - P4, P5는 리뷰어가 아니더라도 Resolve 할 수 있습니다
    - Pn 표시가 없을 경우 P5로 봅니다

### ✎ PR Title Rule
- PR에 배포일 표기가 필요한 경우
  ```text
    # <gitmoji> PR 제목
  ```

### ✎ Comment Rule
- Comment의 Resolve 처리
    - 최초 Comment를 작성한 사람이 처리
### ✎ Merge Rule
- PR 머지는 리뷰어가 해주도록 합니다.