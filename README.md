# TODO
- x [client] comment reducer のテスト（ちゃんと isSending がはいったり消えたりしているか
- x [server] select from psql
- x [server] insert into psql
- x [server] create image table
- x [server] `$_FILES['post-image']`
- x [client] redux を ThreadPage ではなくルートにバインディング
```
{
  'page_home': {
    // ここがエントリーポイント
    status: {
      lastUpdated
      isFetching
    }
    posts: [
      post
    ]
  }
  'page_threads': {
    threads: [
      {
        // ここがエントリーポイント
        status: {
          lastUpdated
          isFetching
        }
        thread: {
          id: 1,
          is_open
          posts: [
            {
              id: 1
            },
            {
              id: 100
              isSending: true
            }
          ],
          comments: [
            {
              id: 1
            },
            {
              id: 100
              isSending: true
            }
          ]
        }
      }
    ]
  }
  'user': {
    id
    username
    avatar
    PHPSESSION
  }
}
```
- [server] SESSION 管理
- x [client] NewPostComponent
- [client / server] threadをつくる機能
- x [client / server] mypage
- [client / server] パスワード変更
- [server] `POST /users/my/avatar` で画像変更
- [client / server] /users/:id で posts 一覧
- ThreadPage の更新機能、投稿したときに lastUpdated が古ければ自動更新
