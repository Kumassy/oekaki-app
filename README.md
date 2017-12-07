# TODO
- [client] comment reducer のテスト（ちゃんと isSending がはいったり消えたりしているか
- [server] select from psql
- [server] insert into psql
- [server] create image table
- [server] `$_FILES['post-image']`
- [client] redux を ThreadPage ではなくルートにバインディング
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
- [client] NewPostComponent
- [client / server] threadをつくる機能
- [client / server] mypage
- [server] `POST /users/my/avatar` で画像変更
- ThreadPage の更新機能、投稿したときに lastUpdated が古ければ自動更新
