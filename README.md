# TODO
- [client] comment reducer のテスト（ちゃんと isSending がはいったり消えたりしているか
- [server] select from psql
- [server] insert into psql
- [server] create image table
- [server] `$_FILES['post-image']`
- [client] redux を ThreadPage ではなくルートにバインディング
```
{
  'page-home': {
    lastUpdated
    isFetching
    threads: [
      thread
    ]
  }
  'page-threads': {
    threads: [
      {
        lastUpdated
        isFetching
        thread
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
