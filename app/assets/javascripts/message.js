$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="chat-main__MessageField__MessageBox" data-message-id=${message.id}>
          <div class="chat-main__MessageField__MessageBox__MessageInfo">
            <div class="chat-main__MessageField__MessageBox__MessageInfo__userName">
              ${message.user_name}
            </div>
            <div class="chat-main__MessageField__MessageBox__MessageInfo__date">
              ${message.created_at}
            </div>
          </div>
          <div class="chat-main__MessageField__MessageBox__Message">
            <p class="chat-main__MessageField__MessageBox__Message__content">
              ${message.content}
            </p>
            <img class="Message__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
      `<div class="chat-main__MessageField__MessageBox" data-message-id=${message.id}>
        <div class="chat-main__MessageField__MessageBox__MessageInfo">
          <div class="chat-main__MessageField__MessageBox__MessageInfo__userName">
            ${message.user_name}
          </div>
          <div class="chat-main__MessageField__MessageBox__MessageInfo__date">
            ${message.created_at}
          </div>
        </div>
        <div class="chat-main__MessageField__MessageBox__Message">
          <p class="chat-main__MessageField__MessageBox__Message__content">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }

  $('.chat-main__Footer__Form').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.chat-main__MessageField').append(html);      
      $('form')[0].reset();
      $('.chat-main__MessageField').animate({ scrollTop: $('.chat-main__MessageField')[0].scrollHeight});
      $('.chat-main__Footer__Form__submit').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });
  // let reloadMessages = function() {
  //   //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
  //   let last_message_id = $('.chat-main__MessageField__MessageBox:last').data("message-id") || 0;
  //   $.ajax({
  //     //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
  //     url: "api/messages",
  //     //ルーティングで設定した通りhttpメソッドをgetに指定
  //     type: 'get',
  //     dataType: 'json',
  //     //dataオプションでリクエストに値を含める
  //     data: {id: last_message_id}
  //   })
  //   .done(function(messages) {
  //     // 更新するメッセージがなかった場合は.doneの後の処理が動かないようにする
  //     if (messages.length !== 0) {
  //       //追加するHTMLの入れ物を作る
  //       let insertHTML = '';
  //       //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
  //       $.each(messages, function(i, message) {
  //         insertHTML += buildHTML(message)
  //       });
  //       //メッセージが入ったHTMLに、入れ物ごと追加
  //       $('.chat-main__MessageField').append(insertHTML);
  //       $('.chat-main__MessageField').animate({ scrollTop: $('.chat-main__MessageField')[0].scrollHeight});
  //     }
  //   })
  //   .fail(function() {
  //     alert('error');
  //   });
  // };
  // setInterval(reloadMessages, 7000);
});

