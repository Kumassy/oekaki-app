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
- x [server] SESSION 管理
- x [client] NewPostComponent
- x ログインしてなかったらログインページにリダイレクト ←確認ダイアログを出す
- x [client / server] threadをつくる機能
- x [client / server] mypage
- x [client / server] パスワード変更
- x [server] `POST /users/my/avatar` で画像変更
- x ユーザー一覧表示
- x 画像一覧表示
- [client / server] /users/:id で posts 一覧
- x post に thread へのリンクをはる
- x タグは answer に相当するので、タグ編集は無しとする
- x ユーザーの検索、画像の検索 
- x へんな入力でコメントなどをリバーとできる機能
- threads/100 とかの修正
- 404ページ

- skip ThreadPage の更新機能、投稿したときに lastUpdated が古ければ自動更新
