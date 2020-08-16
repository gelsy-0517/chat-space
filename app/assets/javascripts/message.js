$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="chat-main__MessageField__MessageBox">
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
      `<div class="chat-main__MessageField__MessageBox">
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
});

