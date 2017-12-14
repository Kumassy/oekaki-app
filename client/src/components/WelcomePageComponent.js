'use strict';

import React from 'react';
import {
  Link
} from 'react-router-dom';
import { _host } from '../clientHttp';

import Paper from 'material-ui/Paper';
require('styles//WelcomePage.scss');

class WelcomePageComponent extends React.Component {
  render() {
    return (
      <div className="welcomepage-component">
        <Paper
          zDepth={2}
          className="paper">
          <h1>ようこそ！</h1>
          <p>おえかきしりとりへようこそ！このサイトでは、他のユーザーと絵しりとりをして交流することができます。予め画像を用意しておいてアップロードすることもできますし、サイト上でお絵かきすることもできます。</p>

          <h2>注意事項</h2>
          <p>
            <a href="http://131.113.100.213/"><img src={`${_host}/images/doc-warning.jpg`}/></a>
          </p>

          <h2>遊び方</h2>
          <p>一部の機能を使うには<Link to="/login">アカウントを作成</Link>する必要があります。</p>

          <h3>スレッド</h3>
          <p>一連のしりとりはスレッドという単位で管理されます。スレッドには画像を投稿していくことができますが、しりとりが成立するように画像を投稿しなければなりません。しりとりが成立している限りはスレッドは存続しますが、失敗してしまうとスレッドがクローズされます。</p>

          <h3>スレッドの作成</h3>
          <p>
            <Link to="/home">ホーム画面</Link>から画像を投稿することで、スレッドを作成できます
            <img src={`${_host}/images/doc-create-thread.png`}/>
          </p>

          <h3>画像の投稿</h3>
          <p>
            画像を添付するか、お絵かきして送信しましょう。answer には何の絵を書いたかを記入しましょう。使える文字はひらがなのみなので、「オーガニックトリートメント」は「おおがにっくとりぃとめんと」などと変換して記述してください。
            <img src={`${_host}/images/doc-create-post.png`}/>
          </p>
          <p>
            answer はスレッドがクローズされるまで公開されません！画像から answer を推測してしりとりを繋げましょう。
          </p>
          <h3>コメント</h3>
          <p>
            スレッドに対してコメントできます
            <img src={`${_host}/images/doc-create-comment.png`}/>
          </p>

          <h3>スレッドの終了</h3>
          <p>
            しりとりに失敗するとスレッドがクローズされ、answer が表示されるようになります。クローズしたスレッドには画像は投稿できなくなります。
            <img src={`${_host}/images/doc-thread-closed.png`}/>
          </p>

          <h3>しりとり判定について</h3>
          <p>
            判定アルゴリズムを簡単にするために、特殊な判定ルールを採用しています。「ぐりしゃ」→「しゃるる」が成り立つかを判定してみましょう。
          </p>
          <p>
            はじめに、拗音や濁音は清音に変換されます。（「ぐりしゃ」→「くりしや」「しゃるる」→「しやるる」）そして、1 番目の単語の最後の文字と 2 番目の単語の最初の文字が一致しているか、2 番目の最後の文字が「ん」でないかがチェックされます。
          </p>
          <p>
            このため、「ぐりしゃ」→「しゃるる」はしりとりが成立せず、スレッドがクローズされます。
          </p>

          <h3>アカウント設定</h3>
          <p>
            <Link to="/settings">設定ページ</Link>から、パスワードの変更、アカウント画像の変更ができます。
            <img src={`${_host}/images/doc-settings.png`}/>
          </p>
        </Paper>
      </div>
    );
  }
}

WelcomePageComponent.displayName = 'WelcomePageComponent';

// Uncomment properties you need
// WelcomePageComponent.propTypes = {};
// WelcomePageComponent.defaultProps = {};

export default WelcomePageComponent;
